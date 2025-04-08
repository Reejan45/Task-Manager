import React, { useContext, useEffect } from 'react';
import TaskItem from './TaskItem';
import Spinner from '../layout/spinner';
import TaskContext from '../../context/task/TaskContext';

const TaskList = () => {
  const taskContext = useContext(TaskContext);
  const { tasks, getTasks, loading } = taskContext;

  useEffect(() => {
    getTasks();
  }, []);


  if (!taskContext) {
    return <div>Task context not available</div>;
  }

  if (loading) {
    return <Spinner />;
  }

  if (!Array.isArray(tasks)) {
    return <div>Error loading tasks</div>;
  }

  if (tasks.length === 0) {
    return <h4>No tasks found. Add a task to get started!</h4>;
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;