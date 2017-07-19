<template>
    <div class='show'>
        <div class="bg">
        </div>
        <div class="button-wrap">
            <div class="button-content">
                <button class="In">浮生一日</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.show {
    position: relative;
    height: 100%;
    width: 100%;
    background: url('../assets/img/life.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.bg {
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.3;
    filter: blur(10px);
}
.button-wrap {
    position: absolute;
    left: 0px;
    bottom: 80px;
    width: 100%;
}
.button-content {
    margin: 0 auto;
    width: 50%;
}
.In {
    width: 100%;
    height: 41px;
    border-radius: 4px;
    background: transparent;
    color: #ffffff;
    font-size: 18px;
    outline: 0;
    border: 1px solid #5a5a5a;
}
</style>
