<template>
    <div class="top-bar">
        <div class="route-menu">
            <svg-icon symbol="icon-host" size="20"></svg-icon>  localhost     
        </div>
        <div class="info-menu">
            <svg-icon symbol="icon-info" size="23" color="#2ed573" style="margin-right: 20px;" @click="infoVisible = !infoVisible"></svg-icon>
            <svg-icon symbol="icon-setting" size="24" color="#70a1ff"></svg-icon>
        </div>
        <Drawer v-model="infoVisible">aaaaa</Drawer>
    </div>
</template>
<script setup>
import Drawer from '@components/Drawer.vue'
</script>
<style lang="scss" scoped>
.top-bar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 15px;
    // height: 55px;
    line-height: 48px;
    background-color: $white;
    color: $dark-3;
    box-shadow: 4px 0px 4px $dark-3;

}
</style>