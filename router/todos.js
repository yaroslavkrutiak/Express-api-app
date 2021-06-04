const express = require('express')
const {getTodoCollection} = require('../middleware')
const router = express.Router()

router.get('/', getTodoCollection, (req, res) => {
    console.log('/todo entered')
    res.json(req.body.todoColl)
})

module.exports=router