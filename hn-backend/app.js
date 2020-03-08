const dotenv = require('dotenv');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const endpoints = require('./endpoints');
const middleware = require('./middleware');
const mongo = require('./mixing/db')

dotenv.config();

const port = process.env.NODE_PORT || 3000;
const startedAt = new Date();

middleware(app);
endpoints(app);

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/', (req, res) => {
  const currentDateTime = new Date();
  res.status(200).json({
    started: startedAt.toISOString(),
    uptime: currentDateTime.getTime() - startedAt.getTime(),
  });
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(port, async (err) => {
    if (err) {
      console.error('Unable to listen for connections', err);
      process.exit(1);
    }
    console.log('started at', startedAt.toISOString());
    console.log('running on port', port);

    try {
      mongo.setJob()
      await mongo.updatedB()
    } catch (error) {
      console.log('error:', JSON.stringify(error))
    }
  });
}

module.exports = server;