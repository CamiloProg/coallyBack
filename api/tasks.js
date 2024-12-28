const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Example Task model (if you have one)
const Task = mongoose.model('Task', new mongoose.Schema({
  title: String,
  description: String,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err.message);
    process.exit(1);
  });

// Define the /api/tasks route
app.get('/api/tasks', async (req, res) => {
  try {
    // Retrieve tasks from the database
    const tasks = await Task.find();
    res.json(tasks); // Return tasks as a JSON response
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Test route to verify server is working
app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});
