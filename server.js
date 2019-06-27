const express = require('express');
require("dotenv").config();

const app = express();

app.get("/public", function (request, response) {

    response.json({
        message: "hello from public API"
    });
});

const port = 3001

app.listen(port);

console.log(`API listening on port ${port}`);