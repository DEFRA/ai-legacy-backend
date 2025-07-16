import Joi from 'joi'

const cph = Joi.string()
  .pattern(/^[0-9]{2}\/[0-9]{3}\/[0-9]{4}$/)

export {
  cph
}
