<template>
    <div class='index'>
    	<div class="bg"></div>
        <myHeader class='header' title='成都' icon='fa-map-marker'>
		     <router-link to="/" slot="left">
		         <mt-button @click.native='loginIn'>登录</mt-button>
		     </router-link>
		     <router-link to="/chooseCity" slot="right">
		     	<mt-button><i class="fa fa-plus"></i></mt-button>
		     </router-link>
		</myHeader>
		<div class="date">
			<h1 class='title'>浮&nbsp;&nbsp;生</h1>
			<p class='orderDay'>第&nbsp;<span class='number'>0</span>&nbsp;日</p>
			<p class='detailDay'><i class="fa fa-calendar"></i>&nbsp;<span>7月25日</span>&nbsp;<span>周二</span>&nbsp;<span>六月初三</span></p>
		</div>
		<div class='weather-content'>
		    <i class="icon-weather"></i>
		</div>
		<p class='weater-des'>晴</p>
		<div class="weather-detail">
			<div class="detail-left">
				<p class='du'><span class='centigrade'>31</span>&nbsp;℃</p>
				<p class='maxmin'><i class="fa fa-long-arrow-down"></i>&nbsp;<span class='min'>21</span>℃&nbsp;&nbsp;<i class="fa fa-long-arrow-up"></i>&nbsp;<span class='max'>32</span>℃</p>
			</div>
			<div class="detail-right">
				<p class='pm25'>PM2.5：<span class='pmnumber'>15</span></p>
				<p class='pmdes'>空气质量：<span class='air'>良</span></p>
			</div>
		</div>
    </div>
</template>

<script>
import myHeader from '@/components/header';
export default {
    data() {
        return {
            CityInfo: {}
        };
    },
    methods: {
        loginIn() {
            this.CityInfo = sessionStorage.getItem('cityWeather');
            console.log(this.CityInfo);
        }
    },
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
.bg {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0px;
	bottom: 0px;
	background-color: #000000;
	opacity: 0.3;
}
.header {
	background-color: transparent;
}
.date {
	margin-top: 20px;
	width:100%;
	text-align: center;
	color: #fff;
	position: relative;
}
.date .title {
	font-size: 24px;
}
.date .orderDay {
	margin-top: 5px;
}
.date .number {
	font-size: 18px;
}
.date .detailDay {
	margin-top: 10px;
}
.detailDay i::before {
	font-size: 2px;
	vertical-align: top;
}
.weather-content {
	position: relative;
	width:100%;
}
.icon-weather {
    display: block;
    width: 150px;
    height: 150px;
    background-image: url('../assets/weatherIcon/sun.png');
    background-repeat: no-repeat;
    background-position: center center;
    margin: 0 auto;
}
.weater-des {
	position: relative;
	margin-top: 10px;
	text-align: center;
	color: #fff;
	font-size: 24px;
}
.weather-detail {
	position: absolute;
	left: 0px;
	bottom: 0px;
	width: 100%;
	color: #fff;
}
.detail-left {
	float: left;
	width: 50%;
}
.du {
	margin-bottom: 40px;
	text-indent: 10px;
	font-size: 24px;
}
.centigrade {
	font-size: 72px;
}
.maxmin {
	font-size: 20px;
	margin-bottom: 20px;
}
.detail-right {
	position: absolute;
	right:10px;
	bottom: 20px;
	width: 50%;
	text-align: right;
}
.pm25 {
	margin-bottom: 10px;
}
</style>
