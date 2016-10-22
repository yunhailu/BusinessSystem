<template>
    <header-component active="analytics"></header-component>
    <menu-component></menu-component>
    <div class="analytics-panel">
        <div class="analytics-panel-wrap">
            <div class="row tools">
                <div class="col-md-7">
                    <div class="search">
                        <input class="search-input" placeholder="搜索" v-model="search" />
                        <span class="search-btn" @click="searchAction"><i class="fa fa-search"></i></span>
                    </div>
                </div>
                <div class="col-md-5">
                    <ul class="days-btn">
                        <li @click="selectTime(1);" :class="[selectTimeTag == 1 ? 'active' : '']">1D</li>
                        <li @click="selectTime(7);" :class="[selectTimeTag == 7 ? 'active' : '']" class="active">7D</li>
                        <li @click="selectTime(30);" :class="[selectTimeTag == 30 ? 'active' : '']">30D</li>
                        <li @click="selectTime(0);" :class="[selectTimeTag == 0 ? 'active' : '']">自定义</li>
                    </ul>
                    <div class="diyDate" v-show="isTimeDiy">
                        <span class="date" @click="showCalendar"><i class="fa fa-calendar fa-2x  icon"></i> {{cal.value}}</span>
                        <calendar :show.sync="cal.show" :value.sync="cal.value" :x="cal.x" :y="cal.y" :begin="cal.begin" :end="cal.end" :type="cal.type" :range="cal.range"></calendar>
                    </div>

                </div>
                <!--<div class="col-md-2">-->
                    <!--<span class="date" @click="showCalendar"> {{cal.value}}</span>-->
                    <!--<calendar :show.sync="cal.show" :value.sync="cal.value" :x="cal.x" :y="cal.y" :begin="cal.begin" :end="cal.end" :type="cal.type" :range="cal.range"></calendar>-->
                <!--</div>-->
            </div>
            <!--<tabs ></tabs>-->

            <router-view></router-view>
        </div>
    </div>
</template>
<style lang="less">
    @import "Analytics.less";
</style>
<script  type="text/ecmascript-6">
    import HeaderComponent from '../Header/Header.vue';
    import MenuComponent from './Menu/Menu.vue';
    import Calendar from '../Common/Calendar/Calendar.vue';
    //import Tabs from './Tabs/Tabs.vue';
    import Local from "../../local/local";

    export default{
        data(){
            return{
                search: '',
                cal: {
                    show: false,
                    type: "date", //date datetime
                    value: "2015-12-11",
                    begin: "2015-12-20",
                    end: "2015-12-25",
                    x: 0,
                    y: 0,
                    range:true//是否多选
                },
                selectTimeTag: 7,
                isTimeDiy: false,
                tabActive: 'result'
            }
        },
        components:{
            'header-component': HeaderComponent,
            'menu-component': MenuComponent,
            'calendar': Calendar,
           // 'tabs': Tabs
        },
        methods: {
            searchAction(){
                console.log(this.search);
            },
            selectTime(num){
                this.selectTimeTag = num;
                this.isTimeDiy = (num == 0) ? true : false;
            },
            showCalendar:function(e){
                e.stopPropagation();
                var that = this;
                that.cal.show = true;
                that.cal.x = e.target.offsetLeft - 100;
                that.cal.y = e.target.offsetTop+e.target.offsetHeight+8;
                var bindHide = function(e){
                    e.stopPropagation();
                    that.cal.show = false;
                    document.removeEventListener('click',bindHide,false);
                };
                setTimeout(function(){
                    document.addEventListener('click',bindHide,false);
                },500);
            }
        },
        route: {
            data(){
                this.tabActive = this.$route.name;
            }
        }
    }
</script>
