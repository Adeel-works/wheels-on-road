import { useEffect, useMemo, useState } from "react";
import Network from "../../../network";
import { toast } from "react-toastify";

type Vehicle = 'name' | 'category' | 'color' | 'variant' | 'company'

export const useVehicles = () => {

    const [vehicle, setVehicle] = useState({
        name: '',
        category: '',
        color: '',
        variant: '',
        company: '',

    });

    const [categories, setCategories] = useState([]);
    const [loader, setLoader] = useState<boolean>(false);

    const [tableVehicles, setTableVehicles] = useState([]);
    const [selectedId, setSelectedId] = useState<string>('')

    const [isModalVisible, setModalVisibility] = useState<boolean>(false);

    useEffect(() => {
        Promise.all([fetchAllCategories(), fetchAllVehicles()])
    }, [])

    const fetchAllVehicles = () => {
        setLoader(true);
        Network.get('/vehicle/all').then((res) => {
            console.log({ res: res?.data });
            res?.data?.items?.forEach((i: any) => {
                i.id = i._id
            })
            setTableVehicles(res?.data?.items)
            setLoader(false)
        })
    }

    const fetchAllCategories = () => {
        Network.get('/category/all').then((res) => {
            console.log({ res: res?.data });
            res?.data?.items?.forEach((i: any) => {
                i.id = i._id
            })
            setCategories(res?.data?.items)
        })
    }

    const handleDelete = (id: string) => {
        Network.delete(`vehicle/${id}`).then((res) => {
            console.log({ res: res?.data });
            fetchAllVehicles()
        }).then((res: any) => {
            console.log({ res: res?.data?.message });
            toast('Deleted successfully', { position: 'top-right', type: 'success' })
        }).catch(err => {
            toast(err?.response?.data?.message, { position: 'bottom-center', type: 'error' })

        })
    }


    const handleInput = (key: Vehicle, value: string) => {
        setVehicle({ ...vehicle, [key]: value })
    }

    const handleAddVehicle = () => {
        Network.post('/vehicle/add', { ...vehicle }).then((res) => {
            console.log({ res: res?.data });
            setModalVisibility(false)
            setVehicle({
                name: '',
                category: '',
                color: '',
                company: '',
                variant: ''
            })
            fetchAllVehicles()
        }).then((res:any )=> {
            toast(res?.data?.message, { position: 'top-right', type: 'success' })
            

        }).catch(err => {
            toast(err?.response?.data?.message, { position: 'bottom-center', type: 'error' })


        })
    }

    const handleEdit = () => {

        Network.put(`/vehicle/${selectedId}`, { ...vehicle }).then((res) => {
            console.log({ res: res?.data });
            setModalVisibility(false)
            setVehicle({
                name: '',
                category: '',
                color: '',
                company: '',
                variant: ''
            })
            fetchAllVehicles()
        }).then((res:any) => {
            toast('Update successfully', { position: 'top-right', type: 'success' })

        }).catch(err => {
            toast(err?.response?.data?.message, { position: 'bottom-center', type: 'error' })


        })
    }

    const isEnabled = useMemo(() => {
        return !!(vehicle.name && vehicle.color && vehicle.company && vehicle.variant)
    }, [vehicle])

    return {
        vehicle,
        setModalVisibility,
        fetchAllVehicles,
        fetchAllCategories,
        setSelectedId,
        categories,
        selectedId,
        setVehicle,
        handleEdit,
        tableVehicles,
        handleDelete,
        isEnabled,
        handleAddVehicle,
        loader,
        handleInput,
        isModalVisible
    }

}

