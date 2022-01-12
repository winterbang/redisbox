<template> 
    <section style="position: fixed;"></section>
    <div class="title-bar">
        <div class="menus-l" :style="{width: fold ? '60px' : '140px'}">
            <span class="icon-add-redis">
                <svg-icon @click="newConnection" symbol="icon-redis" size="20" color="rgb(243 64 64)"/>
            </span>
            
            <!-- <svg-icon @click="newConnection" symbol="icon-xinzengfuwuqi" size="20"/> -->
            <svg-icon @click="fold = !fold"  :symbol="fold ? 'icon-zhankai1' : 'icon-shouqi1'" size="18" title="展开"/>
        </div>
        <div class="menus-r"></div>
    </div>
    <main>
        <aside class="fold-panel" :style="{width: fold ? 0 : '240px'}">
            <div class="fold-content">
                <div class="menu" v-for="connection in connections" :key="connection._id">
                    <header class="hd" style="">
                        <span class="title" @click="toConnection(connection._id)">
                            <svg-icon symbol="icon-redis" size="18"/>
                            <span style="margin-left: 8px;">{{connection.name}}</span>
                        </span>
                        <svg-icon symbol="icon-shouqi2" size="24" />
                    </header>
                    <section class="menu-items">
                        <ul class="db-list">
                            <li v-for="i in 16" :key="i">
                                <svg-icon symbol="icon-database" size="24" color="#949292"/>
                                <span style="vertical-align: text-top;" :alt="i-1" class="db-number"></span>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
            
        </aside>
        <div class="content-box">
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </main>
</template>
<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import {reactive, ref, getCurrentInstance, toRefs} from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
// const route = useRoute()

const { proxy } = getCurrentInstance()
const fold = ref(false)
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
</script>


<style lang="scss" scoped>
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
}
main {
    // height: calc(~"100vh - 45px");
    height: 100%;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    .fold-panel {
        // display: flex;
        height: 100%;
        width: 240px;
        background: $grey-light;
        border-right: 1px solid $divide-color;
        transition: width .3s ease-in-out;
        flex-shrink: 0;
        padding-top: $top-bar-height;
        overflow: hidden;
        .fold-content {
            height: 100%;
            width: 240px;
            overflow-y: auto;
            padding-top: 15px;
        }
        
    }
    .content-box {
        padding-top: $top-bar-height;
        width: 100%;
        overflow: hidden;
        .content {
            height: 100%;
            overflow: auto;
            padding: 15px;
        }
    }
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
    .menu-items {
        padding: 0 24px;
        overflow: hidden;
        // height: 0;
        .db-list {
            box-sizing: border-box;
            display: grid;
            grid-template-columns: repeat(2, 40%);
            grid-template-rows: repeat(8, 60px);
            align-items: center;
            justify-content: space-around;
            list-style-type: none;
            width: 100%;
            padding: 0;
            text-align: center;
            
            margin: 0;
            background-color: #efefef;
            border-radius: 10px;
            li {
                padding: 8px 0;
                cursor: pointer;
                border-radius: 5px;
                color: $grey-1;
                &:hover {
                    background: $grey-dark;
                    color: #202225;
                    font-weight: bold;
                }
            }
            .db-number{
                position: relative;
                &::before {
                    content: attr(alt);
                    position: absolute;
                    color: #3c3c3c;
                    left: -7px;
                    top: 8px;
                    font-weight: 500;
                }
            }
        }
    }
}
</style>