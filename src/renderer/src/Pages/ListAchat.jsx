import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaCartPlus, FaEdit, FaInfoCircle, FaTrash } from 'react-icons/fa'
import AfficherDetails from '../components/AfficherDetails'

export default function ListAchat() {
    const [achats,setAchtas] = useState([])
    const [modal,setModal] = useState(false)
    const [achat,setAchat] = useState({})
    useEffect(()=>{
        axios.get("http://localhost:8000/achat/getAchat").then(res=>{
            setAchtas(res.data.achats)
           
        })
    },[])
    console.log(achats)
  return (
    <div>
        <table style={{ borderCollapse: 'collapse', width: '100%' }} className="">
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '5px' }}>Nom</th>
            <th style={{ border: '1px solid #ddd', padding: '5px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '5px' }}>telephone</th>
            <th style={{ border: '1px solid #ddd', padding: '5px' }}>Achat</th>

          </tr>
        </thead>
        <tbody>
          {achats.map((item,index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '5px' }}>{item.hist.nom}</td>
              <td style={{ border: '1px solid #ddd', padding: '5px' }}>{item.hist.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '5px' }}>{item.hist.telephone}</td>
              <td style={{ border: '1px solid #ddd', padding: '5px' }}>{item.hist.prix} MGA</td>
             
              <td className='' style={{ border: '1px solid #ddd', padding: '5px' }}>
                <div className='flex justify-center gap-3'>
                  <button onClick={()=>{
                    setModal(true)
                    setAchat(item)
                  }} className='flex items-center text-sm  bg-slate-900 text-[#f82981] p-1 rounded-md'><FaInfoCircle/> Détails </button>
                
                 
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={modal ? "block" :"opacity-0"}>
          <AfficherDetails modal={modal} setModal={setModal} achat={achat}/>
      </div>
    </div>
  )
}
