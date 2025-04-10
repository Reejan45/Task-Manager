import React, { useState, useContext, useEffect, useCallback, use } from 'react';
import TaskContext from '../../context/task/TaskContext';
import '../../styles/TaskForm.css';
import '../../styles/Dashboard.css';

const TaskForm = () => {
  const taskContext = useContext(TaskContext);
  const { addTask, updateTask, current, clearCurrent } = taskContext;

  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { title, description, priority, dueDate } = task;

  useEffect(() => {
    if (current !== null) {
      setTask(current);
    } else {
      setTask({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
      });
    }
    setError(null);
  }, [current]);

  const onChange = useCallback(e => {
    setTask(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  }, [error]);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      if (current === null) {
        await addTask(task);
      } else {
        await updateTask({...task, id: current.id});
      }
      clearAll();
    } catch (error) {
      setError(error.message || 'Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearAll = useCallback(() => {
    clearCurrent();
    setTask({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
    });
    setError(null);
    setIsSubmitting(false);
  }, [clearCurrent]);

  return (
    <form onSubmit={onSubmit} className="task-form1">
      <h2 className="form-title">
        {current ? 'Edit Task' : 'Add Task'}
      </h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={onChange}
          placeholder="Enter task title"
          className={`form-control ${error && !title.trim() ? 'is-invalid' : ''}`}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={onChange}
          placeholder="Enter task description"
          className="form-control"
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={onChange}
            className="form-control"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={onChange}
            className="form-control"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="spinner"></span>
          ) : current ? (
            'Update Task'
          ) : (
            'Add Task'
          )}
        </button>

        {current && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={clearAll}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;