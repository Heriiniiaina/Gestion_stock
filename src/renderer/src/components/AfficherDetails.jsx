import React, { useEffect, useState } from 'react';

export default function AfficherDetails({ modal, setModal, achat,prixTotal }) {
    

    const [produits, setProduits] = useState([]);
    const  [prix,setPrix] = useState(0)
   
    useEffect(() => {
        if (achat && achat.hist && Array.isArray(achat.hist.produits)) {
            setProduits(achat.hist.produits); // Mettre à jour avec le tableau de produits
        }
    }, [achat]);

    console.log(produits);

    return (
        <div>
            <div>
                <button onClick={() => setModal(false)}>X</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '5px' }}>Nom</th>
                            <th style={{ border: '1px solid #ddd', padding: '5px' }}>Désignation</th>
                            <th style={{ border: '1px solid #ddd', padding: '5px' }}>Prix</th>
                            <th style={{ border: '1px solid #ddd', padding: '5px' }}>Catégorie</th>
                            <th style={{ border: '1px solid #ddd', padding: '5px' }}>Nombre</th>
                            <th style={{ border: '1px solid #ddd', padding: '5px' }}>Total</th>
                        </tr>
                    </thead>
                   <tbody>
                   {produits.map((produit, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #ddd', padding: '5px' }}>{produit.nom}</td>
                                <td style={{ border: '1px solid #ddd', padding: '5px' }}>{produit.designation}</td>
                                <td style={{ border: '1px solid #ddd', padding: '5px' }}>{produit.prix}</td>
                                <td style={{ border: '1px solid #ddd', padding: '5px' }}>{produit.category}</td>
                                <td style={{ border: '1px solid #ddd', padding: '5px' }}>{produit.quantity}</td> 
                                <td style={{ border: '1px solid #ddd', padding: '5px' }}>{Number(produit.prix*Number(produit.quantity))}</td> 
                            </tr>
                        ))}
                        
                   </tbody>
                    <tfoot>
                        <tr>
                            <td className='text-center'  colSpan={2} style={{ border: '1px solid #ddd', padding: '5px' }}>Total</td>
                            <td className='text-center' colSpan={4} style={{ border: '1px solid #ddd', padding: '5px' }}>{prixTotal} MGA</td>
                        </tr>
                    </tfoot>
                       
                 
                </table>
            </div>
        </div>
    );
}
