export const signUpPath = {
  post: {
    tags: ['Login'],
    summary: 'API para criar conta de um usuário e seu restaurante',
    description: 'Essa rota pode ser executada por **qualquer usuário**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signUpParams'
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
              $ref: '#/schemas/signupSuccess'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
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