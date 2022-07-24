import React from "react";
import { Grid, Paper } from '@material-ui/core';

import classes from './OrderCards.module.css';

const PendingOrdersCard = (props) => {

    const item_list = [];
    for (const key in props.orderDetails) {

        item_list.push({
            id: key,
            orderName: props.orderDetails[key].OrderName,
            orderQty: props.orderDetails[key].OrderQty,
            price: props.orderDetails[key].Price
        })
    }
    const OrderDetails_list = item_list.map(item => {
        if (item.price === 0) {
            return (<p style={{ color: "#18CC67" }} key={item.id}>{item.orderQty} X - {item.orderName}</p>)
        }
        else {
            return (<p key={item.id}>{item.orderQty} X - {item.orderName}</p>)
        }
    });


    const handleClickOpen = (data) => {
        props.click(data);
    };

    return (


        < Grid item xs={4} onClick={() => handleClickOpen(props)} >
            <Paper elevation={0} className={classes.order_details}>
                <div className={classes.order_section}>
                    <p><b><span>Name</span></b> - {props.name}</p>

                </div>

                <div className={classes.order_section}>
                    <p><b><span>Order ID</span></b> - {props.orderID}</p>
                    <p><b><span>ID</span></b> - {props.email}</p>
                    <p><b><span >Country</span></b> - {props.country}</p>
                    <p><b><span >Address</span></b> - {props.address}</p>
                    <p><b><span >Total Cost</span></b> - {props.totalCost}</p>
                </div>

                {OrderDetails_list}
            </Paper>
        </Grid >

    );
}

export default PendingOrdersCard;