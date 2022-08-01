export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'API para logar um usuário',
    description: 'Essa rota pode ser executada por **qualquer usuário**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginParams'
          }
        }
      }
    },
    responses: {
      200: {
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