<template> 
    <section style="position: fixed;"></section>
    <!-- <div class="title-bar">
        <div class="menus-l" :style="{width: fold ? '60px' : '120px'}">
            <svg-icon @click="newConnection" symbol="icon-redis" size="20" color="rgb(243 64 64)"/>
            <span class="icon-add-redis">
                <svg-icon @click="newConnection" symbol="icon-redis" size="20" color="rgb(243 64 64)"/>
            </span>
            <span>导入</span>
            <span>导出</span>
            <svg-icon @click="fold = !fold"  :symbol="fold ? 'icon-zhankai1' : 'icon-shouqi1'" size="18" title="展开"/>
        </div>
        <div class="menus-r">

        </div>
    </div> -->
    <div style="display: flex;height: 100%;width:100%">
        <div class="side-bar">
            <div :class="{'conns-btn-wrap': true, active: connsVisible}" >
                <svg-icon symbol="icon-redis" size="30" color="rgb(243 64 64)" @click="onClickConnes"/>
                <!-- <div class="tip">
                    Redis服务器列表
                </div> -->
            </div>
            
            <span class="icon-add-redis">
                <svg-icon @click="newConnection" symbol="icon-redis" size="30" color="rgb(243 64 64)"/>
                <!-- <div class="tip">
                    Redis服务器列表
                </div> -->
            </span>
            
            <div style="flex-grow: 1;display: flex;flex-direction: column;gap: 15px;justify-content: end;">
                <svg-icon symbol="icon-importexport" size="30" color="#70a1ff"></svg-icon>
                <svg-icon symbol="icon-language" size="30" color="#eccc68"></svg-icon>
                <svg-icon symbol="icon-more" size="30"></svg-icon>
            </div>   
        </div>
        <div :class="{connctionList:true, visible: connsVisible}">
            <Connections />
        </div>
        <main>
            <router-view></router-view>
            
        </main>
    </div>
   
</template>
<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import {reactive, ref, getCurrentInstance, toRefs} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Connections from '../pages/Connections.vue'
const router = useRouter()
// const route = useRoute()

const { proxy } = getCurrentInstance()
const fold = ref(false)
const connsVisible = ref(false)
const data = reactive({
    connections: []
})
proxy.$datastore
    .find({})
    .then(docs => {
        console.log(docs, 'docs ========')
        data.connections = docs
    })
const { connections } = toRefs(data)
function newConnection() {
    // router.push('/about')
    // window.subWindow.newConnection()
}
function toConnection(id) {
    router.push({name: 'dbs', params: {connection_id: id}})
}
function onRight() {
    console.log('============on right =========')
}

function onClickConnes() {
    connsVisible.value = !connsVisible.value
}
</script>


<style lang="scss" scoped>

.side-bar {
    z-index: 10;
    height: 100%;
    width: 66px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 15px 0;
    background-color: $grey-1;
    gap: 15px;
    // box-shadow: 1px 0px 8px #bbbaba;
    color: $dark-4;
    border-right: 1px solid $grey-2;
    .conns-btn-wrap {
        position: relative;
        width: 100%;
        padding: 8px 0;
        text-align: center;
        &.active {
            box-shadow: inset -1px -2px 8px $dark-1;
        }
    }
}

.tip {
    position: absolute;
    font-size: 14px;
    left: 58px;
    top: 8px;
    background: rgba(0, 0, 0, .85);
    color: white;
    word-break: keep-all;
    border-radius: 7px;
    padding: 4px;
}

.connctionList {
    z-index: 1;
    position: fixed;
    left: -220px;// 70px; 
    top: -310px; // -6px;
    width: 280px;
    max-height: 300px;
    padding: 15px;
    border-radius: 8px;
    background-color: white;
    // background-color: rgb(248, 242, 243);
    box-shadow: 1px 0px 8px #bbbaba;
    border: #bbbaba;
    overflow: auto;
    transition: left .3s ease-in, top .3s ease-in;
    &::before {
        // content: "";
        position: absolute;
        left: -6px;
        top: 12px;
        width: 12px;
        height: 12px;
        // border: 10px solid transparent;
        // border-right-color: white;
        background-color: white;
        transform: rotate(45deg);
        border-radius: 0 0 0 4px;
    }
    &.visible {
        left: 70px;
        top: 5px;
    }
}

.icon-add-redis {
    position: relative;
    &::after {
        content: '+';
        display: block;
        // height: 1em;
        width: 1em;
        background: #F34040;
        position: absolute;
        font-size: 14px;
        font-weight: 500;
        bottom: 0;
        right: -3px;
        // color: #F34040;
        line-height: 1em;
        border-radius: 50%;
        text-align: center;
    }
}
.title-bar {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    height: $top-bar-height;
    border-bottom: 1px solid #EAE8E8;
    .menus-l {
        display: flex;
        width: 140px;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        padding:0 10px 0  90px;
        box-sizing: content-box;
        transition: width .3s ease-in-out;
    }
    
}

main {
    width: calc(100% - 66px);
    height: 100%;
    
}



.menu {
    .hd {
        line-height: 40px; 
        padding: 0 15px;
        // color: #202225;
        display:flex;
        justify-content: space-between;
        align-items: center;
        .title {
            cursor: pointer;
        }
    }
    
}
</style>