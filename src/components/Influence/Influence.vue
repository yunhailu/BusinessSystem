﻿<template>
    <tabs :datas="influancerNums"></tabs>
    <!--<span>Influence</span>-->
    <div class="influence-overflow">
        <div class="popular">
            <ul class="popular-list">
                <li class="popular-list-item"  v-show="coltrol" v-for="(idx,item) in popularList" @click="showNewList(item,idx)" :class="[influColor==idx ? 'influenceActive' : '']">
                    <i class="fa" :class="[item.icon ? 'fa-'+item.icon : 'fa-cog']"></i>
                    <span class="popular-list-item-title">{{item.title}}</span>
                    <div class="popular-list-item-con">
                        <div class="popular-list-item-con-source">{{item.source}} - {{item.value}}</div>
                        <div class="popular-list-item-con-link">
                            <a :href="item.link"  target="_blank">{{item.link}}</a>
                        </div>
                        <div>{{item.post | addLabel "Post"}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="influenceTable">
            <table class="table table-hover  table-striped">
                <thead>
                <tr>
                    <td><i class="fa fa-user"></i> <span>{{words.influencer}}</span></td>
                    <td><i class="fa fa-comments"></i> <span>{{words.numberOfPosts}}</span></td>
                    <td><i class="fa fa-bar-chart"></i> <span>{{words.sentiment}}</span></td>
                    <td><i class="fa fa-thumbs-up"></i> {{words.like}}</td>
                    <td><i class="fa fa-share-alt"></i> {{words.resend}}</td>
                    <td><i class="fa fa-comment"></i> {{words.comments}}</td>
                    <td><i class="fa fa-share"></i> {{words.rate}}</td>
                </tr>
                </thead>
                <tbody v-if="influancerTable.length">
                <tr class="tableList" id="item.id" v-for="(index, item) in influancerTable" :class="[index % 2 == 0 ? '' : '']" @click="showPopList(item)" >
                    <td>{{item.influencer}}</td>
                    <td>{{item.post}}</td>
                    <td class="barTd"><div class="sentimentBar" v-echarts="item.sentiment | barFormat"></div></td>
                    <td>{{item.likeCount}}</td>
                    <td>{{item.shareCount}}</td>
                    <td>{{item.comments}}</td>
                    <td class="rate"><i class="fa" :class="[item.rate.key == 'up' ? 'fa-arrow-up' : 'fa-arrow-down']"></i> {{item.rate | rateFormat}}</td>
                </tr>
                </tbody>
            </table>
            <div v-if="!influancerTable.length" class="noTableTips">{{noTableTips}}</div>
        </div>

        <pop-list :item="selectItem" :pops="popList" :visiable.sync="popVisiable">
        </pop-list>

    </div>
    <tips :visible.sync="loadingParams.visiable" :tipsparam.sync="loadingParams"></tips>
</template>
<style lang="less" scoped>
    @import "Influence.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import moment from 'moment';
    import {Chart, Pie} from '../../config/config';
    import Local from '../../local/local';
    import * as Api from '../../widgets/Api';
    import Tabs from '../Common/Tabs/Tabs.vue';
    import Page from '../Common/Page/Page.vue';
    import PopList from './PopList/PopList.vue';
    import Tips from '../Common/Tips/Tips.vue';
    import { analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, activeAnalyticsTopic } from '../../vuex/getters';
    import {setAnalyticsEnd,setAnalyticsStart} from '../../vuex/actions';

    export default{
        data(){
            const words = Local().influence;
            const common=Local().common;
            return{
                words,
                common,
                nowTime:null,
                influColor:0,
                loadingParams: {
                    visiable: false,
                    type: 'loading',
                    content: "请稍侯......"
                },
                coltrol:true,
                popularList: [],
                influancerList: [],
                influancerTable: [],
                influancerNums: [0,0,0,0,0,0],
                noTableTips: words.noTableTips,
                popList: [],
                selectItem: {},
                popVisiable: false
            }
        },
        vuex: {
            getters: {analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, activeAnalyticsTopic},
            actions: {setAnalyticsEnd,setAnalyticsStart}
        },
        watch: {
          /*  nowTime:{
                handler(val,oldVal){
                    const afterTime = moment().add(1,"hour").format("YYYY-MM-DD HH");
                    const space = moment(afterTime).diff(moment(val));
                    if(this.analyticsTimeRange>7){
                        const interval = this.analyticsTimeRange;
                        setTimeout(function () {
                            const nowDay = moment().format("YYYY-MM-DD")
                            this.setAnalyticsEnd(nowDay);
                            this.setAnalyticsStart(moment(nowDay).subtract(interval,"day").format("YYYY-MM-DD"));
                            this.init();
                            this.nowTime = afterTime;
                        }.bind(this),space)
                    }else {
                        setTimeout(function () {
                            this.setAnalyticsEnd(moment(this.analyticsEnd).add(1,"hour").format("YYYY-MM-DD HH")),
                                    this.setAnalyticsStart(moment(this.analyticsStart).add(1,"hour").format("YYYY-MM-DD HH"));
                            this.init();
                            this.nowTime = afterTime;
                        }.bind(this),space)
                    }
                }
            },*/
            activeAnalyticsTopic: {
                handler(val){
                    this.init(val);
                }
            },
            analyticsSubTopic: {
                handler(val){
                    this.loadingParams.visiable = true;
                    this.init();
                }
            },
            analyticsDateChange: {
                handler(val){
                    this.loadingParams.visiable = true;
                    this.init();
                }
            },
            analyticsSource: {
                handler(val){
                    this.init();
                    if(val == 'all'){
                        this.influancerTable = _.filter(this.influancerList, (info, index) => {
                            return (index < 20);
                        });
                        return ;
                    }
                    this.influancerTable = _.filter(this.influancerList, (info, index) => {
                        return (info.source == val && index < 20);
                    });
                }

            }
        },
        ready(){
            this.nowTime = moment();
            if(this.activeAnalyticsTopic && this.activeAnalyticsTopic.topic_id){
                this.init();
            }
        },
        methods: {
            /*nowTime:{
                handler(val,oldVal){
                    const afterTime = moment().add(1,"hour").format("YYYY-MM-DD HH");
                    const space = moment(afterTime).diff(moment(val));
                    if(this.analyticsTimeRange>7){
                        const interval = this.analyticsTimeRange;
                        setTimeout(function () {
                            const nowDay = moment().format("YYYY-MM-DD")
                            this.setAnalyticsEnd(nowDay);
                            this.setAnalyticsStart(moment(nowDay).subtract(interval,"day").format("YYYY-MM-DD"));
                            this.init();
                            this.nowTime = afterTime;
                        }.bind(this),space)
                    }else {
                        setTimeout(function () {
                            this.setAnalyticsEnd(moment(this.analyticsEnd).add(1,"hour").format("YYYY-MM-DD HH")),
                                    this.setAnalyticsStart(moment(this.analyticsStart).add(1,"hour").format("YYYY-MM-DD HH"));
                            this.init();
                            this.nowTime = afterTime;
                        }.bind(this),space)
                    }
                }
            },*/
            showPopList(item){
                this.popVisiable = true;
                const topic_id = this.activeAnalyticsTopic.topic_id;
                const author = item.author;
                const size = this.$route.params.size;
                let end =this.analyticsEnd,
                        start = this.analyticsStart;
                if(start.includes(' ') && end.includes(' ')){
                    start = start.split(' ')[0]+'T'+start.split(' ')[1];
                    end = end.split(' ')[0]+'T'+end.split(' ')[1];
                }
                this.getArticles({topic_id,author,size,start,end});
            },
            getArticles(params){
                Api.getCommentList(params).then(resp => {
                    if (resp.data.code ==0&&resp.data.data!=null) {
                        const newDates = _.map(resp.data.data, (item)=> {
                            item.context = item.content;
                            item.date =item.pDate;
                            return item;
                            this.selectItem= item;
                        });
                        this.popList = newDates;
                    }
                    else {
                        this.popList =[{title:'暂无数据！',date:'无',from:'无',context:'无'}];
                    }
                });
            },
            showNewList(item,idx){
                this.loadingParams.visiable = true;
                this.influColor = idx;
                const  topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0;
                        let end =this.analyticsEnd,
                        start = this.analyticsStart;
                if(start.includes(' ') && end.includes(' ')){
                    start = start.split(' ')[0]+'T'+start.split(' ')[1];
                    end = end.split(' ')[0]+'T'+end.split(' ')[1];
                }

                if (item.icon=='edge' || item.icon=='chrome' ){ this.source='web'; this.controll=false; };

                Api.getInfluenceList({topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    if(resp.data.code ==0){
                        this.loadingParams.visiable = false;
                        const influanceInfo = resp.data.data;
                        if(item.icon=='user'){
                            var influanceInfos =_.sortBy(influanceInfo, function(item){
                                return -item.post;
                            });
                        }
                        else if (item.icon=='user-plus'){
                            var influanceInfos =_.sortBy(influanceInfo, function(item){
                                return -item.rate.value.replace('%','');
                            });
                        }
                        else if (item.icon=='edge'){
                            var influanceInfos =_.sortBy(influanceInfo, function(item){
                                return -(item.comments+item.shareCount+item.likeCount);
                            });
                        }
                        else if (item.icon=='chrome'){
                            var influanceInfos =_.sortBy(influanceInfo, function(item){
                                return -(item.comments+item.post+item.shareCount+item.likeCount);
                            });
                        }
                        else{
                            var influanceInfos =_.sortBy(influanceInfo, function(item){
                            return -item.post;
                        });}
                        this.influancerList = _.map(influanceInfos, info => info);
                        this.influancerTable = _.filter(influanceInfos, (info, index) => {
                            return (index < 20);
                        });
                    }
                });

            },


            getPopularList(){
                const   topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0;
                        let end =this.analyticsEnd,
                        start = this.analyticsStart;
                if(start.includes(' ') && end.includes(' ')){
                    start = start.split(' ')[0]+'T'+start.split(' ')[1];
                    end = end.split(' ')[0]+'T'+end.split(' ')[1];
                };

                const icons = ['user','user-plus','edge','chrome'];
                const iconsName = ["最活跃的作者", "最具影响力的作者","最活跃的站点", "最具影响力的站点"];
                Api.getInfluenceList({topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    if(resp.data.code ==0 && resp.data.data.length>0){   //success--load-data
                        this.coltrol=true;

                        const sdasda1=this.getOrderbyTitle(resp.data.data ,'post');
                        const sdasda2 =_.first(_.sortBy(resp.data.data, function(item){
                            return -item.rate.value.replace('%','');
                        }));
                        const sdasda3 =_.first(_.sortBy(resp.data.data, function(item){
                            return -(item.comments+item.shareCount+item.likeCount);
                        }));
                        const sdasda4 =_.first(_.sortBy(resp.data.data, function(item){
                            return -(item.comments+item.post+item.shareCount+item.likeCount);
                        }));

                        var firstTitle=[];
                        firstTitle.push(sdasda1);
                        firstTitle.push(sdasda2);
                        firstTitle.push(sdasda3);
                        firstTitle.push(sdasda4);
                        const sdaaa1 =_.map(firstTitle, (itemd) => {
                            itemd=_.pick(itemd,'influencer','post','source');
                            return itemd;
                        });
                        const sexData=_.map(sdaaa1,(item,index)=>{
                            item.icon = icons[index];
                            item.title = iconsName[index];
                            item.value = item.influencer;
                            return item;
                        });
                        const sdaaa2 =_.map(sexData, (itemd) => {
                            itemd=_.pick(itemd,'icon','value','title','post','source');
                            return itemd;
                        });
                        this.popularList=sdaaa2;
                    }

                    else{
                        this.coltrol=false;
                    }
                });
            },
            //order by function
            getOrderbyTitle(a,bi){
                const orderResult =_.first(_.sortBy(a, function(item){
                    return -item+'.'+bi;
                }));
                return  orderResult;
            },
            getInfluenceList(){
                this.loadingParams.visiable = true;
                const   topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0;
                let end =this.analyticsEnd,
                        start = this.analyticsStart;
                if(start.includes(' ') && end.includes(' ')){
                    start = start.split(' ')[0]+'T'+start.split(' ')[1];
                    end = end.split(' ')[0]+'T'+end.split(' ')[1];
                }
                Api.getInfluenceList({topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    if(resp.data.code ==0 && resp.data.data!=null ){
                        this.loadingParams.visiable = false;
                        const influanceInfos = resp.data.data;
                        this.influancerList = _.map(influanceInfos, info => info);
                        this.influancerTable = _.filter(this.influancerList, (info, index) => {
                            return (index < 20);
                        });
                    }
                    else{
                        this.coltrol=false;
                    }
                });
            },
            init(){
                this.getPopularList();
                this.getInfluenceList();

            }
        },
        filters: {
            addLabel(value, label){
                return label + ": " + value;
            },
            rateFormat(rate){
                if(!rate) return "";
                return rate.value;
            },
            barFormat(val){
                const option = {
                    tooltip: _.extend({}, Chart.tooltip, {}),
                    //添加grid图标不显示
                    //grid: _.extend({}, Chart.grid),
                    progressive: 4,
                    textStyle: Chart.textStyle,
                    xAxis: _.extend({}, Chart.xAxis, {
                        type: 'value',
                        show: false
                    }),
                    yAxis: _.extend({}, Chart.yAxis, {
                        type: 'category',
                        data: ['情绪分析'],

                        show: false
                    }),
                    color:['#2FCC71','#E64D3D', '#F1C40F', '#3598DC', '#737373'],
                    graphic:[
                        {
                            type: 'text',
                            z: -10,
                            left: 'center', // 相对父元素居中
                            top: 'middle',  // 相对父元素居中
                            //rotation: Math.PI / 4,
                            style: {
                                fill: '#eee',
                                text:Local().common.source,
                                font: 'bold 12px Microsoft YaHei'
                            }
                        }
                    ],
                    series: [
                        {
                            name: this.common.happy,
                            type: 'bar',
                            stack: '情绪分析',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: [val.happy]
                        },
                        {
                            name: this.common.anger,
                            type: 'bar',
                            stack: '情绪分析',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: [val.anger]
                        },
                        {
                            name: this.common.sorrow,
                            type: 'bar',
                            stack: '情绪分析',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: [val.sorrow]
                        },
                        {
                            name: this.common.disgust,
                            type: 'bar',
                            stack: '情绪分析',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: [val.disgust]
                        },
                        {
                            name: this.common.fear,
                            type: 'bar',
                            stack: '情绪分析',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: [val.fear]
                        }
                    ]
                };
                return option;
            }
        },
        components:{
            Tabs, PopList, Tips,
            'page': Page
        },
       // route: {
       //     data(){
       //         this.init();
       //     }
       // }
    }
</script>
