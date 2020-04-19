import axios from "../../axios-order";
import * as actionTypes from "../actions/actionTypes";

const fetchIngridients = (ingridients) => {
    return {type: actionTypes.FETCH_INGRIDIENTS, ingridients: ingridients}
}

export const asyncFetchIngridients = () => {
    return dispatch => {
        axios.get("/ingridients.json").then(response => {
            dispatch(fetchIngridients(response.data));
        })
        .catch(error => {
            alert(error.message);
        })
    }
}

export const add = (type) => {
    return {type: actionTypes.ADD, target: type};
}

export const rem = (type) => {
    return {type: actionTypes.REM, target: type};
}

export const onConfirmHandler = () => {
    return {type: actionTypes.ON_CONFIRM_HANDLER};
}