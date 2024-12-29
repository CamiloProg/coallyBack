const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  
const Task = require('./models/Task'); 

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());


app.use(express.json());
const uri = 'mongodb+srv://camiloprog:x3nJYB8vOBhae6M3@cluster0.o7dxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// Conexión a MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));


app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks); 
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
});


app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
    });

    await newTask.save();  
    res.status(201).json(newTask); 
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;  
    const { title, description, completed } = req.body; 

    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, completed }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }


    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
});


app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
});




app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
