<template>
    <div class="wrapper">
        <div class="login-header container ">
            <div class="row">
                <div class="col-md-6 col-lg-6  pull-left">
                    <img src="images/logo.png">
                    <span>{{loginStr.forWodeTitle}}</span>
                </div>
                <div class="col-md-6 col-lg-6 pull-right">
                    <ul  class=" navbar-nav pull-right ">
                        <li><a href="javascript:void(0);" @click="toPromotion">{{loginStr.forFirstPage}}</a></li>
                        <li><a href="javascript:void(0);" @click="showLogin">{{loginStr.forLogin}}</a></li>
                        <li><a href="javascript:void(0);" @click="toHotEvent">{{loginStr.hotEvent}}</a></li>
                        <li><a href="javascript:void(0);" @click="toApply">{{loginStr.applyForUse}}</a></li>

                        <!--<li><a href="javascript:void(0);" @click="showApply">账号注册</a></li>-->
                    </ul>
                </div>
            </div>


            <!--v-bind:style="{height:sliderH + 'px' ,width: sliderW + 'px' }"-->
        </div>
        <footer-component></footer-component>

        <!--账号申请注册------start -->
        <div class="apply-bg" v-show="isApply" @click="cancelApply">
            <div class="apply-bg-content" @click.stop>
                <div class="apply-bg-content-model" @keyup.enter="submit" >
                    <h3>
                        <span>账号申请</span>
                        <a href="javascript:void(0);" @click="toLogin">已有账号，请点此登陆</a>
                    </h3>
                    <div class="applyCon">
                        <div class="form-group">
                            <input type="text" placeholder="用户名"  v-model="applyUserName"  />
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
                            <input type="text" placeholder="常用邮箱"  v-model="email"  />
                            <em class="red">*</em>
                        </div>
                        <!--<div class="form-group">
                            <input type="text" placeholder="验证码"  v-model="applySms"  />
                            <span class="getSms">获取验证码</span>
                            <em class="red">*</em>
                        </div>-->
                        <!-- <div class="form-group">
                             <textarea class="require" placeholder="需求描述" v-model="demand"></textarea>
                         </div>-->
                        <div class="form-group">
                            <a class="apply-btn" href="javascript:void(0);"  @click="submit">提 交</a>
                            <p>客服 : {{common.phone}}</p>
                        </div>
                    </div>
                    <div class="smallTips" v-if="showSmallTips" @click="tipsHide">
                        <p>{{errorTips}}</p>
                    </div>
                </div>
            </div>
        </div>
        <!--账号申请注册-------end -->
        <div class="login-bg" v-show="isLogin" @click="cancelLogin">
            <div class="login-bg-content" @click.stop>
                <div class="login-bg-content-model" @keyup.enter="login"  @keyup.8="isShowError">
                    <h3>
                        <span>{{loginStr.login}}</span>
                        <a href="javascript:void(0);" @click="toApply">{{loginStr.toApply}}</a>
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
    <qservice></qservice>
</template>
<style lang="less">
    @import "SocietyLogin.less";
