<template>
    <div class='index'>
        <myHeader class='header' title='成都' icon='fa-map-marker'>
		     <router-link to="/" slot="left">
		         <mt-button>登录</mt-button>
		     </router-link>
		     <router-link to="/chooseCity" slot="right">
		     	<mt-button><i class="fa fa-plus"></i></mt-button>
		     </router-link>
		</myHeader>
    </div>
</template>

<script>
import myHeader from '@/components/header';
export default {
    components: {
        myHeader
    }
};
</script>

<style>
.index {
	position: relative;
    height: 100%;
    width: 100%;
    background: url('../assets/img/index_night.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.header {
	background-color: transparent;
}
</style>
