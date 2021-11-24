<template>
    <h1>{{ msg }}</h1>
    <button @click="state.count++">{{state.count}}</button>
</template>
<script setup>
import {reactive} from 'vue'
defineProps({
    msg: String
})
const state = reactive({
    count: 0
})
</script>
