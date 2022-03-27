<template>
    <TopBar />
    <div class="content">
        <aside class="keys-panel">
            <keys-panel :connectionId="route.params.connection_id" :dbNum="route.params.db"></keys-panel>
        </aside>
        <div class="value-panel">
            <router-view @onChanged="reloadKeys"></router-view>
            <img src="@assets/imgs/empty.png" alt="" v-if="route.name === 'keys'">
        </div>
    </div>  
</template>
<script setup>
import {onBeforeMount, getCurrentInstance, ref, reactive, readonly, toRefs} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TopBar from './partials/TopBar.vue'
import KeysPanel from './partials/KeysPanel.vue'

const { proxy } = getCurrentInstance()
const route = useRoute()
const keys = ref([])
const size = ref(0)
const infoVisible = ref(false)
const keyTypes = readonly(ref(['String', 'Hash', 'List', 'Set', 'ZSet']))
const data = reactive({
    curType: 'String'
})
function reloadKeys() {
    console.log('reload keys ==========')
}
</script>
<style lang="scss" scoped>

.content {
    // height: calc(~"100vh - 45px");
    height: calc(100% - 48px);
    display: flex;
    flex-direction: row;
    overflow: hidden;
    .keys-panel{
        // display: flex;
        height: 100%;
        width: $aside-left-width;
        background: $grey-light;
        // border-right: 1px solid $divide-color;
        transition: width .3s ease-in-out;
        flex-shrink: 0;
        // padding-top: $top-bar-height;
        overflow: hidden;
        
    }
    .value-panel {
        // padding-top: $top-bar-height;
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
        background-color: rgba(255, 255, 255, 0.8);
    }
}

.base-info-wrap {
    width: 100%;
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    // border-bottom: 1px dashed $dark-1;
}


</style>