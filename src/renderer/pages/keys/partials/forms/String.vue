<template>
    <div style="height: 100%;width: 100%">
        <div>
            <input type="text" v-model="formData.key" name="key" placeholder="Key" style="width: calc(100% - 225px)"> 
            <!-- EX seconds; PX milliseconds; EXAT timestamp-seconds; PXAT timestamp-milliseconds;  -->
            TTL(s): <input type="number" v-model="formData.ttl" name="ttl" placeholder="TTL" style="width: 125px"> 
        </div>
        <textarea cols="30" rows="10" placeholder="Value" v-model="formData.value"></textarea>
        
        <div class="btns-wrap">
            <div class="btns-l">
                <!-- <button>添加行</button> -->
                <button @click="onDel">JSON</button>
            </div>
            <div class="btns-r">
                <!-- <button>重置</button> -->
                <!-- <button>添加行</button> -->
                <button @click="onDel">删除</button>
                <button @click="onSave">保存</button>
            </div>    
        </div>
    </div>
    
</template>
<script setup>
import { reactive, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const { proxy } = getCurrentInstance()
const route = useRoute()
const props = defineProps({
    modelValue: Object
})

const formData = reactive({
    key: '',
    ttl: -1,
    value: ''
})

async function onSave() {
    const connection_id = route.params.connection_id
    const redis = await proxy.$redis[connection_id]
    // proxy.$redis.setex(formData.key, `${formData.ttl}`, formData.value)
    let ttl = parseInt(formData.ttl);
    (ttl > 0 ? redis.sendCommand(['SETEX', formData.key, `${formData.ttl}`, formData.value]) : redis.set(formData.key, formData.value))
        .then(result => {
            console.log(result, 'result =======')
            redis.sendCommand(['TTL', formData.key]).then(result => {
                console.log(result , 'TTL====')
            })
        })
    console.log(formData, 'formdata =====')
}
</script>
<style lang="scss" scoped>
textarea {
    margin-top: 15px;
    height: calc(100% - 45px - 51px);
    width: 100%;
    resize: none;
    box-sizing: border-box;
}

.btns-wrap {
    display: flex;
    justify-content: space-between;
    padding: 8px 15px;

    .btns-r {
        button {
            width: 120px;
            background-color: $grey-1;
            // height: 30px;
            &:last-child {
                background-color: $blue-base;
                color: white;
                margin-left: 15px;
            }
        }
    }
    
}
</style>