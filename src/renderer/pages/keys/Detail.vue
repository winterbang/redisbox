<template>
    <div class="value-wrap">
        <form-string v-show="curType === 'String'" v-model="formData"/>
        <form-hash v-show="curType === 'Hash'"/>
        <form-list v-show="curType === 'List'"/>
    </div>
    
    <footer class="extra-operation-wrap">
        <div class="part-l">
            Type: <select v-model="curType">
                <option :value="type" v-for="type in keyTypes" :key="type">{{type}}</option>
            </select>
        </div>
        <div class="part-r">
            <svg-icon symbol="icon-delete" size="20"></svg-icon>
            <svg-icon symbol="icon-23refresh" size="20"></svg-icon>
            <svg-icon symbol="icon-fuzhi" size="20"></svg-icon>
        </div>
    </footer>
</template>
<script setup>
const emits = defineEmits(['onChanged'])
import {onBeforeMount, getCurrentInstance, ref, reactive, readonly, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import FormString from './partials/forms/String.vue'
import FormHash from './partials/forms/Hash.vue'
import FormList from './partials/forms/List.vue'

const { proxy } = getCurrentInstance()
const router = useRouter()
const route = useRoute()
const keyTypes = readonly(ref([
   'String', 'Hash', 'List', 'Set', 'ZSet'
]))
const data = reactive({
    curType: 'String',
    formData: {},
})
let redis = null

onBeforeMount(async () => {
    console.log(route.params.connection_id)
    // redis = await proxy.$redis[route.params.connection_id]
})

async function onSave() {
    // switch(data.curType) {
    //     case 'String':
    //         // redis.set(data.form.key, data.form.value)
    //         break
    //     default: 
    //         break
    // }
    
}
const { curType, formData } = toRefs(data)

</script>
<style lang="scss" scoped>
.value-wrap {
    height: calc(100% - 45px);
    padding: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    textarea {
        flex-grow: 1;
        resize: none;
    }
}

.extra-operation-wrap {
    box-sizing: border-box;
    display: flex;
    height: 45px;
    line-height: 45px;
    width: 100%;
    padding: 0 15px;
    justify-content: space-between;
    background-color: $grey-3;
    .part-r {
        display: flex;
        align-items: center;
        gap: 10px;
    }
}
</style>