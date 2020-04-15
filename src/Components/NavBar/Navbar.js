import React from "react";

import { NavLink } from "react-router-dom";

import classes from "./navbar.module.css";
import logo from "../../assets/icons/logo.png";

const Navbar = () => {
    return (
        <nav className={classes.navbar}>
            <ul className={classes.navItems}>
                <li><img className={classes.logo} src={logo} alt=""/></li>
                <li>
                    <NavLink activeClassName={classes.myactive} to="/" exact>Burger Builder</NavLink>
                    <NavLink activeClassName={classes.myactive} to="/orders">Orders</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;