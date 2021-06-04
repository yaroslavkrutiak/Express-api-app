const express = require('express')
const {getUserCollection} = require('../middleware')
const router = express.Router()

router.get('/', getUserCollection, (req, res) => {
    console.log('/user entered')
    res.json(req.body.userColl)
})

module.exports=router