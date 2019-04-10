<template>
  <div style="padding: 10px;">
    <h1>LOG</h1>
    <p v-for="log in logs">{{ log }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'console',
  computed: mapGetters(['curConnection']),
  data () {
    return {
      logs: []
    }
  },
  created () {
    let client = this.redisClient(this.curConnection)
    console.log(client)
    client.monitor((err, res) => {
      if (err) console.log(err)
      console.log('Entering monitoring mode.')
    })
    client.on('monitor', (time, args, rawReply) => {
      console.log(`${time} : ${args} => ${rawReply}`) // 1458910076.446514:['set', 'foo', 'bar']
      this.logs.push(`${time} : ${args} => ${rawReply}`)
    })
    // client.quit()
  }
}
</script>

<style lang="css" scoped>
</style>
