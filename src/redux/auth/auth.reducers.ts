const initialState = {
    jwt: null, 
    error: null,
    loading: false
}

interface AuthAction {
    type: string;
    payload?: string | Error; 
}

export const authReducer = (state = initialState, action: AuthAction) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
        case 'REGISTER_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                jwt: action.payload,
                loading: false
            }
        case 'LOGIN_FAILURE':
        case 'REGISTER_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}