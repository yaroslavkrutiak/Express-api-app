const faker = require('faker');
const connection = require('./config/connection')

const generateUser = ({
                          firstName = faker.name.firstName(),
                          lastName = faker.name.lastName(),
                          id = faker.datatype.uuid(),
                          createdAt = new Date()
                      } = {}) => ({
    firstName,
    lastName,
    id,
    createdAt
});

const generateTodo = ({
                          title = faker.lorem.sentence(3),
                          content = faker.lorem.sentence(10),
                          id = faker.datatype.uuid(),
                          createdAt = new Date()
                      } = {}) => ({
    title,
    content,
    id,
    createdAt
});

const fillObject = (object)=>{
    object.id = faker.datatype.uuid()
    object.createdAt = new Date()
    return object
}

const setupDummyData = async () => {
    await connection.connect().catch(e => console.log(`connect function error ${e}`));
    const userCollection = await connection.get().collection('users')
    const todoCollection = await connection.get().collection('todos')
    for (let i = 0; i < 10; i++) {
        await userCollection.insertOne(generateUser());
        await todoCollection.insertOne(generateTodo());
    }
}

const insertTodoItem = async (object) => {
    const collection = await connection.get().collection('todos');
    await collection.insertOne(fillObject(object));
    return object
}

const insertUserItem = async (object) => {
    const collection = await connection.get().collection('users');
    await collection.insertOne(fillObject(object));
    return object
}


module.exports = {
    insertUserItem,
    insertTodoItem,
    setupDummyData
};