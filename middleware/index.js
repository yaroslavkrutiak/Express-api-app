const connection = require('../config/connection');
const {setUserData, setTodoData} = require('../utils')

let userCollection, todoCollection;

const getConnection = async (req, res, next) => {
    await connection.connect().catch(e => console.log(`connect function error ${e}`));
    //await connection.get().createCollection('users');
    await connection.get().dropCollection('users');
    userCollection = connection.get().collection('users');
    //await connection.get().createCollection('todos');
    await connection.get().dropCollection('todos');
    todoCollection = connection.get().collection('todos');
    await userCollection.insertOne(setUserData())
    next()
}

const setCollectionsData = async (req, res, next) => {
    for (let i = 0; i < 10; i++) {
        await userCollection.insertOne(setUserData());
        await todoCollection.insertOne(setTodoData());
    }
    next()
}

const getUserCollection = async (req, res, next) => {
    req.body.userColl = await userCollection.find({}).toArray()
    next()
}

const getTodoCollection = async (req, res, next) => {
    req.body.todoColl = await todoCollection.find({}).toArray()
    next()
}

module.exports = ({
    getConnection,
    setCollectionsData,
    getUserCollection,
    getTodoCollection
})