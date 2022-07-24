import React from "react";
import { Grid } from '@material-ui/core';
// import { dividerClasses } from '@mui/material';
// import '../Inventory/Inventory.css';
import classes from './InventoryCard.module.css';

const Cardddd = (props) => {

    const { updatedStatusHandler } = props;

    const handleChange = (data) => {
        updatedStatusHandler(data);
    };
    // const out = !props.instock;
    if (props.instock === true) {
        return (
            <Grid item sm={4}>
                <div className={classes.invent_item} style={{ background: "#FFFFFF" }}>
                    <p className={classes.typedish}>{props.name} <span className={classes.cost} >&#36;{props.price}</span></p>
                    <p>{props.category}</p>
                    <Grid container>
                        <Grid item xs={6}>
                        </Grid>
                        <Grid item xs={6}>
                            <button classes={classes.status_btn} onClick={() => handleChange(props)}>Change Status</button>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        );
    }
    else {
        return (
            <Grid item sm={4}>
                <div className={classes.invent_item} style={{ background: "#FFE5E5" }}>
                    <p className={classes.typedish}>{props.name} <span className={classes.cost} >&#36;{props.price}  </span></p>
                    <p> {props.category} </p>
                    <Grid container>
                        <Grid item xs={6}>
                            <p style={{ color: "#FF0000", fontSize: "14px" }}>OUT OF STOCK</p>
                        </Grid>
                        <Grid item xs={6}>
                            <button classes={classes.status_btn} onClick={() => handleChange(props)}>Change Status</button>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        );
    }
}
// return (
//     {
//         out && (
//         <Grid item sm={4}>
//             <div className={classes.invent_item} style={{ background: "#FFFFFF" }}>
//                 <p className={classes.typedish}>{props.name} <span className={classes.cost} >&#36;{props.price}</span></p>
//                 <p>{props.description}</p>
//                 <Grid container>
//                     <Grid item xs={6}>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <button classes={classes.status_btn} onClick={() => handleChange(props)}>Change Status</button>
//                     </Grid>
//                 </Grid>
//             </div>
//         </Grid>
//     )
// }
// );


export default Cardddd;