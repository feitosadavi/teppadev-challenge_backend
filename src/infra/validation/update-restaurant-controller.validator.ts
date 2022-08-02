import Joi from 'joi'
import { IValidator } from '@/application/protocols'

export class UpdateRestaurantControllerValidator implements IValidator {
  validate (input: any): Error {
    const schema = Joi.object({
      data: Joi.object({
        name: Joi.string().optional(),
      }).required()
    })

    const { error } = schema.validate(input)
    if (error) return error
  }
}