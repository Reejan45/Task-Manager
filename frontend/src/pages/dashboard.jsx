import React, { useContext, useEffect } from 'react';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import AuthContext from '../context/auth/AuthContext';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <TaskForm />
      </div>
      <div>
        <h2 className="text-primary">Your Tasks</h2>
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;