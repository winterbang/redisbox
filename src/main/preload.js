window.ipcRenderer = require('electron').ipcRenderer;
const { contextBridge } = require('electron')
// const redis = require('redis')

// contextBridge.exposeInMainWorld('subWindow', {
//   newConnection: () => {
//     console.log('subWindow new connection ======')
//     ipcRenderer.invoke('subWindow')
//   }
// })
// const clients = {}

// contextBridge.exposeInMainWorld('redis', redis)
// contextBridge.exposeInMainWorld('redis', {
//     createClient: async(url) => {
//         // if(clients[url]) return clients[url]

//         const client = redis.createClient();
//         client.on('error', (err) => console.log('Redis Client Error', err));
//         await client.connect();
//         // clients[url] = client
//         console.log(client.keys('*'))
//         console.log('client', client)
        
//         // return client
//         const handler = {
//             get(obj, prop) {
//                 return prop in obj ? obj[prop] : null;
//             },
//             apply(target, thisArg, argumentsList) {
//                 return target(...argumentsList)
//             }
//         };
//         let clientProxy = new Proxy(client, handler)
//         clients[url] = clientProxy
//         console.log('=======')
//         return clientProxy
//         // await client.set('key', '11111');
//         // const value = await client.get('key');
//         // console.log(value)
//     },
//     clients
// })