import React from 'react';
import { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import './Inventory.css';

import firebase from "../../firebase";
// import InventoryCard from '../UI/InventoryCard';
// import InventoryCardUnchecked from '../UI/InventoryCardUnchecked';
import InventoryForm from './InventoryForm.js';
import { TextField } from '@mui/material';
// import { ClearOutlined } from '@mui/icons-material';
import Cardddd from '../UI/Cardddd';

const Inventory = () => {

    // const [invIn, setInvIn] = useState([]);
    // const [invOut, setInvOut] = useState([]);

    const [searchTerm, setSearchterm] = useState('');

    // useEffect(() => {
    //     const db = firebase.database().ref("Inventory/Instock");
    //     db.on("value", (response) => {
    //         const data = response.val();
    //         let invItem_in = [];
    //         for (const key in data) {
    //             invItem_in.push({
    //                 id: key,
    //                 price: data[key].Price,
    //                 instock: data[key].Instock,
    //                 description: data[key].Description,
    //                 name: data[key].Name,
    //             });
    //         }
    //         setInvIn(invItem_in);
    //     });
    // }, []);

    // useEffect(() => {
    //     const db1 = firebase.database().ref("Inventory/Outstock");
    //     db1.on("value", (response) => {
    //         const data = response.val();
    //         let invItem_out = []
    //         for (const key in data) {
    //             invItem_out.push({
    //                 id: key,
    //                 price: data[key].Price,
    //                 instock: data[key].Instock,
    //                 description: data[key].Description,
    //                 name: data[key].Name,
    //             });
    //         }
    //         setInvOut(invItem_out);
    //     });
    // }, []);

    // ###################### Event Handling

    // const updatedStatusHandler = (data) => {

    //     const db = firebase.database().ref('/Inventory/Outstock/').child(data.id);

    //     db.set({
    //         Id: data.id,
    //         Name: data.name,
    //         Description: data.description,
    //         Price: data.price,
    //         Instock: !data.instock,
    //     });

    //     const rem_db = firebase.database().ref('/Inventory/Instock/').child(data.id);
    //     rem_db.remove();
    // };

    // const uncheckedStatusHandler = (data) => {

    //     const db = firebase.database().ref('/Inventory/Instock/').child(data.id);

    //     db.set({
    //         Id: data.id,
    //         Name: data.name,
    //         Description: data.description,
    //         Price: data.price,
    //         Instock: !data.instock,
    //     });

    //     const rem_db = firebase.database().ref('/Inventory/Outstock/').child(data.id);
    //     rem_db.remove();
    // }

    // const inv_list = invIn.map(item => (
    //     <InventoryCard
    //         key={item.id}
    //         id={item.id}
    //         price={item.price}
    //         description={item.description}
    //         name={item.name}
    //         instock={item.instock}
    //         updatedStatusHandler={updatedStatusHandler}
    //     />
    // ));

    // const inv_list_out = invOut.map(item => (
    //     <InventoryCardUnchecked
    //         key={item.id}
    //         id={item.id}
    //         price={item.price}
    //         description={item.description}
    //         name={item.name}
    //         instock={item.instock}
    //         uncheckedStatusHandler={uncheckedStatusHandler}
    //     />
    // ))

    const [finalList, setFinalList] = useState([]);

    useEffect(() => {
        const db1 = firebase.database().ref("Inventory");
        db1.on("value", (response) => {
            const data = response.val();
            let invList = [];
            for (const key in data) {
                invList.push({
                    id: key,
                    price: data[key].Price,
                    instock: data[key].Instock,
                    category: data[key].Category,
                    name: data[key].Name,
                });
            }
            setFinalList(invList);
        });
    }, []);

    console.log(finalList);
    const updateStatus = (data) => {

        const db = firebase.database().ref('/Inventory/').child(data.id);

        db.update({
            Instock: !data.instock,
        });

    };


    return (
        <Grid container>

            <Grid container>
                <Grid item xs={6}>
                    <h1>Inventory</h1>
                </Grid>
                <Grid item xs={6}>
                    <TextField className="txtfld"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Search"
                        type="search"
                        variant="standard"
                        onChange={event => { setSearchterm(event.target.value) }}
                    />
                </Grid>
            </Grid>

            <InventoryForm />

            <Grid container spacing={3} className="main_right">
                {
                    finalList.filter(val => {
                        if (searchTerm === "") {
                            return val;
                        }
                        else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val;
                        }
                        // return val;
                    }).map((item, key) => {;
                        return (
                            <Cardddd
                                key={item.id}
                                id={item.id}
                                price={item.price}
                                category={item.category}
                                name={item.name}
                                instock={item.instock}
                                updatedStatusHandler={updateStatus}
                            />
                        )
                    })
                }

                {/* {inv_list}
                {inv_list_out} */}
            </Grid>

        </Grid>
    );
}
export default Inventory;