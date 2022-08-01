import Joi from 'joi'
import { IValidator } from '@/application/protocols'

export class UpdateAccountControllerValidator implements IValidator {
  validate (input: any): Error {
    const schema = Joi.object({
      data: Joi.object({
        email: Joi.string().email().optional(),
      }).required()
    })

    const { error } = schema.validate(input)
    if (error) return error
  }
}