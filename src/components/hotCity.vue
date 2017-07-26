<template>
    <div class='main'>
        <div class='title'>热门城市</div>
        <div class="hotContent">
            <div v-for='item in hotcitys' :key='item.name' class='city'><a @click='choiceCity(item.name)'>{{item.name}}</a></div>
        </div>
        <div class="back">
            <i class="fa fa-chevron-up" @click='goback()'></i>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        hotcitys: {
            type: Array
        }
    },
    methods: {
        goback() {
            this.$router.go(-1);
        },
        choiceCity(name) {
            this.$emit('upup', name);
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
    width:90%;
    padding: 0px 5%;
}
.city {
    flex-grow: 1;
    width: 33%;
    text-align: center;
    margin: 15px 0px;
}
.back {
    margin-top: 50px;
    width: 100%;
    text-align: center;
    font-size: 24px;
}
.back i {
    display: inline-block;
    width: 24px;
    height: 24px;
}
</style>
