<template>
    <div class="connection-list">
        <div class="connection-box" v-for="connection in connections" :key="connection._id" @click="onConnect(connection._id)">
            <span>{{ connection.name }}</span>
            <span>{{connection.host}}:{{connection.port}}</span>
        </div>
    </div>
    
</template>
<script setup>
import { useRouter } from 'vue-router'
import { getCurrentInstance, reactive, onBeforeMount, toRefs } from 'vue'
const { proxy } = getCurrentInstance()
const router = useRouter()
const data = reactive({ connections: [] })
proxy.$datastore
    .find({})
    .then(docs => data.connections = docs)

const { connections } = toRefs(data)
// onBeforeMount(() => {
//     proxy.$datastore.find({}, (err, docs) => {
//         console.log(docs, 'docs ========')
//         connections = docs
//     })
// })
function onConnect(id) {
    router.push({name: 'dbs', params: {connection_id: id, db: 0}})
}
</script>
<style lang="less" scoped>
.connection-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 240px);
    // grid-template-rows: repeat(auto-fill, 60px);
    justify-content: space-around;
    align-items: center;
    row-gap: 20px;
    // column-gap: 20px;
    .connection-box {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border-radius: 5px;
        background-color: aliceblue;
        padding: 15px;
        cursor: pointer;
        border: 1px solid transparent;
        &:hover {
            border: 1px dashed #ccc;
        }
    }
}
</style>