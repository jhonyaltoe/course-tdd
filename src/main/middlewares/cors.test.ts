import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    app.post('/test-cors', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/test-cors')
      .expect('acces-control-allow-origin', '*')
      .expect('acces-control-allow-methods', '*')
      .expect('acces-control-allow-headers', '*')
  })
})
