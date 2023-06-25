import { useContext, useEffect } from 'react'
import { Button } from '../../components/Button/button'
import './index.css'
import { AuthContext } from '../../context'

export const Header = () => {

    const credentials = useContext(AuthContext)

    

    return (
        <div className='header-container'> 
            <div>
                    <Button onClick={()=>{
                        credentials.setAuth(null)
                        localStorage.removeItem("auth")
                        location.replace('/login')

                    }}>Logout</Button>

            </div>
        </div>
    )
}