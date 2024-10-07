const express = require('express');
const app = express();
const port = 3030;

require('dotenv').config();

const connectDB = require('./services/connectDB.js');
connectDB();

const configureServices = require('./services/service.js');
configureServices(app);

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = { app, server };