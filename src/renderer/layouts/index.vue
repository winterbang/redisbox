<template> 
    <section style="position: fixed;">

    </section>
    <div class="title-bar">
        <div class="menus-l">
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
                <div v-for="connection in connections" :key="connection._id">
                    <h4 style="margin: 15px 0 0 15px;color: #202225">
                        <svg-icon symbol="icon-redis" size="18"/>
                        <span style="margin-left: 8px;">{{connection.name}}</span>
                    </h4>
                    <ul class="db-list">
                        <li v-for="i in 16" :key="i">
                            <svg-icon symbol="icon-database" size="24" color="#949292"/>
                            <span style="vertical-align: text-top;" :alt="i-1" class="db-number"></span>
                        </li>
                    </ul>
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
import {reactive, ref, getCurrentInstance} from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const { proxy } = getCurrentInstance()
const fold = ref(false)
const connections = ref([])
proxy.$datastore.find({}, (err, docs) => {
    console.log(docs, 'docs ========')
    connections.value = docs
})

function newConnection() {
    // router.push('/about')
    // window.subWindow.newConnection()
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
        width: 240px;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        padding:0 10px 0  90px;
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
            .db-list {
                box-sizing: border-box;
                display: grid;
                grid-template-columns: repeat(2, 50%);
                grid-template-rows: repeat(8, 60px);
                align-items: center;

                list-style-type: none;
                width: 100%;
                padding: 0;
                text-align: center;
                padding: 0 15px;
                margin: 0;
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
                        top: 24px;
                        font-weight: 500;
                    }
                }
            }
        }
        
    }
    .content-box {
        padding-top: $top-bar-height;
        width: 100%;
        overflow: hidden;
        .content {
            height: 100%;
            overflow: auto;
        }
    }
}

</style>