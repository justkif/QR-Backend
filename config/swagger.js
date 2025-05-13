const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'QR API Docs' },
        servers: [
            { url: 'http://localhost:8000' },
            { url: 'https://qr-backend-adidas.vercel.app' }
        ]
    },
    apis: [path.join(__dirname, '../routes/*.js')]
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;