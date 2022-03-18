import { Decrypter } from '../data/contracts/decrypter'
import { Encrypter } from '../data/contracts/encrypter'
import * as jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  async encrypt (values: object): Promise<string> {
    return jwt.sign(values, process.env.SECRET_KEY, {
      expiresIn: '1h'
    })
  }

  async decrypt (token: string): Promise<any> {
    return jwt.verify(token, process.env.SECRET_KEY) as any
  }
}
