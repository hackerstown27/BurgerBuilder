import * as actionTypes from "../actions/actionTypes";

const initialState = {
    idToken: null,
    expiresIn: null,
    localId: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {
                idToken: action.authData.idToken,
                expiresIn: action.authData.expiresIn,
                localId: action.authData.localId,
                error: null
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...initialState,
                error: action.error
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...initialState
            }
        default:
            return state;
    }
}

export default reducer;