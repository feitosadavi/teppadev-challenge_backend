export const updateAccountPath = {
  post: {
    tags: ['Conta'],
    summary: 'API para alterar as informações da conta de um usuário',
    description: 'Essa rota pode ser executada por **usuário autenticados**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updateAccountParams'
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
              $ref: '#/schemas/loginSuccess'
            }
          }
        }
      },
      400: {
        $ref: '#/components/login400'
      },
      // 403: {
      //   $ref: '#/components/forbidden'
      // },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}