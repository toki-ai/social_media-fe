interface AuthState {
  jwt: string | null
  error: string | Error | null
  loading: boolean
}

const initialState: AuthState = {
  jwt: null,
  error: null,
  loading: false,
}

interface AuthAction {
  type: string
  payload?: string | Error
}

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        jwt: action.payload === 'string' ? action.payload : null,
      }
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        error: action.payload ?? null,
        loading: false,
      }
    default:
      return state
  }
}
