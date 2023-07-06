import { type LogErrorRepository } from '../../../../data/protocols'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stackError: string): Promise<void> {
    const errorCollection = MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack: stackError,
      date: new Date()
    })
  }
}
