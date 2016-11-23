<template>
    <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide class="swiper-item"><img class="sliderimg" src="../images/1.jpg"></swiper-slide>
        <swiper-slide class="swiper-item "><img class="sliderimg" src="../images/2.jpg"></swiper-slide>
        <swiper-slide class="swiper-item "><img class="sliderimg" src="../images/3.jpg"></swiper-slide>
        <swiper-slide class="swiper-item "><img class="sliderimg" src="../images/4.png"></swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>

<style lang="less">
    @import "Promotion.less";
</style>
<script type="text/ecmascript-6" >
    //var Vue = require('vue');
    // var AwesomeSwiper = require('vue-awesome-swiper');
    import Vue from 'vue';
    import {swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'

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
        computed: {
            swiper() {
                return (this.$children.find(children => children.options.name == 'currentSwiper').swiper)
            }
        },
        mounted() {
            // you can use current swiper object to do something(swiper methods)
            console.log('this is current swiper object', this.swiper)
            this.swiper.slideTo(0, 1500, false)
        },
        components: {
            swiper,
            swiperSlide,

        }

    }
</script>
