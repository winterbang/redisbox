<template>
    <div class="connection-list">
        <div class="connection-box" v-for="i in 5" :key="i" @click="onConnect">
            <p>localhost</p>
            <p>127.0.0.1:90</p>
        </div>
    </div>
    
</template>
<script setup>
import { useRouter } from 'vue-router'
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const router = useRouter()
function onConnect() {
    // window.redis.createClient()
    // router.push({name: 'connection', params: {connection_id: '1111111'}})
    router.push({name: 'db', params: {connection_id: '1111111', db: 0}})
}
</script>
<style lang="less" scoped>
.connection-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    
    .connection-box {
        // min-width: 280px;
        width: 33.3%;
        border-radius: 5px;
        background-color: aliceblue;
        padding: 8px;
        cursor: pointer;
        margin-bottom: 10px;
        &:last-child {
            margin: auto;
        }
    }
}
</style>