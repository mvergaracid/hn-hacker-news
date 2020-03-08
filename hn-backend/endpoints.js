const mongo = require('./endpoints/mongo')

module.exports = (app) => {
    mongo(app)
}