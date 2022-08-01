export const login400Schema = {
  type: 'object',
  properties: {
    error: {
      type: 'string'
    }
  },
  example: {
    error: 'Email não encontrado'
  },
  required: ['error']
}