</style>
<script type="text/ecmascript-6">

    import Local from '../../local/local';
    import Cookie from "js-cookie";
    import { getCookie } from '../../widgets/Cookie';
    import {redirect} from "../../widgets/Auth";
    import * as Api from "../../widgets/Api";
    import FooterComponent from "../Footer/Footer.vue"
    import Promotion from "./SocietyPromotion/SocietyPromotion.vue"
    import Instruction from "./../Common/InstructionsForUse/InstructionsForUse.vue"
    import HotEvent from "../AllNetHotEvent/AllNetHotEvent.vue"
    import qservice from '../QQservice/QQservice.vue';
    import {loginState ,loginTime,userLevel } from '../../vuex/getters';
    import {setLoginState, setLoginTime,setUserLevel} from "../../vuex/actions";

    export default {
        name: 'login',
        data(){
            const applyStr = Local().apply;
            const loginStr =Local().login;
            const common = Local().common;
            return{
                applyStr,
                loginStr,
                common,
                errorTip: '',
                userName: '',
                password: '',
                applyUserName:'',
                applyFactory:'',
                applyTelephone:'',
                email:'',
//                demand:'',
                errorTips:'',
                timeout:null,
//                userName:getCookie('login_userName'),
//                password:getCookie('login_password'),
                isApply:false,
                isLogin:false,
                errorShow:false,
                isPromotion:true,
                isHotEvent:false,
                showSmallTips:false
            };
        },
        components:{
            FooterComponent,Promotion,HotEvent,qservice
        },
        vuex:{
            getters:{loginState, loginTime,userLevel},
            actions:{setLoginState, setLoginTime,setUserLevel}
        },
        methods: {
            tipsHide(){
                clearTimeout(this.timeout);
                this.showSmallTips = false;
            },
            tipsShow(){
                clearTimeout(this.timeout);
                this.timeout = setTimeout(function () {
                    this.showSmallTips = false;
                }.bind(this),1000);
            },
            submit(){
                this.errorTips = '';

                //姓名必填2-10位
                if((this.applyUserName).length>10 ||(this.applyUserName).length<2){
                    this.errorTips="姓名需输入2-10位字符";
                    this.showSmallTips = true;
                    this.tipsShow();
                    return ;
                }
                var nameReg = /^[a-zA-Z0-9_]$/;
                var chineseReg = new RegExp("[\u4e00-\u9fa5]");
                for(var i=0;i<(this.applyUserName).length;i++){
                    const c = (this.applyUserName).charAt(i);
                    if(!(chineseReg.test(c) || nameReg.test(c))){
                        this.errorTips="用户名格式错误";
                        this.showSmallTips = true;
                        this.tipsShow();
                        return ;
                    }
                }
                //校验正确的手机号
                var phoneReg = /^((1[3-8]{1}[0-9]{1})+\d{8})$/;
                if(!phoneReg.test(this.applyTelephone)){
                    this.errorTips="请输入正确手机号";
                    this.showSmallTips = true;
                    this.tipsShow();
                    return ;
                }
                //可用邮箱注册校验
                var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
                if(!emailReg.test(this.email)){
                    this.errorTips="请输入正确的邮箱格式";
                    this.showSmallTips = true;
                    this.tipsShow();
                    return ;
                }
                //提交申请
                const params = {
                    username:this.applyUserName,
                    company:this.applyFactory,
                    phone:this.applyTelephone,
                    email:this.email,

                }
                Api.register(params).then(resp =>{
                    if(resp.data.code==0){
                        this.errorTips="成功申请，请耐心等待审核";
                        this.showSmallTips = true;
                        this.tipsShow();
                        setTimeout(function () {
                            this.isApply=false;
                        }.bind(this),1000);
                        console.log('申请成功');
                    } else if(resp.data.code==100) {
                        this.errorTips = resp.data.message[0];
                        this.showSmallTips = true;
                        this.tipsShow();
                        return;
                    }
                })
            },
            toHotEvent(){
                this.isHotEvent = true;
                this.isPromotion=false;
            },
            //注册
            toPromotion(){
                this.isPromotion=true;
                this.isHotEvent = false;
            },
            //去申请登使用
            toApply(){
                this.isLogin=false;
                this.isApply=true;
            },
//            /*去申请登陆
            toLogin(){
                this.isApply=false;
                this.isLogin=true;
            },
            isShowError(){
                if(this.errorShow == true){
                    this.errorShow = this.userName || this.password;
                }
            },
//            /*点击遮罩取消
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
                    console.log('Login', resp);
                const data = resp.data;
                if(data.code == 0){
                    this.errorShow = false;
                    Cookie.set('business_uid', data.data.user_id);
                    Cookie.set('business_name', data.data.user_name);
                    Cookie.set('business_admin', data.data.isAdmin);
                    Cookie.set('business_email', data.data.email);
                    Cookie.set('business_level', data.data.level);
                    Cookie.set('access_token',data.data.access_token);
//                        document.cookie ="access_token="+data.data.access_token + "; expires=" + (new Date()).setTime((new Date()).getTime()+60*60*24).toGMTString();
                    this.setUserLevel(data.data.level);
                    console.log(this.userLevel);
                    this.setLoginTime(this.loginTime + 1);
                    this.userName = '';
                    this.password = '';
                    /*if(this.$els.remember.checked==true){
                     console.log(this.$els.remember.checked)
                     Cookie.set('login_userName',this.userName);
                     Cookie.set('login_password',this.password);
                     Cookie.set('login_remember',true);
                     }else{
                     this.userName = '';
                     this.password = '';
                     }*/
                    //location.hash = '#!/home';
                    this.$router.go({name: 'home'});
                } else {
                    this.errorShow = true;
                    this.errorTip = data.message;
                }
            });
            }
        },
        /* created(){
         console.log('bbb',this.userName,this.password);
         this.userName = getCookie('login_userName');
         this.password = getCookie('login_password');
         },*/
        ready(){

            console.log('aaa',this.userName,this.password);
            this.userName = getCookie('login_userName');
            this.password = getCookie('login_password');

            //console.log('this',this.$el.querySelector('.remember').checked);
            //this.$els.remember.checked = getCookie('login_remember');

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