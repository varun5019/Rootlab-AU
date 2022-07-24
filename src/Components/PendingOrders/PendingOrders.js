import { Grid } from '@material-ui/core';

import { useState, useEffect } from 'react';

import '../PendingOrders/PendingOrders.css';

import firebase from "../../firebase";
import PendingOrdersCard from '../UI/PendingOrdersCard';
import { TextField } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

const PendingOrders = () => {
    const [shipped, setShipped] = useState([]);
    const [searchTerm, setSearchterm] = useState('');
    useEffect(() => {
        const db = firebase.database().ref("OrderStatus/Shipped");
        db.on("value", (response) => {
            const data = response.val();
            let shippedItem = [];
            for (const key in data) {
                shippedItem.push({
                    id: key,
                    address: data[key].Address,
                    commMode: data[key].CommMode,
                    country: data[key].Country,
                    email: data[key].Email,
                    name: data[key].Name,
                    orderDetails: data[key].OrderDetails,
                    orderNotes: data[key].OrderNotes,
                    payment: data[key].Payment,
                    totalCost: data[key].TotalCost,
                    wallet: data[key].Wallet,
                    orderID: data[key].OrderID
                });
            }
            setShipped(shippedItem);
        });
    }, []);

    // const shipped_list = shipped.map(item => (
    //     <PendingOrdersCard
    //         key={item.id}
    //         id={item.id}
    //         address={item.address}
    //         country={item.country}
    //         email={item.email}
    //         name={item.name}
    //         orderDetails={item.orderDetails}
    //         totalCost={item.totalCost}
    //         orderID={item.orderID}
    //     />
    // ));

    const [open, setOpen] = useState(false);
    const [data, setdata] = useState([]);
    const clickHandler = (data) =>{
        // console.log("here");
        setOpen(true);
        // console.log(data);
        setdata(data)

    }
    // console.log(odata);
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Grid container>
            <Dialog open={open} maxWidth="sm" fullWidth onClose={handleClose}>
                <DialogTitle>ORDER DETAILS</DialogTitle>
                <DialogContent>
                    <p><b>Address : </b>{data.address}</p>
                    <p><b>Order ID : </b>{data.id}</p>
                    <p><b>Country : </b>{data.country}</p>
                    <br></br>
                    <p><b>Communication Mode : </b>{data.commMode}</p>
                    <p><b>ID :</b> {data.email}</p>
                    <p><b>Name :</b> {data.name}</p>
                    <p><b>OrderID :</b> {data.orderID}</p>
                    <br></br>
                    
                    <p><b>Payment:</b> {data.payment}</p>
                    <p><b>Total Cost : </b>AUD {data.totalCost}</p>
                    <p><b>Wallet :</b> {data.wallet}</p>
                    <br></br>
                    <p><b>Order Notes :</b> {data.orderNotes}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>CLOSE</Button>
                    
                </DialogActions>
            </Dialog>
            
            <Grid container>
                <Grid item xs={6}>
                    <h2>Customer's Orders</h2>
                </Grid>
                <Grid item xs={6}>
                    <TextField className="txtfld"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Search By Order ID"
                        type="search"
                        variant="standard"
                        onChange={event => { setSearchterm(event.target.value) }}
                    />
                </Grid>
            </Grid>
            <p>&nbsp;</p>
            <Grid container spacing={8} className='box'>

                {
                    shipped.filter(val => {
                        if (searchTerm === "") {
                            // console.log(val.address);
                            return val;
                        }
                        else if (val.orderID.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val;
                        }
                        // return val;
                    }).map((item, key) => {
                        return (
                            <PendingOrdersCard
                                key={item.id}
                                id={item.id}
                                address={item.address}
                                commMode={item.commMode}
                                country={item.country}
                                email={item.email}
                                name={item.name}
                                orderDetails={item.orderDetails}
                                orderNotes={item.orderNotes}
                                payment={item.payment}
                                totalCost={item.totalCost}
                                wallet={item.wallet}
                                orderID={item.orderID}
                                click={clickHandler}
                            />
                        );
                    })
                }
                {/* {shipped_list} */}
            </Grid>
        </Grid>

    );
}

export default PendingOrders;
