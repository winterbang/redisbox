const {createClient} = require('redis')

const client = {}
const handler = {
    get(obj, prop) {
        if(obj[prop]) return obj[prop]
        const client = createClient(prop)
        client.on('error', (err) => console.log('Redis Client Error', err));
        client.connect();
        return client
    },
    apply(target, thisArg, argumentsList) {
        return target(...argumentsList)
    }
};
let clientProxy = new Proxy(client, handler)

export default clientProxy