export class UserNotFound extends Error {
  constructor() {
    super("Usuario não foi encontrado.");
  }
}