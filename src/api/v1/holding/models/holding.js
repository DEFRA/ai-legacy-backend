/**
 * Address response model for API responses
 * Represents address information in API responses
 */
class Address {
  constructor (street, locality, town, county, postcode) {
    this.street = street
    this.locality = locality
    this.town = town
    this.county = county
    this.postcode = postcode
  }

  static fromEntity (entity) {
    if (!entity) return null
    
    return new Address(
      entity.street,
      entity.locality,
      entity.town,
      entity.county,
      entity.postcode
    )
  }

  /**
   * Create a JSON representation for API responses
   */
  toJSON () {
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
 * Contact response model for API responses
 * Represents contact information in API responses
 */
class Contact {
  constructor (type, value) {
    this.type = type // "landline" or "mobile"
    this.value = value
  }

  static fromEntity (entity) {
    if (!entity) return null
    
    return new Contact(
      entity.type,
      entity.value
    )
  }

  /**
   * Create a JSON representation for API responses
   */
  toJSON () {
    return {
      type: this.type,
      value: this.value
    }
  }
}

/**
 * Geolocation response model for API responses
 * Represents geographic coordinates in API responses
 */
class Geolocation {
  constructor (mapRef, easting, northing) {
    this.mapRef = mapRef
    this.easting = easting
    this.northing = northing
  }

  static fromEntity (entity) {
    if (!entity) return null
    
    return new Geolocation(
      entity.mapRef,
      entity.easting,
      entity.northing
    )
  }

  /**
   * Create a JSON representation for API responses
   */
  toJSON () {
    return {
      mapRef: this.mapRef,
      easting: this.easting,
      northing: this.northing
    }
  }
}

/**
 * Details response model for API responses
 * Represents holding details in API responses
 */
class Details {
  constructor (cph, name, description, address, geolocation, contacts = []) {
    this.cph = cph
    this.name = name
    this.description = description
    this.address = address
    this.geolocation = geolocation
    this.contacts = contacts
  }

  static fromEntity (entity) {
    if (!entity) return null
    
    return new Details(
      entity.cph,
      entity.name,
      entity.description,
      Address.fromEntity(entity.address),
      Geolocation.fromEntity(entity.geolocation),
      Array.isArray(entity.contacts) ? entity.contacts.map(c => Contact.fromEntity(c)) : []
    )
  }

  /**
   * Create a JSON representation for API responses
   */
  toJSON () {
    return {
      cph: this.cph,
      name: this.name,
      description: this.description,
      address: this.address ? this.address.toJSON() : null,
      geolocation: this.geolocation ? this.geolocation.toJSON() : null,
      contacts: this.contacts.map(c => c.toJSON())
    }
  }
}

/**
 * Holding response model for API responses
 * This is a pure API response model that represents holding data
 * as it should be returned to API clients
 */
class Holding {
  constructor (id, details, incidents = []) {
    this.id = id
    this.details = details
    this.incidents = incidents
  }

  /**
   * Create Holding response model from MongoDB entity
   * @param {Object} entity - MongoDB document or entity
   * @returns {Holding|null} Holding response model
   */
  static fromEntity (entity) {
    if (!entity) return null
    
    return new Holding(
      entity._id ? entity._id.toString() : entity.id,
      Details.fromEntity(entity.details),
      Array.isArray(entity.incidents) ? entity.incidents.map(id => id.toString()) : []
    )
  }

  /**
   * Create a JSON representation for API responses
   */
  toJSON () {
    return {
      id: this.id,
      details: this.details ? this.details.toJSON() : null,
      incidents: this.incidents
    }
  }

  /**
   * Create a summary view of the holding for list displays
   * @returns {Object} Simplified holding object for API responses
   */
  toSummary () {
    return {
      id: this.id,
      cph: this.details?.cph,
      name: this.details?.name,
      description: this.details?.description,
      address: {
        town: this.details?.address?.town,
        county: this.details?.address?.county,
        postcode: this.details?.address?.postcode
      },
      incidentCount: this.incidents?.length || 0
    }
  }
}

export {
  Holding,
  Details,
  Address,
  Contact,
  Geolocation
}
