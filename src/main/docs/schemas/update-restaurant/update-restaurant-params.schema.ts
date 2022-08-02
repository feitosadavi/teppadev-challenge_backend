export const updateRestaurantParamsSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      name: {
        type: 'string'
      }
    },
  },
  example: {
    data: {
      name: 'Tonny Burguers'
    },
  },
  required: ['data']
}