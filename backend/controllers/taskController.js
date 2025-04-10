const db = require('../config/db');

// Get all tasks for the current user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await db.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      count: tasks.rows.length,
      data: tasks.rows,
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tasks',
    });
  }
};

// Get a single task
exports.getTask = async (req, res) => {
  try {
    const tasks = await db.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (tasks.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not authorized',
      });
    }

    res.status(200).json({
      success: true,
      data: tasks.rows[0],
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching task',
    });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;

    // Validate input
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a title for the task',
      });
    }

    // Insert new task into database
    const result = await db.query(
      `INSERT INTO tasks (user_id, title, description, priority, due_date, completed) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        req.user.id,
        title,
        description || '',
        priority || 'medium', // Default to 'medium' if not provided
        dueDate || null, // Allow null for dueDate
        completed || false, // Default to false if not provided
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating task',
    });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, dueDate, completed } = req.body;

    // Validate input
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a title for the task',
      });
    }

    // Check if task exists and belongs to the user
    const existingTasks = await db.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (existingTasks.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not authorized',
      });
    }

    // Update task in database
    const result = await db.query(
      `UPDATE tasks 
       SET title = $1, description = $2, priority = $3, due_date = $4, completed = $5 
       WHERE id = $6 AND user_id = $7 RETURNING *`,
      [
        title,
        description || '',
        priority || 'medium',
        dueDate || null,
        completed || false,
        id,
        req.user.id,
      ]
    );

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating task',
    });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if task exists and belongs to the user
    const existingTasks = await db.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (existingTasks.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not authorized',
      });
    }

    // Delete task from database
    await db.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [
      id,
      req.user.id,
    ]);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {},
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting task',
    });
  }
};