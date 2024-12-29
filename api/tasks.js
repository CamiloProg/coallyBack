const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


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

app.get('/api/tasks', async (req, res) => {
  try {
 
    const tasks = await Task.find();
    res.json(tasks); 
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});


app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});
