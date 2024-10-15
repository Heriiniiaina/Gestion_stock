import productDb from "../models/productModel.js";

export const addProduct = async (req,res)=>{
    const {nom,prix,designation,category,stock} = req.body
    if(!nom || !prix || !designation || !category || !stock )
        return res.status(400).json({
            success:false,
            message:"Veuillez remplir le formulaire"
        })
    
    const newProduct = {nom,prix:Number(prix),designation,category,stock:Number(stock) }
    await productDb.insert(newProduct,(err,product)=>{
        res.status(200).json({
            success:true,
            message:"Produit ajouté avec joué"
        })
    })
}

export const getAllProduct = async(req,res)=>{
    productDb.find({},(err,products)=>{
        if(err)
            return res.status(500).json({
                success:false,
                message:"Il y a une erreur",
                err
            })
        res.status(200).json({
            success:true,
            message:"Liste produit: ",
            products
        })
    })
}

export const deleteProduct = async (req,res)=>{
    const id = req.params.id
    productDb.remove({_id:id},{},(err,removed)=>{
        if(err)
            return res.status(500).json({
                success:false,
                message:"Erreur de serveur"
            })
        if(removed==0)
            return res.status(400).json({
                success:false,
                message:"Auccun données supprimer"
            })
        res.status(200).json({
            success:true,
            message:"Produit supprimer"
        })
    })

}

export const updateProduct = async (req,res)=>{
    const {nom,prix,designation,category,stock} = req.body
    const id =req.params.id
    const updata =  {nom,prix,designation,category,stock}
    productDb.update({_id:id},{$set: updata},{},(err,remplaced)=>{
        if(err)
            return res.status(500).json({
                success:false,
                message:"Erreur de serveur"
            })
        res.status(200).json({
            success:true,
            message:"Données mis à jour"
        })
    })
}