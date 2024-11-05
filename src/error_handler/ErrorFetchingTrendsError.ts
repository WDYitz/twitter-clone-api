export class ErrorFetchingTrendsError extends Error {
  constructor() {
    super("Erro ao buscar as trends.");
  }
}