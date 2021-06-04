const express = require('express')
const joi = require('joi')
const {insertTodoItem} = require('../utils')
const {withConnection} = require('../middleware')
const router = express.Router()

router.get('/', withConnection, async (req, res) => {
    const todosCollection = await req.body.dbConnection.get().collection('todos');
    const result = await todosCollection.find({}).toArray();
    res.json(result)
})

router.post('/', (req, res) => {
    const schema = joi.object().keys({
        title: joi.string().min(1).required(),
        content: joi.string().min(1).required(),
    })
    const result = schema.validate(req.body)
    if (result.error) {
        res.sendStatus(400)
    } else {
        insertTodoItem(req.body)
            .then((item)=>res.json(item))
            .catch(e=>console.log(e))
    }
})

router.get('/:id', withConnection, async (req, res) => {
/*    const todosCollection = await req.body.dbConnection.get().collection('todos');
    const query = {_id: req.params.id.toString()};
    const result = await todosCollection.find({_id:req.params.id.toString()});

    res.json(result)*/
})

module.exports = router