const mongoose = require('mongoose');

// Definir el esquema de la tarea
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,  // Establecer un valor por defecto si no se especifica
    },
}, { timestamps: true });  // Esto añadirá campos createdAt y updatedAt automáticamente

// Crear el modelo de tarea
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
