<template>
    <div class='main'>
        <div class='title'>热门城市</div>
        <div class="hotContent">
            <div v-for='item in hotcitys' :key='item' class='city'><span>{{item.name}}</span></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        hotcitys: {
            type: Array
        }
    }
};
</script>

<style>
.main {
    width:100%;
}
.main .title {
    font-size: 16px;
    line-height: 1;
    padding: 10px 10px;
    border-bottom: 1px solid #cccccc;
}
.hotContent {
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-around;
    width:100%;
}
.city {
    flex-grow: 1;
}
</style>