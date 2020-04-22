import * as actionTypes from "../actions/actionTypes";

const initialState = {
    ingredients: null,
    totalPrice: 4.00,
}

const priceList = {
    salad: 0.44,
    bacon: 0.72,
    cheese: 0.54,
    meat: 0.80
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_INGRIDIENTS:
            return {
                ...state,
                ingredients: action.ingridients,
                totalPrice: 4
            }
        case actionTypes.ADD:
            let updatedIng = {...state.ingredients};
            updatedIng[action.target] += 1;
            let updatedPrice = state.totalPrice + priceList[action.target];
            return {ingredients: updatedIng, totalPrice: updatedPrice};
        case actionTypes.REM:
            let updatedIn = {...state.ingredients};
            updatedIn[action.target] -= 1;
            let updatedPric = state.totalPrice - priceList[action.target];
            return {ingredients: updatedIn, totalPrice: updatedPric};
        case actionTypes.ON_CONFIRM_HANDLER:
            
    }
    return state;
}

export default reducer;