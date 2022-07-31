export class ServerError extends Error {
  constructor(stack: string) {
    super('Internal server error')
    this.name = 'ServerError'
    this.stack = stack
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

export class EmailInUseError extends Error {
  constructor() {
    super('O email recebido já está em uso!')
    this.name = 'EmailInUseError'
  }
}

export class EmailNotFound extends Error {
  constructor() {
    super('Não existe uma conta com o email inserido')
    this.name = 'EmailInUseError'
  }
}
