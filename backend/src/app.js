const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

const person = require('./person');
const auth = require('./auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.post('/authenticate', auth.authenticate);

app.use(
    OpenApiValidator.middleware({
      apiSpec: apiSpec,
      validateRequests: true,
      validateResponses: true,
    }),
);

app.get('/v0/workspace', auth.check, person.getWorkspace);

app.get('/v0/channel/:workspace', auth.check, person.getChannel);

app.get('/v0/message/:channel', auth.check, person.getMessage);

app.get('/v0/user/:workspace', auth.check, person.getUsers);

app.get('/v0/dm/:user', auth.check, person.getDMs);

app.use((err, req, res, next) => {
  console.log('Message: ' + err);
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
