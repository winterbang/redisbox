
const Datastore = require("nedb-promises");

const db = Datastore.create({filename: './dbs/connection.db', autoload: true})
// console.log(db.load(), 'db=====')
// const redises = [{
//     name: 'localhost',
//     host: 'localhost',
//     port: '6379',
//     color: '#11111'
// }, {
//     name: 'test',
//     host: 'localhost',
//     port: '6379'
// }]
// db.insert(redises, (err, doc) => {
//     if(err) console.error(err)
//     console.log(doc)
// })

// const dbName = "redises";

// var request = indexedDB.open(dbName, 2);

// request.onerror = (event) =>{
//     console.log(`${dbName} 数据表打开失败`) 
//     console.log('Database error:' + event.target.errorCode)   
// };
// request.onsuccess = (event) => {
//     console.log(`${dbName} 数据表打开成功`) 
// };
export default db