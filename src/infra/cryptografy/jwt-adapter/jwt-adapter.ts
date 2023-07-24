import { type Encrypter } from '../../../data/protocols/cryptografy/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (
    private readonly secret: string
  ) {}

  async encrypt (value: string): Promise<string> {
    jwt.sign({ id: value }, this.secret)
    return 'any_value_to_pass'
  }
}
