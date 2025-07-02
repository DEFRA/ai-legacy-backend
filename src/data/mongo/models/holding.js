class HoldingModel {
  constructor (data = {}) {
    // Use _id as the primary identifier field
    this._id = data._id || data.id || null

    if (data.details) {
      this.details = new DetailsModel(data.details)
    }

    this.incidents = data.incidents || []
    this.updatedAt = new Date()

    if (!this._id) {
      this.createdAt = data.createdAt || new Date()
    }
  }

  get id () {
    return this._id
  }

  set id (value) {
    this._id = value
  }

  static fromDocument (doc) {
    return new HoldingModel(doc)
  }
}

class DetailsModel {
  constructor (data = {}) {
    this.cph = data.cph
    this.name = data.name
    this.description = data.description

    if (data.address) {
      this.address = new AddressModel(data.address)
    }

    this.contacts = (data.contacts || []).map(contact => new ContactModel(contact))

    if (data.geolocation) {
      this.geolocation = new GeolocationModel(data.geolocation)
    }
  }

  static fromDocument (doc) {
    return new DetailsModel(doc)
  }
}

class AddressModel {
  constructor (data = {}) {
    this.street = data.street
    this.locality = data.locality
    this.town = data.town
    this.county = data.county
    this.postcode = data.postcode
  }

  static fromDocument (doc) {
    return new AddressModel(doc)
  }
}

class ContactModel {
  constructor (data = {}) {
    this.type = data.type
    this.value = data.value
  }

  static fromDocument (doc) {
    return new ContactModel(doc)
  }
}

class GeolocationModel {
  constructor (data = {}) {
    this.mapReference = data.mapReference
    this.easting = data.easting
    this.northing = data.northing
  }

  static fromDocument (doc) {
    return new GeolocationModel(doc)
  }
}

export {
  HoldingModel,
  DetailsModel,
  AddressModel,
  ContactModel,
  GeolocationModel
}
