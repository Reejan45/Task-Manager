const db = require('../config/db');

// Get all tasks for the current user
exports.getTasks = async (req, res) => {
  try {
    const [tasks] = await db.query(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tasks'
    });
  }
};

// Get a single task
exports.getTask = async (req, res) => {
  try {
    const [tasks] = await db.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not authorized'
      });
    }

    res.status(200).json({
      success: true,
      data: tasks[0]
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching task'
    });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate input
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a title for the task'
      });
    }

    // Insert new task into database
    const [result] = await db.query(
      'INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)',
      [req.user.id, title, description || '']
    );

    // Get the created task
    const [tasks] = await db.query(
      'SELECT * FROM tasks WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: tasks[0]
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating task'
    });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Validate input
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a title for the task'
      });
    }

    // Check if task exists and belongs to the user
    const [existingTasks] = await db.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (existingTasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not authorized'
      });
    }

    // Update task in database
    await db.query(
      'UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?',
      [title, description || '', id, req.user.id]
    );

    // Get the updated task
    const [updatedTasks] = await db.query(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTasks[0]
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating task'
    });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if task exists and belongs to the user
    const [existingTasks] = await db.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (existingTasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not authorized'
      });
    }

    // Delete task from database
    await db.query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {}
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting task'
    });
  }
};