<template>
    <header-component active="analytics"></header-component>
    <div class="divAnaBox">
        <menu-component></menu-component>
        <div class="analytics-panel">
            <div class="analytics-panel-wrap">
                <div class="row tools">
                    <div class="row-left" v-if="trim(search) == ''">{{analytics.monitor}}: {{showName}}</div>
                    <div class="row-left" v-if="trim(search) !=''">{{analytics.monitor}}: {{showName}}+{{search}}</div>
                    <div class="row-middle">
                        <div class="search">
                            <input class="search-input" placeholder="子话题搜索" v-model="search" @keyup.enter="searchAction" />
                            <span class="search-btn" @click="searchAction"><i class="fa fa-search"></i></span>
                        </div>
                    </div>
                    <div class="row-right">
                        <ul class="days-btn">
                            <li>监测区间: </li>
                            <li @click="selectTime(0.33);" :class="[selectTimeTag == 0.33 ? 'active' : '']" class="active">8小时</li>
                            <li @click="selectTime(1);" :class="[selectTimeTag == 1 ? 'active' : '']">1天</li>
                            <li @click="selectTime(7);" :class="[selectTimeTag == 7 ? 'active' : '']">7天</li>
                            <li @click="selectTime(30);" v-if="timePay ===0" :class="[selectTimeTag == 30 ? 'active' : '']"> 30天
                                <smalltip :title = 'analytics.tips' class="smalltip"></smalltip>
                            </li>
                            <li @click="selectTime(30);" v-if="timePay !== 0"  :class="[selectTimeTag == 30 ? 'active' : '']"> 30天</li>
                            <li @click="selectTime(0);"  v-if="timePay !== 2"  :class="[selectTimeTag == 0 ? 'active' : '']">自定义
                                <smalltip :title = 'analytics.tips' class="smalltip"></smalltip>
                            </li>
                            <li @click="selectTime(0);"  v-if="timePay ===2"  :class="[selectTimeTag == 0 ? 'active' : '']">自定义</li>
                        </ul>
                        <div class="diyDate" v-show="isTimeDiy">
                            <span class="date" @click="showCalendar"><i class="fa fa-calendar  icon"></i> {{dateVal}}</span>
                            <calendar :show.sync="cal.show" :value.sync="dateVal" :x="cal.x" :y="cal.y" :begin.sync="cal.begin" :end.sync="cal.end" :type="cal.type" :range="cal.range"></calendar>
                        </div>
                        <div class="row-null"></div>
                    </div>
                </div>
                <router-view></router-view>
            </div>
        </div>
       <!-- <div class="qq">
            <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=3342973679&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:3342973679:3" alt="点这里给我发消息" /></a>
        </div>-->
    </div>
    <order-footer></order-footer>
</template>
<style lang="less">
    @import "Analytics.less";
