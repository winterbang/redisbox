<template>
    <span class="tag-wrap">
        <slot></slot>
    </span>
</template>
<script setup>
const props = defineProps({
    color: String
})
</script>
<style lang="scss" scoped>
.tag-wrap {
    padding: 8px;
    border-radius: 4px;
}
</style>