export const updateRestaurantPath = {
  post: {
    tags: ['Conta'],
    summary: 'API para alterar as informações do restaurante de um usuário',
    description: 'Essa rota pode ser executada por **usuário autenticados, sendo ele dono do restaurante**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updateRestaurantParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/noContent'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}