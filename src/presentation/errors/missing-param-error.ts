export class MissingParamError extends Error {
  constructor (param: string) {
    super(`${param} é um campo obrigatório!`)
  }
}
