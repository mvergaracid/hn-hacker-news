const axios = require('axios')
const dotenv = require('dotenv')
const request = require('supertest')
const app = require('../app')

jest.mock('axios')

describe('/', () => {
    beforeEach( async () => {
        dotenv.config()   
    })

    afterEach(async () => {
        console.log('closing app')
        await app.close()
    })

    it('1.0) should get dummy response', async () => {
        const res = await request(app)
            .get('/')
        expect(res.statusCode).toEqual(200)
    })

})
