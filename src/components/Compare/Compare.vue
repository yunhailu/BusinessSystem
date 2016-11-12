<template>
    <header-component active="compare"></header-component>
    <div class="divBox">
        <menu-component></menu-component>
        <div class="compare-panel">
            <div class="compare-panel-wrap">
                <div class="row tools">
                    <div class="row-left">
                        <div class="search">
                            <input class="search-input" placeholder="搜索" v-model="search" />
                            <span class="search-btn" @click="searchAction"><i class="fa fa-search"></i></span>
                        </div>
                    </div>
                    <div class="row-right">
                        <ul class="days-btn">
                            <li @click="selectTime(1);" :class="[selectTimeTag == 1 ? 'active' : '']">1D</li>
                            <li @click="selectTime(7);" :class="[selectTimeTag == 7 ? 'active' : '']" class="active">7D</li>
                            <li @click="selectTime(30);" :class="[selectTimeTag == 30 ? 'active' : '']">30D</li>
                            <li @click="selectTime(0);" :class="[selectTimeTag == 0 ? 'active' : '']">自定义</li>
                        </ul>
                        <div class="diyDate" v-show="isTimeDiy">
                            <span class="date" @click="showCalendar"><i class="fa fa-calendar icon"></i> {{dateVal}}</span>
                            <calendar :show.sync="cal.show" :value.sync="dateVal" :x="cal.x" :y="cal.y" :begin.sync="cal.begin" :end.sync="cal.end" :type="cal.type" :range="cal.range"></calendar>
                        </div>

                    </div>
                </div>
                <!--<tabs ></tabs>-->

                <!--<router-view></router-view>-->
                <main></main>
            </div>
        </div>
    </div>

    <footer-component></footer-component>
</template>
<style lang="less">
    @import "Compare.less";
</style>
<script  type="text/ecmascript-6">
    import moment from 'moment';
    import HeaderComponent from '../Header/Header.vue';
    import MenuComponent from './Menu/Menu.vue';
    import Calendar from '../Common/Calendar/Calendar.vue';
    import Tabs from './Tabs/Tabs.vue';
    import Main from './Main/Main.vue';
    import Local from "../../local/local";
    import FooterComponent from '../OrderFooter/OrderFooter.vue';
    import { compareType, compareTimeRange, compareSource, compareSubTopic, compareStart, compareEnd, compareTimeRangeString } from '../../vuex/getters';
    import { setCompareType, setCompareTimeRange, setCompareSource, setCompareSubTopic, setCompareStart, setCompareEnd , setCompareTimeRangeString } from "../../vuex/actions";

    export default{
        data(){
            return{
                search: '',
                dateVal: `${ moment().subtract(7, 'days').format('YYYY-MM-DD')} ~ ${moment().format('YYYY-MM-DD')}`,
                cal: {
                    show: false,
                    type: "date", //date datetime
                    begin: moment().subtract(7, 'days').format('YYYY-MM-DD'),
                    end: moment().format('YYYY-MM-DD'),
                    //value: `${ moment().subtract(7, 'days').format('YYYY-MM-DD')} ~ ${moment().format('YYYY-MM-DD')}`,
                    x: 0,
                    y: 0,
                    range:true//是否多选
                },
                selectTimeTag: 7,
                isTimeDiy: false,
                tabActive: 'result'
            }
        },
        vuex:{
            getters:{ compareType, compareTimeRange, compareSource, compareSubTopic, compareStart, compareEnd , compareTimeRangeString},
            actions:{ setCompareType, setCompareTimeRange, setCompareSource, setCompareSubTopic, setCompareStart, setCompareEnd , setCompareTimeRangeString }
        },
        components:{
            'header-component': HeaderComponent,
            'menu-component': MenuComponent,
            'calendar': Calendar,
            'footer-component': FooterComponent,
            //'tabs': Tabs,
            'main': Main
        },
        methods: {
            searchAction(){
                console.log(this.search);
                this.setCompareSubTopic(this.search);
            },
            selectTime(num){
                this.selectTimeTag = num;
                if(num == 0){
                    this.isTimeDiy = true;
                    this.dateVal = this.compareStart + ' ~ ' + this.compareEnd;
                } else {
                    this.isTimeDiy = false;
                    this.setCompareTimeRange(num);
                    this.setCompareStart(moment().subtract(num, 'days').format('YYYY-MM-DD'));
                    this.setCompareEnd(moment().format('YYYY-MM-DD'));
                    this.dateVal = `${ moment().subtract(num, 'days').format('YYYY-MM-DD')} ~ ${moment().format('YYYY-MM-DD')}`;
                    this.setCompareTimeRangeString(this.dateVal);
                    //console.log('这是想要的数据0',this.compareTimeRangeString);
                }


                console.log('在这里测试时间切换',num);
                console.log('this.dateVal',this.dateVal);
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
                this.setCompareStart(this.cal.begin);
                this.setCompareEnd(this.cal.end);
                this.setCompareTimeRange(days);
            }
        },
        watch: {
            dateVal: {
                handler(val){
                    //console.log('date',val);
                    let start = moment(val.split(' ~ ')[0], "YYYY-MM-DD");
                    let end = moment(val.split(' ~ ')[1], "YYYY-MM-DD");
                    //
                    const currentData = moment().format('YYYY-MM-DD');
                    console.log(currentData,this.compareEnd);
                    if(moment(end)>moment(currentData)){
                        alert('请求区间错误,返回最近7天对比数据');
                        this.dateVal =  `${ moment().subtract(7, 'days').format('YYYY-MM-DD')} ~ ${moment().format('YYYY-MM-DD')}`;
                        this.selectTime(7);
                        return ;
                    }
                    //
                    const days = end.diff(start)/1000/3600/24;
                    this.setCompareStart(val.split(' ~ ')[0]);
                    this.setCompareEnd(val.split(' ~ ')[1]);
                    this.setCompareTimeRange(days);
                    console.log(this.compareStart,this.compareEnd,this.compareTimeRange);
                    console.log(val.split(' ~ ')[0], val.split(' ~ ')[1], days);
                    this.setCompareTimeRangeString(this.dateVal);
                    //console.log('这是日历改变后的数据',this.compareTimeRangeString);
                }
            },
            compareSubTopic:{
                handler(val,oldVal){
                    if(val ==''){
                        this.search = '';
                    }
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
