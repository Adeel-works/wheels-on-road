import React from "react"

export type ModalAttributes = {
isVisible:boolean,
setVisibility:(state:boolean)=>void,
title:string,
children:React.ReactNode
}