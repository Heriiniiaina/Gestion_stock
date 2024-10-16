import Datastore from "nedb"
import path from "path"
import {app} from "electron"
const dbpath = path.join(app.getPath("userData"),"data","achats.db")
console.log(path.dirname(dbpath))
const achatsDb = new Datastore({filename:dbpath,autoload:true})

export default achatsDb