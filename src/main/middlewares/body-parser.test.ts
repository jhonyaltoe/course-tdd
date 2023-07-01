import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('Shoudl parse body as json', async () => {
    app.post('/test-body-parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test-body-parser')
      .send({ name: 'Jhony' })
      .expect({ name: 'Jhony' })
  })
})
