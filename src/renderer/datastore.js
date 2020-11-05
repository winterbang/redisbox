import Datastore from 'nedb'
// import Store from 'electron-store'
import path from 'path'

// const connections = [
//   {
//     name: 'test',
//     host: 'localhost',
//     port: '2000',
//     auth: '',
//     ssh: {
//        host: '',
//        port: '',
//        username: '',
//        password: '',
//        privateKey: require(fs).readFileSync('/path/to/key'),
//     },
//     _id: 'ACHrT6lwxWZHXXuI'
//   }, {
//     name: 'localhost',
//     host: 'localhost',
//     port: 6379,
//     auth: '',
//     _id: 'Rr8VjZmqxhw6fvtI'}
// ]
// const eledb = new Store({name: 'vuex'})
// eledb.set('state', {unicorn: '🦄', connections})

// import { remote } from 'electron'
const db = new Datastore({
  autoload: true,
  filename: path.join(__dirname, '/data.db')
})

const doc = {
  name: 'localhost',
  host: 'localhost',
  port: 6379,
  auth: ''
}
db.find({ name: 'localhost' }, function (err, docs) {
  if (docs.length === 0) {
    db.insert(doc, function (err, newDoc) {
      console.log(err)
      console.log(newDoc)
    })
  }
  console.log(err)
})

db.install = function (Vue) {
  Vue.prototype.$db = db
}

export default db
