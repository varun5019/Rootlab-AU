import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';

import firebase from "../../firebase";

const isEmpty = value => value.trim() === '';

export default function EditCustomerBoard(props) {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormValidity({
            name: true,
            email: true,
            country: true,
            cost: true,
            address: true
        })
    };

    const [nameInp, setNameInp] = useState(props.name);
    const [emailInp, setEmailInp] = useState(props.email);
    const [countryInp, setCountryInp] = useState(props.country);
    const [costInp, setCostInp] = useState(props.cost);
    const [addressInp, setAddressInp] = useState(props.address);

    const [formValidity, setFormValidity] = useState({
        name: true,
        email: true,
        country: true,
        cost: true,
        address: true
    })


    const submitHandler = (event) => {
        console.log(props.orderId);

        const enteredNameIsValid = !isEmpty(nameInp);
        const enteredEmailIsValid = !isEmpty(emailInp);
        const enteredCountryIsValid = !isEmpty(countryInp);
        const enteredCostIsValid = !isEmpty(costInp);
        const enteredAddressIsValid = !isEmpty(addressInp);

        setFormValidity({
            name: enteredNameIsValid,
            email: enteredEmailIsValid,
            country: enteredCountryIsValid,
            cost: enteredCostIsValid,
            address: enteredAddressIsValid
        })

        const formIsValid = enteredNameIsValid && enteredEmailIsValid && enteredCostIsValid && enteredCountryIsValid && enteredAddressIsValid;

        if (!formIsValid) {
            return;
        }

        console.log(nameInp);
        console.log(emailInp);
        console.log(countryInp);
        console.log(costInp);
        console.log(addressInp);

        const db = firebase.database().ref('/OrderStatus/ROC').child(props.orderId);
        db.update({
            Name: nameInp,
            Email: emailInp,
            Country: countryInp,
            TotalCost: costInp,
            Address: addressInp
        })

        setOpen(false);

    }

    return (
        <div>
            <Button variant="text" onClick={handleClickOpen} style={{color: "#535353", marginLeft: "-10px" ,height: "60px"}}>
            <p>
                   Edit Details </p>
                <EditIcon style={{ fontSize: "20px", color: "#535353", marginLeft: "10px"}}></EditIcon>
            </Button>
            <Dialog open={open} maxWidth="md" onClose={handleClose} style={{ color: "#DFDFDF", padding: "30px 50px 30px 50px" }}>
                <DialogTitle>EDIT DETAILS</DialogTitle>
                <DialogContent>

                    <Grid container style={{ marginTop: "0px" }}>
                        <Grid container sm={12} spacing={0} >

                            <Grid container xs={12} spacing={4}>

                                <Grid item xs={6}>
                                    {formValidity.name ? (
                                        <TextField value={nameInp} onChange={(a) => setNameInp(a.target.value)} fullWidth label="Name" variant="standard"></TextField>

                                    ) :
                                        (
                                            <TextField error value={nameInp} onChange={(a) => setNameInp(a.target.value)} fullWidth label="Name" variant="standard"></TextField>
                                        )}
                                </Grid>

                                <Grid item xs={6}>
                                    {formValidity.email ? (
                                        <TextField value={emailInp} onChange={a => setEmailInp(a.target.value)} type="text" fullWidth label="Email" variant="standard"></TextField>
                                    ) : (
                                        <TextField error value={emailInp} onChange={a => setEmailInp(a.target.value)} type="text" fullWidth label="Email" variant="standard"></TextField>
                                    )}
                                </Grid>

                                <Grid item xs={6}>
                                    {formValidity.country ? (
                                        <TextField value={countryInp} onChange={a => setCountryInp(a.target.value)} type="text" fullWidth label="Country" variant="standard"></TextField>
                                    ) : (
                                        <TextField error value={countryInp} onChange={a => setCountryInp(a.target.value)} type="text" fullWidth label="Country" variant="standard"></TextField>
                                    )}
                                </Grid>

                                <Grid item xs={6}>
                                    {formValidity.cost ? (
                                        <TextField value={costInp} onChange={a => setCostInp(a.target.value)} fullWidth id="standard-multiline-static" label="Total Cost" variant="standard"></TextField>
                                    ) :
                                        (
                                            <TextField value={costInp} onChange={a => setCostInp(a.target.value)} fullWidth id="standard-multiline-static" label="Total Cost" variant="standard"></TextField>
                                        )}
                                </Grid>

                                <Grid item xs={12}>
                                    {formValidity.address ? (
                                        <TextField value={addressInp} onChange={a => setAddressInp(a.target.value)} fullWidth id="standard-multiline-static" label="Address" variant="standard" multiline rows={2}></TextField>
                                    ) :
                                        (
                                            <TextField error value={addressInp} onChange={a => setAddressInp(a.target.value)} fullWidth id="standard-multiline-static" label="Address" variant="standard" multiline rows={2}></TextField>
                                        )}
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>CANCEL</Button>
                    <Button onClick={submitHandler}>SUBMIT</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}