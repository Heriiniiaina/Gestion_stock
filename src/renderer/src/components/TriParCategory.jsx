import React, { useState,useEffect } from 'react'
import {FormControl,Select,MenuItem} from "@mui/material"
import axios from 'axios'
export default function TriParCategory({ data, copyData, setCopyData }) {
    const [tri, setTri] = useState("defaut")
    const [listCategory, setListCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/category/getAllCategory')
                setListCategory(response.data.category)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])
    useEffect(()=>{
        if(tri!="defaut")
            setCopyData(data.filter(e=>e.category == tri))
        else setCopyData(data)
    },[tri])
    console.log(listCategory)
    return (
        <div>
            <FormControl sx={{ width: "200px" }}>
                <Select
                    value={tri}
                    onChange={e => setTri(e.target.value)}
                    displayEmpty
                    variant="outlined"
                    required
                >
                    <MenuItem value="defaut">
                       Tout
                    </MenuItem>
                    {
                        listCategory?.map((cat, index) => (
                            <MenuItem key={index} value={cat.categoryName}>{cat.categoryName}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    )
}
