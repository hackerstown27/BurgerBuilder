import React from "react";

import Auxilary from "../../../Hoc/Auxilary";
import BurgerIngrident from "./BurgerIngridient/BurgerIngridient";
import classes from "./burgeringridients.module.css";

const BurgerIngridents = (props) => {

    let burgerIngridients = Object.keys(props.ingridients)
            .map((type) => {
                let igArr = [];
                for (let i = 1; i <= props.ingridients[type]; i++){
                    igArr.push(<BurgerIngrident type={type}/>)
                }
                return igArr; })
            .reduce((prevVal, currVal) => {
            return prevVal.concat(...currVal);
            }, []);

    if(burgerIngridients.length === 0){
        burgerIngridients = <p><center><strong>Please Start Select Your Ingridients.</strong></center></p>
    }

    return (
        <Auxilary>
            <div className={classes.burgerIngridients}>
                <BurgerIngrident type="bread-top"/>
                {burgerIngridients} 
                <BurgerIngrident type="bread-bottom"/>  
            </div>
        </Auxilary>
    );
}

export default BurgerIngridents