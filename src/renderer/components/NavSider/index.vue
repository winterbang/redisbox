<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'nav-sider',
  data () {
    return {
      navs: [
        {
          label: 'conns',
          icon: 'ios-apps-outline'
        }, {
          label: 'setting',
          icon: 'ios-cog-outline'
        }, {
          label: 'feedback',
          icon: 'ios-chatboxes-outline'
        }, {
          label: 'information',
          icon: 'ios-information-circle-outline'
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
    // console.log(this.$route.matched[0])
  }
  // beforeRouteUpdate (to, from, next) {
  //   console.log(to.name.toLowerCase())
  //   console.log('to.name.toLowerCase()')
  //   this.activeLabel = to.name.toLowerCase()
  //   next()
  // }
}
</script>
