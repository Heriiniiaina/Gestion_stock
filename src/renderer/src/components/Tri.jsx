import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import React, { useState } from 'react';

export default function Tri({ data, copyData, setCopyData }) {
  const [tri, setTri] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setTri(value);

    let sortedData = [...data]; 

    switch (value) {
      case "defaut":
        sortedData = data; 
        break;
      case "prix-down":
        sortedData.sort((a, b) => Number(b.prix) - Number(a.prix));
        break;
    case "prix-up":
            sortedData.sort((a, b) => Number(a.prix) - Number(b.prix));
            break;
      case "nom":
        sortedData.sort((a, b) => a.nom.localeCompare(b.nom)); 
        break;
        case "nomD":
        sortedData.sort((a, b) => b.nom.localeCompare(a.nom)); 
        break;
      case "date":
        
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
          <MenuItem value="prix-up">Prix croissant</MenuItem>
          <MenuItem value="prix-down">Prix décroissant</MenuItem>
          <MenuItem value="nom">Nom</MenuItem>
          <MenuItem value="nomD">Nom decroissant</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
