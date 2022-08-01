export const updateAccountParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },

  },
  example: {
    email: 'other@mail.com',
  },
  optional: ['email']
}