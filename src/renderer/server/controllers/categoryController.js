import categoryDb from "../models/categoryModel";
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}




export const addCategory = async (req,res)=>{
    const {nom} = req.body
    if(!nom) 
        return res.status(200).json({
            success:false,
            message:"Veillez remplir le formulaire"
        })
    const categoryName = capitalizeFirstLetter(nom)
    const newCategory = {categoryName}
    await categoryDb.findOne({categoryName},(err,category)=>{
        if(category)
            return res.status(400).json({
                success:false,
                message:"Categorie existe déja"
            })
        categoryDb.insert(newCategory,(err,category)=>{
                if(err)
                    return res.status(400).json({
                        success:false,
                        message:"Erreur base de donnéés"
                    })
                return res.status(200).json({
                    success:true,
                    message:"Catégorie ajouté avec succées"
                })
        })
    })
    
}

export const getAllCategory = async (req,res)=>{
    categoryDb.find({},(err,category)=>{
        if(err)
            res.status(400).json({
                success:false,
                message:"Erreur base de donnéés"
            })
        res.status(200).json({
            success:true,
            message:"Reussi",
            category
        })
    })
}
export const deleteCategory = async(req,res)=>{
    const id = req.params.id
    categoryDb.remove({_id:id},{},(err,removed)=>{
        if(err)
            return res.status(400).json({
                success:false,
                message:"Erreur de suppression"
            }) 
        else if(removed==0)
            return res.status(400).json({
                success:false,
                message:"Auccun donnéés à supprimer"  
    })
        res.status(200).json({
            success:true,
            message:"Category supprimer"

        })
    })
}