import React, { useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import TaskContext from '../../context/task/TaskContext';
import '../../styles/TaskItem.css'; 

const TaskItem = ({ task }) => {
  const taskContext = useContext(TaskContext);
  const { deleteTask, setCurrent, clearCurrent, updateTask } = taskContext;
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const { id, title, description, priority, dueDate, completed } = task;

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: new Date(dateString).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const onDelete = useCallback(async () => {
    try {
      setIsDeleting(true);
      await deleteTask(id);
      clearCurrent();
    } catch (err) {
      setError('Failed to delete task');
      console.error('Delete task error:', err);
    } finally {
      setIsDeleting(false);
    }
  }, [id, deleteTask, clearCurrent]);

  const onToggleComplete = useCallback(async () => {
    try {
      const updatedTask = {
        ...task,
        completed: !completed
      };
      await updateTask(updatedTask);
    } catch (err) {
      setError('Failed to update task');
      console.error('Update task error:', err);
    }
  }, [task, updateTask]);

  return (
    <div className="task-item">
      <div className="task-main">
        {error && (
          <div className="error-message" role="alert">
            {error}
            <button 
              className="error-dismiss" 
              onClick={() => setError(null)}
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        )}

        <div className="task-content">
          <div className="task-header">
            <div className="task-status">
              <input
                type="checkbox"
                id={`task-${id}`}
                checked={completed}
                onChange={onToggleComplete}
                className="task-checkbox"
                aria-label={`Mark "${title}" as ${completed ? 'incomplete' : 'complete'}`}
              />
              <label htmlFor={`task-${id}`} className="task-title">
                {title}
              </label>
            </div>

            <div className="task-meta">
              <span className={`task-priority ${priority}`}>
                <i className="fas fa-flag" aria-hidden="true"></i>
                <span className="sr-only">Priority:</span>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </span>
              {dueDate && (
                <span className="task-due-date">
                  <i className="fas fa-calendar-alt" aria-hidden="true"></i>
                  <span className="sr-only">Due date:</span>
                  {formatDate(dueDate)}
                </span>
              )}
            </div>
          </div>

          {description && (
            <div className="task-description">
              {description}
            </div>
          )}

          {/* <div className="task-actions">
            <button
              onClick={() => setCurrent(task)}
              className="btn-icon"
              aria-label={`Edit`}
              
            >
              <i className="fas fa-edit" aria-hidden="true"></i> Edit
            </button>
            <button
              onClick={onDelete}
              className="btn-icon text-danger"
              disabled={isDeleting}
              aria-label={`Delete ${title}`}
              type="button"
            >
              <i className={`fas ${isDeleting ? 'fa-spinner fa-spin' : 'fa-trash-alt'}`} aria-hidden="true"></i> Delete
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    priority: PropTypes.oneOf(['low', 'medium', 'high']),
    dueDate: PropTypes.string,
    completed: PropTypes.bool
  }).isRequired
};

export default TaskItem;
