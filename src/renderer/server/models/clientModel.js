import Datastore from "nedb"
import path from "path"
import {app} from "electron"
const dbpath = path.join(app.getPath("userData"),"data","client.db")
const clientDb  = new Datastore({filename:dbpath,autoload:true})

export default clientDb 