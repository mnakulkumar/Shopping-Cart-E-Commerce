const mongoClient=require('mongodb').MongoClient
const state={
    db:null
}


module.exports.connect=function(done){ //done is a call back
    const url='mongodb://localhost:27017'
    const dbname='shopping'

    mongoClient.connect(url,(err,data)=>{ // data has "connection" part of database
        if(err) return done(err)
        state.db=data.db(dbname)
        done() //calls the callback function in db.connect method call in app.js
    })

    

}

module.exports.get=function(){
    return state.db // returns the actual database
}