import clientDb from "../models/clientModel.js";
import validator from "validator"
export const addClient = async (req,res)=>{
    const {nom,prenom,email,telephone} = req.body
    if(!nom || !prenom || !email || !telephone) 
        return res.status(400).json({
            success:false,
            message:"Veuillez remplir le formulaire"
        })
    if(telephone.length !=10)
        return res.status(400).json({
            success:false,
            message:"Numero non valide"
        })
    if(!validator.isEmail(email))
        return res.status(400).json({
            success:false,
            message:"Email non valide"
        })
    const newClient = {nom,prenom,email,telephone}
    clientDb.insert(newClient,(err,client)=>{
        if(err)
            return res.status(500).json({
                success:false,
                message:"Erreur d'enregistrement",
                err
            })
            return res.status(200).json({
                success:true,
                message:"Client ajouté"
            })
    })
    
}

