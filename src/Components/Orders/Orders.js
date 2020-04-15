import React from "react";

import classes from "./orders.module.css";
import Spinner from "../../UI/Spinner/Spinner";
import axios from "../../axios-order";

class Orders extends React.Component {

    state = {
        loading : true,
        orders: null
    }

    componentDidMount() {
        axios.get("/orders.json")
            .then(response => {
                this.setState({loading: false, orders: response.data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            this.state.loading ? <Spinner /> :
            <div className={classes.orders}>
                {
                    Object.keys(this.state.orders).map((id) => {
                        let order = this.state.orders[id];
                        let ingridients = order.ingridients;
                        let totalPrice = +order.totalPrice;
                        return (
                            <div key={id} className={classes.order}>
                                Ingridients : {Object.keys(ingridients).map(ingridient => {
                                    return <span key={ingridient}> {ingridient} ({ingridients[ingridient]}) </span>
                                })} 
                                <br/>
                                <br/>
                                Price : {totalPrice.toFixed(2)}
                            </div>
                        );
                    })
                }
            </div>
        )
    } 
}

export default Orders;