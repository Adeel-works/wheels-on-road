import { Button } from "../../components/Button/button";
import { Input } from "../../components/Input/input";
import './index.css';
import { useSignUp } from "./useSignUp";

export const SignUp = () => {

    const {isEnabled,onClick,handleInput} = useSignUp()
    
    return (
        <div className={"signup-container"}>
            <h1 style={{color:'#fff'}}>Signup</h1>
            <div className="input-section">
            <Input onChange={({target:{value}})=>handleInput(value,'email')} placeholder="Enter email"/>
            <Input onChange={({target:{value}})=>handleInput(value,'password')} placeholder="Enter password"/>
            <Input onChange={({target:{value}})=>handleInput(value,'password')} placeholder="Confirm password"/>
            </div>
            <Button onClick={onClick} disabled={!isEnabled}>Sign up</Button>
            <p>Back to <a href={'/login'}>Login</a></p>

        </div>
    )
}