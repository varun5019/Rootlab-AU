import { useState, useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';
import "./Home.css";

import firebase from "../../firebase";
import image from "../../Images/Main.png";
import classes from '../UI/InventoryCard.module.css';
import { useHistory } from 'react-router';

const Home = () => {

    const [fetchedData, setFetchedData] = useState([]);
    const [fetchedPopularity, setFetchedPopularity] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const db = firebase.database().ref('Orders/')
        db.on("value", (response) => {
            const data = response.val();
            setFetchedData(data);
        });
    }, []);

    useEffect(() => {
        const db = firebase.database().ref('Orders/Popularity')
        db.on("value", (response) => {
            const data = response.val();
            let list = [];
            for (const key in data) {
                list.push({
                    id: key,
                    name: data[key].Name,
                    value: data[key].Value
                })
            }
            setFetchedPopularity(list);
        });
    }, []);

    fetchedPopularity.sort((a, b) => b.value - a.value);

    var mostOrdered = fetchedPopularity.map(item => item.name);

    // ########### OUT OF STOCK

    const [invOut, setInvOut] = useState([]);
    useEffect(() => {
        const db1 = firebase.database().ref("Inventory");
        db1.orderByChild("Instock").equalTo(false).on("value", (response) => {
            const data = response.val();
            let invItem_out = []
            for (const key in data) {
                invItem_out.push({
                    id: key,
                    price: data[key].Price,
                    instock: data[key].Instock,
                    category: data[key].Category,
                    name: data[key].Name,
                });
            }
            setInvOut(invItem_out);
        });
    }, []);

    const clickHandler = (event) => {
        event.preventDefault();
        history.push('/AddCustomerForm');
    }

    return (
        <Grid container spacing={6}>
            <Grid item sm={12} md={7}>
                <h2 className="home_heading">Hi User!</h2>
                <p className="home_text_alt">Welcome back</p>

                <p className="home_text">Add customer</p>

                <Paper elevation={0} className="paper_1">
                    <img src={image} onClick={clickHandler} alt="Home" height={200} />
                </Paper>

                <p className="home_text">Statistics</p>
                <Grid container spacing={2}>
                    <Grid item sm={4}>
                        <div className="orders_1">
                            <h1>{fetchedData.TotalOrders}</h1>
                            <p>Total Orders</p>
                        </div>
                    </Grid>
                    <Grid item sm={4}>
                        <div className="orders_2">
                            <h1>{mostOrdered[0]}</h1>
                            <p>Most Ordered</p>
                        </div>
                    </Grid>
                    <Grid item sm={4}>
                        <div className="orders_3">
                            <h1>{fetchedData.Revenue}</h1>
                            <p>Total Revenue</p>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={12} md={5}>
                <p className="home_text">Out Of Stock</p>
                {invOut.length === 0 && <p>No items are out of stock!</p>}
                <Grid container spacing={3} className="paper_2">
                    {
                        invOut.map(item => {
                            return (
                                <Grid item sm={12} key={item.id}>
                                    <div className={classes.invent_item} style={{ background: "#FFE5E5" }}>
                                        <p className={classes.typedish}>{item.name} <span className={classes.cost} >&#36;{item.price}</span></p>
                                        <p>{item.category}</p>
                                        <br></br>
                                        <p style={{ color: "#FF0000", fontSize: "14px" }}>OUT OF STOCK</p>
                                    </div>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Home;