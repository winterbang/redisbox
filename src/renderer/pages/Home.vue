<template>
   <div class="box-home">
     <span class="animated bounce" style="font-size: 80px;color: #19be6b;font-weight: 800;text-shadow: 5px 5px 5px #ccc">Redisbox</span>
     <!-- <div>
       广告
     </div> -->
     <Row :gutter="16" style="position: absolute; bottom: 20px;">
        <Col span="24" v-for="tool in buttons" :key="tool.label" @click.native="onButton(tool.label)">
          <Card bordered shadow :style="{background: tool.color}">
            <div style="text-align:center;color: #fff;" >
              <Icon :type="tool.icon" size="40"/>
              <!-- <h5>{{ tool.label }}</h5> -->
            </div>
          </Card>
        </Col>
     </Row>

     <Modal v-model="donateVisible" width="660" footer-hide :mask-closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-card-outline" size="26"></Icon>
        <span>Donate</span>
      </p>
      <div style="display:flex;justify-content: space-around;align-items: center">
        <img src="@/assets/donate_alipay.jpeg" width="200" alt="">
        <img src="@/assets/donate_wechat.jpeg" width="200" alt="">
      </div>
    </Modal>
   </div>
</template>

<script>
// import elemey from './Layouts/Elemey'
// import yummy from '../layouts/Yummy'
import { mapState, mapActions } from 'vuex'
import NewConnection from '@/components/NewConnectionPage/Index'
import NavSider from '@/components/NavSider/index'
// import { remote, shell } from 'electron'
// const { dialog } = remote
export default {
  name: 'home',
  computed: mapState(['connections']),
  components: { NewConnection, NavSider },
  data () {
    return {
      donateVisible: false,
      buttons: [
        {
          label: 'donate',
          icon: 'ios-card-outline',
          color: '#ff9900'
        // }, {
        //   label: 'share',
        //   icon: 'ios-share-alt-outline',
        //   color: '#19be6b'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['setCurConnectionName', 'deleteConnection']),
    onButton (label) {
      switch (label) {
        case 'donate':
          this.donateVisible = true
          break
        case 'share':
          this.$Modal.info({
            title: 'share',
            content: label
          })
          break
      }
    }
  }
}
</script>

<style lang="css">
 .box-home {
   height: 80%;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
 }
</style>
