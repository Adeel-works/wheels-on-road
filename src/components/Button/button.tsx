import React from "react";
import './button.css'

export const Button = (props:React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    return(
        <div>
            <button className={"btn"} {...props}/>
        </div>
    )

}

