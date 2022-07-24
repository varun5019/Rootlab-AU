import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from '@material-ui/core';


import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function TrackingModal(props) {

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [tracking, setTracking] = useState();
    // const [messageData, setMessageData] = useState();

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

    const handleScreenshot = () => {
        const data = 1;
        props.handleSS(data);
    }

    const handlePayment = () => {
        const data = 2;
        props.handleP(data);
    }
    return (
        <div>
            <Button variant="text" onClick={handleClickOpen}>
                <CheckCircleIcon style={{ fontSize: "35px", color: "#18CC67", display: "inline" }}/>
            </Button>

            <Dialog open={open} maxWidth="sm" fullWidth onClose={handleClose}>
                <DialogTitle>Proceed</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter Tracking Number</DialogContentText>
                    <TextField value={tracking} onChange={(a) => setTracking(a.target.value)} fullWidth label="Tracking Number" variant="standard"></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleNext1}>Next</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open1} maxWidth="md" fullWidth onClose={handleClose1}>
                <DialogTitle>
                    <button onClick={handleBack}> 
 </button>
                    Messaging Info
                </DialogTitle>
                <DialogContent>
                    <p><b>Mode of Contact: </b>{props.commMode}</p>
                    <p><b>ID: </b>{props.id}</p>
                    <br></br>
                    <p>Hi there,</p>
                    <p>Your order no. {props.orderId} was shipped express yesterday and your tracking link is :</p>
                    <p><b>https://auspost.com.au/mypost/track/#/details/{tracking}</b></p>
                    <p>If you ever have a problem with your order, you can quote me your order number and we can go from there.</p>
                    <p>Best of luck!</p>
                    <p>Jae</p>    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleScreenshot}>Screenshot Received</Button>
                    <Button onClick={handlePayment}>Payment Confirmed</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
