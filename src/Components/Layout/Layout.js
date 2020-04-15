import React from "react";

import { Route, Switch } from "react-router-dom";
import Auxilary from "../../Hoc/Auxilary";
import BurgerBuilder from "../BurgerBuilder/BurgerBuilder";
import Navbar from "../NavBar/Navbar";
import Checkout from "../Checkout/Checkout";
import Orders from "../Orders/Orders";

const Layout = () => {
    return (
        <Auxilary>
            <Navbar />
          <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/checkout" exact component={Checkout}/>
            <Route path="/orders" exact component={Orders}/>
          </Switch>
        </Auxilary>
    )
}

export default Layout;