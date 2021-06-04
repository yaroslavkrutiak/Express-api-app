const express = require('express')
const joi = require('joi')
const {insertUserItem} = require('../utils')
const {withConnection} = require('../middleware')
const router = express.Router()

router.get('/', withConnection, async (req, res) => {
    const usersCollection = await req.body.dbConnection.get().collection('users');
    const result = await usersCollection.find({}).toArray();
    res.json(result)
})

router.post('/', (req, res) => {
    const schema = joi.object().keys({
        firstName: joi.string().min(1).required(),
        lastName: joi.string().min(1).required(),
    })
    const result = schema.validate(req.body)
    if (result.error) {
        res.sendStatus(400)
    } else {
        insertUserItem(req.body)
            .then((item)=>res.json(item))
            .catch(e=>console.log(e))
    }
})

module.exports = router