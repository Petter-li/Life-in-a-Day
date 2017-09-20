<template>
    <mt-loadmore :top-method="loadTop" class='loadmore' ref="loadmore">
        <div class='index'>
            <myHeader class='header' :title='cityNow' icon='fa-map-marker'>
                 <router-link to="/login" slot="left">
                    <mt-button v-if="isLogin">切换</mt-button>
                    <mt-button v-else>登录</mt-button>
                 </router-link>
                 <router-link to="/chooseCity" slot="right">
                    <mt-button><i class="fa fa-plus"></i></mt-button>
                 </router-link>
            </myHeader>
            <div class="date">
                <h1 class='title'>浮&nbsp;&nbsp;生</h1>
                <p class='orderDay'>第&nbsp;<span class='number'>{{UserInfo.dayNumber}}</span>&nbsp;日</p>
                <p class='detailDay' v-if="CityInfo.status === 'ok'"><i class="fa fa-calendar"></i>&nbsp;<span>{{CityInfo.daily_forecast["0"].date}}</span>&nbsp;<span>{{lunarDate.week}}</span>&nbsp;<span>{{lunarDate.date}}</span></p>
            </div>
            <div class='weather-content' v-if="CityInfo.status === 'ok'">
                <i class="icon-weather" :style='styleObject'></i>
            </div>
            <p class='weater-des' v-if="CityInfo.status === 'ok'">{{CityInfo.now.cond.txt}}</p>
            <div class="weather-detail">
                <div class="detail-left">
                    <p class='du'><span class='centigrade' v-if="CityInfo.hourly_forecast != null">{{CityInfo.hourly_forecast["0"].tmp}}</span>&nbsp;℃</p>
                    <p class='maxmin' v-if="CityInfo.hourly_forecast != null"><i class="fa fa-long-arrow-down"></i>&nbsp;<span class='min'>{{CityInfo.daily_forecast["0"].tmp.min}}</span>℃&nbsp;&nbsp;<i class="fa fa-long-arrow-up"></i>&nbsp;<span class='max'>{{CityInfo.daily_forecast["0"].tmp.max}}</span>℃</p>
                </div>
                <div class="detail-right">
                    <p class='pm25'>PM2.5：<span class='pmnumber' v-if="CityInfo.status === 'ok'">{{CityInfo.aqi.city.pm25}}</span></p>
                    <p class='pmdes'>空气质量：<span class='air' v-if="CityInfo.status === 'ok'">{{CityInfo.aqi.city.qlty}}</span></p>
                </div>
            </div>
        </div>
        <future :CityInfo='CityInfo'></future>
    </mt-loadmore>
</template>

