const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;