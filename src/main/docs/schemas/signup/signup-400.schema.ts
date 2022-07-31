export const signup400Schema = {
  type: 'object',
  properties: {
    error: {
      type: 'string'
    }
  },
  example: {
    error: 'Este email já está em uso'
  },
  required: ['error']
}