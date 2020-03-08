const bodyParser = require('body-parser');
const morganBody = require('morgan-body');

module.exports = (app) => {
    app.use(bodyParser.json({limit: '50mb', extended: true}));
    morganBody(app);
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  };
