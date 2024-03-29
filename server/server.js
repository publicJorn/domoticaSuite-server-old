const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const SensorDatabase = require('./SensorDatabase');
const SensorApi = require('./SensorApi');

const production = process.env.NODE_ENV === 'production';
const expressPort = process.env.EXPRESS_PORT || (production) ? 80 : 3001;

// Initialize logging
const logger = require('../src/utils/loggerFactory')();

// Configure app to use bodyParser to parse json data
// TODO: This was copied from boilerplate; Do we need it?
const app = express();
const server = http.createServer(app);
const buildDir = path.resolve(__dirname, '../build');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(buildDir +'/static')); // After build, bundle is here

// Synchronous page load requests serve the Domotica server client application
// Note we do not use server side rendering, so previous state is lost
app.get('/', serveApp);
app.get('/dashboard', serveApp);
app.get('/sensors(/*)?', serveApp);

const io = socket(server);
const sDB = new SensorDatabase();

// API for everything sensor related
new SensorApi(app, io, sDB);

// Testing routes
if (!production) {
  require('../test/mockDevice')(app);
}

// Use front-end app's 404 flow for remaining requests
// Matches any path without an extension
app.get(/^(\/(\w+))*\/?(\.\w)?\??([^.]+)?$/, serveApp);

// Start the server
server.listen(expressPort);
logger.info('Server started, listening on port ' + expressPort);


function serveApp (req, res) {
  res.sendFile(`${buildDir}/index.html`, (err) => {
    if (err) {
      logger.error(`${err}\n\n-----------> Make sure you have run: \`npm run build\``);
      res.status(err.status).end();
    }
  });
}
