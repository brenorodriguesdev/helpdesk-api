import { SignInModel } from '../models/sign-in'

export interface SignInUseCase {
  sign: (data: SignInModel) => Promise<string | Error>
}
