<template>
    <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide class="swiper-item item-1">
            <!--替换掉背景-->
            <img class="sliderimg" src="../images/login-bg-1.jpg">
            <div  class="ball">
                <img src="../images/login-ball-1.png">
            </div>
            <div class="navigation">
                <!--<h2>情绪数据,为您导航</h2>-->
                <h2>两情相悦，人心可测</h2>
            </div>
            <div class="login-btn" v-show="false">
                <a href="javascript:void(0);" @click="login">
                    <img src="../images/login-1.png">
                </a>
            </div>
            <div class="introduce" v-show="false">
                <div class="conBox">
                    <p>沃德品牌气象站是公司利用情绪大数据模型开发的“品牌价值互联网监测评价系统”。企业品牌价值的核心在于用户满意度，公司通过对全互联网情绪数据的分析，精确和实时计算知名产品、知名品牌、知名企业的用户满意度和交易量，从而为企业决策提供最精准的参考意见。</p>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide class="swiper-item item-2">
            <img class="sliderimg" src="../images/login-banner-2.jpg">
            <!--<img class="sliderimg" src="../images/login-banner-2.jpg">
            <!--<div class="source-title">
                <span>六大信息来源</span>
            </div>
           <div><img class="weibo" src="../images/login-weibo.png"></div>
           <div><img class="weixin" src="../images/login-weixin.png"></div>
           <div><img class="web" src="../images/login-web.png"></div>
           <div><img class="appImg" src="../images/login-app.png"></div>
           <div><img class="overseas" src="../images/login-overseas.png"></div>
           <div><img class="sengine" src="../images/login-search.png"></div>-->
        </swiper-slide>
        <swiper-slide class="swiper-item item-3">
            <img class="sliderimg" src="../images/login-banner-3.jpg">
           <!-- <img class="sliderimg" src="../images/login-bg-3.jpg">
            <div class="source-title">
                <span>六大数据分析功能</span>
                <p>精确和实时计算知名产品、知名品牌、知名企业的用户满意度和交易量，从而为企业决策提供最精准的参考意见</p>
            </div>
            <div><img class="login-3-1" src="../images/login-banner3-1.png"></div>
            <div><img class="login-3-2" src="../images/login-banner3-2.png"></div>
            <div><img class="login-3-3" src="../images/login-banner3-3.png"></div>
            <div><img class="login-3-4" src="../images/login-banner3-4.png"></div>
            <div><img class="login-3-5" src="../images/login-banner3-5.png"></div>
            <div><img class="login-3-6" src="../images/login-banner3-6.png"></div>
            <div><img class="login-3-7" src="../images/login-banner3-7.png"></div>-->

        </swiper-slide>
        <swiper-slide class="swiper-item item-4">
            <img class="sliderimg" src="../images/login-banner-4.jpg">
           <!-- <img class="sliderimg" src="../images/login-bg-4.jpg">
            <div><img src="../images/login-banner4-1.png"></div>-->
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>

<style lang="less">
    @import "CcsiPromotion.less";
</style>
<script type="text/ecmascript-6" >
    //var Vue = require('vue');
    // var AwesomeSwiper = require('vue-awesome-swiper');
    import Vue from 'vue';
    import {swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
    import {loginState} from '../../../vuex/getters';
    import {setLoginState} from "../../../vuex/actions";

    export default {
        name: 'awesome',
        data() {
            return {
                swiperOption: {
                    name: 'currentSwiper',
                    // 所有配置均为可选（同Swiper配置）
                    //autoplay: 2000,
                    direction : 'vertical',
                    grabCursor : true,
                    setWrapperSize :true,
                    autoHeight: true,
                    pagination : '.swiper-pagination',
                    paginationClickable :true,
                    mousewheelControl : true,
                    observeParents:true,
                    // if you need use plugins in the swiper, you can config in here like this
                    debugger: true,
                    // swiper callbacks
                    onTransitionStart: function(swiper){
                        // console.log(swiper)
                    },
                    // more Swiper config ...
                    // ...
                }
            }
        },
        // example code (if you need to get the current swiper object, find the swiper object in current component(vm) childrens)
        // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象
        vuex:{
            getters:{loginState},
            actions:{setLoginState}
        },
        computed: {
            swiper() {
                return (this.$children.find(children => children.options.name == 'currentSwiper').swiper)
            }
        },
        methods:{
            login(){
               this.setLoginState(true);
            }
        },
        mounted() {
            // you can use current swiper object to do something(swiper methods)
            console.log(this.islogin);
            console.log('this is current swiper object', this.swiper)
            this.swiper.slideTo(0, 1500, false)
        },
        components: {
            swiper,
            swiperSlide,

        }

    }
</script>
