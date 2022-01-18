<template>
    <div class="fold-content">
        <div style="padding: 5px">
            <div class="search-wrap">
                <input type="text" placeholder="请输入要查找的key"> 
                <select v-model="curDb">
                    <option :key="i" :value="i-1" v-for="i in 16">DB{{i - 1}}</option>
                </select>
            </div>
            <div class="operate">
                <svg-icon symbol="icon-file-add" size="22"></svg-icon>
                <svg-icon symbol="icon-delete" size="22" disabled style="pointer-events:none;"></svg-icon>
                <svg-icon symbol="icon-23refresh" size="22"></svg-icon>
            </div>
        </div>
        
        <div style="flex-grow: 1;background: white;">
            <table>
                <thead>
                    <tr>
                        <th style="width: 80px">Type</th>
                        <th>
                            Key <svg-icon symbol="icon-search" size="22" color="#1e90ff"/>
                            <!-- <span >sssssss</span> -->
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="key in keys" :key="key">
                        <td>String</td>
                        <td>{{key}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination">
            <span style="flex-grow: 1;">Size: {{size}}</span>
            <select name="" id="">
                <option value="1">10条/页</option>
            </select>
            <span>&lt;1/5></span>
        </div>
    </div> 
</template>
<script setup>
const props = defineProps({
    connectionId: String,
    dbNum: String
})
import {onBeforeMount, getCurrentInstance, ref, reactive, readonly, toRefs, watch } from 'vue'
const { proxy } = getCurrentInstance()
const data = reactive({
    size: 0,
    keys: [],
    curDb: 0
})
let redis
onBeforeMount(async() => {
    redis = await proxy.$redis[props.connectionId]
    redis.select(props.dbNum).then(async () => {
        data.size = await redis.sendCommand(['dbsize'])
    })
    redis.keys('*').then(ks => {
        data.keys = ks
    })
})
watch(() => data.curDb, async (value) => {
    await redis.select(value)
    data.size = await redis.sendCommand(['dbsize'])
    data.keys = await redis.keys('*')
    redis.sendCommand(['scan', '0', 'COUNT5']).then(result => {
        console.log(result, 'result ========')
    })  
    for await (let key of redis.scanIterator({MATCH: '*', COUNT: 5})) {
        console.log(key, 'key =====ddd')
    };             
})
const {size, keys, curDb} = toRefs(data)
</script>
<style lang="scss" scoped>
.fold-content {
    height: 100%;
    width: $aside-left-width;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    border-right: 1px solid $grey-2;
    .search-wrap, .operate {
        height: 40px;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        border-radius: 8px;
    }
    .operate {
        margin-top: 5px;
    }
    .pagination {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 0 8px;
        line-height: 45px;
        background-color: $grey-3;
        
    }
}
</style>