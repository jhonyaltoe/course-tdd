import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeEach(async () => {
    const MONGO_URL = process.env.MONGO_URL as string
    await sut.connect(MONGO_URL)
  })

  afterEach(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = sut.getCollection('account')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = sut.getCollection('account')
    expect(accountCollection).toBeTruthy()
  })
})
