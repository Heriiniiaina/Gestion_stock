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