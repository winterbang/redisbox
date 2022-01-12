<template>
    <router-view />
</template>
<script>
import { onMounted, onBeforeMount } from 'vue'
// import { useRouter } from 'vue-router'
export default {
    setup() {  
        onMounted(() => {
            console.log('=======')
        })
        return {}
    }
}
</script>