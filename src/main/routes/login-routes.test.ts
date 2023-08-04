import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '@infra/db/mongodb/helpers/mongo-helper'

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(globalThis.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      app.post('/test-cors', (req, res) => {
        res.send()
      })
      await request(app)
        .post('/test-cors')
        .send({
          name: 'Jhony',
          email: 'jhonymikealtoe@hotmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })
})
