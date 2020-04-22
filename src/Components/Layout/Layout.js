import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import Auxilary from "../../Hoc/Auxilary";
import BurgerBuilder from "../BurgerBuilder/BurgerBuilder";
import Navbar from "../NavBar/Navbar";
import Checkout from "../Checkout/Checkout";
import Orders from "../Orders/Orders";
import Auth from "../Auth/Auth";
import Logout from "../Auth/Logout/Logout";
import {connect} from "react-redux";
import * as authActions from "../../store/actions/auth";

class Layout extends React.Component {

    componentWillMount = () => {
      if (localStorage.getItem("localId")){
        this.props.autoAuth();
        const currDate = new Date();
        const expiresDate = new Date(localStorage.getItem("expiresIn"));
        if (currDate <= expiresDate){
          const expiresIn = expiresDate - currDate;
          setInterval(() => {
            this.props.authLogout();
          }, expiresIn);
        } else {
          this.props.authLogout();
        }
      }
    }

    render() {

      let routes = <Switch>
                    <Route path="/auth" exact component={Auth}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Route path="*" render={() => <Redirect to="/"/>}/>
                  </Switch>
      if(this.props.isLogin){
        routes = <Switch>
                    <Route path="/checkout" exact component={Checkout}/>
                    <Route path="/orders" exact component={Orders}/>
                    <Route path="/logout" exact component={Logout}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Route path="*" render={() => <Redirect to="/"/>}/>
                  </Switch>
      }
        return (
            <Auxilary>
                <Navbar />
                {routes}
            </Auxilary>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    isLogin : state.auth.idToken !== null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      autoAuth:() => {dispatch(authActions.autoAuth())},
      authLogout:() => {dispatch(authActions.authLogout())}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout);