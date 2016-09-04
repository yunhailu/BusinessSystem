<template>
    <header-component active="analytics"></header-component>
    <menu-component></menu-component>
    <div class="analytics-panel">
        <div class="analytics-panel-wrap">
            <div class="row tools">
                <div class="col-md-8">
                    <div class="search">
                        <input class="search-input" placeholder="Search in Results" v-model="search" />
                        <span class="search-btn" @click="searchAction"><i class="fa fa-search"></i></span>
                    </div>
                </div>
                <div class="col-md-4">
                    <ul class="days-btn">
                        <li>1D</li>
                        <li class="active">7D</li>
                        <li>30D</li>
                        <li>自定义</li>
                    </ul>
                    <div class="diyDate">
                        <span class="date" @click="showCalendar"><i class="fa fa-calendar fa-2x  icon"></i> {{cal.value}}</span>
                        <calendar :show.sync="cal.show" :value.sync="cal.value" :x="cal.x" :y="cal.y" :begin="cal.begin" :end="cal.end" :type="cal.type" :range="cal.range"></calendar>
                    </div>

                </div>
                <!--<div class="col-md-2">-->
                    <!--<span class="date" @click="showCalendar"> {{cal.value}}</span>-->
                    <!--<calendar :show.sync="cal.show" :value.sync="cal.value" :x="cal.x" :y="cal.y" :begin="cal.begin" :end="cal.end" :type="cal.type" :range="cal.range"></calendar>-->
                <!--</div>-->
            </div>
            <tabs ></tabs>

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
    import Tabs from './Tabs/Tabs.vue';
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
                tabActive: 'result'
            }
        },
        components:{
            'header-component': HeaderComponent,
            'menu-component': MenuComponent,
            'calendar': Calendar,
            'tabs': Tabs
        },
        methods: {
            searchAction(){
                console.log(this.search);
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
