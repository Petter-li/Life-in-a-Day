<template>
    <div class="future">
        <p>天气预报</p>
        <div class="daysweather">
            <div class="dayweather" v-if='CityInfo.status === "ok"' v-for='item in CityInfo.daily_forecast'>
                <div class="date"><span>{{item.date | getWeekDay}}</span></div>
                <div class="icon"></div>
                <div class="temp"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        CityInfo: {
            type: Object
        }
    },
    data() {
        return {
        };
    },
    created() {
    },
    methods: {
    },
    filters: {
        getWeekDay: function(date) {
            let showDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            let time = new Date(date);
            let day = time.getDay();
            return showDay[day];
        }
    }
};
</script>

<style>
.future {
    width:94%;
    margin:0px 3%;
    padding-bottom: 20px;
    color: #fff;
}
.future p {
    height: 30px;
    line-height: 30px;
}
.daysweather {
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100px;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
}
.dayweather {
    flex: 1;
}
.daysweather .date {
    height: 15px;
}
</style>