import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function Facture({ clientInfo, cart,totalPrice,montant}) {
  console.log(clientInfo)
  const exportToPdf = ()=>{

  }
  return (
    <div className='bg-slate-600 p-3 leading-loose'>
      <h1>Facture d'achat</h1>
      <div>
        <h2>Informations client</h2>
        <h4>Nom: {clientInfo.nom}</h4>
        <h4>Email: {clientInfo.email}</h4>
        <h4>Téléphone: {clientInfo.telephone}</h4>
      </div>
      <div>
        <TableContainer >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Prix Unitaire</TableCell>
                <TableCell>Quantité</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                cart.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.nom}</TableCell>
                    <TableCell>{item.designation}</TableCell>
                    <TableCell>{item.prix} MGA</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.prix * item.quantity} MGA</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell colSpan={3}>{totalPrice} MGA</TableCell>
                </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      <div>
              <div className='flex items-center gap-3'>
                <h4>Total à payer:</h4>
                <h4>{totalPrice}</h4>
              </div>
              <div className='flex items-center gap-3'>
                <h4>Montant:</h4>
                <h4>{montant}</h4>
              </div>
              <div className='flex items-center gap-3'>
                <h4>Reste:</h4>
                <h4>{montant - totalPrice}</h4>
              </div>
      </div>
      <Button onClick={()=>exportToPdf()} variant='contained'>Exporter en pdf</Button>
    </div>
  )
}
