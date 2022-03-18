import { Hasher } from '../data/contracts/hasher'
import { HasherComparer } from '../data/contracts/hasher-comparer'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HasherComparer {
  async hash (text: string): Promise<string> {
    return await bcrypt.hash(text, 8)
  }

  async compare (text: string, hashText: string): Promise<boolean> {
    return await bcrypt.compare(text, hashText)
  }
}
