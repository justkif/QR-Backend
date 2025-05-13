const fs = require('fs');
const path = require('path');
const swaggerSpec = require('./config/swagger');
const outputPath = path.join(__dirname, 'swagger.json');

fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2), 'utf-8');
// `node export-swagger.js` to export swagger.json 