<template>
    <span v-for="key in data_keys" :key="key">{{key}}</span>
</template>
<script setup>
const redis = window.require('redis')
import {onBeforeMount, getCurrentInstance, ref } from 'vue'
// import { createClient } from 'redis'
const data_keys = ref([])
onBeforeMount(() => {
    const { proxy } = getCurrentInstance()
    const redis = proxy.$redis['redis://localhost:6379']
    for(let i = 0; i < 10; i++) {
        redis.HSET(`test${i}`, 'wk', i)
    }
    redis.keys('*').then(ks => {
        data_keys.value = ks
        console.log(data_keys, 'data_keys ===========')
    })
    
})
</script>