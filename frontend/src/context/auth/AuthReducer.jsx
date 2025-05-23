
const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                ...action.payLoad,
                isAuthenticated: true,
                loading: false
            };
        
        case 'AUTH_ERROR':
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            };

        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
            };
        default:
            return state;      
    }
};

export default AuthReducer;