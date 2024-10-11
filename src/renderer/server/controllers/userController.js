import userDb from "../models/userModel.js"
import bcrypt from "bcrypt"
export const addUser =async (req,res,next)=>{
    const {username,nom,prenom,email,password} = req.body
    if(!username || !nom || !prenom || !email || !password )
        return res.status(400).json({
            success:false,
            message:"Veilllez remplir le formulaire"
        })
    const hashedPassword =  await bcrypt.hash(password,10)
    const newUser = {username,nom,prenom,email,password: hashedPassword} 
    await userDb.findOne({username},(err,user)=>{
        if(user)
            return res.status(400).json({
                success:false,
                message:"Exist user"
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
        const isPassword = await bcrypt.compare(password,user.password) 
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