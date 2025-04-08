import React, { useReducer } from 'react';
import api from '../../utils/api';
import TaskContext from './TaskContext';
import TaskReducer from './TaskReducer';
import { toast } from 'react-toastify';      

const TaskState = ({ children }) => {
    const initialState = {
        tasks: [],
        current: null,
        loading: true,
        error: null
    };

    const [state, dispatch] = useReducer(TaskReducer, initialState);    

    const getTasks = async () => {
        try {
            setLoading();
            const res = await api.get('/api/tasks');
            const tasks = Array.isArray(res.data.data) ? res.data.data : [];

            dispatch({
                type: 'GET_TASKS',
                payload: tasks
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error fetching tasks';
            dispatch({
                type: 'TASK_ERROR',
                payload: errorMessage
            });
            toast.error(errorMessage);
        }
    };

    const addTask = async (task) => {
        try {
          setLoading();
          const res = await api.post('/api/tasks', task);
          if (res.data && res.data.data) {
            dispatch({
              type: 'ADD_TASK',
              payload: res.data.data
            });
            toast.success('Task added successfully');
          } else {
            throw new Error('Invalid API response');
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Error adding task';
          dispatch({
            type: 'TASK_ERROR',
            payload: errorMessage
          });
          toast.error(errorMessage);
        }
    };

    const deleteTask = async (id) => {
        try {
            setLoading();
            await api.delete(`/api/tasks/${id}`);

            dispatch({
                type: 'DELETE_TASK',
                payload: id
            });
            toast.success('Task deleted successfully');
        } catch (error) {
            errorMessage = error.response?.data?.message || 'Error deleting task';
            dispatch({
                type: 'TASK_ERROR',
                payload: errorMessage
            });
            toast.error(errorMessage);
        }
    };

    const updateTask = async (task) => {
        try {
            setLoading();
            const res = await api.put(`/api/tasks/${task.id}`, task);

            dispatch({
                type: 'UPDATE_TASK',
                payload: res.data.data
            });
            toast.success('Task updated successfully');
        } catch (error) {
            errorMessage = error.response?.data?.message || 'Error updating task';
            dispatch({
                type: 'TASK_ERROR',
                payload: errorMessage
            });
            toast.error(errorMessage);
        }
    };

    const setCurrent = (task) => {
        dispatch({
            type: 'SET_CURRENT',
            payload: task
        });
    };

    const clearCurrent = () => {
        dispatch({
            type: 'CLEAR_CURRENT'
        });
    };

    const clearTasks = () => {
        dispatch({
            type: 'CLEAR_TASKS'
        });
    };

    const setLoading = () => {
        dispatch({
            type: 'SET_LOADING'
        });
    };

    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                current: state.current,
                loading: state.loading,
                error: state.error,
                getTasks,
                addTask,
                deleteTask,
                updateTask,
                setCurrent,
                clearCurrent,
                clearTasks
            }}
        >
            {children}
        </TaskContext.Provider>       
    );
};

export default TaskState;
