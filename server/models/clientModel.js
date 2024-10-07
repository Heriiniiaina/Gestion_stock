import Datastore from "nedb";

const clientDb = new Datastore({filename:"./data/client.db",autoload:true})

export default clientDb