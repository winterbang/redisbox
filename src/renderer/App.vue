<template>
    <router-view></router-view>         
</template>
<script setup>
import {
  onMounted,
} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();
onMounted(() => {
    router.push('/main')
})
</script>