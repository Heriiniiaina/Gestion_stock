import Datastore from "nedb"

const userDb = new Datastore({filename:"./data/users.db",autoload:true})

export default userDb