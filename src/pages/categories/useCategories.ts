import { useEffect, useMemo, useState } from "react";
import Network from "../../../network";
import { toast } from "react-toastify";

export const useCategories = () => {

    const [categories,setCategories] = useState({
        categoryId:'',
        name:'',
    });

    const [tableCategories,setTableCategories] = useState([]);
    const [selectedId,setSelectedId] = useState<string>('')

    const [isModalVisible,setModalVisibility] = useState<boolean>(false);

    useEffect(()=>{
        fetchAllCategories()
    },[])

    const fetchAllCategories = () => {
        Network.get('/category/all').then((res)=>{
            console.log({res:res?.data});
            res?.data?.items?.forEach((i:any)=>{
                i.id = i._id
            })
            setTableCategories(res?.data?.items)
        })
    }

    const handleDelete = (id:string) => {
        Network.delete(`category/${id}`).then((res)=>{
            console.log({res:res?.data});
            fetchAllCategories()
        }).then((res: any) => {
            console.log({ res: res?.data?.message });
            toast('Deleted successfully', { position: 'top-right', type: 'success' })
        }).catch(err => {
            toast(err?.response?.data?.message, { position: 'top-right', type: 'error' })

        })
    }
 

    const handleInput = (value:string) => {
        setCategories({...categories,name:value,categoryId:value.toLowerCase()})
    }

    const handleAddCategory = () => {
        Network.post('/category/add',{...categories}).then((res)=>{
            console.log({res:res?.data});
            setModalVisibility(false)
            setCategories({name:'',categoryId:''})
            fetchAllCategories()
        }).then((res: any) => {
            console.log({ res: res?.data?.message });
            toast('Added successfully', { position: 'top-right', type: 'success' })
        }).catch(err => {
            toast(err?.response?.data?.message, { position: 'top-right', type: 'error' })
        })
    }

    const handleEdit = () => {
        
        Network.put(`/category/${selectedId}`,{...categories}).then((res)=>{
            console.log({res:res?.data});
            setModalVisibility(false)
            setCategories({name:'',categoryId:''})
            fetchAllCategories()
        }).then((res: any) => {
            console.log({ res: res?.data?.message });
            toast('Updated successfully', { position: 'top-right', type: 'success' })
        }).catch(err => {
            toast(err?.response?.data?.message, { position: 'top-right', type: 'error' })
        })
    }

    const isEnabled = useMemo(()=>{
        return !!(categories.name && categories.categoryId)
    },[categories])

    return {
        categories,
        setModalVisibility,
        fetchAllCategories,
        setSelectedId,
        selectedId,
        handleEdit,
        tableCategories,
        handleDelete,
        isEnabled,
        handleAddCategory,
        handleInput,
        isModalVisible
    }

}

