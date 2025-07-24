/**
 * @fileoverview MongoDB models for holding entities and related data structures
 *
 * This module contains all the data models used for representing holdings in the MongoDB database.
 * It follows the Domain-Driven Design pattern where models encapsulate both data and behavior.
 *
 * Key Models:
 * - HoldingModel: Main holding entity with MongoDB document transformation capabilities
 * - DetailsModel: Core holding business data (CPH, name, description, etc.)
 * - AddressModel: UK postal address information
 * - GeoLocationModel: Ordnance Survey coordinates and map references
 * - ContactModel: Telephone and email contact information
 *
 * All models provide toObject() methods for JSON serialization and MongoDB document conversion.
 * The HoldingModel provides static fromDocument() method for database document reconstruction.
 *
 * @module data/mongo/models/holding
 * @requires None - Pure JavaScript classes
 * @author Defra DDTS
 * @since 1.0.0
 */

/**
 * MongoDB model representing a holding entity
 * Handles data transformation between JavaScript objects and MongoDB documents
 * @class HoldingModel
 */
class HoldingModel {
  /**
   * Creates a new HoldingModel instance
   * @param {object} [data={}] - The holding data
   * @param {string|null} [data._id] - MongoDB ObjectId
   * @param {string|null} [data.id] - Alternative ID field
   * @param {object} [data.details] - Holding details object
   * @param {Date} [data.createdAt] - Creation timestamp
   * @param {Date} [data.updatedAt] - Last update timestamp
   */
  constructor (data = {}) {
    this._id = data._id || data.id || null
    this.details = data.details ? this.createDetailsModel(data.details) : null
    this.updatedAt = data.updatedAt || new Date()
    this.createdAt = data.createdAt || new Date()
  }

  /**
   * Helper method to create DetailsModel from data
   * Handles the construction of nested Address, GeoLocation, and Contact models
   * @param {object} detailsData - Raw details data from request or database
   * @param {string} detailsData.cph - County Parish Holding number
   * @param {string} detailsData.name - Holding name
   * @param {string} [detailsData.description] - Optional holding description
   * @param {object} [detailsData.address] - Optional address information
   * @param {object} [detailsData.geolocation] - Optional geolocation data
   * @param {Array<object>} [detailsData.contacts] - Optional contact information
   * @returns {DetailsModel} Fully constructed DetailsModel instance
   */
  createDetailsModel (detailsData) {
    const address = detailsData.address
      ? new AddressModel(
        detailsData.address.street,
        detailsData.address.locality,
        detailsData.address.town,
        detailsData.address.county,
        detailsData.address.postcode
      )
      : undefined

    const geolocation = detailsData.geolocation
      ? new GeoLocationModel(
        detailsData.geolocation.mapReference,
        detailsData.geolocation.easting,
        detailsData.geolocation.northing
      )
      : undefined

    const contacts = Array.isArray(detailsData.contacts)
      ? detailsData.contacts.map(c => new ContactModel(c.type, c.value))
      : []

    return new DetailsModel(
      detailsData.cph,
      detailsData.name,
      detailsData.description,
      address,
      geolocation,
      contacts
    )
  }

  /**
   * Converts this HoldingModel instance to a MongoDB document
   * Prepares the model data for storage in MongoDB by converting nested models to plain objects
   * @returns {object} MongoDB document ready for insertion/update
   * @example
   * const holding = new HoldingModel({ details: { cph: '12/345/6789', name: 'Test Farm' } })
   * const doc = holding.toDocument()
   * // Returns: { details: { cph: '12/345/6789', name: 'Test Farm', contacts: [] }, updatedAt: Date, createdAt: Date }
   */
  toDocument () {
    const doc = {}

    if (this._id) {
      doc._id = this._id
    }

    if (this.details) {
      doc.details = { ...this.details.toObject() }
    }

    doc.updatedAt = this.updatedAt
    if (this.createdAt) {
      doc.createdAt = this.createdAt
    }

    return doc
  }

  /**
   * Creates a HoldingModel instance from a MongoDB document
   * Static factory method that reconstructs a HoldingModel from database data
   * @param {object} doc - MongoDB document from database
   * @param {string} doc._id - MongoDB ObjectId
   * @param {object} doc.details - Holding details object
   * @param {Date} [doc.createdAt] - Creation timestamp
   * @param {Date} [doc.updatedAt] - Last update timestamp
   * @returns {HoldingModel} Fully reconstructed HoldingModel instance
   * @example
   * const dbDoc = { _id: ObjectId('...'), details: { cph: '12/345/6789', name: 'Test Farm' } }
   * const holding = HoldingModel.fromDocument(dbDoc)
   */
  static fromDocument (doc) {
    const data = {
      _id: doc._id,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    }

    if (doc.details) {
      const address = doc.details.address
        ? new AddressModel(
          doc.details.address.street,
          doc.details.address.locality,
          doc.details.address.town,
          doc.details.address.county,
          doc.details.address.postcode
        )
        : undefined

      const geolocation = doc.details.geolocation
        ? new GeoLocationModel(
          doc.details.geolocation.mapReference,
          doc.details.geolocation.easting,
          doc.details.geolocation.northing
        )
        : undefined

      const contacts = Array.isArray(doc.details.contacts)
        ? doc.details.contacts.map(c => new ContactModel(c.type, c.value))
        : []

      data.details = new DetailsModel(
        doc.details.cph,
        doc.details.name,
        doc.details.description,
        address,
        geolocation,
        contacts
      )
    }

    return new HoldingModel(data)
  }

