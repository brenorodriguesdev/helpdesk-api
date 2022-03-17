import { SignUpModel } from '../models/sign-up'

export interface SignUpUseCase {
  sign: (data: SignUpModel) => Promise<void>
}
