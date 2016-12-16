<template>
    <div class="panel-title">
        <span class="panel-title-text">{{title}}</span>
        <div class="panel-title-delete" @click="deleteItem();"><i class="fa fa-minus"></i></div>
    </div>
    <div class="compare-charts">
        <div class="chart" :loading="compareChartLoading">
            <echarts :options="compareChartOption" :initOptions="compareChartOption" img.sync="master"></echarts>
        </div>
        <div class="chart radar" :loading="compareRadarLoading">
            <echarts :options="compareRadarOption" :initOptions="compareRadarOption" img.sync="sub"></echarts>
        </div>
        <div class="chart pie" :loading="comparePieLoading">
            <echarts :options="comparePieOption" :initOptions="comparePieOption" img.sync="secsub"></echarts>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "Compare.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import moment from 'moment';
    import Echarts from '../../Common/Echarts/Echarts.vue';
    import Local from "../../../local/local";
    import  Tips from '../../Common/Tips/Tips.vue';
    import {Chart, Pie} from '../../../config/config';
    import * as Api from "../../../widgets/Api";
    import {exportImages} from '../../../vuex/getters';
    import {insertExportImages, removeExportImages } from "../../../vuex/actions";

    export default{
        props: ['title', 'data', 'remove', 'master', 'sub','secsub'],
        data(){
            const common = Local().common;
            return{
                common,
                timeout:null,
                loadingParams:{
                    visiable:false,
                    type:'loading',
                    content:common.waitWords
                },
                data:[],
                VariableChartData:{
                    all: {},
                    wechat: {},
                    weibo: {},
                    client: {},
                    web: {},
                    overseas: {},
                    sengine:{}
                },
                intervalTime:[],
                radarData:[],
                VariableRadarData: {
                    all: {},
                    wechat: {},
                    weibo: {},
                    client: {},
                    web: {},
                    overseas: {},
                    sengine:{}
                },

                compareChartLoading: false,
                compareChartOption: {
                    title: _.extend({}, Chart.title, {
                        text:'关注趋势图：',
                        textStyle:{
                            color:'#408CD7'
                        },
                        show: true
                    }),
                    tooltip: Chart.tooltip,
                    legend: {
                        data:[]
                    },
                    grid: Chart.grid,
                    toolbox: Chart.toolbox,
                    color: _.extend([], Chart.color),
                    xAxis: _.extend({}, Chart.xAxis, {
                        type : 'category',
                        data : [],
                        boundaryGap : false
                    }),
                    yAxis: _.extend({}, Chart.yAxis, {
                        type : 'value',
                        boundaryGap : false
                    }),
                    progressive: 4,
                    textStyle: Chart.textStyle,
                    graphic:Chart.graphic,
                    series : []
                },

                comparePieLoading: false,
                comparePieOption: {
                    title: _.extend({}, Pie.title, {
                        text:'关注占比图：',
                        textStyle:{
                            color:'#408CD7'
                        },
                        show: true
                    }),
                    tooltip: _.extend({}, Pie.tooltip),
                    legend: _.extend({}, Pie.legend, {
                        bottom: 0,
                        data:[]
                    }),
                    textStyle: Pie.textStyle,
                    toolbox: Pie.toolbox,
                    color: _.extend([], Chart.color),
                    graphic:Pie.graphic,
                    series: _.extend({}, Pie.series, {
                        name: 'Compare',
                        radius: ['25%', '60%'],
                        data:[]
                    })
                },

                compareRadarLoading: false,
                compareRadarOption: {
                    backgroundColor: '-webkit-radial-gradient(#e9e9e9 5%, #f9f9f9 60%);',
                    title: _.extend({}, Pie.title, {
                        text:'情绪趋势图：',
                        textStyle:{
                            color:'#408CD7'
                        },
                        show: true
                    }),
                    legend: {
                        bottom: 1,
                        data: []
                    },
                    //color: _.extend([], Chart.color),
                    color:["#1C7C76","#FA943E","#88051C","#2E44E1","#F58974","#F574EA","#81F574","#051527","#C9E120","#F4D171"],
                    radar: {
                        indicator: [
                            {name: common.happy, max: 100},
                            {name: common.anger, max: 100},
                            {name: common.sorrow, max: 100},
                            {name: common.disgust, max: 100},
                            {name: common.fear, max: 100}
                        ],
                        shape: 'circle',
                        splitNumber: 5,
                        name: {
                            textStyle: {
                                color: 'rgb(39, 114, 123)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: [
                                    'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                                    'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                                    'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                                ].reverse()
                            }
                        },
                        splitArea: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(238, 197, 102, 0.5)'
                            }
                        }
                    },
                    graphic:Chart.graphic,
                    series: [{
                        type: 'radar',
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width:1
                                }
                            },
                            emphasis : {
                                areaStyle: {color:'rgba(0,250,0,0.3)'}
                            }
                        },
                        data:[]
                    }]
                },
                compareNums:[]
            }
        },
        methods:{
            initChart(){
                this.compareChartOption.legend.data=[];
                this.compareChartOption.series=[];
                this.comparePieOption.legend.data=[];
                this.comparePieOption.series.data=[];
            },
            initRadar(){
                this.compareRadarOption.legend.data=[];
                this.compareRadarOption.series[0].data=[];
            },
            initData(){
                this.VariableChartData.all = {},
                        this.VariableChartData.wechat = {},
                        this.VariableChartData.weibo = {},
                        this.VariableChartData.client = {},
                        this.VariableChartData.web = {},
                        this.VariableChartData.overseas = {},
                        this.VariableChartData.sengine={},
                        this.VariableRadarData.all = {},
                        this.VariableRadarData.wechat = {},
                        this.VariableRadarData.weibo = {},
                        this.VariableRadarData.client = {},
                        this.VariableRadarData.web = {},
                        this.VariableRadarData.overseas = {},
                        this.VariableRadarData.sengine = {}
            },
            mapData(data,intervalDate){
                this.initChart();
                _.each(data,(item,key) =>{
                    this.compareChartOption.legend.data.push(key);
                    this.compareChartOption.xAxis.data=intervalDate;
                    this.compareChartOption.series.push(
                            {
                                name:key,
                                type:'line',
                                areaStyle: {normal: {}},
                                data: item
                            }
                    );
                    this.comparePieOption.legend.data.push(key);
                    this.comparePieOption.series.data.push(
                            {
                                value: _.reduce(item, (mome, num) => mome + num, 0),
                                name:key
                            }
                    );
                })
            },
            mapRadarData(radarData,intervalDate){
                this.initRadar();
                //渲染radar
                _.each(radarData,(item,key) => {
                    console.log(item,key);
                    this.compareRadarOption.legend.data.push(key);
                    this.compareRadarOption.series[0].data.push(
                            {
                                value:item[0],
                                name:key
                            }
                    )
                    console.log(this.compareRadarOption.series)
                });
            },
            //chart数据处理
            dealChartData(newTopic,newTopicData){
                //数据处理模块
                const wechat=[];
                const weibo =[];
                const client =[];
                const web =[];
                const overseas =[];
                const sengine = [];
                const newChart =_.map(newTopicData,function(item) {
                    return _.reduce(_.values(item.values), function (memo, num) {
                        return memo + num;
                    }, 0);
                });
                _.each(newTopicData,(item,index) => {
                    //console.log(item.values.wechat)
                    wechat.push(item.values.wechat);
                    weibo.push(item.values.weibo);
                    client.push(item.values.client);
                    web.push(item.values.web);
                    overseas.push(item.values.overseas);
                    sengine.push(item.values.sengine);
                });
                console.log(newTopic);
                this.VariableChartData.all[newTopic[0].topic_name]=newChart;
                this.VariableChartData.wechat[newTopic[0].topic_name]=wechat;
                this.VariableChartData.weibo[newTopic[0].topic_name]=weibo;
                this.VariableChartData.client[newTopic[0].topic_name]=client;
                this.VariableChartData.web[newTopic[0].topic_name]=web;
                this.VariableChartData.overseas[newTopic[0].topic_name]=overseas;
                this.VariableChartData.sengine[newTopic[0].topic_name]=sengine;
                this.getSourceCount();
            },
            //添加雷达数据处理
            dealRadarData(newTopic,details){
                //Radar数据处理
                let all = {happy: [], anger:[], sorrow:[], disgust:[], fear:[]};
                const wechat=[];
                const weibo =[];
                const client =[];
                const web =[];
                const overseas =[];
                _.each(details,(detail,index) =>{
                    client.push(detail.values.client);
                    weibo.push(detail.values.weibo);
                    web.push(detail.values.web);
                    overseas.push(detail.values.overseas);
                    wechat.push(detail.values.wechat);
                });
                //wechat
                const newWechatlist = _.unzip(_.map(_.map(wechat,item =>{return _.values(item)}),item =>item));
                const newWechat = _.map(newWechatlist,item =>{
                    return _.reduce(item,function(memo, num){ return memo + num; }, 0);;
                })
                console.log(newWechat);
                //weibo
                const newWeibolist = _.unzip(_.map(_.map(weibo,item =>{return _.values(item)}),item =>item));
                const newWeibo = _.map(newWeibolist,item =>{
                    return _.reduce(item,function(memo, num){ return memo + num; }, 0);;
                })
                console.log(newWeibo);
                //client
                const newClientlist = _.unzip(_.map(_.map(client,item =>{return _.values(item)}),item =>item));
                const newClient = _.map(newClientlist,item =>{
                    return _.reduce(item,function(memo, num){ return memo + num; }, 0);;
                })
                console.log(newClient);
                //overseas
                const newOverseaslist = _.unzip(_.map(_.map(overseas,item =>{return _.values(item)}),item =>item));
                const newOverseas = _.map(newOverseaslist,item =>{
                    return _.reduce(item,function(memo, num){ return memo + num; }, 0);;
                })
                console.log(newOverseas);
                //web
                const newWeblist = _.unzip(_.map(_.map(web,item =>{return _.values(item)}),item =>item));
                const newWeb = _.map(newWeblist,item =>{
                    return _.reduce(item,function(memo, num){ return memo + num; }, 0);;
                })
                console.log(newWeb);
                this.VariableRadarData.wechat[newTopic[0].topic_name] = [_.map(newWechat,item =>{
                    return (item/(_.reduce(newWechat, function(memo, num){ return memo + num; }, 0)))*100;
                })];
                this.VariableRadarData.weibo[newTopic[0].topic_name] = [_.map(newWeibo,item =>{
                    return (item/(_.reduce(newWeibo, function(memo, num){ return memo + num; }, 0)))*100;
                })];
                this.VariableRadarData.client[newTopic[0].topic_name] = [_.map(newClient,item =>{
                    return (item/(_.reduce(newClient, function(memo, num){ return memo + num; }, 0)))*100;
                })];
                this.VariableRadarData.overseas[newTopic[0].topic_name] = [_.map(newOverseas,item =>{
                    return (item/(_.reduce(newOverseas, function(memo, num){ return memo + num; }, 0)))*100;
                })];
                this.VariableRadarData.web[newTopic[0].topic_name] = [_.map(newWeb,item =>{
                    return (item/(_.reduce(newWeb, function(memo, num){ return memo + num; }, 0)))*100;
                })];

                _.each(details,(detail,index) => {
                    _.each(detail.values,(value,key) =>{
                        all.happy.push(details[index].values[key].happy);
                        all.anger.push(details[index].values[key].anger);
                        all.sorrow.push(details[index].values[key].sorrow);
                        all.disgust.push(details[index].values[key].disgust);
                        all.fear.push(details[index].values[key].fear);
                    })
                })
                const radar = _.map(_.values(all),item => {
                            return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                        }
                );
                const allNumber = _.reduce(radar, function(memo, num){ return memo + num; }, 0);
                const newRadar =[_.map(radar,item =>{
                    return (item/allNumber)*100;
                })];
                this.VariableRadarData.all[newTopic[0].topic_name] =newRadar;
            },
            //初始化表格数据并将表设为loading
            //修改时间动态获取
            selectCalendar(){
                //获取数据
                const activeCompareTopics = this.activeCompareTopic;
                //初始化数据
                this.initData();
                _.map(activeCompareTopics,item =>{
                    let topicParams = {
                        topic_id:item.topic_id,
                        topic:item.topic_name,
                        subtopic:this.compareSubTopic,
                        source:this.compareSource,
                        start:this.compareStart,
                        end:this.compareEnd,
                        time_dimension:this.compareTimeRange<=7 ? 0 :1
                    };
                    if(topicParams.start.includes(' ') && topicParams.end.includes(' ')){
                        topicParams.start = topicParams.start.split(' ')[0]+'T'+topicParams.start.split(' ')[1];
                        topicParams.end = topicParams.end.split(' ')[0]+'T'+topicParams.end.split(' ')[1];
                    }
                    this.dealAddSummaryData([item],topicParams);
                    this.dealAddSentimentData([item],topicParams);
                    //push
                })
            },
            //处理Summary数据相同group添加
            dealAddSummaryData(newTopic, topicParams){
                Api.getSummaryDetail(topicParams).then(resp =>{
                    if(resp.data.code ==0){
                        const newTopicData =resp.data.data;
                        const intervalDate = _.pluck(newTopicData,'date');
                        this.intervalTime =intervalDate;
                        this.dealChartData(newTopic,newTopicData);
                        //处理data问题
                        this.changeSource();
                        this.mapData(this.data,intervalDate);
                    }
                });
            },
            //处理SentimentData
            dealAddSentimentData(newTopic, topicParams){
                this.loadingParams.visiable = true;
                this.timeout = setTimeout(function () {
                    this.loadingParams.visiable = false;
                }.bind(this),8000)
                Api.getSentimentDetail(topicParams).then(resp =>{
                    if(resp.data.code == 0){
                        this.loadingParams.visiable = false;
                        clearTimeout(this.timeout);
                        const details = resp.data.data;
                        const intervalDate = _.pluck(details,'date');
                        this.intervalTime =intervalDate;
                        this.dealRadarData(newTopic,details);
                        this.changeSource();
                        this.mapRadarData(this.radarData,intervalDate);

                    }
                })
            },
            //加上后有一个数据sum
            dealAddOnlyOneSummaryData(newTopic,topicParams){
                Api.getSummaryDetail(topicParams).then(resp =>{
                    if(resp.data.code ==0){
                        const newTopicData =resp.data.data;
                        const intervalDate = _.pluck(newTopicData,'date');
                        this.intervalTime =intervalDate;
                        this.dealChartData(newTopic,newTopicData);
                        this.changeSource();
                        //处理data问题
                        this.mapData(this.data,intervalDate);
                    }
                });
            },
            //加上后only一个数据sen
            dealAddOnlyOneSentimentData(newTopic,topicParams){
                this.loadingParams.visiable = true;
                setTimeout(function () {
                    this.loadingParams.visiable = false;
                }.bind(this),8000)
                Api.getSentimentDetail(topicParams).then(resp =>{
                    if(resp.data.code == 0){
                        this.loadingParams.visiable = false;
                        clearTimeout(this.timeout);
                        const details = resp.data.data;
                        const intervalDate = _.pluck(details,'date');
                        this.intervalTime =intervalDate;
                        this.changeSource();
                        this.dealRadarData(newTopic,details);
                        this.mapRadarData(this.radarData,intervalDate);
                    }
                })
            },
//
            getSourceCount(){
                console.log(_.values(this.VariableChartData.all));
                const midAllCount = _.map(_.values(this.VariableChartData.all),item=>{
                    return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                });
                const midWechatCount = _.map(_.values(this.VariableChartData.wechat),item=>{
                    return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                });
                const midWeiboCount = _.map(_.values(this.VariableChartData.weibo),item=>{
                    return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                });
                const midClientCount = _.map(_.values(this.VariableChartData.client),item=>{
                    return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                });
                const midWebCount = _.map(_.values(this.VariableChartData.web),item=>{
                    return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                });
                const midOverseasCount = _.map(_.values(this.VariableChartData.overseas),item=>{
                    return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                });
                const midSengineCount = _.map(_.values(this.VariableChartData.sengine),item=>{
                    return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                });
                let compareSourceCount = this.compareSourceCount;
                compareSourceCount.all = _.reduce(midAllCount, function(memo, num){ return memo + num; }, 0);
                compareSourceCount.wechat = _.reduce(midWechatCount, function(memo, num){ return memo + num; }, 0);
                compareSourceCount.weibo = _.reduce(midWeiboCount, function(memo, num){ return memo + num; }, 0);
                compareSourceCount.client = _.reduce(midClientCount, function(memo, num){ return memo + num; }, 0);
                compareSourceCount.web = _.reduce(midWebCount, function(memo, num){ return memo + num; }, 0);
                compareSourceCount.overseas = _.reduce(midOverseasCount, function(memo, num){ return memo + num; }, 0);
                compareSourceCount.sengine = _.reduce(midSengineCount, function(memo, num){ return memo + num; }, 0);

                this.compareNums=[
                    compareSourceCount.all,compareSourceCount.wechat,compareSourceCount.weibo,compareSourceCount.client+compareSourceCount.web,compareSourceCount.sengine,compareSourceCount.overseas
                ];
            },
            //切换赋值
            changeSource(){
                const newSource = this.compareSource;
                switch(newSource){
                    case 'all':
                        this.data =this.VariableChartData.all;
                        this.radarData =this.VariableRadarData.all;
                        break;
                    case 'wechat':
                        this.data =this.VariableChartData.wechat;
                        this.radarData =this.VariableRadarData.wechat;
                        break;
                    case 'weibo':
                        this.data =this.VariableChartData.weibo;
                        this.radarData =this.VariableRadarData.weibo;
                        break;
                    case 'client':
                        this.data =this.VariableChartData.client;
                        this.radarData =this.VariableRadarData.client;
                        break;
                    case 'web':
                        this.data =this.VariableChartData.web;
                        this.radarData =this.VariableRadarData.web;
                        break;
                    case 'overseas':
                        this.data =this.VariableChartData.overseas;
                        this.radarData =this.VariableRadarData.overseas;
                        break;
                    default:
                        break;
                }
            }

        },
        vuex:{
            actions:{insertExportImages, removeExportImages},
            getters:{exportImages  }
        },
       /* watch:{
           master:{
               handler(val){
                   this.insertExportImages({
                       topic:this.data.topic_ids,

                   })
               }
           },
            sub:{

            },
            secsub:{

            }
        },*/
        components:{
            Tips,Echarts
        }
    }
</script>