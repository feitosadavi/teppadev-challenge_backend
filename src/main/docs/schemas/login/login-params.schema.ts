export const loginParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  example: {
    email: 'email@mail.com',
    password: '123'
  },
  required: ['email', 'password']
}