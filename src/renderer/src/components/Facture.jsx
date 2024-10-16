import React from 'react'

export default function Facture({clientInfo}) {
    console.log(clientInfo)
  return (
    <div className='bg-slate-600'>
        <h1>Facture d'achat</h1>
        <div>
            <h2>Informations client</h2>
            <h4>Nom: {clientInfo.nom}</h4>
        </div>
    </div>
  )
}
