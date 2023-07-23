import { type HashCompare } from '../../data/protocols/cryptografy/hash-compare'
import { type Hasher } from '../../data/protocols/cryptografy/hasher'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashCompare {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    await bcrypt.compare(value, hash)
    return true
  }
}
