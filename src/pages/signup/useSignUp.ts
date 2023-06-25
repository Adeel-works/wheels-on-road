import { useMemo, useState } from "react";
import { User } from "./type";

export const useSignUp = () => {

    const [user,setUser] = useState<User>({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    });
    
    const handleInput = (value:string,key:'name'|'email'|'password'|'confirmPassword') => {
        setUser({...user,[key]:value})
    }

    const isEnabled = useMemo(()=>{
        return !!(user.email.length>0 && user.password?.length>0)
    },[user])

    const onClick = () => {   
        
    }

    return {
    handleInput,
    onClick,
    user,
    isEnabled
    }
}
