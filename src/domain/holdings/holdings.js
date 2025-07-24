class Holding {
  constructor (details) {
    this.details = details
  }

  get id () {
    return this._id
  }

  set id (id) {
    this._id = id
  }

  setDetails(details) {
    this.details = details
  }

  /**
   * Converts this Holding instance to a MongoDB document
   * @returns {object}
   */
  toDocument() {
    const doc = {}

    doc._id = this._id

    if (this.details) {
      doc.details = { ...this.details }
      if (this.details.address) {
        doc.details.address = { ...this.details.address }
      }
      if (this.details.geolocation) {
        doc.details.geolocation = { ...this.details.geolocation }
      }
      if (Array.isArray(this.details.contacts)) {
        doc.details.contacts = this.details.contacts.map(c => ({ ...c }))
      }
    }

    return doc
  }

  /**
   * Creates a Holding instance from a MongoDB document
   * @param {object} doc
   * @returns {Holding}
   */
  static fromDocument(doc) {
    if (doc.details) {
      const address = doc.details.address
        ? new Address(
            doc.details.address.street,
            doc.details.address.locality,
            doc.details.address.town,
            doc.details.address.county,
            doc.details.address.postcode
          )
        : undefined

      const geolocation = doc.details.geolocation
        ? new GeoLocation(
            doc.details.geolocation.mapReference,
            doc.details.geolocation.latitude,
            doc.details.geolocation.longitude
          )
        : undefined

      const contacts = Array.isArray(doc.details.contacts)
        ? doc.details.contacts.map(c => new Contact(c.type, c.value))
        : []

      const details = new Details(
        doc.details.cph,
        doc.details.name,
        doc.details.description,
        address,
        geolocation,
        contacts
      )
      return new Holding(details)
    }

    return new Holding()
  }
}

class Details {
  constructor(cph, name, description, address, geolocation, contacts = []) {
    this.cph = cph
    this.name = name
    this.description = description
    this.address = address
    this.geolocation = geolocation
    this.contacts = contacts
  }

  setAddress(address) {
    this.address = {
      ...this.address,
      ...address
    }
  }

  setGeolocation(geolocation) {
    this.geolocation = {
      ...this.geolocation,
      ...geolocation
    }
  }

  setContacts(contacts) {
    this.contacts = contacts
  }

  addContact(contact) {
    this.contacts.push(contact)
  }

  updateContact(index, contact) {
    if (this.contacts[index]) {
      this.contacts[index] = contact
    }
  }

  removeContact(index) {
    if (this.contacts[index]) {
      this.contacts.splice(index, 1)
    }
  }
}

class Address {
  constructor(street, locality, town, county, postcode) {
    this.street = street
    this.locality = locality
    this.town = town
    this.county = county
    this.postcode = postcode
  }

  set(street, locality, town, county, postcode) {
    this.street = street
    this.locality = locality
    this.town = town
    this.county = county
    this.postcode = postcode
  }
}

class GeoLocation {
  constructor(mapReference, latitude, longitude) {
    this.mapReference = mapReference
    this.latitude = latitude
    this.longitude = longitude
  }

  set(mapReference, latitude, longitude) {
    this.mapReference = mapReference
    this.latitude = latitude
    this.longitude = longitude
  }
}

class Contact {
  constructor(type, value) {
    this.type = type
    this.value = value
  }

  set(type, value) {
    this.type = type
    this.value = value
  }
}

export {
  Holding,
  Details,
  Address,
  GeoLocation,
  Contact
}
