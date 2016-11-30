<template>
    <header-component active="analytics"></header-component>
    <div class="divAnaBox">
        <menu-component></menu-component>
        <div class="analytics-panel">
            <div class="analytics-panel-wrap">
                <div class="row tools">
                    <div class="row-left" v-if="trim(search) == ''">{{showName}}</div>
                    <div class="row-left" v-if="trim(search) !=''">{{showName}}+{{search}}</div>
                    <div class="row-middle">
                        <div class="search">
                            <input class="search-input" placeholder="子话题搜索" v-model="search" @keyup.enter="searchAction" />
                            <span class="search-btn" @click="searchAction"><i class="fa fa-search"></i></span>
                        </div>
                    </div>
                    <div class="row-null"></div>
                    <div class="row-right">
                        <ul class="days-btn">
                            <li @click="selectTime(0.33);" :class="[selectTimeTag == 0.33 ? 'active' : '']" class="active">8H</li>
                            <li @click="selectTime(1);" :class="[selectTimeTag == 1 ? 'active' : '']">1D</li>
                            <li @click="selectTime(7);" :class="[selectTimeTag == 7 ? 'active' : '']">7D</li>
                            <li @click="selectTime(30);" :class="[selectTimeTag == 30 ? 'active' : '']">30D</li>
                            <li @click="selectTime(0);" :class="[selectTimeTag == 0 ? 'active' : '']">自定义</li>
                        </ul>
                        <div class="diyDate" v-show="isTimeDiy">
                            <span class="date" @click="showCalendar"><i class="fa fa-calendar  icon"></i> {{dateVal}}</span>
                            <calendar :show.sync="cal.show" :value.sync="dateVal" :x="cal.x" :y="cal.y" :begin.sync="cal.begin" :end.sync="cal.end" :type="cal.type" :range="cal.range"></calendar>
                        </div>

                    </div>
                </div>
                <!--<tabs ></tabs>-->

                <router-view></router-view>
            </div>
        </div>
    </div>
    <order-footer></order-footer>
    <!--<order-footer></order-footer>-->
</template>
<style lang="less">
    @import "Analytics.less";
</style>
<script  type="text/ecmascript-6">
    import moment from 'moment';
    import HeaderComponent from '../Header/Header.vue';
    import MenuComponent from './Menu/Menu.vue';
    import Calendar from '../Common/Calendar/Calendar.vue';
    import OrderFooterComponent from '../OrderFooter/OrderFooter.vue';
    import Local from "../../local/local";
    import {analyticsSubTopicId, activeAnalyticsTopic,analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, analyticsResetSearch } from '../../vuex/getters';
    import {setAnalyticsSubTopicId,setActiveAnalyticsTopic,setAnalyticsType, setAnalyticsTimeRange, setAnalyticsSource, setAnalyticsSubTopic, setAnalyticsDateChange, setAnalyticsStart, setAnalyticsEnd, setAnalyticsResetSearch  } from "../../vuex/actions";

    export default{
        data(){
            return{
                search: '',
                dateVal: `${ moment().subtract(8, 'hour').format('YYYY-MM-DD HH')} ~ ${moment().format('YYYY-MM-DD HH')}`,
                cal: {
                    show: false,
                    type: "date", //date datetime
                    begin: moment().subtract(8, 'hour').format('YYYY-MM-DD HH'),
                    end: moment().format('YYYY-MM-DD HH'),
                    //value: `${ moment().subtract(7, 'days').format('YYYY-MM-DD')} ~ ${moment().format('YYYY-MM-DD')}`,
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
                setAnalyticsResetSearch
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
                analyticsResetSearch
            }
        },
        components:{
            'header-component': HeaderComponent,
            'menu-component': MenuComponent,
            'calendar': Calendar,
            'order-footer':OrderFooterComponent
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
                this.selectTimeTag = num;
                if(num == 0){
                    /*//禁掉
                    alert('更多信息，请联系客服');
                    return ;*/
                    this.isTimeDiy = true;
                    this.dateVal = this.analyticsStart + ' ~ ' + this.analyticsEnd;
                } else if(num ==0.33){
                    //this.selectTimeTag = num;
                    this.isTimeDiy = false;
                    this.setAnalyticsTimeRange(0.33);
                    let start = moment().subtract(8,"hour").format("YYYY-MM-DD HH");
                    let end = moment().format("YYYY-MM-DD HH");
                    start = start.split(" ")[0] + "T" + start.split(" ")[1];
                    end = end.split(" ")[0] + "T" + end.split(" ")[1];
                    this.setAnalyticsStart(start);
                    this.setAnalyticsEnd(end);
                    //可以精确到小时
                    console.log('8H',moment().subtract(8,"hour").format("YYYY-MM-DD HH"),moment().format("YYYY-MM-DD HH"))
                    this.setAnalyticsDateChange(this.analyticsDateChange + 1);

                }else {
                    //只显示1天和7天
                    /*if(num == 30){
                        alert('更多信息，请联系客服')
                        return ;
                    }*/
                    //
                    //this.selectTimeTag = num;
                    this.isTimeDiy = false;
                    this.setAnalyticsTimeRange(num);
                    this.setAnalyticsStart(moment().subtract(num, 'days').format('YYYY-MM-DD'));
                    this.setAnalyticsEnd(moment().format('YYYY-MM-DD'));
                    console.log('1D',moment().subtract(num, 'days').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD'))
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
            analyticsResetSearch:{
                handler(val){
                    if(val == true){
                        this.search = '';
                        console.log('修改search');
                        this.setAnalyticsResetSearch(false);
                        console.log('搜索不为空，重置为false')
                        this.setAnalyticsSubTopic(this.search);
                        console.log('结束时间',(new Date()).getTime());
                    }
                }
            },
            activeAnalyticsTopic:{
                handler(val){
                    this.showName = (this.activeAnalyticsTopic).topic_name;

                }
            },
            /*search:{
                handler(val){
                    if(val ==''){
                        this.setAnalyticsSubTopic(this.search);
                    }
                }
            },*/
            dateVal: {
                handler(val){
                    //console.log('date',val);
                    const start = moment(val.split(' ~ ')[0], "YYYY-MM-DD");
                    const end = moment(val.split(' ~ ')[1], "YYYY-MM-DD");
                    const currentData = moment().format('YYYY-MM-DD');
                    console.log(currentData,this.compareEnd);
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
                    //console.log(val.split(' ~ ')[0], val.split(' ~ ')[1], days);
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
