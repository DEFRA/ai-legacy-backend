/**
 * @swagger
 * components:
 *   schemas:
 *     County:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: County ID
 *           example: 1
 *         c_num:
 *           type: string
 *           description: County number
 *           example: "01"
 *         county:
 *           type: string
 *           description: County name
 *           example: "Fake Warwickshire"
 *         country:
 *           type: string
 *           description: Country name
 *           example: "England"
 *         office:
 *           type: string
 *           description: Office name
 *           example: "Fake Birmingham Office"
 *         region:
 *           type: string
 *           description: Region name
 *           example: "Fake Midlands"
 *       required:
 *         - county
 *         - country
 *
 *     CountyInput:
 *       type: object
 *       properties:
 *         c_num:
 *           type: string
 *           description: County number
 *           example: "01"
 *         county:
 *           type: string
 *           description: County name
 *           example: "Fake Warwickshire"
 *         country:
 *           type: string
 *           description: Country name
 *           example: "England"
 *         office:
 *           type: string
 *           description: Office name
 *           example: "Fake Birmingham Office"
 *         region:
 *           type: string
 *           description: Region name
 *           example: "Fake Midlands"
 *       required:
 *         - county
 *         - country
 *
 *     CPH:
 *       type: object
 *       properties:
 *         cph:
 *           type: string
 *           description: County Parish Holding number
 *           example: "01001001001"
 *         cph_name:
 *           type: string
 *           description: Farm name
 *           example: "Fake Hill Farm"
 *         description:
 *           type: string
 *           description: Farm description
 *           example: "Fake Dairy and Beef Enterprise"
 *         street:
 *           type: string
 *           description: Street address
 *           example: "Fake Hill Farm Lane"
 *         locality:
 *           type: string
 *           description: Locality
 *           example: "Fake Upper Village"
 *         town:
 *           type: string
 *           description: Town
 *           example: "Fake Alcester"
 *         county:
 *           type: string
 *           description: County
 *           example: "Fake Warwickshire"
 *         postcode:
 *           type: string
 *           description: Postcode
 *           example: "FB50 1AA"
 *         map_ref:
 *           type: string
 *           description: Map reference
 *           example: "SP123456"
 *         easting:
 *           type: string
 *           description: Easting coordinate
 *           example: "412345"
 *         northing:
 *           type: string
 *           description: Northing coordinate
 *           example: "267890"
 *         landline:
 *           type: string
 *           description: Landline phone number
 *           example: "01789 123456"
 *         mobile:
 *           type: string
 *           description: Mobile phone number
 *           example: "07700 900123"
 *         language:
 *           type: string
 *           description: Preferred language
 *           example: "English"
 *         pgp_study:
 *           type: boolean
 *           description: PGP study participation
 *           example: false
 *       required:
 *         - cph
 *         - cph_name
 *
 *     CPHInput:
 *       type: object
 *       properties:
 *         cph:
 *           type: string
 *           description: County Parish Holding number
 *           example: "01001001001"
 *         cph_name:
 *           type: string
 *           description: Farm name
 *           example: "Fake Hill Farm"
 *         description:
 *           type: string
 *           description: Farm description
 *           example: "Fake Dairy and Beef Enterprise"
 *         street:
 *           type: string
 *           description: Street address
 *           example: "Fake Hill Farm Lane"
 *         locality:
 *           type: string
 *           description: Locality
 *           example: "Fake Upper Village"
 *         town:
 *           type: string
 *           description: Town
 *           example: "Fake Alcester"
 *         county:
 *           type: string
 *           description: County
 *           example: "Fake Warwickshire"
 *         postcode:
 *           type: string
 *           description: Postcode
 *           example: "FB50 1AA"
 *         map_ref:
 *           type: string
 *           description: Map reference
 *           example: "SP123456"
 *         easting:
 *           type: string
 *           description: Easting coordinate
 *           example: "412345"
 *         northing:
 *           type: string
 *           description: Northing coordinate
 *           example: "267890"
 *         landline:
 *           type: string
 *           description: Landline phone number
 *           example: "01789 123456"
 *         mobile:
 *           type: string
 *           description: Mobile phone number
 *           example: "07700 900123"
 *         language:
 *           type: string
 *           description: Preferred language
 *           example: "English"
 *         pgp_study:
 *           type: boolean
 *           description: PGP study participation
 *           example: false
 *       required:
 *         - cph
 *         - cph_name
 */

export const countySchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    c_num: { type: 'string' },
    county: { type: 'string' },
    country: { type: 'string' },
    office: { type: 'string' },
    region: { type: 'string' }
  },
  required: ['county', 'country']
}

export const cphSchema = {
  type: 'object',
  properties: {
    cph: { type: 'string' },
    cph_name: { type: 'string' },
    description: { type: 'string' },
    street: { type: 'string' },
    locality: { type: 'string' },
    town: { type: 'string' },
    county: { type: 'string' },
    postcode: { type: 'string' },
    map_ref: { type: 'string' },
    easting: { type: 'string' },
    northing: { type: 'string' },
    landline: { type: 'string' },
    mobile: { type: 'string' },
    language: { type: 'string' },
    pgp_study: { type: 'boolean' }
  },
  required: ['cph', 'cph_name']
}
