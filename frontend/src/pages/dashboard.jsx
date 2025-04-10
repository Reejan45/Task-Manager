import React, { useContext, useEffect, useState } from 'react';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import AuthContext from '../context/auth/AuthContext';
import TaskContext from '../context/task/TaskContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const taskContext = useContext(TaskContext);
  const { loadUser, user } = authContext;
  const { tasks } = taskContext;

  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const totalTasks = tasks ? tasks.length : 0;
  const completedTasks = tasks ? tasks.filter(task => task.completed).length : 0;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = today.toLocaleDateString('en-US', options);

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <h1>Welcome, {user && user.username}!</h1>
        <p className="date">{dateString}</p>
      </header>

      {/* Stats Section */}
      <section className="dashboard-stats">
        {[
          { label: 'Total Tasks', value: totalTasks },
          { label: 'Completed', value: completedTasks },
          { label: 'Pending', value: pendingTasks },
          { label: 'Completion Rate', value: `${completionRate}%` },
        ].map((stat, index) => (
          <div className="stat-card" key={index}>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Filters Section */}
      <section className="dashboard-filters">
        <div className="filter-group">
          <h2>Categories</h2>
          <ul>
            {[
              { label: 'All Tasks', tab: 'all', count: totalTasks },
              { label: "Today's Tasks", tab: 'today', count: 0 },
              { label: 'Upcoming', tab: 'upcoming', count: 0 },
              { label: 'Completed', tab: 'completed', count: completedTasks },
            ].map((category, index) => (
              <li
                key={index}
                className={activeTab === category.tab ? 'active' : ''}
                onClick={() => setActiveTab(category.tab)}
              >
                {category.label} <span className="badge">{category.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="filter-group">
          <h2>Priorities</h2>
          <ul>
            {['high', 'medium', 'low'].map((priority, index) => (
              <li
                key={index}
                className={activeTab === priority ? 'active' : ''}
                onClick={() => setActiveTab(priority)}
              >
                <span className={`priority-dot ${priority}`}></span>
                {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Main Content */}
      <section className="dashboard-content">
        <div className="task-form">
          <h2>Add New Task</h2>
          <TaskForm />
        </div>

        <div className="task-list">
          <h2>
            {activeTab === 'all' && 'All Tasks'}
            {activeTab === 'today' && "Today's Tasks"}
            {activeTab === 'upcoming' && 'Upcoming Tasks'}
            {activeTab === 'completed' && 'Completed Tasks'}
            {activeTab === 'high' && 'High Priority Tasks'}
            {activeTab === 'medium' && 'Medium Priority Tasks'}
            {activeTab === 'low' && 'Low Priority Tasks'}
          </h2>
          <TaskList filter={activeTab} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;