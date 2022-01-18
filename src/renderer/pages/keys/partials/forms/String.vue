<template>
    <div style="height: 100%;width: 100%">
        <div>
            <input type="text" name="key" placeholder="Key" style="width: calc(100% - 225px)"> 
            TTL(s): <input type="number" name="ttl" placeholder="TTL" style="width: 125px"> 
        </div>
        <textarea name="" id="" cols="30" rows="10" placeholder="Value"></textarea>
    </div>
</template>

<style lang="scss" scoped>
textarea {
    margin-top: 15px;
    height: calc(100% - 45px);
    width: 100%;
    resize: none;
    box-sizing: border-box;
}
</style>