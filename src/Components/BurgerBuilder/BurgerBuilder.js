import React from "react";

import Auxilary from "../../Hoc/Auxilary";
import BurgerIngredients from "./BurgerIngridients/BurgerIngridients";
import ControlPanel from "./ControlPanel/ControlPanel";
import Modal from "../../UI/Modal/Modal";
import axios from "../../axios-order";
import Spinner from "../../UI/Spinner/Spinner";


class BurgerBuilder extends React.Component{

    state = {
        ingredients: null,
        totalPrice: 4.00,
        modalState: false
    }

    priceList = {
        salad: 0.44,
        bacon: 0.72,
        cheese: 0.54,
        meat: 0.80
    }

    add = (type) => {
        let updatedIng = {...this.state.ingredients};
        updatedIng[type] += 1;
        let updatedPrice = this.state.totalPrice + this.priceList[type];
        this.setState({ingredients: updatedIng, totalPrice: updatedPrice});
    }

    rem = (type) => {
        let updatedIng = {...this.state.ingredients};
        updatedIng[type] -= 1;
        let updatedPrice = this.state.totalPrice - this.priceList[type];
        this.setState({ingredients: updatedIng, totalPrice: updatedPrice});
    }

    modalToggler = () => {
        this.setState({modalState: true});
    }

    backdropHandler = () => {
        this.setState({modalState: false});
    }

    componentDidMount() {
        axios.get("/ingridients.json").then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            alert(error.message);
        })
    }
    
    render(){
        return (
            <Auxilary>  
                {this.state.modalState ? <Modal ingridients={this.state.ingredients} totalPrice={this.state.totalPrice} backdropHandler={this.backdropHandler}/> : null}
                
                {this.state.ingredients ? 
                <Auxilary> 
                    <BurgerIngredients ingridients={this.state.ingredients}/> 
                    <ControlPanel add={this.add} rem={this.rem} ingridients={this.state.ingredients} totalPrice={this.state.totalPrice} modalHandler={this.modalToggler}/> 
                </Auxilary>:
                <Spinner/>}
                
            </Auxilary>
        );
    }
}

export default BurgerBuilder;