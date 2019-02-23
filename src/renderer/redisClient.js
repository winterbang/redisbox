import redis from 'redis'
// const client = redis.createClient(connection)
export default function (Vue, options) {
  Vue.prototype.redisClient = function (connection) {
    let client = redis.createClient(connection)
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
