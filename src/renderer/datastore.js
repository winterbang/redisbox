import Datastore from 'nedb'
// import Store from 'electron-store'
import path from 'path'

// const connections = [
//   {
//     name: 'test',
//     host: 'localhost',
//     port: '2000',
//     auth: '',
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
export default new Datastore({
  autoload: true,
  filename: path.join(__dirname, '/data.db')
})
