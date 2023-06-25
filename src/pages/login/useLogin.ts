import { useContext, useEffect, useMemo, useState } from "react";
import Network from '../../../network'; 
import { Auth, User } from "./type";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



export const useLogin = () => {

    const context = useContext<Auth>(AuthContext)
    const navigate = useNavigate()


    const [user,setUser] = useState<User>({
        email:'manager@gmail.com',
        password:'Admin@123'
    });
    
    const handleInput = (value:string,key:'email'|'password') => {
        setUser({...user,[key]:value})
    }

    useEffect(()=>{
        if(context.auth!=null && JSON.parse(context?.auth)){
            navigate(`../${'home'}`,{replace:true})
        }
    },[context])


    const isEnabled = useMemo(()=>{
        return !!(user.email.length>0 && user.password?.length>0)
    },[user])

    const handleSignIn = () => {   
        Network.post('/auth',{...user}).then((res)=>{
            console.log(res?.data);
            navigate(`../`,{replace:true})
            context.setAuth(res?.data);
            // localStorage.setItem('auth',res?.data)
        }).catch(err=>{
            
            toast(err.response.data?.message,{position:'bottom-center',type:'error'})
        })
    }

    return {
    handleInput,
    handleSignIn,
    user,
    isEnabled
    }
}
