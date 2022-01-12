const {createClient} = require('redis')
import db from './database.js'
const clients = {}
const handler = {
    get(obj, prop) {
        if(obj[prop]) return obj[prop]
        return db.findOne({_id: prop}).then(doc => {
            const client = createClient(`${doc.host}:${doc.name}`)
            clients[prop] = client
            client.on('error', (err) => console.log('Redis Client Error', err));
            client.connect();
            return client
        })
        
    },
    apply(target, thisArg, argumentsList) {
        return target(...argumentsList)
    }
};
let clientProxy = new Proxy(clients, handler)

export default clientProxy