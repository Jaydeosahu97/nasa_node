const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
class Database {
    constructor(uri,options){
        this.uri = uri;
        this.options = options;
    }

    async connect(){
        try {
            await mongoose.connect(this.uri,this.options);
            console.log("Connected to database successfully")
        } catch (error) {
            throw error;
        }
    }

    async disconnect(){
        try{
            await mongoose.disconnect();
            console.log("Database disconnected successfully");
        }catch(err){
            console.log("Error disconnecting from the database");
            console.log(err);
        }
    }
}

module.exports = Database;