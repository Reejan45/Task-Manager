const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

// Protect all routes
router.use(authMiddleware);

// Get all tasks & Create a new task
router
  .route('/')
  .get(taskController.getTasks)
  .post(taskController.createTask);

// Get, update, and delete a single task
router
  .route('/:id')
  .get(taskController.getTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;