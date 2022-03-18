export class InvalidParamError extends Error {
  constructor (param: string) {
    super(`${param} é um campo inválido!`)
  }
}
