import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Network from "../../../network";

export const useDashboard = () => {

    const [dashboardData,setDashboardData] = useState({
        vehicleCount:0,
        categoryCount:0,
    });

    const navigate = useNavigate()

    const handleNavigate = (route:string) => {
        navigate(`../${route}`,{replace:true})
    }

    const fetchDashboardData = () => {
        Network.get('/dashboard/count').then((res)=>{
            setDashboardData({...dashboardData,
                vehicleCount:res?.data?.items?.vehicles,
                categoryCount:res?.data?.items?.categories
            })
        })
    }

    useEffect(()=>{
        fetchDashboardData()
    },[])

    console.log({dashboardData});
    
    return {
        handleNavigate,
        vehicleCount:dashboardData?.vehicleCount,
        categoryCount:dashboardData?.categoryCount
    }
}