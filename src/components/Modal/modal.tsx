import './modal.css'
import { ModalAttributes } from './type'


export const Modal = (props:ModalAttributes) => {

    const {isVisible,setVisibility,title,children} = props

    return (
        isVisible ?
        <div className='main'>
            <div className='container'>
            <div className='header'>
            <h1 className='h1'>{title}</h1>
            <img onClick={()=>setVisibility(false)} src="https://cdn-icons-png.flaticon.com/512/2997/2997911.png " width="20" height="20" alt="" title="" ></img>
            </div>
            {props?.children}
            </div>
        </div> : null 
    )
}