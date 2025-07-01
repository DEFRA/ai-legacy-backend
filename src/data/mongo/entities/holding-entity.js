/**
 * MongoDB Entity classes for Holding collection
 * These classes represent the actual MongoDB document structure
 * Based on the MongoDB ERD specification
 */

/**
 * Address entity for MongoDB storage
 */
class AddressEntity {
  constructor (street, locality, town, county, postcode) {
    this.street = street
    this.locality = locality
    this.town = town
    this.county = county
    this.postcode = postcode
  }

  static fromDocument (doc) {
    if (!doc) return null
    
    return new AddressEntity(
      doc.street,
      doc.locality,
      doc.town,
      doc.county,
      doc.postcode
    )
  }

  toDocument () {
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
 * Contact entity for MongoDB storage
 */
class ContactEntity {
  constructor (type, value) {
    this.type = type // "landline" or "mobile"
    this.value = value
  }

  static fromDocument (doc) {
    if (!doc) return null
    
    return new ContactEntity(
      doc.type,
      doc.value
    )
  }

  toDocument () {
    return {
      type: this.type,
      value: this.value
    }
  }
}

/**
 * Geolocation entity for MongoDB storage
 */
class GeolocationEntity {
  constructor (mapRef, easting, northing) {
    this.mapRef = mapRef
    this.easting = easting
    this.northing = northing
  }

  static fromDocument (doc) {
    if (!doc) return null
    
    return new GeolocationEntity(
      doc.mapRef,
      doc.easting,
      doc.northing
    )
  }

  toDocument () {
    return {
      mapRef: this.mapRef,
      easting: this.easting,
      northing: this.northing
    }
  }
}

/**
 * Details entity for MongoDB storage
 */
class DetailsEntity {
  constructor (cph, name, description, address, geolocation, contacts = []) {
    this.cph = cph
    this.name = name
    this.description = description
    this.address = address
    this.geolocation = geolocation
    this.contacts = contacts
  }

  static fromDocument (doc) {
    if (!doc) return null
    
    return new DetailsEntity(
      doc.cph,
      doc.name,
      doc.description,
      AddressEntity.fromDocument(doc.address),
      GeolocationEntity.fromDocument(doc.geolocation),
      Array.isArray(doc.contacts) ? doc.contacts.map(c => ContactEntity.fromDocument(c)) : []
    )
  }

  toDocument () {
    return {
      cph: this.cph,
      name: this.name,
      description: this.description,
      address: this.address ? this.address.toDocument() : null,
      geolocation: this.geolocation ? this.geolocation.toDocument() : null,
      contacts: this.contacts.map(c => c.toDocument())
    }
  }
}

/**
 * Main Holding entity for MongoDB storage
 */
class HoldingEntity {
  constructor (id, details, incidents = []) {
    this.id = id
    // Ensure details is a DetailsEntity instance
    this.details = details instanceof DetailsEntity ? details : this._createDetailsEntity(details)
    this.incidents = incidents
  }

  /**
   * Helper method to create DetailsEntity from raw data
   * @param {Object} detailsData - Raw details data
   * @returns {DetailsEntity|null} DetailsEntity instance or null
   */
  _createDetailsEntity (detailsData) {
    if (!detailsData) return null

    // Create AddressEntity if address data exists
    const addressEntity = detailsData.address ? new AddressEntity(
      detailsData.address.street,
      detailsData.address.locality,
      detailsData.address.town,
      detailsData.address.county,
      detailsData.address.postcode
    ) : null

    // Create GeolocationEntity if geolocation data exists
    const geolocationEntity = detailsData.geolocation ? new GeolocationEntity(
      detailsData.geolocation.mapRef,
      detailsData.geolocation.easting,
      detailsData.geolocation.northing
    ) : null

    // Create ContactEntity instances for contacts array
    const contactEntities = Array.isArray(detailsData.contacts) 
      ? detailsData.contacts.map(contact => new ContactEntity(contact.type, contact.value))
      : []

    return new DetailsEntity(
      detailsData.cph,
      detailsData.name,
      detailsData.description,
      addressEntity,
      geolocationEntity,
      contactEntities
    )
  }

  static fromDocument (doc) {
    if (!doc) return null
    
    return new HoldingEntity(
      doc._id ? doc._id.toString() : null,
      DetailsEntity.fromDocument(doc.details),
      Array.isArray(doc.incidents) ? doc.incidents.map(id => id.toString()) : []
    )
  }

  toDocument () {
    const document = {
      details: this.details ? this.details.toDocument() : null
    }

    // Only add incidents if they exist
    if (this.incidents && this.incidents.length > 0) {
      document.incidents = this.incidents
    }

    return document
  }
}

export {
  HoldingEntity,
  DetailsEntity,
  AddressEntity,
  ContactEntity,
  GeolocationEntity
}