  /**
   * Converts this HoldingModel instance to OpenAPI-compliant response format
   * Returns a flattened object structure that matches the OpenAPI specification
   * @returns {object} OpenAPI-compliant holding object with timestamps
   * @example
   * const holding = new HoldingModel({ details: { cph: '12/345/6789', name: 'Test Farm' } })
   * const apiResponse = holding.toOpenApiObject()
   * // Returns: { cph: '12/345/6789', name: 'Test Farm', address: {...}, contacts: [...], createdAt: Date, updatedAt: Date }
   */
  toOpenApiObject () {
    if (!this.details) {
      return {
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
    }

    const result = {
      cph: this.details.cph,
      name: this.details.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    // Add optional fields only if they exist
    if (this.details.description) {
      result.description = this.details.description
    }

    if (this.details.address) {
      result.address = this.details.address.toObject()
    }

    if (this.details.geolocation) {
      result.geolocation = this.details.geolocation.toObject()
    }

    if (this.details.contacts && this.details.contacts.length > 0) {
      result.contacts = this.details.contacts.map(c => c.toObject())
    }

    return result
  }
}

/**
 * Model representing holding details
 * Contains the core business data for a County Parish Holding
 * @class DetailsModel
 */
class DetailsModel {
  /**
   * Creates a new DetailsModel instance
   * @param {string} cph - County Parish Holding number (format: XX/XXX/XXXX)
   * @param {string} name - Name of the holding
   * @param {string} [description] - Optional description of the holding
   * @param {AddressModel} [address] - Optional address information
   * @param {GeoLocationModel} [geolocation] - Optional geolocation data
   * @param {Array<ContactModel>} [contacts=[]] - Array of contact information
   */
  constructor (cph, name, description, address, geolocation, contacts = []) {
    this.cph = cph
    this.name = name
    this.description = description
    this.address = address
    this.geolocation = geolocation
    this.contacts = contacts
  }

  /**
   * Converts the DetailsModel to a plain JavaScript object
   * @returns {object} Plain object representation suitable for JSON serialization
   */
  toObject () {
    const obj = {
      cph: this.cph,
      name: this.name,
      description: this.description
    }

    if (this.address) {
      obj.address = this.address.toObject()
    }

    if (this.geolocation) {
      obj.geolocation = this.geolocation.toObject()
    }

    if (Array.isArray(this.contacts)) {
      obj.contacts = this.contacts.map(c => c.toObject())
    }

    return obj
  }
}

/**
 * Model representing a physical address
 * Stores UK address information following standard postal conventions
 * @class AddressModel
 */
class AddressModel {
  /**
   * Creates a new AddressModel instance
   * @param {string} [street] - Street address or building name/number
   * @param {string} [locality] - Local area or village name
   * @param {string} [town] - Town or city name
   * @param {string} [county] - County name
   * @param {string} [postcode] - UK postcode
   */
  constructor (street, locality, town, county, postcode) {
    this.street = street
    this.locality = locality
    this.town = town
    this.county = county
    this.postcode = postcode
  }

  /**
   * Converts the AddressModel to a plain JavaScript object
   * @returns {object} Plain object with address fields
   */
  toObject () {
    return {
      street: this.street,
      locality: this.locality,
      town: this.town,
      county: this.county,
      postcode: this.postcode
    }
  }
}

/**
 * Model representing geographical location data
 * Stores UK Ordnance Survey grid reference and coordinates
 * @class GeoLocationModel
 */
class GeoLocationModel {
  /**
   * Creates a new GeoLocationModel instance
   * @param {string} [mapReference] - Ordnance Survey map reference
   * @param {number} [easting] - Easting coordinate (0-999999)
   * @param {number} [northing] - Northing coordinate (0-999999)
   */
  constructor (mapReference, easting, northing) {
    this.mapReference = mapReference
    this.easting = easting
    this.northing = northing
  }

  /**
   * Converts the GeoLocationModel to a plain JavaScript object
   * @returns {object} Plain object with geolocation fields
   */
  toObject () {
    return {
      mapReference: this.mapReference,
      easting: this.easting,
      northing: this.northing
    }
  }
}

/**
 * Model representing contact information
 * Stores telephone or email contact details for a holding
 * @class ContactModel
 */
class ContactModel {
  /**
   * Creates a new ContactModel instance
   * @param {string} type - Type of contact ('telephone' or 'email')
   * @param {string} value - Contact value (phone number or email address)
   */
  constructor (type, value) {
    this.type = type
    this.value = value
  }

  /**
   * Converts the ContactModel to a plain JavaScript object
   * @returns {object} Plain object with contact fields
   */
  toObject () {
    return {
      type: this.type,
      value: this.value
    }
  }
}

export {
  HoldingModel,
  DetailsModel,
  AddressModel,
  GeoLocationModel,
  ContactModel
}
