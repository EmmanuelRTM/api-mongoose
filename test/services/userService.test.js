const mongoose = require('mongoose');
const dbHandler = require('../db-handler');
const userService = require('../../services/UserServices')
const userModel = require('../../models/Users');

beforeAll(async ()=> await dbHandler.connect());
// antes de los tests conecta esto

afterEach(async ()=> await dbHandler.clearDataBase());
//despyes de cada test ejecuta esto

afterAll(async ()=> await dbHandler.closeDataBase())
// despues de todos los test ejecuta esto

describe ('User services', ()=>{
    //Quiero probar todo user services
    it('Debo poder crear un usuario', async ()=>{
        const mockUser ={
            name:"test user",
            email: "testuser@gmail.com",
            password:"test"
        }
        
        const userDb = await userService.createUser(mockUser)

        expect(mockUser.email).toBe(userDb.email)
        expect(userDb).toHaveProperty('_id');

        //Vamoa probar 
       // expect(true).toBe(true);

    })

    it("Esto no debe generar un usuario", async()=>{
        expect(async()=> await userService.createUser()).rejects.toThrow()
        
    })
    it("Esto debe devolver el arreglo de usuarios", async()=>{
        const mockUser1 ={
            name:"test user",
            email: "testuser2@gmail.com",
            password:"test"
        }
        const mockUser2={
            name:"test user",
            email: "testuser3@gmail.com",
            password:"test"
        }
        await userService.createUser(mockUser1);
        await userService.createUser(mockUser2); 

        const users= await userService.findUsers()//esto me devolvera un arreglo

        //expect(users).toHaveLength(2)
        expect(users[0]).toHaveProperty('_id')
        
    })
})