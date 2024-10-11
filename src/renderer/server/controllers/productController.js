import productDb from "../models/productModel.js";

export const addProduct = async (req,res)=>{
    const {nom,prix,designation,category,stock} = req.body
    if(!nom || !prix || !designation || !category || !stock )
        return res.status(400).json({
            success:false,
            message:"Veuillez remplir le formulaire"
        })
    const newProduct = {nom,prix,designation,category,stock}
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

