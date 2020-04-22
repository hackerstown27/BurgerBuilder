import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authSuccess = (authData) => {
    return {type: actionTypes.AUTH_SUCCESS, authData: authData.data}
}

export const authFail = (error) => {
    return {type: actionTypes.AUTH_FAIL, error: error};
}

export const authLogout = () => {
    localStorage.clear();
    return {type: actionTypes.AUTH_LOGOUT};
}

export const asycAuthStart = (email, password, isSignUp) => {
    return (dispatch) => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAuCfzkz9Jg4nJIJ3xGHnS2JMTMIYgYz8k";
        if(!isSignUp){
            url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuCfzkz9Jg4nJIJ3xGHnS2JMTMIYgYz8k";
        }

        axios.post(url,authData)
            .then(response => {
                localStorage.setItem("idToken", response.data.idToken);
                localStorage.setItem("expiresIn", new Date(new Date().getTime() + response.data.expiresIn * 1000));
                localStorage.setItem("localId", response.data.localId);
                setInterval(() => {
                    dispatch(authLogout());
                }, response.data.expiresIn*1000);
                dispatch(authSuccess(response));
            })
            .catch(err => {
                dispatch(authFail(err.message));
            });
    }
}

export const autoAuth = () => {
    const authData = {
        idToken: localStorage.getItem("idToken"),
        expiresIn: localStorage.getItem("expiresIn"),
        localId: localStorage.getItem("localId")
    }
    return {type: actionTypes.AUTH_SUCCESS, authData: authData}
}