import { Holding, Details, Address, GeoLocation, Contact } from '../../../../domain/holdings/holdings.js'

/**
 * Converts a request payload into a Holding entity
 * @param {object} payload - The request payload
 * @returns {Holding}
 */
function holdingRequestDto(payload) {
  const address = payload.address
    ? new Address(
        payload.address.street,
        payload.address.locality,
        payload.address.town,
        payload.address.county,
        payload.address.postcode
      )
    : undefined

  const geolocation = payload.geolocation
    ? new GeoLocation(
        payload.geolocation.mapReference,
        payload.geolocation.easting,
        payload.geolocation.northing
      )
    : undefined

  const contacts = Array.isArray(payload.contacts)
    ? payload.contacts.map(
        c => new Contact(c.type, c.value)
      )
    : []

  const details = new Details(
    payload.cph,
    payload.name,
    payload.description,
    address,
    geolocation,
    contacts
  )

  return new Holding(details)
}

export { holdingRequestDto }
