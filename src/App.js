import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import {createStore, compose, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
import thunk from "redux-thunk";

const App = () => {

    const rootReducer = combineReducers({
        auth: authReducer,
        order: orderReducer
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </Provider>
    );
}

export default App;