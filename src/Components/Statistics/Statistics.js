import { useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';

import './Statistics.css';
import SummaryCounter from '../UI/SummaryCounter';
import image from "../../Images/Main.png";
import firebase from "../../firebase";

import { useHistory } from 'react-router';

const Statistics = () => {
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
    
    // console.log(fetchedPopularity)
    
    const popList = fetchedPopularity.map(item => (
        <SummaryCounter
            key={item.id}
            name={item.name}
            value={item.value}
        />
    ));

    // console.log(popList);

    // console.log(fetchedPopularity);
    var mostOrdered = fetchedPopularity.map(item => item.name);

    // console.log(mostOrdered[0])

    const clickHandler = (event) =>{
        event.preventDefault();
        history.push('/AddCustomerForm');    
    }

    return (

        <Grid container spacing={8}>

            <Grid item sm={12} md={7} >
                <h2 className="home_heading">Statistics</h2>
                <br></br>
                <br></br>
                <br></br>
                <Grid container spacing={2}>
                    <Grid item sm={4}>
                        <div className="orders_1">
                            <h1>{fetchedData.TotalOrders}</h1>
                            <br></br>
                            <p>Total Orders</p>
                        </div>
                    </Grid>
                    <Grid item sm={4}>
                        <div className="orders_2">
                            <h1>{mostOrdered[0]}</h1>
                            <br></br>
                            <p>Most Ordered</p>
                        </div>
                    </Grid>
                    <Grid item sm={4}>
                        <div className="orders_3">
                            {/* <h1>{fetchedData}</h1> */}
                            <h1>{fetchedData.Revenue}</h1>
                            <br></br>
                            <p>Total Revenue</p>
                        </div>
                    </Grid>
                </Grid>

                <p className="home_text">Add customer</p>

                <Paper elevation={0} className="paper_1">
                    <img src={image} onClick={clickHandler} alt="Add Customer" height={200} />
                </Paper>

            </Grid>

            <Grid item sm={12} md={4}>
                <p className="home_text" style={{ marginBottom: "20px" }}>Popularity</p>

                {popList}

            </Grid>

        </Grid>


    );
}

export default Statistics;