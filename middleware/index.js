const connection = require('../config/connection');

const withConnection = (req, res, next) => {
    req.body.dbConnection = connection
    next()
}

module.exports = ({
    withConnection
})