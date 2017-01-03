<template>
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
</template>
<style lang="less" scoped>
    @import "SummaryDate.less";
</style>
<script type="text/ecmascript-6">
    import moment from 'moment';
    import Cookie from "js-cookie";
    import { getCookie } from '../../../widgets/Cookie';
    import SmallTip from '../../Common/SmallTip/SmallTip.vue';
    import Calendar from '../../Common/Calendar/Calendar.vue';
    import Local from "../../../local/local";
    import {summaryTimePopUp,summarySubTopicId, activeSummaryTopic,summaryType, summaryTimeRange, summarySource, summarySubTopic, summaryDateChange, summaryStart, summaryEnd, summaryResetSearch } from '../../../vuex/getters';
    import {setMonitorSumWord,setSummaryTimePopUp,setSummarySubTopicId,setActiveSummaryTopic,setSummaryType, setSummaryTimeRange, setSummarySource, setSummarySubTopic, setSummaryDateChange, setSummaryStart, setSummaryEnd, setSummaryResetSearch  } from "../../../vuex/actions";

    export default{
        data(){
            const analytics = Local().analytics;
            return{
                timePay:parseInt(getCookie('business_level')) || 0,
                analytics,
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
                setSummarySubTopicId,
                setActiveSummaryTopic,
                setSummaryType,
                setSummaryTimeRange,
                setSummarySource,
                setSummarySubTopic,
                setSummaryDateChange,
                setSummaryStart,
                setSummaryEnd,
                setSummaryResetSearch,
                setSummaryTimePopUp,
                setMonitorSumWord
            },
            getters: {
                summarySubTopicId,
                activeSummaryTopic,
                summaryType,
                summaryTimeRange,
                summarySource,
                summarySubTopic,
                summaryDateChange,
                summaryStart,
                summaryEnd,
                summaryResetSearch,
                summaryTimePopUp
            }
        },
        components:{
            'calendar': Calendar,
            'smalltip':SmallTip,
        },
        methods: {
            searchAction(){
                if(this.summarySubTopic == this.search){
                    this.setSummarySubTopicId(this.summarySubTopicId + 1);
                    console.log(this.summarySubTopicId);
                }else{
                    console.log(this.search);
                    this.setSummarySubTopic(this.search);
                    this.setSummarySubTopicId(0);
                }
            },
            selectTime(num){
                //this.selectTimeTag = num;
                if(num == 0){
                    if(this.timePay !==2){
                        return ;
                    }else {
                        this.isTimeDiy = true;
                        this.dateVal = this.summaryStart + ' ~ ' + this.summaryEnd;
                    }
                    //this.selectTimeTag = num;

                } else if(num ==0.33){
                    this.selectTimeTag = num;
                    this.isTimeDiy = false;
                    this.setSummaryTimeRange(0.33);
                    this.setSummaryTimePopUp(0.33);
                    let start = moment().subtract(8,"hour").format("YYYY-MM-DD HH");
                    let end = moment().format("YYYY-MM-DD HH");
                    start = start.split(" ")[0] + "T" + start.split(" ")[1];
                    end = end.split(" ")[0] + "T" + end.split(" ")[1];
                    this.setSummaryStart(start);
                    this.setSummaryEnd(end);
                    //可以精确到小时
                    this.setSummaryDateChange(this.summaryDateChange + 1);
                }else if(num == 30){
                    if(this.timePay === 0){
                        return ;
                    }else {
                        this.selectTimeTag = num;
                        this.isTimeDiy = false;
                        this.setSummaryTimeRange(num);
                        this.setSummaryTimePopUp(num);
                        this.setSummaryStart(moment().subtract(num, 'days').format('YYYY-MM-DD'));
                        this.setSummaryEnd(moment().format('YYYY-MM-DD'));
                        this.setSummaryDateChange(this.summaryDateChange + 1);
                    }

                }else{
                    this.selectTimeTag = num;
                    this.isTimeDiy = false;
                    this.setSummaryTimeRange(num);
                    this.setSummaryTimePopUp(num);
                    this.setSummaryStart(moment().subtract(num, 'days').format('YYYY-MM-DD'));
                    this.setSummaryEnd(moment().format('YYYY-MM-DD'));
                    this.setSummaryDateChange(this.summaryDateChange + 1);


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
                this.setSummaryStart(this.cal.begin);
                this.setSummaryEnd(this.cal.end);
                this.setSummaryTimeRange(days);
            },
            trim(str){
                return str.replace(/(^\s*)|(\s*$)/g,'');
            }
        },
        watch: {
            summaryTimePopUp:{
                handler(val){
                    this.selectTime(val);
                }
            },
            summaryResetSearch:{
                handler(val){
                    if(val == true){
                        this.search = '';
                        this.setSummaryResetSearch(false);
                        this.setSummarySubTopic(this.search);
                    }
                }
            },
            activeSummaryTopic:{
                handler(val){
                    this.showName = (this.activeSummaryTopic).topic_name;
                    this.selectTimeTag = 0.33;
                    let start = moment().subtract(8,"hour").format("YYYY-MM-DD HH");
                    let end = moment().format("YYYY-MM-DD HH");
                    start = start.split(" ")[0] + "T" + start.split(" ")[1];
                    end = end.split(" ")[0] + "T" + end.split(" ")[1];
                    this.setSummaryStart(start);
                    this.setSummaryEnd(end);
                    this.setSummaryTimePopUp(0.33);
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
                    this.setSummaryStart(val.split(' ~ ')[0]);
                    this.setSummaryEnd(val.split(' ~ ')[1]);
                    this.setSummaryTimeRange(days);
                    this.setSummaryDateChange(this.summaryDateChange + 1);
                }
            }
        },
        ready(){
            this.init();
        },
        /* route: {
         data(){
         this.tabActive = this.$route.name;
         }
         }*/
    }
</script>