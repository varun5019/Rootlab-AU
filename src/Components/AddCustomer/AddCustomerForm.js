import { useRef, useState } from 'react';
import { Button, Select, InputLabel, MenuItem, FormControl, Grid, TextField, Divider} from "@material-ui/core";
import { Alert } from '@mui/material';

import { useHistory } from 'react-router';
import classes from './AddCustomerForm.module.css';

import Popup from '../UI/Popup';
import firebase from "../../firebase";

const isEmpty = value => value.trim() === '';
const isSelected = value => value === 'none' || value === '';

const AddCustomerForm = () => {

    const [commMode, setCommMode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [countryDrop, setCountryDrop] = useState('');
    const [totalCost, setTotalCost] = useState(0);
    const [itemList, setItemList] = useState([]);
    const [finalItemList, setFinalItemList] = useState([]);

    const history = useHistory();

    const handleCommunicationChange = (event) => {
        setCommMode(event.target.value);
        // console.log(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountryDrop(event.target.value);
        // console.log(event.target.value);
    }

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
        // console.log(event.target.value);
    };

    const changeCostHandler = data => {
        setTotalCost(data);
    }

    const cartItemList = (items) => {
        for (const key in items) {
            // console.log(key + " " + items[key].name)
            finalItemList.push({
                // OrderName: items[key].name,
                OrderName: items[key].name,
                OrderQty: items[key].qty,
                Price: items[key].price
            })
        }
        // console.log(finalItemList);
        setFinalItemList(finalItemList);
        setItemList(items);

    }
    // console.log(itemList);

    const nameRef = useRef();
    const addressRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    // const countryRef = useRef();
    const pincodeRef = useRef();
    const idRef = useRef();
    const walletRef = useRef();
    const orderRef = useRef();
    // const discountRef = useRef();
    // const customerRef = useRef();

    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        // street: true,
        address: true,
        city: true,
        state: true,
        country: true,
        pincode: true,
        id: true,
        wallet: true,
        order: true,
        itemList: true,
        comm: true,
        payment: true,
        // discount: true,
        // customer: true,
    })

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredAddress = addressRef.current.value;
        const enteredCity = cityRef.current.value;
        const enteredState = stateRef.current.value;
        // const enteredCountry = countryRef.current.value;
        const enteredPincode = pincodeRef.current.value;
        const enteredId = idRef.current.value;
        const enteredWallet = walletRef.current.value;
        const enteredOrder = orderRef.current.value;
        const enteredItemList = itemList;
        // const enteredDiscount = discountRef.current.value;
        // const enteredCustomer = customerRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredStateIsValid = !isEmpty(enteredState);
        const enteredCountryIsValid = !isSelected(countryDrop);
        const enteredPincodeIsValid = !isEmpty(enteredPincode);
        const enteredIdIsValid = !isEmpty(enteredId);
        const enteredWalletIsValid = !isEmpty(enteredWallet);
        const enteredOrderIsValid = !isEmpty(enteredOrder);
        const enteredCommIsValid = !isSelected(commMode);
        const enteredPaymentMethodIsValid = !isSelected(paymentMethod);
        const enteredItemListIsValid = enteredItemList.length !== 0;
        // const enteredDiscountIsValid = !isEmpty(enteredDiscount);
        // const enteredCustomerIsValid = !isEmpty(enteredCustomer);

        setFormInputValidity({
            name: enteredNameIsValid,
            address: enteredAddressIsValid,
            city: enteredCityIsValid,
            state: enteredStateIsValid,
            country: enteredCountryIsValid,
            pincode: enteredPincodeIsValid,
            id: enteredIdIsValid,
            wallet: enteredWalletIsValid,
            order: enteredOrderIsValid,
            itemList: enteredItemListIsValid,
            comm: enteredCommIsValid,
            payment: enteredPaymentMethodIsValid,
            // discount: enteredDiscountIsValid,
            // customer: enteredCustomerIsValid,
        })

        const formIsValid = enteredNameIsValid && enteredAddressIsValid && enteredCityIsValid && enteredStateIsValid && enteredCountryIsValid && enteredPincodeIsValid && enteredIdIsValid && enteredWalletIsValid && enteredCommIsValid && enteredPaymentMethodIsValid && enteredItemListIsValid;

        if (!formIsValid) {
            return;
        }

        const uniq_key = countryDrop + "_" + Date.now();
        // console.log(uniq_key);

        //submit cart data;
        const db = firebase.database().ref('/OrderStatus/TBM/').child(uniq_key);

        const finalAddress = enteredAddress + ", " + enteredCity + ", " + enteredState + ", PIN: " + enteredPincode;
        // console.log(finalAddress);
        // console.log(totalCost);
        db.set({
            // Id: data.id,
            Name: enteredName,
            Address: finalAddress,
            Country: countryDrop,
            CommMode: commMode,
            Email: enteredId,
            Payment: paymentMethod,
            Wallet: enteredWallet,
            OrderNotes: enteredOrder,
            OrderDetails: finalItemList,
            TotalCost: totalCost,
            OrderID: uniq_key
            // CustomerNotes: enteredCustomer,
            // Discount: enteredDiscount,
        });

        history.push('/CustomerBoard')

    }

    // console.log(totalCost)

    return (
        <Grid container style={{ marginTop: "10px" }}>

            <h2 className={classes.home_text_heading}>Customers</h2>


            <form onSubmit={submitHandler}>
                <Grid container className={classes.cus_form} style={{ overflowY: "scroll" }}>

                    <Grid item container xs={12} md={6} spacing={4}>

                        <Grid item xs={12}>
                            {formInputValidity.name ? (
                                <TextField inputRef={nameRef} label="Name" variant="standard" fullWidth></TextField>
                            ) :
                                (
                                    <TextField error inputRef={nameRef} label="Name" variant="standard" fullWidth></TextField>
                                )}
                        </Grid>
                        <Grid item xs={12}>
                            {formInputValidity.address ? (
                                <TextField fullWidth label="Address Line 1" variant="standard" inputRef={addressRef}></TextField>
                            ) :
                                (
                                    <TextField error fullWidth label="Address Line 1" variant="standard" inputRef={addressRef}></TextField>
                                )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            {formInputValidity.city ? (
                                <TextField inputRef={cityRef} label="City" variant="standard" fullWidth></TextField>
                            ) :
                                (
                                    <TextField error inputRef={cityRef} label="City" variant="standard" fullWidth></TextField>
                                )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            {formInputValidity.state ? (
                                <TextField inputRef={stateRef} label="State" variant="standard" fullWidth></TextField>
                            ) :
                                (
                                    <TextField error inputRef={stateRef} label="State" variant="standard" fullWidth></TextField>
                                )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            {/* {formInputValidity.country ? (
                                <TextField inputRef={countryRef} label="Country" variant="standard" fullWidth></TextField>
                            ) :
                                (
                                    <TextField error inputRef={countryRef} label="Country" variant="standard" fullWidth></TextField>
                                )} */}
                            <FormControl fullWidth variant="standard">
                                {formInputValidity.country ? (
                                    <InputLabel fullWidth id="demo-simple-select-standard-label">Country</InputLabel>
                                ) :
                                    (
                                        <InputLabel error fullWidth id="demo-simple-select-standard-label">Country</InputLabel>
                                    )}
                                <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={countryDrop} onChange={handleCountryChange} fullWidth label="Country">
                                    <MenuItem value="none"><em>None</em></MenuItem>
                                    <MenuItem value={"AU"}>Australia</MenuItem>
                                    <MenuItem value={"NZ"}>New Zealand</MenuItem>
                                    <MenuItem value={"US"}>United States</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            {formInputValidity.pincode ? (
                                <TextField inputRef={pincodeRef} label="Pincode" variant="standard" fullWidth></TextField>
                            ) :
                                (
                                    <TextField error inputRef={pincodeRef} label="Pincode" variant="standard" fullWidth></TextField>
                                )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="standard">
                                {formInputValidity.comm ? (
                                    <InputLabel fullWidth id="demo-simple-select-standard-label">Communication Mode</InputLabel>
                                ) :
                                    (
                                        <InputLabel error fullWidth id="demo-simple-select-standard-label">Communication Mode</InputLabel>
                                    )}
                                <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={commMode} onChange={handleCommunicationChange} fullWidth label="Communication Mode">
                                    <MenuItem value="none"><em>None</em></MenuItem>
                                    <MenuItem value={"E-mail"}>E-Mail</MenuItem>
                                    <MenuItem value={"Reddit"}>Reddit</MenuItem>
                                    <MenuItem value={"Telegram"}>Telegram</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            {formInputValidity.id ? (
                                <TextField label="ID" variant="standard" inputRef={idRef} fullWidth></TextField>
                            ) :
                                (
                                    <TextField error label="ID" variant="standard" inputRef={idRef} fullWidth></TextField>
                                )}
                        </Grid>

                        {/* <Grid item xs={6}>
                            <FormControl fullWidth variant="standard">
                                {formInputValidity.payment ? (
                                    <InputLabel fullWidth id="demo-simple-select-standard-label">Payment Method</InputLabel>
                                ) :
                                    (
                                        <InputLabel error fullWidth id="demo-simple-select-standard-label">Payment Method</InputLabel>
                                    )}
                                <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={paymentMethod} onChange={handlePaymentChange} fullWidth label="Payment Method">
                                    <MenuItem value="none"><em>None</em></MenuItem>
                                    <MenuItem value={"paypal"}>Paypal</MenuItem>
                                    <MenuItem value={"btc"}>BTC</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            {formInputValidity.wallet ? (
                                <TextField fullWidth label="Wallet Address" variant="standard" inputRef={walletRef}></TextField>
                            ) :
                                (
                                    <TextField error fullWidth label="Wallet Address" variant="standard" inputRef={walletRef}></TextField>
                                )}
                        </Grid> */}
                        <Grid xs={12}>
                            <Button variant="contained" type="submit" className={classes.submit_btn} style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '15px 30px', marginLeft: '10px', marginTop: '20px' }}>SUBMIT</Button>
                        </Grid>


                    </Grid>

                    <Grid item xs={1}></Grid>

                    <Grid item container xs={12} md={5} spacing={4} className={classes.right_grid}>

                        <p>Order Details</p>
                        <Divider style={{width:'100%'}} />
                        
                        <Grid item xs={12} className={classes.order_detail}>
                            {itemList.length === 0 && <p>Cart is empty</p>}
                            {itemList.map(item => (
                                <div key={item.id}>
                                    <Grid container sm={12} spacing={1} direction="row">
                                        <Grid item sm={2}>
                                            <p>{item.qty} X </p>
                                        </Grid>

                                        <Grid item sm={7}>
                                            <p>{item.name}</p>
                                        </Grid>


                                        <Grid item sm={3}>
                                            <p>$ {item.price}</p>
                                        </Grid>
                                    </Grid>
                                </div>
                            ))}
                            {!formInputValidity.itemList && (<Alert variant="outlined" severity="error">
                                Your cart is empty - Please enter items to proceed.
                            </Alert>)}
                        </Grid>
                        <Popup setItemList={cartItemList} changeCostHandler={changeCostHandler} />

                        <Grid item xs={12}>
                            <br></br>
                            <Grid container item direction="row">
                                <Grid item xs={9}>Total Price: </Grid>
                                {totalCost.length !== 0 ? (
                                    <Grid item xs={3}>$ {totalCost}</Grid>
                                ) :
                                    (
                                        <Grid item xs={3}>$ 0</Grid>
                                    )}
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="standard">
                                {formInputValidity.payment ? (
                                    <InputLabel fullWidth id="demo-simple-select-standard-label">Payment Method</InputLabel>
                                ) :
                                    (
                                        <InputLabel error fullWidth id="demo-simple-select-standard-label">Payment Method</InputLabel>
                                    )}
                                <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={paymentMethod} onChange={handlePaymentChange} fullWidth label="Payment Method">
                                    <MenuItem value="none"><em>None</em></MenuItem>
                                    <MenuItem value={"paypal"}>Paypal</MenuItem>
                                    <MenuItem value={"btc"}>BTC</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            {formInputValidity.wallet ? (
                                <TextField fullWidth label="Wallet Address" variant="standard" inputRef={walletRef}></TextField>
                            ) :
                                (
                                    <TextField error fullWidth label="Wallet Address" variant="standard" inputRef={walletRef}></TextField>
                                )}
                        </Grid>
                        <Grid item xs={12}>
                            {formInputValidity.order ? (
                                <TextField id="standard-textarea" label="Order Notes" multiline variant="standard" fullWidth inputRef={orderRef} />
                            ) :
                                (
                                    <TextField error id="standard-textarea" label="Order Notes" multiline variant="standard" fullWidth inputRef={orderRef} />
                                )}
                        </Grid>

                        {/* <Grid item xs={12}>
                            {formInputValidity.discount ? (
                                <TextField label="Discount Offered" variant="standard" inputRef={discountRef} fullWidth></TextField>
                            ) :
                                (
                                    <TextField error label="Discount Offered" variant="standard" inputRef={discountRef} fullWidth></TextField>
                                )}
                        </Grid>

                        <Grid item xs={12} className={classes.hello}>
                            {formInputValidity.customer ? (
                                <TextField id="standard-textarea" label="Customer Notes" multiline variant="standard" fullWidth inputRef={customerRef} />
                            ) :
                                (
                                    <TextField error id="standard-textarea" label="Customer Notes" multiline variant="standard" fullWidth inputRef={customerRef} />
                                )}
                        </Grid> */}

                        {/* <Button variant="contained" sx={{backgroundColor: '#191919', color: '#ffffff'}} className="">SUBMIT</Button> */}

                    </Grid>
                </Grid>
            </form>
            {/* </Grid> */}
        </Grid >

    );

}

export default AddCustomerForm;