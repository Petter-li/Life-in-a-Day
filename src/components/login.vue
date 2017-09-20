<template>
    <div id="loginorsign">
        <div class="bg"></div>
        <div class="content">
            <mt-header :title="title" class='title'>
                <router-link to="/index" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
            <div class="form loginForm">
                <mt-field placeholder="用户名" v-model="info.username" class='input username'></mt-field>
                <mt-field placeholder="密码" v-model="info.password" type="password" class='input'></mt-field>
                <mt-field v-if='!isLogin' placeholder="出生日期" v-model="info.birthday" class='input' readonly @click.native.stop.prevent='changePicker'></mt-field>
            </div>
            <div class="button-content">
                <div class="button-wrap">
                    <mt-button size="large" type="primary" class='button' @click.native='submit'><span v-if='isLogin'>登录</span><span v-else>注册</span></mt-button>
                </div>
            </div>
            <p class='changeMinde' @click='changeState'><span v-if='isLogin'>注册</span><span v-else>登录</span></p>
            <mt-datetime-picker
                ref="picker"
                v-model="pickerVisible"
                type="date"
                :startDate='startDate'
                :endDate='endDate'
                @confirm="handleConfirm">
            </mt-datetime-picker>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            title: '登录',
            info: {
                username: '',
                password: '',
                birthday: ''
            },
            pickerVisible: '',
            endDate: new Date(),
            startDate: new Date('1970/01/01'),
            isOpen: false,
            isLogin: true
        };
    },
    methods: {
        changePicker () {
            if (!this.isOpen) {
                this.$refs.picker.open();
            } else {
                this.$refs.picker.close();
            }
            this.isOpen = !this.isOpen;
        },
        handleConfirm(value) {
            let date = new Date(value);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            if (month >= 1 && month <= 9) {
                month = '0' + month;
            };
            if (day >= 0 && day <= 9) {
                day = '0' + day;
            };
            this.info.birthday = year + '-' + month + '-' + day;
            this.isOpen = !this.isOpen;
        },
        changeState() {
            this.isLogin = !this.isLogin;
            this.info.username = '';
            this.info.password = '';
            this.info.birthday = '';
            if (this.isLogin) {
                this.title = '登录';
            } else {
                this.title = '注册';
            }
        },
        submit() {
            let _this = this;
            let qs = require('qs');
            if (this.isLogin) {
                this.$http({
                    url: 'login',
                    method: 'post',
                    baseURL: '/self',
                    data: qs.stringify({
                        name: _this.info.username,
                        password: _this.info.password
                    })
                }).then((response) => {
                    if (response.data.code === 0) {
                        sessionStorage.setItem('UserInfo', JSON.stringify(response.data.data));
                        _this.$router.push({name: 'index'});
                    } else {
                        MessageBox('提示', response.data.message);
                    }
                });
            } else {
                this.$http({
                    url: 'sign',
                    method: 'post',
                    baseURL: '/self',
                    data: qs.stringify({
                        name: _this.info.username,
                        password: _this.info.password,
                        birthDay: _this.info.birthday
                    })
                }).then((response) => {
                    if (response.data.code === 0) {
                        MessageBox('提示', '注册成功,请输入账号密码登录');
                        _this.changeState();
                    } else {
                       MessageBox('提示', response.data.message);
                    }
                });
            }
        }
    }
};
</script>

<style>
#loginorsign {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('../assets/img/login2.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.bg {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.6;
}
.content {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 100%;
}
.title {
    background-color: transparent;
    font-size: 18px;
}
.form {
    margin: 60px auto 0px auto;
    width:70%;
}
.loginForm a.mint-cell {
    background-color: transparent;
}
.input {
    background-color: transparent;
    border-top: none;
}
.input .mint-cell-wrapper {
    padding: 0px 0px;
    background-color: transparent;
}
.username .mint-cell-wrapper {
    background-image: none;
}
.input input {
    background-color: transparent;
    color: #fff;
}
.button-content {
    width: 100%;
    margin-top: 50px;
}
.button-content .button-wrap {
    width: 50%;
    margin: 0 auto;
}
.button-content .button-wrap .button {
    border-radius: 20px;
}
.changeMinde {
    margin-top: 20px;
    text-align: center;
    color: #696969;
    text-decoration: underline;
}
</style>
