<template>
    <div class="wrapper">
        <div class="login-header container ">
            <div class="row">
                <div class="col-md-6 col-lg-6  pull-left">
                <img src="images/logo.png">
                <span>{{loginStr.forMediaQTitle}}</span>
                </div>
                <div class="col-md-6 col-lg-6 pull-right">
                    <ul  class=" navbar-nav pull-right ">
                        <li><a href="javascript:void(0);" @click="toPromotion">{{loginStr.forFirstPage}}</a></li>
                        <li><a href="javascript:void(0);" @click="showLogin">{{loginStr.forLogin}}</a></li>
                        <li><a href="javascript:void(0);" @click="toHotEvent">{{loginStr.hotEvent}}</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <footer-component></footer-component>
        <!--<div class="apply-bg" v-show="isApply" @click="cancelApply">
            <div class="apply-bg-content" @click.stop>
                <div class="apply-bg-content-model" @keyup.enter="submit" >
                    <h3>
                        <span>申请试用</span>
                        <a href="javascript:void(0);" @click="toLogin">已有账号，请点此登陆</a>
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
                        <!--<a href="javascript:void(0);" @click="toApply" v-show="false">{{loginStr.toApply}}</a>-->
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
    <div v-if="isPromotion"  class="loginSlider">
        <promotion ></promotion>

    </div>

    <!--<instruction v-if="isInstruction"></instruction>-->
    <hot-event class="hotevent" v-if="isHotEvent"></hot-event>
</template>
<style lang="less">
    @import "NewsLogin.less";
</style>
<script type="text/ecmascript-6">

    import Local from '../../local/local';
    import Cookie from "js-cookie";
    import { getCookie } from '../../widgets/Cookie';
    import {redirect} from "../../widgets/Auth";
    import * as Api from "../../widgets/Api";
    import FooterComponent from "../Footer/Footer.vue"
    import Promotion from "./NewsLogin/NewsLogin.vue"
    //import Instruction from "../Common/InstructionsForUse/InstructionsForUse.vue"
    import HotEvent from "../AllNetHotEvent/AllNetHotEvent.vue"
    import {loginState} from '../../vuex/getters';
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
                //isInstruction:false,
                isHotEvent:false,
            };
        },
        components:{
            FooterComponent,Promotion,HotEvent
//            ,Instruction
        },
        vuex:{
            getters:{loginState},
            actions:{setLoginState}
        },
        methods: {
            toHotEvent(){
                this.isHotEvent = true;
                this.isPromotion=false;
               // this.isInstruction=false;
            },
           // 注册
           /*toIntruction(){
                this.isInstruction=true;
                this.isPromotion=false;
               this.isHotEvent = false;
            },*/
            toPromotion(){
                this.isPromotion=true;
               // this.isInstruction=false;
                this.isHotEvent = false;
            },
            /*去申请登使用
            toApply(){
                this.isLogin=false;
                this.isApply=true;
            },*/
            //去申请登陆
            /*toLogin(){
                this.isApply=false;
                this.isLogin=true;
            },*/
            isShowError(){
                if(this.errorShow == true){
                    this.errorShow = this.userName || this.password;
                }
            },
            /*点击遮罩取消
            cancelApply(){
                this.isApply=false;
                this.errorShow = false;
            },*/
            cancelLogin(){
                this.isLogin=false;
                this.errorShow = false;
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
                console.log(this.userName,this.password);
//登陆页面逻辑
                Api.login({
                    username: this.userName,
                    password: this.password
                }).then(resp => {
                    //console.log('Login', resp);
                    const data = resp.data;
                    if(data.code == 0){
                        this.errorShow = false;
                        Cookie.set('business_uid', data.data.user_id);
                        Cookie.set('business_name', data.data.user_name);
                        Cookie.set('business_admin', data.data.isAdmin);
                        Cookie.set('business_email', data.data.email);
                        Cookie.set('business_level', data.data.level);
                        Cookie.set('access_token',data.data.access_token);
                        if(this.remember){
                            Cookie.set('login_userName',this.userName);
                            Cookie.set('login_password',this.password);
                            Cookie.set('login_remember',this.remember);
                        }else{
                            this.userName = '';
                            this.password = '';
                        }
                        this.$router.go({name: 'home'});
                    } else {
                        this.errorShow = true;
                        this.errorTip = data.message;
                    }
                });
            }
        },
        ready(){

            this.userName = getCookie('login_userName');
            this.password = getCookie('login_password');
            this.remember=getCookie('login_remember');

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
    };

</script>