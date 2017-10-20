<template>
    <div class="content">
        <div class='serach-area'>
            <mt-search v-model="value" :show='isShow' @input.native='change(value)'>
                <mt-cell
                    v-for="item in result"
                    :key="item.value"
                    :title="item.title"
                    :value="item.value"
                    @click.native='selectCity(item.value)'>
                </mt-cell>
            </mt-search>
        </div>
        <hotCity @upup='selectCity' :hotcitys='hotcitys'></hotCity>
    </div>
</template>

<script>
import hotCity from '@/components/hotCity';
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            result: [],
            value: '',
            isShow: false,
            hotcitys: [{name: '成都市'}, {name: '北京市'}, {name: '上海市'}, {name: '广州市'}, {name: '杭州市'}, {name: '深圳市'}, {name: '武汉市'}, {name: '南京市'}, {name: '西安市'}, {name: '重庆市'}, {name: '昆明市'}, {name: '哈尔滨市'}, {name: '厦门市'}, {name: '三亚市'}, {name: '长沙市'}, {name: '青岛市'}, {name: '拉萨市'}, {name: '香港'}]
        };
    },
    methods: {
        change (value) {
            let _this = this;
            _this.result = [];
            this.$http({
                url: 'getCity',
                method: 'get',
                params: {
                    name: value
                }
            }).then((response) => {
                this.result = response.data;
            });
        },
        selectCity (value) {
            this.$http({
                url: 'getWeather',
                method: 'get',
                params: {
                    city: value
                },
                withCredentials: true
            }).then((response) => {
                this.value = '';
                this.isShow = false;
                if (response.data.data.HeWeather5['0'].status === 'unknown city') {
                    MessageBox('提示', '未知城市，请重新输入');
                    return false;
                } else {
                    sessionStorage.setItem('cityWeather', JSON.stringify(response.data.data.HeWeather5['0']));
                    this.$router.go(-1);
                }
            });
        }
    },
    components: {
        hotCity
    }
};
</script>

<style>
.serach-area {
    height:52px;
    width: 100%;
}
</style>
