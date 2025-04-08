import React, { useState, useContext, useEffect } from 'react';
import TaskContext from '../../context/task/TaskContext';

const TaskForm = () => {
  const taskContext = useContext(TaskContext);
  const { addTask, updateTask, current, clearCurrent } = taskContext;

  const [task, setTask] = useState({
    title: '',
    description: ''
  });

  const { title, description } = task;

  useEffect(() => {
    if (current !== null) {
      setTask(current);
    } else {
      setTask({
        title: '',
        description: ''
      });
    }
  }, [current]);

  const onChange = e => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting task:', task);
    try {
      if (current === null) {
        await addTask(task);
      } else {
        await updateTask({...task, id: current.id});
      }
      clearAll();
    } catch (error) {
      console.error('Error submitting task:', error);
    }  
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? 'Edit Task' : 'Add Task'}
      </h2>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={title}
        onChange={onChange}
        required
      />
      <textarea
        placeholder="Description"
        name="description"
        value={description}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value={current ? 'Update Task' : 'Add Task'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default TaskForm;