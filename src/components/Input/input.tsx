import React from "react";
import './input.css'

export const Input = (props:React.InputHTMLAttributes<HTMLInputElement>) => {

    return(
        <input {...props}  />
    )
}