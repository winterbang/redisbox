const  Datastore = require("nedb");

const db = new Datastore()

const redises = [{
    name: 'localhost',
    host: 'localhost',
    port: '6379',
    color: '#11111'
}, {
    name: 'test',
    host: 'localhost',
    port: '6379'
}]
db.insert(redises, (err, doc) => {
    if(err) console.error(err)
    console.log(doc)
})
export default db