const {createClient} = require('redis')
import db from './database.js'
const clients = {}
let curRedisIndex = null
const handler = {
    get(obj, prop) {
        if(prop in obj) {
            curRedisIndex = prop
            return obj[prop]
        }
        if(curRedisIndex) {
            if(obj[curRedisIndex].hasOwnProperty(prop)) return obj[curRedisIndex][prop]
            else {
                console.log(prop, 'prop =============')
                return
            }
        }
        return db.findOne({_id: prop}).then(doc => {
            let client = createClient(`${doc.host}:${doc.name}`)
            client.on('error', (err) => console.log('Redis Client Error', err));
            client.connect();
            clients[prop] = client
            return client
        })
        
    },
};
let clientProxy = new Proxy(clients, handler)

export default clientProxy