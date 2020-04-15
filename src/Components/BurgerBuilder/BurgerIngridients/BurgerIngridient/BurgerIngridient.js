import React from "react";

import classes from "./burgerIngredient.module.css";

const BurgerIngridient = (props) => {

    let ingridient = null;

    switch(props.type){
        case "meat":
            ingridient=<div className={classes.meat}></div>;
            break;
        case "cheese":
            ingridient=<div className={classes.cheese}></div>;
            break;
        case "bacon":
            ingridient=<div className={classes.bacon}></div>;
            break;
        case "salad":
            ingridient=<div className={classes.salad}></div>;
            break;
        case "bread-top":
            ingridient=<div className={classes.BreadTop}>
                <div className={classes.seeds1}></div>
                <div className={classes.seeds2}></div>
            </div>;
            break;
        case "bread-bottom":
            ingridient=<div className={classes.BreadBottom}></div>;
            break;
    }

    return ingridient;
}

export default BurgerIngridient;