const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Para habilitar CORS
const Task = require('./models/Task');  // Modelo de tarea

dotenv.config();  // Cargar variables de entorno desde .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para permitir CORS (solución de acceso entre dominios)
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());
const uri = 'mongodb+srv://camiloprog:x3nJYB8vOBhae6M3@cluster0.o7dxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// Conexión a MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Ruta GET para obtener todas las tareas
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();  // Buscar todas las tareas
    res.json(tasks);  // Enviar las tareas como respuesta
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
});

// Ruta POST para crear una nueva tarea
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
    });

    await newTask.save();  // Guardar la tarea en MongoDB
    res.status(201).json(newTask);  // Responder con la tarea creada
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
});
// Ruta PUT para actualizar una tarea
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;  // Obtener el ID de la tarea de los parámetros de la URL
    const { title, description, completed } = req.body;  // Obtener los campos de la tarea desde el cuerpo de la solicitud

    // Actualizar la tarea
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, completed }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    // Responder con la tarea actualizada
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
});

// Ruta DELETE para eliminar una tarea
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



// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
