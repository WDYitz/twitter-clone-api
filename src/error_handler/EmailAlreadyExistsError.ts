export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('E-mail já esta sendo utilizado.')
  }
}