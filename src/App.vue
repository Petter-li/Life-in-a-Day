<template>
    <div id="app">
        <transition name="slide" mode='out-in'>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
};
</script>

<style>
#app {
    width: 100%;
    height: 100%;
}
.slide-enter-active, .slide-leave-active { 
    transition: all 0.5s linear;
}
.slide-leave-active {
    opacity: 0;
}
.slide-enter {
  opacity: 0;
}
</style>
