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
        <hotCity :hotcitys='hotcitys'></hotCity>
    </div>
</template>

<script>
import hotCity from '@/components/hotCity';
export default {
    data() {
        return {
            result: [],
            value: '',
            isShow: false,
            proJson: [],
            cityJson: [],
            areaJson: [],
            hotcitys: [{name: '成都市'}, {name: '北京市'}, {name: '上海市'}, {name: '广州市'}, {name: '杭州市'}, {name: '深圳市'}, {name: '武汉市'}, {name: '南京市'}, {name: '西安市'}, {name: '重庆市'}, {name: '昆明市'}, {name: '哈尔滨市'}, {name: '厦门市'}, {name: '三亚市'}, {name: '长沙市'}, {name: '青岛市'}, {name: '拉萨市'}, {name: '香港'}]
        };
    },
    created() {
        let _this = this;
        this.$http.get('../../../static/pro.json').then((response) => {
            // 获取省份
            _this.proJson = response.data;
        });
        this.$http.get('../../../static/city.json').then((response) => {
            // 获取城市
            _this.cityJson = response.data;
        });
        this.$http.get('../../../static/area.json').then((response) => {
            // 获取区县
            _this.areaJson = response.data;
        });
    },
    methods: {
        change (value) {
            let _this = this;
            _this.result = [];
            _this.cityJson.forEach(function(e) {
                var json = {};
                if (e.name.indexOf(value) >= 0) {
                    json.title = e.name;
                    _this.proJson.forEach(function(i) {
                        if (i.ProID === e.ProID) {
                            json.value = i.name;
                        }
                    });
                    if (_this.result.length < 10) {
                        _this.result.push(json);
                    } else {
                        return true;
                    }
                }
            });
            if (_this.result.length < 10) {
                _this.areaJson.forEach(function(d) {
                    var json = {};
                    if (d.DisName.indexOf(value) >= 0) {
                        json.title = d.DisName;
                        _this.cityJson.forEach(function(n) {
                            if (d.CityID === n.CityID) {
                                json.value = n.name;
                                _this.proJson.forEach(function(f) {
                                    if (n.ProID === f.ProID) {
                                        json.value += ',' + f.name;
                                    }
                                });
                            }
                        });
                        if (_this.result.length < 10) {
                            _this.result.push(json);
                        } else {
                            return true;
                        };
                    };
                });
            }
        },
        selectCity (value) {
            this.value = '';
            this.isShow = false;
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
