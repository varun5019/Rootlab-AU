import React from "react";
import { Grid, Paper } from '@material-ui/core';

import classes from './OrderCards.module.css';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditCustomerBoard from "./EditCustomerBoard";

const OrderCards1 = (props) => {

    // console.log(item);
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

    const handleUpdateStatus = (data) => {
        props.onUpdate(data);
    };
    const handleDeleteStatus = (data) => {
        props.onDelete(data);
    }
    
    return (
        <Grid item xs={12}>
            <Paper elevation={0} className={classes.order_details}>
                <div className={classes.order_section}>
                    <p>{props.name}</p>
                    {/* <p>{props.orderID}</p> */}
                    <div className={classes.action_icons}>
                        <CheckCircleIcon style={{ fontSize: "25px", color: "#18CC67" }} onClick={() => { handleUpdateStatus(props) }} />
                        <CancelIcon style={{ fontSize: "25px", color: "#FF0000", marginLeft: "10px" }} onClick={() => { handleDeleteStatus(props) }} />
                    </div>
                </div>

                <div className={classes.order_section}>
                <p><b><span>ID</span></b> - {props.email}</p>
                    <p><b><span >Country</span></b> - {props.country}</p>
                    <p><b><span >Address</span></b> - {props.address}</p>
                    <p><b><span >Total Cost</span></b> - AUD {props.totalCost}</p>
                </div>

                {OrderDetails_list}
        
                <EditCustomerBoard name={props.name} email={props.email} country={props.country} address={props.address} cost={props.totalCost} orderId={props.orderID}></EditCustomerBoard>
            </Paper>
        </Grid>
    );
}

export default OrderCards1;