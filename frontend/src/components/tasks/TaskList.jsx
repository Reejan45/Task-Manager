import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TaskContext from '../../context/task/TaskContext';
import Spinner from '../layout/spinner';
import '../../styles/TaskList.css';
import '../../styles/Dashboard.css';

const TaskList = ({ filter = 'all' }) => {
  const taskContext = useContext(TaskContext);
  const { tasks, getTasks, loading, setCurrent, clearCurrent, deleteTask, updateTask } = taskContext;

  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [error, setError] = useState(null);

  // Create a Map to store refs for each task
  const refs = useRef(new Map());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await getTasks();
      } catch (err) {
        setError('Failed to load tasks');
      }
    };
    fetchTasks();
  }, []);

  const onDelete = async (id) => {
    try {
      setDeleteConfirm(null);
      await deleteTask(id);
      clearCurrent();
    } catch (error) {
      setError('Failed to delete task');
      console.error('Delete task error:', error);
    }
  };

  const onToggleComplete = async (task) => {
    try {
      await updateTask({
        ...task,
        priority: task.priority || 'medium',
        completed: !task.completed
      });
    } catch (error) {
      setError('Failed to update task');
      console.error('Update task error:', error);
    }
  };

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    const today = new Date().toISOString().split('T')[0];
    const tasksWithDefaults = tasks.map(task => ({
      ...task,
      priority: task.priority || 'medium',
      completed: Boolean(task.completed)
    }));
    switch (filter) {
      case 'completed':
        return tasksWithDefaults.filter(task => task.completed);
      case 'today':
        return tasksWithDefaults.filter(task => task.dueDate === today);
      case 'upcoming':
        return tasksWithDefaults.filter(task => task.dueDate > today);
      case 'high':
        return tasksWithDefaults.filter(task => task.priority === 'high');
      case 'medium':
        return tasksWithDefaults.filter(task => task.priority === 'medium');
      case 'low':
        return tasksWithDefaults.filter(task => task.priority === 'low');
      default:
        return tasksWithDefaults;
    }
  }, [tasks, filter]);

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="error-state" role="alert">
        <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
        <p>{error}</p>
        <button onClick={() => setError(null)} className="btn btn-secondary">
          Dismiss
        </button>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state" role="status">
        <div className="empty-state-icon">
          <i className="fas fa-tasks" aria-hidden="true"></i>
        </div>
        <h3>No tasks found</h3>
        <p>Add a new task to get started with your day!</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {deleteConfirm && (
        <div className="delete-confirm" role="alertdialog">
          <p>Are you sure you want to delete "{deleteConfirm.title}"?</p>
          <div className="confirm-actions">
            <button onClick={() => onDelete(deleteConfirm.id)} className="btn btn-danger">
              Delete
            </button>
            <button onClick={() => setDeleteConfirm(null)} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="task-list1" role="list">
        <TransitionGroup>
          {filteredTasks.map(task => {
            // Get or create a ref for the current task
            if (!refs.current.has(task.id)) {
              refs.current.set(task.id, React.createRef());
            }
            const nodeRef = refs.current.get(task.id);

            return (
              <CSSTransition key={task.id} timeout={500} classNames="item" nodeRef={nodeRef}>
                <div ref={nodeRef} className={`task-item ${task.completed ? 'completed' : ''} ${task.priority}-priority`} role="listitem">
                  <div className="task-checkbox-wrapper">
                    <input
                      type="checkbox"
                      id={`task-${task.id}`}
                      className="task-checkbox"
                      checked={task.completed}
                      onChange={() => onToggleComplete(task)}
                      aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
                    />
                  </div>
                  <div className="task-content">
                    <h3 className="task-title">
                      <label htmlFor={`task-${task.id}`}>{task.title}</label>
                    </h3>
                    {task.description && <p className="task-description">{task.description}</p>}
                    <div className="task-meta">
                      <span className={`task-priority ${task.priority}`}>
                        <i className="fas fa-flag" aria-hidden="true"></i>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                      {task.dueDate && (
                        <span className="task-due-date">
                          <i className="fas fa-calendar-alt" aria-hidden="true"></i>
                          {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="task-actions">
                    <button onClick={() => setCurrent(task)} className="btn-icon" aria-label={`Edit ${task.title}`}>
                      <i className="fas fa-edit" aria-hidden="true"></i> Edit
                    </button>
                    <button onClick={() => setDeleteConfirm(task)} className="btn-icon text-danger" aria-label={`Delete ${task.title}`}>
                      <i className="fas fa-trash-alt" aria-hidden="true"></i> Delete
                    </button>
                  </div>
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default TaskList;