const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'QR API Docs' },
        servers: [
            { url: 'http://localhost:8000' },
            { url: 'https://qr-backend-adidas.vercel.app' }
        ],
        components: {
            securitySchemes: {
                TokenAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'token',
                    description: 'Enter your token. Example: token123 (no "Bearer ")'
                }
            },
            responses: {
                status401Error: { description: 'Unauthorized - Token not found' },
                status403Error: { description: 'Forbidden - Token invalid or no permission' }
            }
        },
        security: [{ TokenAuth: [] }]
    },
    apis: [path.join(__dirname, '../routes/*.js')]
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;