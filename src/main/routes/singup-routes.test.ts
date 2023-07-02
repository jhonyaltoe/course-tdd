import request from 'supertest'
import app from '../config/app'

describe('Singup Routes', () => {
  test('Should return non success', async () => {
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
