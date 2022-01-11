<template>
    <svg class="svg-icon" :style="style">
        <use :xlink:href="`#${symbol}`"></use>
    </svg>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
    symbol: String,
    size: {
        type: String,
        default: '14'
    },
    color: String
})

const style = computed(() => {
    return {
        fontSize: `${props.size}px`,
        color: props.color
    }
})

</script>
<style lang="less">

.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: middle;
}
</style>