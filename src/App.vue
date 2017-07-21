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
    transform: translate3d(0, 0, 0);
}
.slide-leave-active {
    transform: translate3d(-50%, 0, 0);
    opacity: 0;
}
.slide-enter {
	transform: translate3d(50%, 0, 0);
  opacity: 0;
}
</style>
