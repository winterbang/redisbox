<template>
    <span v-for="key in data_keys" :key="key">{{key}}</span>
    <footer>
        {{size}}
    </footer>
</template>
<script setup>
import {onBeforeMount, getCurrentInstance, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// import { createClient } from 'redis'
const { proxy } = getCurrentInstance()
const route = useRoute()
const data_keys = ref([])
const size = ref(0)
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
        data_keys.value = ks
        console.log(data_keys, 'data_keys ===========')
    })
    
})
</script>