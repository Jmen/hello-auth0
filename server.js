const express = require('express');
require("dotenv").config();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');


var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});

const app = express();

app.get("/public", function (request, response) {

    response.json({
        message: "hello from public API"
    });
});

app.get("/private", jwtCheck, function (request, response) {

    response.json({
        message: "hello from private API"
    });
});


const port = 3001

app.listen(port);

console.log(`API listening on port ${port}`);