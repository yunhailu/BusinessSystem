<template>
    <div class="wrapper">
        <div class="login-header">
            <div>
                <img src="images/logo.jpg">
                <span>商业互联网信息智能分析平台</span>
            </div>
            <ul>
                <li><a href="javascript:void(0);">使用说明</a></li>
                <li><a href="javascript:void(0);">品牌表现</a></li>
                <li><a href="javascript:void(0);" @click="showLogin">登陆</a></li>
                <li><a href="javascript:void(0);" @click="showApply">申请试用</a></li>
            </ul>
        </div>
        <!--<div class="container">

            <div class="login-page">
                <form class="form-horizontal" v-on:submit.prevent>
                    <fieldset>
                        <legend>
                            <img class="logo-icon" src="images/logo.jpg" />
                            <span>沃德品牌气象站</span>
                        </legend>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label login-font">用户名</label>
                            <div class="col-sm-4">
                                <input type="text" v-model="userName" class="form-control" id="inputEmail3" placeholder="UserName">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputPassword3" class="col-sm-2 control-label login-font">密码</label>
                            <div class="col-sm-4">
                                <input type="password" v-model="password" class="form-control" id="inputPassword3" placeholder="Password">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10 login-font">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox"> 记住密码
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group" v-show="errorTip">
                            <div class="col-sm-offset-2 col-sm-10 errorTip">
                                <label>{{errorTip}}</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="submit" class="btn btn-primary" @click="login">登录系统</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>-->
        <footer-component></footer-component>
        <div class="apply-bg" v-show="isApply" @click="cancelApply">

        </div>
        <div class="login-bg" v-show="isLogin" @click="cancelLogin">
            <div class="login-bg-content" @click.stop="">
                <div class="login-bg-content-model" @keyup.enter="login">
                    <h3>
                        <span>登录</span>
                        <a href="javascript:void(0);">没有账号?点我申请</a>
                    </h3>
                    <div class="loginCon">
                        <div class="form-group">
                            <span class="logImg"><img src="images/user.png" alt=""></span>
                            <input type="text" placeholder="用户名"  v-model="userName"  />
                        </div>
                        <div class="form-group">
                            <span class="logImg"><img src="images/key.png" alt=""></span>
                            <input type="password" placeholder="请输入密码" v-model="password"  />
                        </div>
                        <div class="form-group">
                            <p style="font-size: 13px"></p>
                        </div>
                        <div class="form-group">
                            <input class="remember" type="checkbox" id="remember">
                            <label for="remember">记住密码</label>
                            <div class="pull-right">
                                <a href="javascript:void(0);">找回密码</a>
                            </div>
                        </div>
                        <div class="form-group" v-show="errorTip">
                            <div class="errorTip">
                                <label>{{errorTip}}</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <a class="login-btn" href="javascript:void(0);"  @click="login">登陆</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style lang="less">
    @import "Login.less";
</style>
<script type="text/ecmascript-6">

    import Cookie from "js-cookie";
    import {redirect} from "../../widgets/Auth";
    import * as Api from "../../widgets/Api";
    import FooterComponent from "../Footer/Footer.vue"

    export default {
        name: 'login',
        data(){
            return{
                errorTip: '',
                userName: '',
                password: '',
                isApply:false,
                isLogin:false
            };
        },
        components:{
            FooterComponent
        },
        methods: {
            cancelApply(){
                this.isApply=false;
                this.errorTip = false;
            },
            cancelLogin(){
                this.isLogin=false;
                this.errorTip = false;
            },
            showApply(){
                this.isApply=true;
            },
            showLogin(){
                this.isLogin = true;
            },
            login(){
//                if(!this.userName && !this.password){
//                    alert('用户名密码不能为空！');
//                    return ;
//                }
//                if(this.userName != 'admin' || this.password != 'admin'){
//                    alert('用户名密码不正确！');
//                    return ;
//                }
//                Cookie.set('business_uid', 'admin');
//                location.hash = '#!/home';

//登陆页面逻辑
                Api.login({
                    username: this.userName,
                    password: this.password
                }).then(resp => {
                    //console.log('Login', resp);
                    const data = resp.data;
                    if(data.code == 0){
                        this.errorTip = false;
                        Cookie.set('business_uid', data.data.user_id);
                        Cookie.set('business_name', data.data.user_name);
                        Cookie.set('business_admin', data.data.isAdmin);
                        Cookie.set('business_email', data.data.email);
                        //location.hash = '#!/home';
                        this.$router.go({name: 'home'});
                    } else {
                        this.errorTip = data.message;
                    }
                });
            }
        },
        route:{
            activate(transition){
                redirect();
                transition.next();
            }
        }
    };

</script>