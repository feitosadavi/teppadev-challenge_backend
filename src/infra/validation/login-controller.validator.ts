import Joi from 'joi'
import { IValidator } from '@/application/protocols'

export class LoginControllerValidator implements IValidator {
  validate (input: any): Error {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })

    const { error } = schema.validate(input)
    if (error) return error
  }
}