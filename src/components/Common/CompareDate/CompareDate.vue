<template>
    <div class="row comTools">

                        <div class="search">
                            <input class="search-input" placeholder="搜索" v-model="search" @keyup.enter="searchAction"/>
                            <span class="search-btn" @click="searchAction"><i class="fa fa-search"></i></span>
                        </div>
                </div>
</template>
<style lang="less">
    @import "CompareDate.less";
</style>
<script  type="text/ecmascript-6">
    import moment from 'moment';
    import Cookie from "js-cookie";
    import { getCookie } from '../../../widgets/Cookie';
    import HeaderComponent from '../../Header/Header.vue';
    import Calendar from '../../Common/Calendar/Calendar.vue';
    import Tabs from './../Tabs/Tabs.vue';
    import SmallTip from '../../Common/SmallTip/SmallTip.vue';
    import Local from "../../../local/local";
    import {userLevel,compareDataChange, compareType, compareTimeRange, compareSource, compareSubTopic, compareStart, compareEnd, compareTimeRangeString } from '../../../vuex/getters';
    import {setUserLevel,setCompareDataChange, setCompareType, setCompareTimeRange, setCompareSource, setCompareSubTopic, setCompareStart, setCompareEnd , setCompareTimeRangeString } from "../../../vuex/actions";

    export default{
        data(){
            const compare = Local().compare;
            return{
                //timePay:parseInt(getCookie('business_level')) || 0,
                compare,
                search: '',
               /* dateVal: `${ moment().subtract(8, 'hour').format('YYYY-MM-DD HH')} ~ ${moment().format('YYYY-MM-DD HH')}`,
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
                selectTimeTag: 0.33,*/
                //isTimeDiy: false,
                tabActive: 'result'
            }
        },
        vuex:{
            getters:{userLevel,compareDataChange, compareType, compareTimeRange, compareSource, compareSubTopic, compareStart, compareEnd , compareTimeRangeString},
            actions:{setUserLevel,setCompareDataChange, setCompareType, setCompareTimeRange, setCompareSource, setCompareSubTopic, setCompareStart, setCompareEnd , setCompareTimeRangeString }
        },
        components:{
           /* 'header-component': HeaderComponent,
            'calendar': Calendar,
            'smalltip':SmallTip*/
        },
        methods: {
            searchAction(){
                this.setCompareSubTopic(this.search);
            },
           /* selectTime(num){
                //this.selectTimeTag = num;
                if(num == 0){
                    if(this.timePay !==2){
                        return ;
                    }else {
                        this.isTimeDiy = true;
                        this.dateVal = this.compareStart + ' ~ ' + this.compareEnd;
                        this.setCompareDataChange(this.compareDataChange + 1);
                    }
                } else if(num == 0.33){
                    this.selectTimeTag = num;
                    this.isTimeDiy = false;
                    this.setCompareTimeRange(0.33);
                    let start = moment().subtract(8,"hour").format("YYYY-MM-DD HH");
                    let end = moment().format("YYYY-MM-DD HH");
                    start = start.split(" ")[0] + "T" + start.split(" ")[1];
                    end = end.split(" ")[0] + "T" + end.split(" ")[1];
                    this.setCompareStart(start);
                    this.setCompareEnd(end);
                    this.dateVal = `${ start} ~ ${end}`;
                    this.setCompareDataChange(this.compareDataChange + 1);
                }else if(num == 30){
                    if(this.timePay === 0){
                        return ;
                    }else {
                        this.selectTimeTag = num;
                        this.isTimeDiy = false;
                        this.setCompareTimeRange(num);
                        this.setCompareStart(moment().subtract(num, 'days').format('YYYY-MM-DD'));
                        this.setCompareEnd(moment().format('YYYY-MM-DD'));
                        this.dateVal = `${ moment().subtract(num, 'days').format('YYYY-MM-DD')} ~ ${moment().format('YYYY-MM-DD')}`;
                        this.setCompareDataChange(this.compareDataChange + 1);
                    }
                }else{
                    this.selectTimeTag = num;
                    this.isTimeDiy = false;
                    this.setCompareTimeRange(num);
                    this.setCompareStart(moment().subtract(num, 'days').format('YYYY-MM-DD'));
                    this.setCompareEnd(moment().format('YYYY-MM-DD'));
                    this.dateVal = `${ moment().subtract(num, 'days').format('YYYY-MM-DD')} ~ ${moment().format('YYYY-MM-DD')}`;
                    this.setCompareDataChange(this.compareDataChange + 1);
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
                /!*this.timePay = this.userLevel;
                 console.log('abc',this.timePay)*!/
                const start = moment(this.cal.begin, "YYYY-MM-DD");
                const end = moment(this.cal.end, "YYYY-MM-DD");
                const days = end.diff(start)/1000/3600/24;
                this.setCompareStart(this.cal.begin);
                this.setCompareEnd(this.cal.end);
                this.setCompareTimeRange(days);
            },
            trim(str){
                return str.replace(/(^\s*)|(\s*$)/g,'');
            }*/
        },
        watch: {
            search:{
                handler(val){
                    if(this.trim(val) =='')
                        this.setCompareSubTopic(this.search);
                }
            },
            /*dateVal: {
                handler(val){
                    let start = moment(val.split(' ~ ')[0], "YYYY-MM-DD");
                    let end = moment(val.split(' ~ ')[1], "YYYY-MM-DD");
                    const currentData = moment().format('YYYY-MM-DD');
                    if(moment(end)>moment(currentData)){
                        alert('请求区间错误,返回最近7天对比数据');
                        this.dateVal =  `${ moment().subtract(7, 'days').format('YYYY-MM-DD')} ~ ${moment().format('YYYY-MM-DD')}`;
                        this.selectTime(7);
                        return ;
                    }
                    const days = end.diff(start)/1000/3600/24;
                    this.setCompareStart(val.split(' ~ ')[0]);
                    this.setCompareEnd(val.split(' ~ ')[1]);
                    this.setCompareTimeRange(days);
                    this.setCompareDataChange(this.compareDataChange + 1);
                }
            },
            compareSubTopic:{
                handler(val,oldVal){
                    if(val ==''){
                        this.search = '';
                    }
                }
            }*/
        },
        ready(){
           /* this.init();*/
        },
        route: {
            data(){
                this.tabActive = this.$route.name;
            }
        }
    }
</script>