<script>
import myHeader from '@/components/header';
import future from '@/components/future';
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            CityInfo: {},
            iconUrl: '',
            styleObject: {},
            cityNow: '成都',
            UserInfo: {},
            isLogin: false
        };
    },
    computed: {
        lunarDate: function() {
            var sWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            var dNow = new Date(this.CityInfo.daily_forecast['0'].date);
            var CalendarData = new Array(100);
            var madd = new Array(12);
            /* var tgString = '甲乙丙丁戊己庚辛壬癸'; var dzString = '子丑寅卯辰巳午未申酉戌亥'; */
            var numString = '一二三四五六七八九十';
            var monString = '正二三四五六七八九十冬腊';
            var cYear, cMonth, cDay, TheDate;
            console.log(cYear);
            CalendarData = [0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B,
        0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F,
        0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95];
            madd[0] = 0; madd[1] = 31; madd[2] = 59; madd[3] = 90;
            madd[4] = 120; madd[5] = 151; madd[6] = 181; madd[7] = 212;
            madd[8] = 243; madd[9] = 273; madd[10] = 304; madd[11] = 334;
            function GetBit(m, n) { return (m >> n) & 1; }
            function e2c() {
                TheDate = (arguments.length !== 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
                var total, m, n, k;
                var isEnd = false;
                var tmp = TheDate.getFullYear();
                total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38; if (TheDate.getYear() % 4 === 0 && TheDate.getMonth() > 1) { total++; } for (m = 0; ; m++) { k = (CalendarData[m] < 0xfff) ? 11 : 12; for (n = k; n >= 0; n--) { if (total <= 29 + GetBit(CalendarData[m], n)) { isEnd = true; break; } total = total - 29 - GetBit(CalendarData[m], n); } if (isEnd) break; } cYear = 1921 + m; cMonth = k - n + 1; cDay = total; if (k === 12) { if (cMonth === Math.floor(CalendarData[m] / 0x10000) + 1) { cMonth = 1 - cMonth; } if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) { cMonth--; } }
            }
            function GetcDateString() {
                var tmp = '';
                // 不展示年
                // tmp += tgString.charAt((cYear - 4) % 10);
                // tmp += dzString.charAt((cYear - 4) % 12);
                // tmp += '年 ';
                if (cMonth < 1) { tmp += '(闰)'; tmp += monString.charAt(-cMonth - 1); } else { tmp += monString.charAt(cMonth - 1); } tmp += '月'; tmp += (cDay < 11) ? '初' : ((cDay < 20) ? '十' : ((cDay < 30) ? '廿' : '三十'));
                if (cDay % 10 !== 0 || cDay === 10) { tmp += numString.charAt((cDay - 1) % 10); } return tmp;
            }
            function GetLunarDay(solarYear, solarMonth, solarDay) {
                if (solarYear < 1921 || solarYear > 2020) {
                    return '';
                } else { solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11; e2c(solarYear, solarMonth, solarDay); return GetcDateString(); }
            }
            var D = new Date();
            var yy = D.getFullYear();
            var mm = D.getMonth() + 1;
            var dd = D.getDate();
            function getFullYear(d) { // 修正firefox下year错误
                var yr = d.getYear();
                if (yr < 1000) {
                    yr += 1900;
                    return yr;
                }
            }
            function showDate() {
                var sValue = getFullYear(dNow) + '年' + (dNow.getMonth() + 1) + '月' + dNow.getDate() + '日' + ' ' + sWeek[dNow.getDay()] + ' ';
                sValue += GetLunarDay(yy, mm, dd);
                console.log(sValue);
                return {'week': sWeek[dNow.getDay()], 'date': GetLunarDay(yy, mm, dd)};
            };
            return showDate();
        }
    },
    created() {
        let UserInfo = sessionStorage.getItem('UserInfo');
        if (UserInfo) {
            this.isLogin = true;
            let UserInfoJson = JSON.parse(UserInfo);
            console.log(UserInfoJson);
            let UserId = UserInfoJson.id;
            this.$http({
                url: 'getUserById/' + UserId,
                method: 'Get',
                baseURL: '/self'
            }).then((response) => {
                this.UserInfo = response.data.data;
            });
        };
        let cityWeather = sessionStorage.getItem('cityWeather');
        if (cityWeather) {
            this.CityInfo = JSON.parse(sessionStorage.getItem('cityWeather'));
            this.iconUrl = 'url(static/weathericon/' + this.CityInfo.now.cond.code + '.png)';
            this.styleObject = { 'background-image': this.iconUrl };
            this.cityNow = this.CityInfo.basic.city;
        } else {
            this.refresh();
        };
    },
    methods: {
        refresh() {
            let position = '';
            this.$http({
                url: 'getLocation',
                method: 'get',
                baseURL: '/self',
                withCredentials: true
            }).then((response) => {
                let locationData = response.data.data;
                position = locationData.content.address_detail.city;
                if (locationData.status === 0) {
                    this.$http({
                        url: 'getWeather',
                        method: 'get',
                        baseURL: '/self',
                        params: {
                            city: position
                        },
                        withCredentials: true
                    }).then((response) => {
                        let weatherData = response.data.data;
                        if (weatherData.HeWeather5['0'].status === 'ok') {
                            sessionStorage.setItem('cityWeather', JSON.stringify(weatherData.HeWeather5['0']));
                            this.CityInfo = JSON.parse(sessionStorage.getItem('cityWeather'));
                            console.log(this.CityInfo.hourly_forecast.length);
                            this.iconUrl = 'url(static/weathericon/' + this.CityInfo.now.cond.code + '.png)';
                            this.styleObject = { 'background-image': this.iconUrl };
                            this.cityNow = this.CityInfo.basic.city;
                        } else {
                            MessageBox('提示', '获取天气信息失败');
                        }
                    });
                } else {
                    MessageBox('提示', '定位失败,请手动选择城市');
                }
            });
        },
        loadTop() {
          this.refresh();
          this.$refs.loadmore.onTopLoaded();
        }
    },
    components: {
        myHeader,
        future
    }
};
</script>

<style>
.loadmore {
    height: 100%;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)),url('../assets/img/index_night.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    overflow: auto;
}
.loadmore::-webkit-scrollbar {
    width: 0px;
}
.loadmore .mint-loadmore-content {
    height: 100%;
    width: 100%;
}
.index {
	position: relative;
    height: 100%;
    width: 100%;
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
.detailDay i {
	font-size: 10px;
	vertical-align: top; 
}
.weather-content {
	position: relative;
	width:100%;
}
.icon-weather {
    display: block;
    width: 100px;
    height: 100px;
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
