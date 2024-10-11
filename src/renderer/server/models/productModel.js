import Datastore from "nedb";

const productDb = new Datastore({filename:"./data/products.db",autoload:true})

export default productDb