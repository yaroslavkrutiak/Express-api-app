const express = require('express')
const {setupDummyData} = require('./utils')

const todos = require('./router/todos.js')
const users = require('./router/users.js')

const app = express()
app.use(express.json())
const PORT = 3000

setupDummyData().then(() => console.log('Succesfully filled with dummy data')).catch(e => console.log(e))

app.use('/todos', todos)
app.use('/users', users)

app.get('/', (req, res) => {
    res.send('Hello world! Welcome to my express app')
})


app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})