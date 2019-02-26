<template>
  <Breadcrumb separator=">" style="padding: 10px 10px;border-bottom: 1px dashed #ccc;margin-bottom: 10px;">
    <BreadcrumbItem :to="{ name: 'Conns' }">conns</BreadcrumbItem>
    <BreadcrumbItem :to="{ name: 'DbList', params: {id: curConnection._id } }">{{curConnectionName}}</BreadcrumbItem>
    <BreadcrumbItem>
      <select class="form-control" style="width: 80px;" v-model="dbIndex" @change="toDb" >
        <option v-for="i in 16" :value="i-1" :key="i" >DB{{i-1}}</option>
      </select>
    </BreadcrumbItem>
    <BreadcrumbItem :to="{ name: 'Keys', params: {id: dbIndex}, query: {text: keys.slice(0, keys.indexOf(key)+1)}}" v-for="key in keys" :key="key">
      {{ key }}
    </BreadcrumbItem>
  </Breadcrumb>
  <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px 10px;border-bottom: 1px dashed #ccc">
    <el-breadcrumb-item :to="{ name: 'Conns' }">conns</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ name: 'DbList', params: {id: curConnection._id } }">{{curConnectionName}}</el-breadcrumb-item>
    <el-breadcrumb-item>
      <select class="form-control" style="width: 80px;" v-model="dbIndex" @change="toDb" >
        <option v-for="i in 16" :value="i-1" :key="i">DB{{i-1}}</option>
      </select>
    </el-breadcrumb-item>
    <el-breadcrumb-item :to="{ name: 'Keys', params: {id: dbIndex}, query: {text: keys.slice(0, keys.indexOf(key)+1)}}" v-for="key in keys" :key="key">{{key}}</el-breadcrumb-item>
  </el-breadcrumb> -->
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      dbIndex: null,
      keys: []
    }
  },
  methods: {
    toDb () {
      console.log('to db')
      this.$router.push({name: 'Keys', params: { id: this.dbIndex }})
    }
  },
  computed: {
    ...mapState(['curConnectionName']),
    ...mapGetters(['curConnection'])
  },
  watch: {
    $route (to, from) {
      this.dbIndex = to.params.id
      console.log(to)
      console.log('query=========')
      this.keys = to.params.key ? to.params.key.split(':') : to.query.text
    }
    // '$route.params.id': function (id) {
    //
    //   this.$forceUpdate()
    // }
  },
  created () {
    this.dbIndex = this.$route.params.id
    if (this.$route.params.key) this.keys = this.$route.params.key.split(':')
  }
  // beforeRouteEnter (to, from, next) {
  //   console.log('beforeRouteEnter')
  //   next(vm => {
  //     console.log(vm.dbIndex)
  //   })
  // },
  // beforeRouteUpdate (to, from, next) {
  //   console.log(to)
  //   next()
  // }
}
</script>
<style lang="css" scoped>
</style>
