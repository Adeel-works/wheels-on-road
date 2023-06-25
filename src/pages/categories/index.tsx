import React from "react";
import { DataTable } from "../../components/Table/table";
import { Button } from "../../components/Button/button";
import { useCategories } from "./useCategories";
import { Modal } from "../../components/Modal/modal";
import { Input } from "../../components/Input/input";

export const Categories = () => {

    const {isModalVisible,categories,setModalVisibility,setSelectedId,handleInput,handleAddCategory,isEnabled,tableCategories,handleDelete,selectedId,handleEdit} = useCategories()

    const columns = [
        { field: 'name', headerName: 'ID', width: 300 },
        { field: 'categoryId', headerName: 'First name', width: 500 },
        {
            field: "action",
            headerName: "Action",
            width: 300,
            sortable: false,
            renderCell: (params:any) => {
              return <div style={{flexDirection:'row',display:'flex'}}> 
                <div style={{backgroundColor:'red',borderRadius:8,padding:4,margin:2}} onClick={()=>handleDelete(params?.row?.id)}>Delete</div>
                <div style={{backgroundColor:'grey',borderRadius:8,padding:4,margin:2}} onClick={()=>{
                    handleInput(params?.row?.name)
                    setSelectedId(params?.row?.id)
                    setModalVisibility(true)
                    }}>Update</div>
              </div>;
            }
        }
      ];
      const rows = tableCategories;

      console.log({rows});

    return(
        <React.Fragment>
            <div style={{flexDirection:'column',display:'flex'}}>
            <div style={{alignSelf:'flex-end'}}>
            <Button onClick={()=>setModalVisibility(true)}>Add New</Button>
            </div>
            {rows && rows?.length ? 
            <DataTable columns={columns} rows={rows} /> : <div style={{minWidth:'80vw'}}><h1>No data</h1></div> }
            </div>
            <Modal 
            setVisibility={setModalVisibility}
            children={<div>
                <Input value={categories.name} style={{textTransform:'capitalize'}} placeholder="Enter name" onChange={({target:{value}})=>handleInput(value)}/>
                <Button disabled={!isEnabled} onClick={selectedId ? handleEdit : handleAddCategory}>{selectedId ? 'Update' : 'Add'}</Button>
            </div>}
            isVisible={isModalVisible} 
            title="Add New Category"/>
        </React.Fragment>
    )
}