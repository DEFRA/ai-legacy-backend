class HoldingModel {
  constructor (data = {}) {
    this._id = data._id || data.id || null
    this.details = data.details ? this.createDetailsModel(data.details) : null
    this.updatedAt = new Date()

    if (!this._id) {
      this.createdAt = data.createdAt || new Date()
    }
  }

  /**
   * Helper method to create DetailsModel from data
   * @param {object} detailsData
   * @returns {DetailsModel}
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
   * @returns {object}
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
   * @param {object} doc
   * @returns {HoldingModel}
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
}

class DetailsModel {
  constructor (cph, name, description, address, geolocation, contacts = []) {
    this.cph = cph
    this.name = name
    this.description = description
    this.address = address
    this.geolocation = geolocation
    this.contacts = contacts
  }

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

class AddressModel {
  constructor (street, locality, town, county, postcode) {
    this.street = street
    this.locality = locality
    this.town = town
    this.county = county
    this.postcode = postcode
  }

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

class GeoLocationModel {
  constructor (mapReference, easting, northing) {
    this.mapReference = mapReference
    this.easting = easting
    this.northing = northing
  }

  toObject () {
    return {
      mapReference: this.mapReference,
      easting: this.easting,
      northing: this.northing
    }
  }
}

class ContactModel {
  constructor (type, value) {
    this.type = type
    this.value = value
  }

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
