const express = require('express')
const {getConnection, setCollectionsData} = require('./middleware')
const todos = require('./router/todos.js')
const users = require('./router/users.js')

const app = express()
app.use(express.json())
const PORT = 3000

app.use('/todos',todos)
app.use('/users',users)

app.get('/', getConnection, setCollectionsData,(req, res) => {
    console.log('app.get \'/\'')
    res.send('Hello world! Welcome to my express app')
})

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})