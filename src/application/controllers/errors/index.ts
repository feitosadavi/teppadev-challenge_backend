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

export class IncorrectPasswordError extends Error {
  constructor() {
    super('Senha incorreta')
    this.name = 'IncorrectPasswordError'
  }
}

export class AccessDeniedError extends Error {
  constructor() {
    super('Acesso negado!')
    this.name = 'AccessDeniedError'
  }
}

export class RestaurantDoesntBelongsToAccountError extends Error {
  constructor() {
    super('Este restaurante não pertence à conta logada')
    this.name = 'RestaurantDoesntBelongsToAccountError'
  }
}

