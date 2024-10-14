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
            message:"Numero non valide! Le numero doit avoir exactement 10 caracteres"
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
export const getAllClient = async(req,res)=>{
        clientDb.find({},(err,clients)=>{
            if(err)
                return res.status(500).json({
                    success:false,
                    message:"Il y a une erreur",
                    err
                })
            res.status(200).json({
                success:true,
                clients
            })
        })
}
export const deleteClient = async (req,res)=>{
    const id = req.params.id
    clientDb.remove({_id:id},{},(err,removed)=>{
        if(err)
            return res.status(500).json({
                success:false,
                message:"Erreur serveur"
            })
        if(removed==0)
            return res.status(400).json({
                success:false,
                message:"Auccun données supprimer"
            })
        res.status(200).json({
            success:true,
            message:"Client supprimer"
        })
    })
}

export const updateClient = async (req,res)=>{
    const {nom,prenom,email,telephone} = req.body
    if(!nom || !prenom || !email || !telephone) 
        return res.status(400).json({
            success:false,
            message:"Veuillez remplir le formulaire"
        })
    if(telephone.length !=10)
        return res.status(400).json({
            success:false,
            message:"Numero non valide! Le numero doit avoir exactement 10 caracteres"
        })
    if(!validator.isEmail(email))
        return res.status(400).json({
            success:false,
            message:"Email non valide"
        })
    const id = req.params.id
    const updata = {nom,prenom,email,telephone}
    clientDb.update({_id:id},{$set:updata},{},(err,uptdated)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    message:"Erreur serveur"

                })
            }
            res.status(200).json({
                success:true,
                message:"Client a été mis à jour"

            })
    })
}
