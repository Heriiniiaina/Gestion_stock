import userDb from "../models/userModel.js"
import validator from "validator"

import bcryptjs from "bcryptjs"
export const addUser =async (req,res,next)=>{
    const {username,nom,prenom,email,password} = req.body
    if(!username || !nom || !prenom || !email || !password )
        return res.status(400).json({
            success:false,
            message:"Veilllez remplir le formulaire"
        })

        if(!validator.isEmail(email))
            return res.status(400).json({
                success:false,
                message:"Email non valide"
            })
        if(password.length < 6){
            return res.status(400).json({
                success:false,
                message:"Le mot de passe doit au moins contenir 6 caractères"
            })
        }
    const hasp = await bcryptjs.hash(password,10)
    
    const newUser = {username,nom,prenom,email,password: hasp} 
    await userDb.findOne({username},(err,user)=>{
        if(user)
            return res.status(400).json({
                success:false,
                message:"Un utilisateur avec cette userName exist déja"
            })
            userDb.insert(newUser,(err,user)=>{
                if(err)
                    return res.status(400).json({
                        success:false,
                        message:"Erreur ajout d'user"
                    })
                res.status(200).json({
                    success:true,
                    message:"Ajout reussi"
                })
            })
    })  
}

export const loginUser= async (req,res,next)=>{
    const {username,password } = req.body
    if(!password || !username )
        return res.status(400).json({
            success:false,
            message:"Veuillez remplier le formulaire"
        })
    await userDb.findOne({username},async(err,user)=>{
        if(!user)
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        const isPassword = await bcryptjs.compare(password,user.password)
        if(!isPassword){
            return res.status(400).json({
                success:false,
                message:"Mot de passe incorrect"
            })
        }
        res.status(200).json({
            success:true,
            message:"Login reussi",
            user
        })
    })
}