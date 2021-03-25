const request = require ('supertest')//axios especial apra hacer test
const app = require('../../server')
const dbHandler = require('../db-handler')
const userServices = require('../../services/UserServices')

const agent = request.agent(app);//aqui esta simulando usando mi servidor

beforeAll(async ()=> await dbHandler.connect());
// antes de los tests conecta esto

afterEach(async ()=> await dbHandler.clearDataBase());
//despyes de cada test ejecuta esto

afterAll(async ()=> await dbHandler.closeDataBase())
// despues de todos los test ejecuta esto

describe('User controller', ()=>{
    it('Esto debe de devolver usuarios',async()=>{
        const mockUser1 ={
            name:"test user",
            email: "testuser@gmail.com",
            password:"test"
        }
        const mockUser2={
            name:"test user",
            email: "testuser@gmail.com",
            password:"test"
        }
        await userServices.createUser(mockUser1)
        await userServices.createUser(mockUser2)
//donde ir a hacer las peticiob
        const response = await agent.get('/users').expect(200)
        console.log(response.body)
        expect(response.body).toHaveLength(2)
        expect(response.body[0]._id).toBeTruthy()
    

    })
    it('Esto debe crear un usuario', async()=>{
        const response = await agent.post('/users')
            .field('email', 'testuser@gmail.com')
            .field('name', 'test user')
            .field('password', 'testpassword')
            .expect(201)
        expect(response.body.email).toBe('testuser@gmail.com')
        expect(response.body._id).toBeTruthy()

    })

    it('Esto no deberia de crear un usuario', async()=>{
        const response = await agent.post('/users')
            .field('name', 'test user')
            .field('password', 'testpassword')
            .expect(400)
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveProperty('email')
    })
})