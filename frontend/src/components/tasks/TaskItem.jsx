import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TaskContext from '../../context/task/TaskContext';

const TaskItem = ({ task }) => {
  const taskContext = useContext(TaskContext);
  const { deleteTask, setCurrent, clearCurrent } = taskContext;

  const { id, title, description } = task;

  const onDelete = () => {
    console.log('Deleting task with ID:', id);
    deleteTask(id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {title}{' '}
      </h3>
      <p>{description}</p>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(task)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired
};

export default TaskItem;