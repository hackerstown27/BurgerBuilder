import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import Layout from "./Components/Layout/Layout";

const App = () => {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}

export default App;