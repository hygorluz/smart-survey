const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = require('./routes')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
