<template src="./template.html"></template>
<style src="./style.less" lang="less" scoped></style>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'nav-sider',
  data () {
    return {
      navs: [
        {
          label: 'conns',
          icon: 'database'
        }, {
          label: 'setting',
          icon: 'setting'
        }, {
          label: 'feedback',
          icon: 'message'
        }, {
          label: 'information',
          icon: 'info-circle'
        }
      ],
      activeLabel: ''
    }
  },
  computed: {
    ...mapState(['curConnectionName'])
  },
  methods: {
    ...mapActions(['increment']),
    onNav (label) {
      console.log(label)
      let routerName = label.charAt(0).toUpperCase() + label.slice(1)
      this.$router.push({name: routerName})
      this.activeLabel = label
    }
  },
  created () {
    console.log(this.curConnectionName)
    console.log(this.$route.name)
  }
  // beforeRouteUpdate (to, from, next) {
  //   console.log(to.name.toLowerCase())
  //   console.log('to.name.toLowerCase()')
  //   this.activeLabel = to.name.toLowerCase()
  //   next()
  // }
}
</script>
