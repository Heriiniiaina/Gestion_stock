import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import React, { useState } from 'react';

export default function TriCustom({ data, copyData, setCopyData }) {
  const [tri, setTri] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setTri(value);

    let sortedData = [...data]; 

    switch (value) {
      case "defaut":
        sortedData = data; 
        break;
      case "nomC":
        sortedData.sort((a, b) => a.nom.localeCompare(b.nom)); 
        break;
        case "nomD":
        sortedData.sort((a, b) => b.nom.localeCompare(a.nom)); 
        break;
     
      default:
        break;
    }

    setCopyData(sortedData); // Mettez à jour copyData avec les données triées
  };

  return (
    <div>
      <FormControl fullWidth className='w-10' sx={{ width: "200px" }}>
        <InputLabel id="demo-simple-select-label">Trier par</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tri}
          label="Trier par"
          onChange={handleChange} // Appelez handleChange ici
        >
          <MenuItem value="defaut">Par défaut</MenuItem>
          <MenuItem value="nomC">Nom coirssant</MenuItem>
          <MenuItem value="nomD">Nom decroissant</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
