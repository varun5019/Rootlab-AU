import { Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import OrderCards1 from '../UI/OrderCards1';
import OrderCards2 from '../UI/OrderCards2';
import OrderCards3 from '../UI/OrderCards3';
import OrderCards4 from '../UI/OrderCards4';
import React from 'react';
import './CustomerBoard.css';
import firebase from "../../firebase";
// import TrackingModal from '../UI/TrackingModal';
// import EditIcon from '@mui/icons-material/Edit';
//new
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from '@material-ui/core';
import { KeyboardBackspace } from '@mui/icons-material';

const CustomerBoard = () => {

    const [tBM, setTBM] = useState([]);
    const [rOC, setROC] = useState([]);
    const [ss, setSS] = useState([]);
    const [shipped, setShipped] = useState([]);
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const db = firebase.database().ref("OrderStatus/TBM");
        db.on("value", (response) => {
            const data = response.val();
            let tbmItem = [];
            for (const key in data) {
                tbmItem.push({
                    id: key,
                    address: data[key].Address,
                    commMode: data[key].CommMode,
                    country: data[key].Country,
                    // customerNotes: data[key].CustomerNotes,
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
            // console.log(tbmItem)
            setTBM(tbmItem);
        });
    }, []);

    useEffect(() => {
        const db = firebase.database().ref("OrderStatus/ROC");
        db.on("value", (response) => {
            const data = response.val();
            let rocItem = [];
            for (const key in data) {
                rocItem.push({
                    id: key,
                    address: data[key].Address,
                    commMode: data[key].CommMode,
                    country: data[key].Country,
                    // customerNotes: data[key].CustomerNotes,
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
            // console.log(rocItem)
            setROC(rocItem);
        });
    }, []);

    useEffect(() => {
        const db = firebase.database().ref("OrderStatus/SS");
        db.on("value", (response) => {
            const data = response.val();
            let rocItem = [];
            for (const key in data) {
                rocItem.push({
                    id: key,
                    address: data[key].Address,
                    commMode: data[key].CommMode,
                    country: data[key].Country,
                    // customerNotes: data[key].CustomerNotes,
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
            // console.log(rocItem)
            setSS(rocItem);
        });
    }, []);

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
                    // customerNotes: data[key].CustomerNotes,
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
            // console.log(shippedItem)
            setShipped(shippedItem);
        });
    }, []);

    useEffect(() => {
        const db_update = firebase.database().ref('/Orders');
        db_update.on("value", (response) => {
            const data = response.val();
            setOrderData(data);
            // console.log(data)
        })
    }, []);

    //  ######################## UPDATED STATUS

    const updatedStatusHandler1 = (data) => {
        const db = firebase.database().ref('/OrderStatus/ROC/').child(data.id);
        // // console.log(db);
        // console.log(data);
        db.set({
            Id: data.id,
            Address: data.address,
            CommMode: data.commMode,
            Country: data.country,
            // CustomerNotes: data.customerNotes,
            Email: data.email,
            Name: data.name,
            OrderDetails: data.orderDetails,
            OrderNotes: data.orderNotes,
            Payment: data.payment,
            TotalCost: data.totalCost,
            Wallet: data.wallet,
            OrderID: data.orderID
        });
        const rem_db = firebase.database().ref('/OrderStatus/TBM/').child(data.id);
        rem_db.remove();
    };

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [tracking, setTracking] = useState();

    const [messageCommMode, setMessageCommMode] = useState();
    const [messageID, setMessageID] = useState();
    const [messageOrderID, setMessageOrderID] = useState();
    const [tempData, setTempData] = useState({});
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleBack = (data) => {
        data.preventDefault();
        setOpen1(false);
        setOpen(true);
    }

    const handleNext1 = () => {
        setOpen(false);
        setOpen1(true);
    }

    let mess_commMode = '';
    let mess_id = '';
    let mess_orderId = '';

    let temp_Data = [];

    const updatedStatusHandler2 = (data) => {

        handleClickOpen();

        mess_commMode = data.commMode;
        setMessageCommMode(mess_commMode);

        mess_id = data.email;
        setMessageID(mess_id);

        mess_orderId = data.id;
        setMessageOrderID(mess_orderId);

        temp_Data = data;
        // console.log(temp_Data);
        setTempData(temp_Data)
    }
    // console.log(tempData);
    // console.log(tempData.id);

    const handleSS = () => {

        const db = firebase.database().ref('/OrderStatus/SS/').child(tempData.id);
        // console.log(db);
        db.set({
            Id: tempData.id,
            Address: tempData.address,
            CommMode: tempData.commMode,
            Country: tempData.country,
            // CustomerNotes: tempData.customerNotes,
            Email: tempData.email,
            Name: tempData.name,
            OrderDetails: tempData.orderDetails,
            OrderNotes: tempData.orderNotes,
            Payment: tempData.payment,
            TotalCost: tempData.totalCost,
            Wallet: tempData.wallet,
            OrderID: tempData.orderID
        });
        const rem_db = firebase.database().ref('/OrderStatus/ROC/').child(tempData.id);
        rem_db.remove();

        setTracking('');
        handleClose1();
    }

    const handlePayment = () => {

        const db = firebase.database().ref('/OrderStatus/Shipped/').child(tempData.id);
        // console.log(db);
        db.set({
            Id: tempData.id,
            Address: tempData.address,
            CommMode: tempData.commMode,
            Country: tempData.country,
            // CustomerNotes: tempData.customerNotes,
            Email: tempData.email,
            Name: tempData.name,
            OrderDetails: tempData.orderDetails,
            OrderNotes: tempData.orderNotes,
            Payment: tempData.payment,
            TotalCost: tempData.totalCost,
            Wallet: tempData.wallet,
            OrderID: tempData.orderID
        });
        const rem_db = firebase.database().ref('/OrderStatus/ROC/').child(tempData.id);
        rem_db.remove();

        ////////////////// POPULARITY

        const db_update = firebase.database().ref('/Orders');
        db_update.set({
            Revenue: parseInt(orderData.Revenue) + parseInt(tempData.totalCost),
            TotalOrders: orderData.TotalOrders + 1,
            Popularity: orderData.Popularity
        })

        setTracking('');
        handleClose1();

        var db_pop = firebase.database().ref('Orders/Popularity/');
        const orderList = tempData.orderDetails;
        
        for (const key in orderList) {

            // console.log(orderList[key])
            if (orderList[key].Price === 0 || orderList[key].Price === '0') {
                return;
            }
            else {
                // console.log(orderList[key].OrderName)
                db_pop.once("value", snap => {
                    // console.log(snap.val())
                    for (const i in snap.val()) {
                        // console.log(snap.val()[i])
                        // console.log(snap.val()[i].Name)
                        if (snap.val()[i].Name === orderList[key].OrderName) {
                            // console.log("found it  " + snap.val()[i].Name)

                            let updatedValue = snap.val()[i].Value + orderList[key].OrderQty;
                            // console.log(updatedValue);

                            const db_update1 = firebase.database().ref('Orders/Popularity/' + orderList[key].OrderName);
                            db_update1.set({
                                Name: snap.val()[i].Name,
                                Value: updatedValue,
                            })
                            return;
                        }
                        else {
                            // console.log("not found")
                            const db_update1 = firebase.database().ref('Orders/Popularity/' + orderList[key].OrderName);
                            db_update1.set({
                                Name: orderList[key].OrderName,
                                Value: orderList[key].OrderQty
                            })
                        }
                    }
                })
            }
        }
        
    }

    const updatedStatusHandler3 = (data) => {

        // setOpenModal(true);
        // console.log(data.orderDetails);
        var overlay = window.confirm("Is Payment Confirmed?");

        if (overlay === true) {
            // console.log("in updatehandler3");
            const db = firebase.database().ref('/OrderStatus/Shipped/').child(data.id);
            // console.log(db);
            db.set({
                Id: data.id,
                Address: data.address,
                CommMode: data.commMode,
                Country: data.country,
                // CustomerNotes: data.customerNotes,
                Email: data.email,
                Name: data.name,
                OrderDetails: data.orderDetails,
                OrderNotes: data.orderNotes,
                Payment: data.payment,
                TotalCost: data.totalCost,
                Wallet: data.wallet,
                OrderID: data.orderID
            });

            const remove_db = firebase.database().ref('/OrderStatus/SS/').child(data.id);
            // console.log(remove_db);
            remove_db.remove();

            const db_update = firebase.database().ref('/Orders');
            db_update.set({
                Revenue: parseInt(orderData.Revenue) + parseInt(data.totalCost),
                TotalOrders: orderData.TotalOrders + 1,
                Popularity: orderData.Popularity
            })


            ////////////////// POPULARITY

            var db_pop = firebase.database().ref('Orders/Popularity/');
            // console.log(data.orderDetails)
            const orderList = data.orderDetails;
            // console.log(orderList);

            for (const key in orderList) {
                // console.log(orderList[key])
                if (orderList[key].Price === 0 || orderList[key].Price === '0') {
                    return;
                } else {
                    // console.log(orderList[key].OrderName)
                    db_pop.once("value", snap => {
                        // console.log(snap.val())
                        for (const i in snap.val()) {
                            // console.log(snap.val()[i])
                            // console.log(snap.val()[i].Name)
                            if (snap.val()[i].Name === orderList[key].OrderName) {
                                // console.log("found it  " + snap.val()[i].Name)


                                let updatedValue = snap.val()[i].Value + orderList[key].OrderQty;
                                // console.log(updatedValue);

                                const db_update = firebase.database().ref('Orders/Popularity/' + orderList[key].OrderName);
                                db_update.set({
                                    Name: snap.val()[i].Name,
                                    Value: updatedValue,
                                })
                                return;
                            }
                            else {
                                // console.log("not found")
                                const db_update = firebase.database().ref('Orders/Popularity/' + orderList[key].OrderName);
                                db_update.set({
                                    Name: orderList[key].OrderName,
                                    Value: orderList[key].OrderQty
                                })
                            }
                        }
                    })
                }
            }

        }
        else {
            console.log("Nothing!");
        }
    }

    // ################################# DELETED STATUS 

    const updatedDeleteHandler1 = data => {
        const db = firebase.database().ref('/OrderStatus/TBM/').child(data.id);
        db.remove();
    };

    const updatedDeleteHandler2 = data => {
        const db = firebase.database().ref('/OrderStatus/TBM/').child(data.id);
        console.log(data);
        db.set({
            Id: data.id,
            Address: data.address,
            CommMode: data.commMode,
            Country: data.country,
            // CustomerNotes: data.customerNotes,
            Email: data.email,
            Name: data.name,
            OrderDetails: data.orderDetails,
            OrderNotes: data.orderNotes,
            Payment: data.payment,
            TotalCost: data.totalCost,
            Wallet: data.wallet,
            OrderID: data.orderID
        });
        const rem_db = firebase.database().ref('/OrderStatus/ROC/').child(data.id);
        rem_db.remove();
    };

    const updatedDeleteHandler3 = data => {
        const db = firebase.database().ref('/OrderStatus/ROC/').child(data.id);
        // console.log(data);
        db.set({
            Id: data.id,
            Address: data.address,
            CommMode: data.commMode,
            Country: data.country,
            // CustomerNotes: data.customerNotes,
            Email: data.email,
            Name: data.name,
            OrderDetails: data.orderDetails,
            OrderNotes: data.orderNotes,
            Payment: data.payment,
            TotalCost: data.totalCost,
            Wallet: data.wallet,
            OrderID: data.orderID
        });
        const rem_db = firebase.database().ref('/OrderStatus/SS/').child(data.id);
        rem_db.remove();
    };

    const updatedDeleteHandler4 = data => {
        const db = firebase.database().ref('/OrderStatus/SS/').child(data.id);
        db.set({
            Id: data.id,
            Address: data.address,
            CommMode: data.commMode,
            Country: data.country,
            // CustomerNotes: data.customerNotes,
            Email: data.email,
            Name: data.name,
            OrderDetails: data.orderDetails,
            OrderNotes: data.orderNotes,
            Payment: data.payment,
            TotalCost: data.totalCost,
            Wallet: data.wallet,
            OrderID: data.orderID
        });
        
        const rem_db = firebase.database().ref('/OrderStatus/Shipped/').child(data.id);
        rem_db.remove();

        const db_update = firebase.database().ref('/Orders');
        db_update.set({
            Revenue: parseInt(orderData.Revenue) - parseInt(data.totalCost),
            TotalOrders: orderData.TotalOrders - 1,
            Popularity: orderData.Popularity
        })

        var db_pop = firebase.database().ref('Orders/Popularity/');
        // console.log(data.orderDetails)
        const orderList = data.orderDetails;
        // console.log(orderList);

        for (const key in orderList) {
            // console.log(orderList[key])
            // console.log(orderList[key].OrderName)
            if (orderList[key].Price === 0 || orderList[key].Price === '0') {
                return;
            } else {
                db_pop.once("value", snap => {
                    // console.log(snap.val())
                    for (const i in snap.val()) {
                        // console.log(snap.val()[i])
                        // console.log(snap.val()[i].Name)
                        if (snap.val()[i].Name === orderList[key].OrderName) {
                            // console.log("found it  " + snap.val()[i].Name)


                            let updatedValue = snap.val()[i].Value - orderList[key].OrderQty;
                            // console.log(updatedValue);

                            const db_update = firebase.database().ref('Orders/Popularity/' + orderList[key].OrderName);
                            db_update.set({
                                Name: snap.val()[i].Name,
                                Value: updatedValue,
                            })
                            return;
                        }
                    }
                })
            }
        }
    };

    const tbm_list = tBM.map(item => (
        <OrderCards1
            key={item.id}
            id={item.id}
            address={item.address}
            commMode={item.commMode}
            country={item.country}
            // customerNotes={item.customerNotes}
            email={item.email}
            name={item.name}
            orderDetails={item.orderDetails}
            orderNotes={item.orderNotes}
            payment={item.payment}
            totalCost={item.totalCost}
            wallet={item.wallet}
            orderID={item.orderID}
            onUpdate={updatedStatusHandler1}
            onDelete={updatedDeleteHandler1}
        />
    ));

    const roc_list = rOC.map(item => (
        <OrderCards2
            key={item.id}
            id={item.id}
            address={item.address}
            commMode={item.commMode}
            country={item.country}
            // customerNotes={item.customerNotes}
            email={item.email}
            name={item.name}
            orderDetails={item.orderDetails}
            orderNotes={item.orderNotes}
            payment={item.payment}
            totalCost={item.totalCost}
            wallet={item.wallet}
            orderID={item.orderID}
            onUpdate={updatedStatusHandler2}
            onDelete={updatedDeleteHandler2}
        />
    ));

    const ss_list = ss.map(item => (
        <OrderCards3
            key={item.id}
            id={item.id}
            address={item.address}
            commMode={item.commMode}
            country={item.country}
            // customerNotes={item.customerNotes}
            email={item.email}
            name={item.name}
            orderDetails={item.orderDetails}
            orderNotes={item.orderNotes}
            payment={item.payment}
            totalCost={item.totalCost}
            wallet={item.wallet}
            orderID={item.orderID}
            onUpdate={updatedStatusHandler3}
            onDelete={updatedDeleteHandler3}
        />
    ))

    const shipped_list = shipped.map(item => (
        <OrderCards4
            key={item.id}
            id={item.id}
            address={item.address}
            commMode={item.commMode}
            country={item.country}
            // customerNotes={item.customerNotes}
            email={item.email}
            name={item.name}
            orderDetails={item.orderDetails}
            orderNotes={item.orderNotes}
            payment={item.payment}
            totalCost={item.totalCost}
            wallet={item.wallet}
            orderID={item.orderID}
            onDelete={updatedDeleteHandler4}
        />
    ));

    return (
        <Grid container>
            {/* {openModal && <Modal closeModal={setOpenModal}/>} */}
            {/* <Topbar /> */}

            {/* <TrackingModal commMode orderId={props.orderID}/> */}

            <Dialog open={open} maxWidth="sm" fullWidth onClose={handleClose}>
                <DialogTitle>Proceed</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter Tracking Number</DialogContentText>
                    <TextField value={tracking} onChange={(a) => setTracking(a.target.value)} fullWidth label="Tracking Number" variant="standard"></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ border: "2px solid black", background: "#ffffff", color: "#191919", padding: "0.40em 4em", margin: "2em 2em 2em 0" }}>Cancel</Button>
                    <Button onClick={handleNext1} style={{ border: "2px solid black", background: "#191919", color: "#ffffff", padding: "0.40em 4em", margin: "2em 2em 2em 0" }}>Next</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open1} maxWidth="md" fullWidth onClose={handleClose1}>
                <DialogTitle>
                    <Button onClick={handleBack}> 
                    {/* <EditIcon style={{ fontSize: "20px", color: "#535353", marginLeft: "-50px"}}></EditIcon>*/}
                    <KeyboardBackspace style={{ fontSize: "20px", color: "#535353", marginLeft: "-50px"}}></KeyboardBackspace>
                    </Button>
                    Messaging Info
                </DialogTitle>
                <DialogContent>
                    <p><b>Mode of Contact: </b>{messageCommMode}</p>
                    <p><b>ID: </b>{messageID}</p>
                    <p><b>Tracking Number: </b> {tracking}</p>
                    <br></br>
                    <p>Hi there,</p>
                    <p>Your order no. {messageOrderID} was shipped express yesterday and your tracking link is :</p>
                    <p><b>https://auspost.com.au/mypost/track/#/details/{tracking}</b></p>
                    <p>If you ever have a problem with your order, you can quote me your order number and we can go from there.</p>
                    <p>Best of luck!</p>
                    <p>Jae</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSS()}  style={{ border: "2px solid black", background: "#ffffff", color: "#191919", padding: "0.40em 4em", margin: "2em 2em 2em 0" }}>Screenshot Received</Button>
                    <Button onClick={() => handlePayment()} style={{ border: "2px solid black", background: "#ffffff", color: "#191919", padding: "0.40em 4em", margin: "2em 2em 2em 0" }}>Payment Confirmed</Button>
                </DialogActions>
            </Dialog>

            <Grid container spacing={2}>
                <Grid item sm={12}>
                    {/* <h2 className="home_heading">Hi Name Surname</h2> */}
                    {/* <p className="home_text_alt">Welcome back</p> */}

                    <h1 className="home_text_alt">Customers</h1>

                </Grid>

                <Grid item sm={12} md={3} >
                    <div className="customer_card" style={{ background: "#806EFF" }}>
                        <p>To be made</p>
                    </div>

                    <Grid container className="individual_section">
                        {tbm_list}
                    </Grid>
                </Grid>

                <Grid item sm={12} md={3}>
                    <div className="customer_card" style={{ background: "#FF6EEC" }}>
                        <p>Ready for contact</p>
                    </div>

                    <Grid container className="individual_section">
                        {roc_list}
                    </Grid>
                </Grid>

                <Grid item sm={12} md={3}>
                    <div className="customer_card" style={{ background: "#ff6e6c" }}>
                        <p>Screenshot Received</p>
                    </div>

                    <Grid container className="individual_section">
                        {ss_list}
                    </Grid>
                </Grid>

                <Grid item sm={12} md={3}>
                    <div className="customer_card" style={{ background: "#20F87E" }}>
                        <p>Payment Confirmed</p>
                    </div>
                    <Grid container className="individual_section">
                        {shipped_list}
                    </Grid>

                </Grid>

            </Grid>
        </Grid>
    );
}

export default CustomerBoard;