export const signUpParamsSchema = {
  type: 'object',
  properties: {
    accountInput: {
      type: 'object',
      email: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    },
    restaurantInput: {
      type: 'object',
      name: {
        type: 'string'
      },
    }
  },
  example: {
    accountInput: {
      email: 'email@mail.com',
      password: '123'
    },
    restaurantInput: {
      name: 'Palazzos Pizaria'
    }
  },
  required: ['accountInput.email', 'restaurantInput']
}