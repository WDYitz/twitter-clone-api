export class UserTweetsCouldNotBeFound extends Error {
  constructor() {
    super("Tweets do usuário não puderam ser encontrados");
  }
}