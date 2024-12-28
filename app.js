const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use('/api', taskRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

module.exports = app;
