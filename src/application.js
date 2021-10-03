'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const nombresRutas = require('./resources/routes');
const cors = require('cors');
const restaurantes = require('./routes/restaurantes');
const usuarios = require('./routes/usuarios');
const swaggerUi = require('swagger-ui-express');
const swaggerDocumento = require('./config/swagger.json'); 
const ROUTE_URL = '/api';

class Application {
    constructor() {
        this.express = express();
        this.setUpCors();
        this.setUpExpress();
        this.setUpRoutes();
        this.setUpSwagger();
        this.setUpNotFoundRoute();
        this.setUpPort();
    }

    setUpRoutes() {
        this.express.use(ROUTE_URL + nombresRutas.restaurantes.url, restaurantes);
        this.express.use(ROUTE_URL + nombresRutas.usuarios.url, usuarios);
    }

    setUpExpress() {
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    setUpPort() {
        this.express.set('port', process.env.PORT || 5000);
    }

    setUpNotFoundRoute() {
        this.express.use((request, response, next) => {
            const error = new Error("Resource not found");
            error.status = 404;
            next(error);
        });
    }

    setUpSwagger() {
        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumento));
    }

    setUpCors() {
        this.express.use(cors());
    }

}

module.exports = new Application().express;