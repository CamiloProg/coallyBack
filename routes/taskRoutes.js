const express = require("express");
const { body } = require("express-validator");
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", [body("title").notEmpty().withMessage("El título es obligatorio")], createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
