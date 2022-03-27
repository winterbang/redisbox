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
    background-color: $grey-3;
    box-shadow: -1px 2px 8px $grey-2;
    transition: right .3s ease-in-out, border-radius .3s ease-in;
    border-radius: 20%;
    &.visible {
        right: 0;
        border-radius: 4px;
    }
}
</style>
