const TaskReducer = (state, action) => {
    switch (action.type) {
        case 'GET_TASKS':
            return {
                ...state,
                tasks: action.payload,
                loading: false
            };
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [ action.payload, ...state.tasks ],
                loading: false
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
                loading: false
            };
        case 'SET_CURRENT':
            return {
                ...state,
                current: action.payload
            };
        case 'CLEAR_CURRENT':
            return {
                ...state,
                current: null
            };     
        case 'UPDATE_TASK': 
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task),
                loading: false    
            };
        case 'TASK_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case 'CLEAR_TASKS': 
            return {
                ...state,
                tasks: [],
                error: null,
                current: null
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};

export default TaskReducer;