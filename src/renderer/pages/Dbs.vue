<template>
    <div class="dbs-wrap">
        <div class="db-wrap" v-for="i in 16" :key="i" @click="toDb(i-1)">
            <svg-icon symbol="icon-database" size="46" color="#949292"/>
            <div class="db-info">
                <span>db{{i - 1}}</span>
                <span>Size: {{keyspaces[`db${i - 1}`] ? keyspaces[`db${i - 1}`].keys : 0}} </span>
            </div>     
        </div>
    </div>
    <footer class="bottom-bar-wrap">
        user: {{clientInfo.user}}
    </footer>
</template>
<script setup>
import {onBeforeMount, getCurrentInstance, ref, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { keyspace } from '../utils/format.js'
const { proxy } = getCurrentInstance()
const router = useRouter()
const route = useRoute()


const data = reactive({
    clientInfo: {},
    keyspaces: {db0: {}}
})
onBeforeMount(async () => {
    const connection_id = route.params.connection_id

    const redis = await proxy.$redis[connection_id]
    console.log(redis)
    redis.clientInfo().then(result => {
        console.log(result, 'client info ========')
        data.clientInfo = result
    })
    redis.sendCommand(['info', 'keyspace']).then(result => {
        data.keyspaces = keyspace(result)
        console.log(keyspace(result), '=kdydd')

    })
    redis.sendCommand(['info']).then(result => {
        console.log(result, '=kdydd')
    })
 
})

function toDb(i) {
    router.push({name: 'keys', params: {db: i}})
}
const {clientInfo, keyspaces } = toRefs(data)
</script>
<style lang="scss" scoped>
.dbs-wrap {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    justify-content: space-around;
    row-gap: 20px;
    padding: 10px;
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
.bottom-bar-wrap {
    height: 48px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: #fff;
    // box-shadow: 2px 0px 8px #ccc;
    overflow: hidden;
}
</style>