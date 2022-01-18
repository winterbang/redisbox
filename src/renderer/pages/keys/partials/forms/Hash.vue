<template>
    <div class="form-wrap">
        <div>
            <input type="text" name="key" placeholder="Key" style="width: calc(100% - 192px)"> 
            TTL(s): <input type="number" name="ttl" placeholder="TTL" style="width: 95px"> 
        </div>
        <div style="height: calc(100% - 65px);padding-top: 8px;overflow:hidden">
            <table style="table-layout: fixed;">
                <thead>
                    <tr>
                        <th style="width: 30%">Field <svg-icon symbol="icon-search" size="22" color="#1e90ff"/></th>
                        <th>Value</th>
                    </tr>
                </thead>
            </table>
            <div style="height: calc(100% - 39px);overflow:auto">
                <table>
                    <thead>
                        <tr aria-hidden="true" style="height: 0;font-size:0;">
                            <th style="width: 30%;padding: 0"></th>
                            <th style="padding: 0">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in 20" :key="i">
                            <td contenteditable="true">field{{i}}</td>
                            <td contenteditable="true">value{{i}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
        
        <div class="pagination">
            <span style="flex-grow: 1;">Size: 235</span>
            <select name="" id="">
                <option value="1">10条/页</option>
            </select>
            <span>&lt;1/5></span>
        </div>
    </div>
</template>
<script setup>

</script>
<style lang="scss" scoped>
$pagination-height: 35px;
.form-wrap {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.pagination {
    line-height: $pagination-height;
    height: $pagination-height;
    width: 100%;
    display: flex;
    background-color: $blue-1;
    padding: 0 15px;
    color: white;
}
tbody {
    overflow: auto;
    height: calc(100% - 39px);
}

tr:nth-child(odd) > td {
    background-color: $grey-1;
}

thead > tr > th {
    box-sizing: border-box;
}
</style>