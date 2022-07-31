import Joi from 'joi'
import { IValidator } from '@/application/protocols'

export class SignupControllerValidator implements IValidator {
  validate (input: any): Error {
    const schema = Joi.object({
      accountInput: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }).required(),

      restaurantInput: Joi.object({
        name: Joi.string().required()
      }).required()
    })

    const { error } = schema.validate(input)
    if (error) return error
  }
}