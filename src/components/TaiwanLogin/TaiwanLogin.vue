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
                    </ul>
                </div>
            </div>
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
                        <span class="tips errortips" v-if="showSmallTips">{{errorTips}}</span>
                        <span class="tips succsstips" v-if="showSuccessTips">{{successips}}</span>
                        <div class="form-group form-apply-btn">
                            <a class="apply-btn" href="javascript:void(0);"  @click="submit">提 交</a>
                            <p>客服 : {{common.phone}}</p>
                        </div>
                    </div>
                    <!-- <div class="smallTips" v-if="showSmallTips" @click="tipsHide">
                         <p>{{errorTips}}</p>
                     </div>-->
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
                            <input class="remember" v-model="remember" type="checkbox" id="remember">
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
    <hot-event class="hotevent" v-if="isHotEvent"></hot-event>
    <qservice></qservice>
</template>
<style lang="less">
    @import "TaiwanLogin.less";
</style>
<script type="text/ecmascript-6">

    import Local from '../../local/local';
    import Cookie from "js-cookie";
    import { getCookie } from '../../widgets/Cookie';
    import {redirect} from "../../widgets/Auth";
    import * as Api from "../../widgets/Api";
    import FooterComponent from "../Footer/Footer.vue"
    import Promotion from "./TaiwanPromotion/TaiwanPromotion.vue"
    import Instruction from "./../Common/InstructionsForUse/InstructionsForUse.vue"
    import HotEvent from "../AllNetHotEvent/AllNetHotEvent.vue"
    import qservice from '../QQservice/QQservice.vue';
    import {loginState} from '../../vuex/getters';
    import {setLoginState} from "../../vuex/actions";

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
                errorTips:'',
                successips:'',
                remember:false,
                timeout:null,
                isApply:false,
                isLogin:false,
                errorShow:false,
                isPromotion:true,
                isHotEvent:false,
                showSmallTips:false,
                showSuccessTips:false
            };
        },
        components:{
            FooterComponent,Promotion,HotEvent,qservice
        },
        vuex:{
            getters:{loginState},
            actions:{setLoginState}
        },
        methods: {
            resetLogin(){
                this.errorTip='';
                this.errorShow=false;
                this.userName= '';
                this.password='';
            },
            resetApply(){
                this.applyUserName='';
                this.applyFactory='';
                this.applyTelephone='';
                this.email='';
                this.showSuccessTips=false;
                this.showSmallTips=false;
                this.errorTips='';
                this.successips='';
            },
            submit(){
                this.errorTips = '';
                this.successips='';
                //姓名必填2-10位
                var nameReg = /^[a-zA-Z0-9_]$/;
                var chineseReg = new RegExp("[\u4e00-\u9fa5]");
                if((this.applyUserName).length>10 ||(this.applyUserName).length<2){
                    this.errorTips="用户名需输入2-10位字符";
                    this.showSmallTips = true;
                    return ;
                }
                for(var i=0;i<(this.applyUserName).length;i++){
                    const c = (this.applyUserName).charAt(i);
                    if(!(chineseReg.test(c) || nameReg.test(c))){
                        this.errorTips="用户名格式错误";
                        this.showSmallTips = true;
                        return ;
                    }
                }
                //校验正确的手机号
                var phoneReg = /^((1[3-8]{1}[0-9]{1})+\d{8})$/;
                if(!phoneReg.test(this.applyTelephone)){
                    this.errorTips="请输入正确手机号";
                    this.showSmallTips = true;
                    return ;
                }
                //可用邮箱注册校验
                var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
                if(!emailReg.test(this.email)){
                    this.errorTips="请输入正确的邮箱格式";
                    this.showSmallTips = true;
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

                    this.showSmallTips = false;
                    this.successips="正在审核，请等待邮件回复";
                    this.showSuccessTips = true;
                } else if(resp.data.code==100){
                    this.errorTips=resp.data.message;
                    this.showSmallTips = true;
                    return ;
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
                this.resetLogin();
            },
//            /*去申请登陆
            toLogin(){
                this.isApply=false;
                this.isLogin=true;
                this.resetApply();
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
                this.resetApply();
            },
            cancelLogin(){
                this.isLogin=false;
                this.errorShow = false;
                this.resetLogin();
            },
            showApply(){
                this.isApply=true;
            },
            showLogin(){
                this.isLogin = true;
            },
            login(){
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