<template>
    <div class="wrapper">
        <div class="login-header">
            <div class="header-login">
                   <span class="zh">{{loginStr.forCcsiTitle}}</span>
                   <span class="en">{{loginStr.forCcsiTitleE}}</span>
            </div>
            <ul>
                <li v-if="false"><a href="javascript:void(0);" @click="toIntruction">{{loginStr.instructionForUse}}</a></li>
                <li v-if="false"><a href="javascript:void(0);">{{loginStr.showBrand}}</a></li>
                <li><a href="javascript:void(0);" @click="showLogin">{{loginStr.forLogin}}</a></li>
                <li  v-show="false"><a href="javascript:void(0);" @click="showApply">{{loginStr.applyForUse}}</a></li>
                <li  v-if="false"><a href="javascript:void(0);" @click="toPromotion">{{loginStr.forFirstPage}}</a></li>
            </ul>
        </div>
        <footer-component></footer-component>
        <!--<div class="apply-bg" v-show="isApply" @click="cancelApply">
            <div class="apply-bg-content" @click.stop>
                <div class="apply-bg-content-model" @keyup.enter="submit" >
                    <h3>
                        <span>{{loginStr.applyForUse}}</span>
                        <a href="javascript:void(0);" @click="toLogin">{{applyStr.toLogin}}</a>
                    </h3>
                    <div class="applyCon">
                        <div class="form-group">
                            <input type="text" placeholder="姓名"  v-model="applyUserName"  />
                            <em class="red">*</em>
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="公司名称"  v-model="applyFactory"  />
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="手机号"  v-model="applyTelephone"  />
                            <em class="red">*</em>
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="验证码"  v-model="applySms"  />
                            <span class="getSms">获取验证码</span>
                            <em class="red">*</em>
                        </div>
                        <div class="form-group">
                            <textarea class="require" placeholder="需求描述"></textarea>
                        </div>
                        <div class="form-group">
                            <a class="apply-btn" href="javascript:void(0);"  @click="submit">提 交</a>
                            <p>客服 : ***-********</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>-->
        <div class="login-bg" v-show="isLogin" @click="cancelLogin">
            <div class="login-bg-content" @click.stop>
                <div class="login-bg-content-model" @keyup.enter="login"  @keyup.8="isShowError">
                    <h3>
                        <span>{{loginStr.login}}</span>
                        <a href="javascript:void(0);" @click="toApply" v-show="false">{{loginStr.toApply}}</a>
                    </h3>
                    <div class="loginCon">
                        <div class="form-group">
                            <span class="logImg"><img src="../../../images/user.png" alt=""></span>
                            <input type="text" placeholder="{{loginStr.username}}"  v-model="userName"  />
                        </div>
                        <div class="form-group">
                            <span class="logImg"><img src="../../../images/key.png" alt=""></span>
                            <input type="password" placeholder="{{loginStr.password}}" v-model="password"  />
                        </div>
                        <div class="form-group">
                            <p style="font-size: 13px"></p>
                        </div>
                        <div class="form-group">
                            <input class="remember" v-el="remember" type="checkbox" id="remember">
                            <label for="remember">{{loginStr.remember}}</label>
                            <div class="pull-right">
                                <a href="javascript:void(0);" v-show="false">{{loginStr.getBack}}</a>
                            </div>
                        </div>
                        <div class="form-group" v-show="errorShow">
                            <div class="errorTip">
                                <label>{{errorTip}}</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <a class="login-btn" href="javascript:void(0);"  @click="login">{{loginStr.submit}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--<instruction v-if="isInstruction"></instruction>-->
    <ccsi-promotion v-if="isPromotion"></ccsi-promotion>
    <!--<instruction v-if="isInstruction"></instruction>-->
</template>
<style lang="less">
    @import "CcsiLogin.less";
</style>
<script type="text/ecmascript-6">

    import Local from '../../local/local';
    import Cookie from "js-cookie";
    import { getCookie } from '../../widgets/Cookie';
    import {redirect} from "../../widgets/Auth";
//    import Instruction from "./../Common/InstructionsForUse/InstructionsForUse.vue"
    import * as Api from "../../widgets/Api";
    import FooterComponent from "../Footer/Footer.vue"
    import CcsiPromotion from "./CcsiPromotion/CcsiPromotion.vue"
//    import Instruction from "./InstructionsForUse/InstructionsForUse.vue"
    import {loginState } from '../../vuex/getters';
    import {setLoginState} from "../../vuex/actions";

    export default {
        name: 'login',
        data(){
            const applyStr = Local().apply;
            const loginStr =Local().login;
            return{
                applyStr,
                loginStr,
                errorTip: '',
                userName: '',
                password: '',
//                userName:getCookie('login_userName'),
//                password:getCookie('login_password'),
                isApply:false,
                isLogin:false,
                errorShow:false,
                isPromotion:true,
                isInstruction:false,
                showList:false
            };
        },
        components:{
            FooterComponent,CcsiPromotion
            //,Instruction
        },
        vuex:{
            getters:{loginState},
            actions:{setLoginState}
        },
        methods: {
            toggle(){
                this.showList = !this.showList;
            },
            toIntruction(){
                this.isInstruction=true;
                this.isPromotion=false;
            },
            toPromotion(){
                this.isPromotion=true;
                this.isInstruction=false;
                this.showList = !this.showList;
            },
            submit(){

            },
            toApply(){
                this.isLogin=false;
                this.isApply=true;
            },
            toLogin(){
                this.isApply=false;
                this.isLogin=true;
            },
            isShowError(){
                if(this.errorShow == true){
                    this.errorShow = this.userName || this.password;
                }
            },
            cancelApply(){
                this.isApply=false;
                this.errorShow = false;
            },
            cancelLogin(){
                this.isLogin=false;
                this.errorShow = false;
            },
            showApply(){
                this.isApply=true;
            },
            showLogin(){
                this.isLogin = true;
                this.showList = !this.showList;
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
console.log(this.userName,this.password);
//登陆页面逻辑
                Api.login({
                    username: this.userName,
                    password: this.password
                }).then(resp => {
                    const data = resp.data;
                    if(data.code == 0){
                        this.errorShow = false;
                        Cookie.set('business_uid', data.data.user_id);
                        Cookie.set('business_name', data.data.user_name);
                        Cookie.set('business_admin', data.data.isAdmin);
                        Cookie.set('business_email', data.data.email);
                        Cookie.set('business_level', data.data.level);
                        this.userName = '';
                        this.password = '';
                        this.$router.go({name: 'home'});
                    } else {
                        this.errorShow = true;
                        this.errorTip = data.message;
                    }
                });
            }
        },
        ready(){
            console.log('aaa',this.userName,this.password);
                this.userName = getCookie('login_userName');
                this.password = getCookie('login_password');

        },
        watch:{
            loginState:{
                handler(val){
                    if(this.loginState==true){
                        this.isLogin = true;
                        this.setLoginState(false);
                    }
                }
            }
        }
        /*route:{
            activate(transition){
                redirect();
                transition.next();
            }
        }*/
    };

</script>