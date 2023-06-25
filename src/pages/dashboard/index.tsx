import React from "react";
import './index.css'
import { useDashboard } from "./useDashboard";

export const Dashboard = () => {

    const {handleNavigate,vehicleCount,categoryCount} = useDashboard()

    return(
        <React.Fragment>
            {/* <div style={{flexDirection:'column',display:'flex'}}> */}
            <div className="main">
                <div className="card" onClick={()=>handleNavigate('categories')}>
                    <h1 className="h1">Categories</h1>
                    <h1 className="h1">{categoryCount}</h1>
                </div>
                
                <div className="card"  onClick={()=>handleNavigate('vehicles')}> 
                    <h1 className="h1">Vehicles</h1>
                    <h1 className="h1">{vehicleCount}</h1>
                </div>
            </div>
            {/* </div> */}
        </React.Fragment>
    )
}