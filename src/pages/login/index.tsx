import { Button } from "../../components/Button/button";
import { Input } from "../../components/Input/input";
import './index.css';
import { useLogin } from "./useLogin";

export const Login = () => {

    const {isEnabled,handleSignIn,handleInput,user} = useLogin();

    return (
        <div className={"login-container"}>
            <h1>Login</h1>
            <Input value={user.email} className="" onChange={({target:{value}})=>handleInput(value,'email')} placeholder="Enter email"/>
            <Input value={user.password} onChange={({target:{value}})=>handleInput(value,'password')} placeholder="Enter password"/>
            <Button onClick={handleSignIn} disabled={!isEnabled}>Sign In</Button>
            <p>Don't have an account ? </p>
            <p>Click here to <a href={'/sign-up'}>sign up</a></p>
        </div>
    )
}