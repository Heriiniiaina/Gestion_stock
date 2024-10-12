import Datastore from "nedb"
import path from "path"
import {app} from "electron"
const dbpath = path.join(app.getPath("userData"),"data","products.db")
const productDb = new Datastore({filename:dbpath,autoload:true})

export default productDb