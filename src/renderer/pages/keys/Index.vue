<template>
    <TopBar />
    <div class="content">
        <aside class="keys-panel">
            <keys-panel :connectionId="route.params.connection_id" :dbNum="route.params.db"></keys-panel>
        </aside>
        <div class="value-panel">
            <!-- <router-view></router-view> -->
            <!-- <div class="operation-wrap">
                <input type="text" name="query_text" style="width: 200px">
                <button>添加</button> 
                <button>删除</button> 
            </div> -->
            <div class="value-wrap">
                <form-string v-show="curType === 'String'"/>
                <form-hash v-show="curType === 'Hash'"/>
            </div>
            <div class="btns-wrap">
                <div class="btns-l">
                    <!-- <button>添加行</button> -->
                    <button>删除</button>
                </div>
                <div class="btns-r">
                    <!-- <button>重置</button> -->
                    <button>添加行</button>
                    <button>保存</button>
                </div>    
            </div>
            <footer class="extra-operation-wrap">
                <div class="part-l">
                    Type: <select v-model="curType">
                        <option :value="type" v-for="type in keyTypes" :key="type">{{type}}</option>
                    </select>
                </div>
                <div class="part-r">
                    <svg-icon symbol="icon-delete" size="20"></svg-icon>
                    <svg-icon symbol="icon-23refresh" size="20"></svg-icon>
                    <svg-icon symbol="icon-fuzhi" size="20"></svg-icon>
                </div>
            </footer>
        </div>
    </div>  
</template>
<script setup>
import {onBeforeMount, getCurrentInstance, ref, reactive, readonly, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TopBar from './partials/TopBar.vue'
import KeysPanel from './partials/KeysPanel.vue'
import FormString from './partials/forms/String.vue'
import FormHash from './partials/forms/Hash.vue'

const { proxy } = getCurrentInstance()
const route = useRoute()
const keys = ref([])
const size = ref(0)
const infoVisible = ref(false)
const keyTypes = readonly(ref([
   'String', 'Hash', 'List', 'Set', 'ZSet'
]))
const data = reactive({
    curType: 'String'
})
onBeforeMount(async () => {
    const redis = await proxy.$redis[route.params.connection_id]
    redis.select(route.params.db).then(async () => {
        size.value = await redis.sendCommand(['dbsize'])
        console.log(size.value, 'size =======')
    })
    // for(let i = 0; i < 10; i++) {
    //     redis.HSET(`test${i}`, 'wk', i)
    // }
    redis.keys('*').then(ks => {
        keys.value = ks
        console.log(keys, 'keys ===========')
    })

    // redis.sendCommand(['scan', '0']).then(result => {
    //     console.log(result, 'result ========')
    // })
    // for await (const key of redis.scanIterator({cursor: 0, MATCH: 'patter*',COUNT: 100})) {
    // // use the key!
    //     const k = await redis.get(key);
    //     console.log(k, 'k')
    // }

    
})
const { curType } = toRefs(data)
</script>
<style lang="scss" scoped>

.content {
    // height: calc(~"100vh - 45px");
    height: calc(100% - 48px);
    display: flex;
    flex-direction: row;
    overflow: hidden;
    .keys-panel{
        // display: flex;
        height: 100%;
        width: $aside-left-width;
        background: $grey-light;
        // border-right: 1px solid $divide-color;
        transition: width .3s ease-in-out;
        flex-shrink: 0;
        // padding-top: $top-bar-height;
        overflow: hidden;
        
    }
    .value-panel {
        // padding-top: $top-bar-height;
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
        background-color: rgba(255, 255, 255, 0.8);
        .value-wrap {
            height: calc(100% - 50px);
            padding: 15px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            textarea {
                flex-grow: 1;
                resize: none;
            }
        }
        .btns-wrap {
            display: flex;
            justify-content: space-between;
            padding: 0 15px 15px;

            .btns-r {
                button {
                    width: 120px;
                    background-color: $grey-1;
                    // height: 30px;
                    &:last-child {
                        background-color: $blue-base;
                        color: white;
                        margin-left: 15px;
                    }
                }
            }
            
        }
    }
}

.base-info-wrap {
    width: 100%;
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    // border-bottom: 1px dashed $dark-1;
}

.extra-operation-wrap {
    box-sizing: border-box;
    display: flex;
    height: 45px;
    line-height: 45px;
    width: 100%;
    padding: 0 15px;
    justify-content: space-between;
    background-color: $grey-3;
    .part-r {
        display: flex;
        align-items: center;
        gap: 10px;
    }
}
</style>