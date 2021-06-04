'use strict'

const env = process.env.NODE_ENV || 'local'
const _config = require('./_config.json')[env]

const MongoClient = require('mongodb').MongoClient

const state = {
	db: null,
	client: null
}

module.exports.connect = () => {
	return new Promise((resolve, reject) => {

		if (state.db) return resolve()
		const {database, dbConfig, dbName} = _config

		MongoClient.connect(database, dbConfig, (err, client) => {
			if (err) return reject(err)

			console.log('Connection established')
			state.db = client.db(dbName)
			state.client = client
			return resolve()
		})
	})

}

module.exports.get = () => {
	return state.db
}

module.exports.close = () => {
	if (state.db) {
		state.client.close((err, result) => {
			state.db = null
			state.mode = null
		})
	}
}