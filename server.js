const express = require('express');
require("dotenv").config();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const checkScope = require('express-jwt-authz');


const jwtCheck = jwt({
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

app.get("/courses", jwtCheck, checkScope(["read:courses"]), function (request, response) {

    response.json({
        courses: [
            { id: 1, title: "course 1" },
            { id: 2, title: "course 2" }
        ]
    });
});


const port = 3001

app.listen(port);

console.log(`API listening on port ${port}`);