import React from "react";

import { NavLink } from "react-router-dom";

import classes from "./navbar.module.css";
import logo from "../../assets/icons/logo.png";
import {connect} from "react-redux";

const Navbar = (props) => {
    return (
        <nav className={classes.navbar}>
            <ul className={classes.navItems}>
                <li><img className={classes.logo} src={logo} alt=""/></li>
                <li>
                    <NavLink activeClassName={classes.myactive} to="/" exact>Burger Builder</NavLink>
                    {props.isLogin ? <NavLink activeClassName={classes.myactive} to="/orders">Orders</NavLink>: null}
                    {props.isLogin ? <NavLink activeClassName={classes.myactive} to="/logout">Logout</NavLink>:
                        <NavLink activeClassName={classes.myactive} to="/auth">Authenticate</NavLink>}
                </li>
            </ul>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.auth.idToken !== null
    }
}

export default connect(mapStateToProps)(Navbar);