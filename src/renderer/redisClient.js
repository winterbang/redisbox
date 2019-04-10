import redis from 'redis'
// const client = redis.createClient(connection)

function RedisBox () {}
// // 原型扩展类的一个方法getName()
// RedisBox.prototype.getName = function() {
//   console.log(this.name)
// }

RedisBox.clients = {}
RedisBox.getClient = function (connt) {
  console.log(this.clients[connt._id])
  if (!this.clients[connt._id]) {
    this.clients[connt._id] = redis.createClient(connt)
  }
  return this.clients[connt._id]
}
// RedisClient.getInstance = (function() {
//   var instance = null
//   return function(name) {
//     if(!this.instance) {
//       this.instance = new Singleton(name)
//     }
//     return this.instance
//   }
// })()

export default function (Vue, options) {
  Vue.prototype.redisClient = function (connection) {
    console.log('=======redisClient')
    let client = RedisBox.getClient(connection)
    // client.monitor(function (err, res) {
    //   if (err) console.log(err)
    //   console.log('Entering monitoring mode.')
    // })
    // client.on('monitor', function (time, args, rawReply) {
    //   console.log(`${time} : ${args} => ${rawReply}`) // 1458910076.446514:['set', 'foo', 'bar']
    // })
    return client
  }
}
