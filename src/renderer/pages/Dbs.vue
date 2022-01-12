<template>
    <div class="dbs-wrap">
        <div class="db-wrap" v-for="i in 16" :key="i" @click="toDb(i-1)">
            <svg-icon symbol="icon-database" size="46" color="#949292"/>
            <div class="db-info">
                <span>db{{i - 1}}</span>
                {{keyspaces}}
                <!-- <span>Size: {{keyspaces[`db${i - 1}`] ? keyspaces[`db${i - 1}`].keys : 0}} </span> -->
            </div>     
        </div>
    </div>
    <footer>
        <!-- {{clientInfo}} -->
    </footer>
</template>
<script setup>
import {onBeforeMount, getCurrentInstance, ref, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { keyspace } from '../utils/format.js'
const { proxy } = getCurrentInstance()
const data = reactive({
    clientInfo: {},
    keyspaces: {}
})
const router = useRouter()
const route = useRoute()
onBeforeMount(async () => {
    const connection_id = route.params.connection_id

    const redis = await proxy.$redis[connection_id]
    redis.clientInfo().then(result => {
        console.log(result)
        data.clientInfo = result
    })
    redis.sendCommand(['info', 'keyspace']).then(result => {
        console.log()
        data.keyspaces = keyspace(result)
        console.log(keyspace(result), '=kdydd')

    })

    const {clientInfo, keyspaces } = toRefs(data)
    // redis.select(1).then(() => {
    //     // redis.clientInfo().then(result => console.log(result.db))
    //     // redis.info().then(result => {
    //     //     console.log(result)
    //     // })
    //     redis.set('xdfffff', '12dddd')
    // })   
})

function toDb(i) {
    router.push({name: 'keys', params: {db: i}})
}
</script>
<style lang="scss" scoped>
.dbs-wrap {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    justify-content: space-around;
    row-gap: 20px;
    .db-wrap {
        display: flex;
        padding: 15px;
        background-color: #cdf1f7;
        border-radius: 5px;
        border: 1px dashed transparent;
        cursor: pointer;
        &:hover {
            border: 1px dashed #ccc;
        }
        .db-info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }
}
</style>