export class TweetDoesNotExistError extends Error {
  constructor() {
    super('Esse Tweet não foi encontrado.')
  }
}