</style>
<script  type="text/ecmascript-6">
    import moment from 'moment';
    import Cookie from "js-cookie";
    import { getCookie } from '../../widgets/Cookie';
    import SmallTip from '../Common/SmallTip/SmallTip.vue';
    import HeaderComponent from '../Header/Header.vue';
    import MenuComponent from './Menu/Menu.vue';
    import Calendar from '../Common/Calendar/Calendar.vue';
    import OrderFooterComponent from '../OrderFooter/OrderFooter.vue';
    import Local from "../../local/local";
    import {analyticsTimePopUp,analyticsSubTopicId, activeAnalyticsTopic,analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, analyticsResetSearch } from '../../vuex/getters';
    import {setAnalyticsTimePopUp,setAnalyticsSubTopicId,setActiveAnalyticsTopic,setAnalyticsType, setAnalyticsTimeRange, setAnalyticsSource, setAnalyticsSubTopic, setAnalyticsDateChange, setAnalyticsStart, setAnalyticsEnd, setAnalyticsResetSearch  } from "../../vuex/actions";

    export default{
        data(){
            const analytics = Local().analytics;
            return{
                timePay:parseInt(getCookie('business_level')) || 0,
                analytics,
                search: '',
                dateVal: `${ moment().subtract(8, 'hour').format('YYYY-MM-DD HH')} ~ ${moment().format('YYYY-MM-DD HH')}`,
                cal: {
                    show: false,
                    type: "date", //date datetime
                    begin: moment().subtract(8, 'hour').format('YYYY-MM-DD HH'),
                    end: moment().format('YYYY-MM-DD HH'),
                    x: 0,
                    y: 0,
                    range:true//是否多选
                },
                selectTimeTag: 0.33,
                isTimeDiy: false,
                tabActive: 'result',
                showName:''
            }
        },
        vuex: {
            actions: {
                setAnalyticsSubTopicId,
                setActiveAnalyticsTopic,
                setAnalyticsType,
                setAnalyticsTimeRange,
                setAnalyticsSource,
                setAnalyticsSubTopic,
                setAnalyticsDateChange,
                setAnalyticsStart,
                setAnalyticsEnd,
                setAnalyticsResetSearch,
                setAnalyticsTimePopUp
            },
            getters: {
                analyticsSubTopicId,
                activeAnalyticsTopic,
                analyticsType,
                analyticsTimeRange,
                analyticsSource,
                analyticsSubTopic,
                analyticsDateChange,
                analyticsStart,
                analyticsEnd,
                analyticsResetSearch,
                analyticsTimePopUp
            }
        },
        components:{
            'header-component': HeaderComponent,
            'menu-component': MenuComponent,
            'calendar': Calendar,
            'order-footer':OrderFooterComponent,
            'smalltip':SmallTip
        },
        methods: {
            searchAction(){
                if(this.analyticsSubTopic == this.search){
                    this.setAnalyticsSubTopicId(this.analyticsSubTopicId + 1);
                    console.log(this.analyticsSubTopicId);
                }else{
                    console.log(this.search);
                    this.setAnalyticsSubTopic(this.search);
                    this.setAnalyticsSubTopicId(0);
                }
            },
            selectTime(num){
                //this.selectTimeTag = num;
                if(num == 0){
                    if(this.timePay !==2){
                        return ;
                    }else {
                        this.isTimeDiy = true;
                        this.dateVal = this.analyticsStart + ' ~ ' + this.analyticsEnd;
                    }
                    //this.selectTimeTag = num;

                } else if(num ==0.33){
                    this.selectTimeTag = num;
                    this.isTimeDiy = false;
                    this.setAnalyticsTimeRange(0.33);
                    this.setAnalyticsTimePopUp(0.33);
                    let start = moment().subtract(8,"hour").format("YYYY-MM-DD HH");
                    let end = moment().format("YYYY-MM-DD HH");
                    start = start.split(" ")[0] + "T" + start.split(" ")[1];
                    end = end.split(" ")[0] + "T" + end.split(" ")[1];
                    this.setAnalyticsStart(start);
                    this.setAnalyticsEnd(end);
                    //可以精确到小时
                    this.setAnalyticsDateChange(this.analyticsDateChange + 1);
                }else if(num == 30){
                    if(this.timePay === 0){
                        return ;
                    }else {
                        this.selectTimeTag = num;
                        this.isTimeDiy = false;
                        this.setAnalyticsTimeRange(num);
                        this.setAnalyticsTimePopUp(num);
                        this.setAnalyticsStart(moment().subtract(num, 'days').format('YYYY-MM-DD'));
                        this.setAnalyticsEnd(moment().format('YYYY-MM-DD'));
                        this.setAnalyticsDateChange(this.analyticsDateChange + 1);
                    }

                }else{
                    this.selectTimeTag = num;
                    this.isTimeDiy = false;
                    this.setAnalyticsTimeRange(num);
                    this.setAnalyticsTimePopUp(num);
                    this.setAnalyticsStart(moment().subtract(num, 'days').format('YYYY-MM-DD'));
                    this.setAnalyticsEnd(moment().format('YYYY-MM-DD'));
                    this.setAnalyticsDateChange(this.analyticsDateChange + 1);


                }
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
            },
            init(){
                const start = moment(this.cal.begin, "YYYY-MM-DD");
                const end = moment(this.cal.end, "YYYY-MM-DD");
                const days = end.diff(start)/1000/3600/24;
                this.setAnalyticsStart(this.cal.begin);
                this.setAnalyticsEnd(this.cal.end);
                this.setAnalyticsTimeRange(days);
            },
            trim(str){
                return str.replace(/(^\s*)|(\s*$)/g,'');
            }
        },
        watch: {
            analyticsTimePopUp:{
                handler(val){
                    this.selectTime(val);
                }
            },
            analyticsResetSearch:{
                handler(val){
                    if(val == true){
                        this.search = '';
                        this.setAnalyticsResetSearch(false);
                        this.setAnalyticsSubTopic(this.search);
                    }
                }
            },
            activeAnalyticsTopic:{
                handler(val){
                    this.showName = (this.activeAnalyticsTopic).topic_name;
                    this.selectTimeTag = 0.33;
                    let start = moment().subtract(8,"hour").format("YYYY-MM-DD HH");
                    let end = moment().format("YYYY-MM-DD HH");
                    start = start.split(" ")[0] + "T" + start.split(" ")[1];
                    end = end.split(" ")[0] + "T" + end.split(" ")[1];
                    this.setAnalyticsStart(start);
                    this.setAnalyticsEnd(end);
                    this.setAnalyticsTimePopUp(0.33);
                }
            },
            dateVal: {
                handler(val){
                    const start = moment(val.split(' ~ ')[0], "YYYY-MM-DD");
                    const end = moment(val.split(' ~ ')[1], "YYYY-MM-DD");
                    const currentData = moment().format('YYYY-MM-DD');
                    if(moment(end)>moment(currentData)){
                        alert('请求区间错误,返回最近7天对比数据');
                        this.dateVal =  `${ moment().subtract(7, 'days').format('YYYY-MM-DD')} ~ ${moment().format('YYYY-MM-DD')}`;
                        this.selectTime(7);
                        return ;
                    }
                    const days = end.diff(start)/1000/3600/24;
                    this.setAnalyticsStart(val.split(' ~ ')[0]);
                    this.setAnalyticsEnd(val.split(' ~ ')[1]);
                    this.setAnalyticsTimeRange(days);
                    this.setAnalyticsDateChange(this.analyticsDateChange + 1);
                }
            }
        },
        ready(){
            this.init();
        },
        route: {
            data(){
                this.tabActive = this.$route.name;
            }
        }
    }
</script>
