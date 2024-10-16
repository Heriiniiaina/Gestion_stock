import achatsDb from "../models/achatModel.js";

export const addAchat = async(req,res)=>{
    const {produits,client,totalPrix} = req.body
    const achat = {produits,client}
    const hist = {nom:client.nom, email:client.email,telephone:client.telephone,clientId:client._id,prix:totalPrix,produits}
    achatsDb.insert({hist},(err,achat)=>{
        if(err)
            res.status(500).json({
                success:false,
                message:"Erreur de serveur"
            })
        res.status(200).json({
            success:true,
            message:"Achat reussi"

        })
    })
}