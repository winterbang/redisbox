<template>
    <div :class="{'drawer-wrap': true, visible: props.modelValue} ">
        <slot></slot>
    </div> 
</template>
<script setup>
const props = defineProps({
    modelValue: Boolean
})
</script>
<style lang="scss" scoped>
.drawer-wrap {
    position: fixed;
    z-index: 11;
    right: -365px;
    top: 48px;
    bottom: 0;
    width: 360px;
    background-color: orange;
    box-shadow: -1px 2px 8px $grey-2;
    transition: right .3s ease-in-out;
    &.visible {
        right: 0;
    }
}
</style>
