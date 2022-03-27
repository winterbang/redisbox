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
                <svg-icon symbol="icon-file-add" size="22" @click="onClickAdd"></svg-icon>
                <svg-icon symbol="icon-delete" size="22" disabled style="pointer-events:none;"></svg-icon>
                <svg-icon symbol="icon-23refresh" size="22" @click="loadKeys"></svg-icon>
            </div>
        </div>
        
        <div style="flex-grow: 1;background: white;overflow: auto;">
            <table>
                <thead>
                    <tr>
                        <th>
                            Key <svg-icon symbol="icon-search" size="22" color="#1e90ff"/>
                            <!-- <span >sssssss</span> -->
                        </th>
                        <th style="width: 80px">Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(key, idx) in keys" :key="key">
                        <td>{{key}}</td>
                        <td>{{types[idx]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination">
            <span style="flex-grow: 1;">Size: {{totalCount}}</span>
            <select v-model="pageSize">
                <option :value="psize" v-for="psize in [10, 20, 50, 100]" :key="psize">{{psize}}条/页</option>
            </select>
            <span><span>&lt;</span> 1/{{pages}} <span @click="loadKeys">></span> </span>
        </div>
    </div> 
</template>
<script setup>
const props = defineProps({
    connectionId: String,
    dbNum: String
})
const emit = defineEmits(['selectKey'])
import {onBeforeMount, getCurrentInstance, ref, reactive, readonly, toRefs, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const { proxy } = getCurrentInstance()
const router = useRouter()
const route = useRoute()
const data = reactive({
    totalCount: 0,
    keys: [],
    types: [],
    curDb: 0,
    lastCursor: 0,
    nextCursor: 0,
    pageSize: 10,
})
let redis
onBeforeMount(async() => {
    redis = await proxy.$redis[props.connectionId]
    await redis.select(props.dbNum)
    loadKeys()
})

watch(() => data.curDb, async (value) => {
    await redis.select(value)
    router.push({name: 'keys'})
    loadKeys()       
})

const pages = computed(() => {
    return Math.ceil(data.totalCount / data.pageSize)
})

async function loadKeys(params = {}) {
    params = Object.assign({cursor: data.nextCursor, count: data.pageSize}, params)
    data.totalCount = await redis.sendCommand(['dbsize'])
    redis.sendCommand(['scan', `${params.cursor}`, 'COUNT', `${params.count}`]).then(result => {
        data.keys = result[1]
        data.nextCursor = result[0]
        const commands = result[1].map(key => redis.type(key))
        Promise.all(commands).then(result => data.types = result)
        
    })
}
function onClickAdd() {
    router.push({name: 'addKey'})
}

const {totalCount, keys, curDb, types, pageSize} = toRefs(data)
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

.hash-color {
    color: $orange-base;
}
</style>