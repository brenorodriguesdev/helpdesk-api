export interface VerifyLoginUseCase {
  verify: (token: string) => Promise<any | Error>
}
