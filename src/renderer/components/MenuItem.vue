<template>
    <div class="menu" v-for="connection in connections" :key="connection._id">
        <header class="hd" style="">
            <span class="title" @click="toConnection(connection._id)" @click.right="onRight()">
                <svg-icon symbol="icon-redis" size="18"/>
                <span style="margin-left: 8px;">{{connection.name}}</span>
            </span>
            <svg-icon symbol="icon-shouqi2" size="24" />
        </header>
        <section class="menu-items">
            <ul class="db-list">
                <li v-for="i in 16" :key="i">
                    <svg-icon symbol="icon-database" size="28" color="#949292"/>
                    <span style="vertical-align: text-top;" :alt="i-1" class="db-number"></span>
                </li>
            </ul>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.menu-items {
        padding: 0 24px;
        overflow: hidden;
        // height: 0;
        .db-list {
            box-sizing: border-box;
            display: grid;
            grid-template-columns: repeat(2, 40%);
            grid-template-rows: repeat(8, 60px);
            align-items: center;
            justify-content: space-around;
            list-style-type: none;
            width: 100%;
            padding: 0;
            text-align: center;
            
            margin: 0;
            background-color: #efefef;
            border-radius: 10px;
            li {
                padding: 8px 0;
                cursor: pointer;
                border-radius: 5px;
                color: $grey-1;
                &:hover {
                    background: $grey-dark;
                    color: #202225;
                    font-weight: bold;
                }
            }
            .db-number{
                position: relative;
                font-size: 0;
                border-radius: 50%;
                background: rgba(201, 201, 201, 0.8);
                padding: 10px;
                top: 15px;
                left: -15px;
                &::before {
                    content: attr(alt);
                    position: absolute;
                    color: #3c3c3c;
                    left: 0;
                    top: 0;
                    font-weight: 500;
                    padding: 2px;
                    width: 1em;
                    height: 1em;
                    // border-radius: 50%;
                    // background: #ccc;
                    font-size: 15px;
                }
            }
        }
    }
</style>