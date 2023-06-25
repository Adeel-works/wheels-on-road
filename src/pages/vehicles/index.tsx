import React from "react";
import { DataTable } from "../../components/Table/table";
import { Button } from "../../components/Button/button";
import { useVehicles } from "./useVehicles";
import { Modal } from "../../components/Modal/modal";
import { Input } from "../../components/Input/input";
import { MenuItem, Select } from "@mui/material";
import { Loader } from "../../components/Loader/Loader";

export const Vehicles = () => {

    const { isModalVisible, loader, setModalVisibility, handleInput, handleAddVehicle, isEnabled, vehicle, categories, tableVehicles, handleDelete, setSelectedId, selectedId, setVehicle, handleEdit } = useVehicles()

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'company', headerName: 'Company', width: 150 },
        { field: 'color', headerName: 'Color', width: 150 },
        { field: 'variant', headerName: 'Variant', width: 150 },
        { field: 'category', headerName: 'Category', width: 150 },
        {
            field: "action",
            headerName: "Action",
            width: 300,
            sortable: false,
            renderCell: (params: any) => {
                return <div style={{ flexDirection: 'row', display: 'flex' }}>
                    <div style={{ backgroundColor: 'red', borderRadius: 8, padding: 4, margin: 2 }} onClick={() => handleDelete(params?.row?.id)}>Delete</div>
                    <div style={{ backgroundColor: 'grey', borderRadius: 8, padding: 4, margin: 2 }} onClick={() => {
                        setSelectedId(params?.row?.id)
                        setVehicle({
                            name: params?.row?.name,
                            company: params?.row?.company,
                            color: params?.row?.color,
                            category: params?.row?.category,
                            variant: params?.row?.variant,
                        })
                        setModalVisibility(true)
                    }}>Update</div>
                </div>;
            }
        }
    ];
    const rows = tableVehicles;

    return (
        loader ? <div style={{ minWidth: '80vw', display: 'flex', justifyContent: 'center' }}> <Loader /> </div> :
            <React.Fragment>
                <div style={{ flexDirection: 'column', display: 'flex' }}>
                    <div style={{ alignSelf: 'flex-end' }}>
                        <Button onClick={() => setModalVisibility(true)}>Add New</Button>
                    </div>

                    {rows && rows?.length ?
                        <DataTable columns={columns} rows={rows} /> : <div style={{ minWidth: '80vw' }}><h1>No data</h1></div>}
                </div>
                <Modal
                    setVisibility={setModalVisibility}
                    children={<div>
                        <Input value={vehicle.name} style={{ textTransform: 'capitalize' }} placeholder="Enter name" onChange={({ target: { value } }) => handleInput('name', value)} />
                        <Input value={vehicle.company} style={{ textTransform: 'capitalize' }} placeholder="Enter company" onChange={({ target: { value } }) => handleInput('company', value)} />
                        <Input value={vehicle.color} style={{ textTransform: 'capitalize' }} placeholder="Enter color" onChange={({ target: { value } }) => handleInput('color', value)} />
                        <Input value={vehicle.variant} style={{ textTransform: 'capitalize' }} placeholder="Enter variant" onChange={({ target: { value } }) => handleInput('variant', value)} />

                        {categories && categories?.length ?
                            <Select
                                style={{ minWidth: 330 }}
                                value={vehicle.category}
                                label="Age"
                                onChange={({ target: { value } }) => handleInput('category', value)}
                            >
                                {categories.map((i: any) =>
                                    <MenuItem value={i.categoryId}>{i?.name}</MenuItem>
                                )}
                            </Select> : null}
                        <Button disabled={!isEnabled} onClick={selectedId ? handleEdit : handleAddVehicle}>{selectedId ? 'Update' : 'Add'}</Button>
                    </div>}
                    isVisible={isModalVisible}
                    title={selectedId ? "Add New Vehicle" : "Update Vehicle"} />
            </React.Fragment>
    )
}