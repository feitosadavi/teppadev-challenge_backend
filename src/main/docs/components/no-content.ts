export const noContent = {
  description: 'Sem conteúdo',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'string'
          }
        },
        example: {
          error: 'Internal Server Error'
        },
        required: ['error']
      }
    }
  }
}