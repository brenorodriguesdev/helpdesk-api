export interface VerifyLoginUseCase {
  verify: (token: string) => Promise<object | Error>
}
