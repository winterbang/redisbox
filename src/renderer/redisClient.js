// import {Client as Ssh} from 'ssh2'
import redis from 'redis'
// import tunnel from 'tunnel-ssh'
// const client = redis.createClient(connection)

function RedisBox () { }
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

// class RedisClient {
//   // 构造函数
//   constructor (connection) {
//     if (!this.clients[connt._id]) {
//       this.clients[connt._id] = redis.createClient(connt)
//     }
//     return this.clients[connt._id]
//     this.connection = connection
//   }
//   // 类中函数
//   toString () {
//     return '(' + this.x + ', ' + this.y + ')'
//   }

//   // 静态函数
//   static sayHello (name) {
//     // 修改静态变量
//     this.para = name
//     return 'Hello, ' + name
//   }
// }

// RedisClient.group = {}

export default function (Vue, options) {
  Vue.prototype.redisClient = function (connection) {
    console.log('=======redisClient')
    const client = RedisBox.getClient(connection)
    // client.monitor(function (err, res) {
    //   if (err) console.log(err)
    //   console.log('Entering monitoring mode.')
    // })
    // client.on('monitor', function (time, args, rawReply) {
    //   console.log(`${time} : ${args} => ${rawReply}`) // 1458910076.446514:['set', 'foo', 'bar']
    // })
    // let config = {
    //   username: 'deploy',
    //   password: 'winter@deploy',
    //   host: '47.75.12.228',
    //   port: 22,
    //   dstHost: '47.75.12.228',
    //   dstPort: 6379
    //   // localHost: '47.75.12.228'
    //   // localPort: 27000
    // }

    // tunnel(config, function () {
    //   // if (error) console.log(error)
    //   let ct = RedisBox.getClient(connection)
    //   console.log('tunnel =============')
    //   ct.info((err, reply) => {
    //     if (err) console.log(err)
    //     console.log('===================')
    //     console.log(reply)
    //   })
    // })

    // let conn = new Ssh()
    // conn.on('ready', function () {
    //   console.log('Client :: ready')
    //   let ct = RedisBox.getClient({
    //     host: '47.75.12.228',
    //     port: 6379
    //   })
    //   ct.info((err, reply) => {
    //     if (err) console.log(err)
    //     console.log(reply)
    //   })
    //   conn.exec('uptime', function (err, stream) {
    //     if (err) throw err
    //     stream.on('close', function (code, signal) {
    //       console.log('Stream :: close :: code: ' + code + ', signal: ' + signal)
    //       conn.end()
    //     }).on('data', function (data) {
    //       console.log('STDOUT: ' + data)
    //     }).stderr.on('data', function (data) {
    //       console.log('STDERR: ' + data)
    //     })
    //   })
    // }).connect(config)
    return client
  }
}
