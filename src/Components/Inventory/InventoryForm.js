import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@material-ui/core';
import { Select, InputLabel, MenuItem, FormControl } from "@material-ui/core";
import React, { useState, useRef } from 'react'

import firebase from "../../firebase";

const isEmpty = value => value.trim() === '';
const isSelected = value => value === 'none' || value === '';

export default function InventoryForm() {

    const [open, setOpen] = useState(false);
    const [categoryDrop, setCategoryDrop] = useState('');

    const [formValidity, setFormValidity] = useState({
        name: true,
        cost: true,
        category: true
    })

    const handleCategoryChange = (event) => {
        setCategoryDrop(event.target.value);
        // console.log(event.target.value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormValidity({
            name: true,
            cost: true,
            category: true
        })
        // setItemList(cartItems);
    };

    const nameRef = useRef();
    const costRef = useRef();
    // const descriptionRef = useRef();

    const submitHandler = (event) => {

        // event.preventDefault();
        
        const enteredName = nameRef.current.value;
        const enteredCost = costRef.current.value;
        // const enteredDescription = descriptionRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredCostIsValid = !isEmpty(enteredCost);
        // const enteredDescriptionIsValid = !isEmpty(enteredDescription);
        const enteredCategoryIsValid = !isSelected(categoryDrop);

        setFormValidity({
            name: enteredNameIsValid,
            cost: enteredCostIsValid,
            // description: enteredDescriptionIsValid
            category: enteredCategoryIsValid
        })

        const formIsValid = enteredNameIsValid && enteredCostIsValid && enteredCategoryIsValid;

        if (!formIsValid) {
            return;
        }

        const db = firebase.database().ref('/Inventory').child(enteredName);
        db.set({
            Name: enteredName,
            Price: enteredCost,
            // Description: enteredDescription,
            Category: categoryDrop,
            Id: enteredName,
            Instock: true
        })

        setOpen(false);
    }

    return (
        <div>
            <Button style={{ backgroundColor: "#1a1a1a", marginTop: "100px", marginLeft: "-155px" }} variant="contained" color="primary" onClick={handleClickOpen}>+ Add Items</Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth style={{ color: "#DFDFDF", padding: "30px 50px 30px 50px" }}>

                {/* <Grid container sm={12} md={8}> */}

                <DialogTitle style={{ background: "#DFDFDF" }}>
                    ADD ITEMS
                    <Divider />
                </DialogTitle>

                <DialogContent style={{ background: "#DFDFDF" }}>

                    <Grid container style={{ marginTop: "0px" }}>
                        <Grid container sm={12} spacing={0} >

                            <Grid container xs={12} spacing={4}>

                                <Grid item xs={6}>
                                    {formValidity.name ? (
                                        <TextField inputRef={nameRef} fullWidth label="Name" variant="standard"></TextField>
                                    ) :
                                        (
                                            <TextField error inputRef={nameRef} fullWidth label="Name" variant="standard"></TextField>
                                        )}
                                </Grid>

                                <Grid item xs={6}>
                                    {formValidity.cost ? (
                                        <TextField inputRef={costRef} type="text" inputMode="decimal" fullWidth label="Total Cost" variant="standard"></TextField>
                                    ) : (
                                        <TextField error inputRef={costRef} type="text" inputMode="decimal" fullWidth label="Total Cost" variant="standard"></TextField>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="standard">
                                        {formValidity.category ? (
                                            <InputLabel fullWidth id="demo-simple-select-standard-label">Category</InputLabel>
                                        ) :
                                            (
                                                <InputLabel error fullWidth id="demo-simple-select-standard-label">Category</InputLabel>
                                            )}
                                        <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={categoryDrop} onChange={handleCategoryChange} fullWidth label="Category">
                                            <MenuItem value="none"><em>None</em></MenuItem>
                                            <MenuItem value={"Gourmet LC"}>Gourmet LC</MenuItem>
                                            <MenuItem value={"Medicinal LC"}>Medicinal LC</MenuItem>
                                            <MenuItem value={"Glow in the dark Mushroom"}>Glow in the dark Mushroom</MenuItem>
                                            <MenuItem value={"Mycology Supplies"}>Mycology Supplies</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>

                </DialogContent>

                <DialogActions style={{ background: "#DFDFDF " }}>
                    <Button onClick={handleClose} style={{ border: "2px solid black", background: "#DFDFDF", color: "#191919", padding: "0.40em 4em", margin: "2em 2em 2em 0" }}>CANCEL</Button>
                    <Button onClick={submitHandler} className="Confirmbut" style={{ background: "#191919", color: "#ffffff", padding: "0.5em 3em", margin: "2em 2em 2em 0" }}>CONFIRM</Button>
                </DialogActions>

            </Dialog>
        </div >
    );
}

