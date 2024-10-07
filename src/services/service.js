const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../doc/swagger-config.js');

const configureServices = (app) => {
    // Swagger documentation route
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Middleware for parsing requests
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Define application routes
};

module.exports = configureServices;


