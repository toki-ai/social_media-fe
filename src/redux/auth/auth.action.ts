import axios from 'axios';
import { Dispatch } from 'redux';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from './auth.actionType';
const apiUrl = import.meta.env.VITE_API_URL;

interface LoginData {
    email: string;
    password: string;
}

export const loginUserAction = (loginData: LoginData) => async (dispatch: Dispatch) => {
    dispatch({type: LOGIN_REQUEST});
    try {
        const {data} = await axios.post(`${apiUrl}/auth/signin`, loginData);
        if(data.jwt){
            localStorage.setItem('jwt', data.jwt);
        }
        console.log("Login success: ", data);
        dispatch({type: LOGIN_SUCCESS, payload: data.jwt});
    } catch (error) {
        console.log("Error: ", error);
        dispatch({type: LOGIN_FAILURE, payload: error});
        
    }
}

interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
}

export const registerUserAction = (registerData: RegisterData) => async (dispatch: Dispatch) => {
    dispatch({type: REGISTER_REQUEST});
    try {
        const {data} = await axios.post(`${apiUrl}/auth/signup`, registerData);
        if(data.jwt){
            localStorage.setItem('jwt', data.jwt);
        }
        console.log("Register success: ", data);
        dispatch({type: REGISTER_SUCCESS, payload: data.jwt});
    } catch (error) {
        console.log("Error: ", error);
        dispatch({type: REGISTER_FAILURE, payload: error});
    }
};