<template>
    <!--<span>Compare Panel</span>-->
    <div class="compare-charts">
        <div class="chart" v-echarts="compareChartOption" :loading="compareChartLoading" theme="macarons"></div>
        <div class="chart radar" v-echarts="compareRadarOption" :loading="compareRadarLoading" theme="macarons"></div>
        <div class="chart pie" v-echarts="comparePieOption" :loading="comparePieLoading" theme="macarons"></div>
    </div>
</template>
<style lang="less" scoped>
    @import "Main.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import Local from "../../../local/local";
    import {Chart, Pie} from '../../../config/config';
    import * as Api from "../../../widgets/Api";
    import { topicList, activeCompareTopic, topicGroupActiveId, compareSource, compareSubTopic, compareStart, compareEnd, compareTimeRange } from '../../../vuex/getters';
    import { setTopicList, setActiveCompareTopic, setTopicGroupActiveId, setCompareSource, setCompareSubTopic, setCompareStart, setCompareEnd, setCompareTimeRange  } from "../../../vuex/actions";

    export default{
        props: [],
        data(){
            const common = Local().common;
            return{
                common,
                data:[],
                VariableChartData:{
                    all: {},
                    wechat: {},
                    weibo: {},
                    client: {},
                    web: {},
                    overseas: {}
                },
                intervalTime:[],
                radarData:[],
                VariableRadarData: {
                    all: {},
                    wechat: {},
                    weibo: {},
                    client: {},
                    web: {},
                    overseas: {}
                },

                compareChartLoading: false,
                compareChartOption: {
                    title: _.extend({}, Chart.title, { show: false}),
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
                    series : []
                },

                comparePieLoading: false,
                comparePieOption: {
                    title: _.extend({}, Pie.title, { show: false}),
                    tooltip: _.extend({}, Pie.tooltip),
                    legend: _.extend({}, Pie.legend, {
                        bottom: 0,
                        data:[]
                    }),
                    textStyle: Pie.textStyle,
                    toolbox: Pie.toolbox,
                    color: _.extend([], Chart.color),
                    series: _.extend({}, Pie.series, {
                        name: 'Compare',
                        radius: ['25%', '60%'],
                        data:[]
                    })
                },

                compareRadarLoading: false,
                compareRadarOption: {
                    backgroundColor: '-webkit-radial-gradient(#e9e9e9 5%, #f9f9f9 60%);',
                    title: {
                    },
                    legend: {
                        bottom: 1,
                        data: [],
                    },
                    color: _.extend([], Chart.color),
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
                                color: 'rgb(238, 197, 102)'
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
                    series: []
                }
            }
        },
        methods:{
            initRadar(){
                this.VariableRadarData={
                    all: {},
                    wechat: {},
                    weibo: {},
                    client: {},
                    web: {},
                    overseas: {}
                }
            },
            initChart(){
                this.compareChartOption.legend.data=[];
                this.compareChartOption.series=[];
                this.comparePieOption.legend.data=[];
                this.comparePieOption.series.data=[];
            },
            initRadar(){
                this.compareRadarOption.legend.data=[];
                this.compareRadarOption.series=[];
            },
            initData(){
                this.VariableChartData.all = {},
                this.VariableChartData.wechat = {},
                this.VariableChartData.weibo = {},
                this.VariableChartData.client = {},
                this.VariableChartData.web = {},
                this.VariableChartData.overseas = {}
                this.VariableRadarData.all = {},
                this.VariableRadarData.wechat = {},
                this.VariableRadarData.weibo = {},
                this.VariableRadarData.client = {},
                this.VariableRadarData.web = {},
                this.VariableRadarData.overseas = {}
            },
            mapData(data,intervalDate){
                this.initChart();
                _.each(data,(item,key) =>{
                    this.compareChartOption.legend.data.push(key);
                    this.compareChartOption.xAxis.data=intervalDate;
                    this.compareChartOption.series.push(
                            {
                                name:key,
                                type:'bar',
                                areaStyle: {normal: {}},
                                stack: 'Total',
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
                /*this.compareChartOption.legend.data.push(newTopic[0].topic_name);
                this.compareChartOption.xAxis.data=intervalDate;
                this.compareChartOption.series.push(
                        {
                            name:newTopic[0].topic_name,
                            type:'bar',
                            areaStyle: {normal: {}},
                            stack: 'Total',
                            data: newChart
                        }
                );
                this.comparePieOption.legend.data.push(newTopic[0].topic_name);
                this.comparePieOption.series.data.push(
                        {
                            value: _.reduce(newChart, (mome, num) => mome + num, 0),
                            name:newTopic[0].topic_name
                        }
                );*/
            },
            mapRadarData(radarData,intervalDate){
                this.initRadar();
                //渲染radar
                _.each(radarData,(item,key) => {
                    this.compareRadarOption.legend.data.push(key);
                    this.compareRadarOption.series.push(
                        {
                            name: key,
                            type: 'radar',
                            lineStyle: {
                                normal: {
                                    width: 1.5,
                                    opacity: 0.5
                                }
                            },
                            data: item,
                            symbol: 'none',
                            itemStyle: {
                                normal: {
                                    //color: '#F9713C'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    opacity: 0.1
                                }
                            }
                        }
                    )
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
                });
                console.log(newTopic);
                this.VariableChartData.all[newTopic[0].topic_name]=newChart;
                this.VariableChartData.wechat[newTopic[0].topic_name]=wechat;
                this.VariableChartData.weibo[newTopic[0].topic_name]=weibo;
                this.VariableChartData.client[newTopic[0].topic_name]=client;
                this.VariableChartData.web[newTopic[0].topic_name]=web;
                this.VariableChartData.overseas[newTopic[0 ].topic_name]=overseas;
                console.log('VariableChartData',this.VariableChartData);
            },
            //添加雷达数据处理
            dealRadarData(newTopic,details){
                //Radar数据处理
                let all = {happy: [], anger:[], sorrow:[], disgust:[], fear:[]};
                //
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
                console.log('all',this.VariableRadarData);
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
            initDataAndSettingLoading(){
                //this.compareChartLoading = true;
                //this.comparePieLoading = true;
                //this.compareRadarLoading = true;
                this.compareChartOption.legend.data=[];
                this.compareChartOption.series=[];
                this.comparePieOption.legend.data=[];
                this.comparePieOption.series.data=[];
                this.compareRadarOption.legend.data=[];
                this.compareRadarOption.series=[];
            },
            //修改时间动态获取
            selectCalendar(){
                this.initDataAndSettingLoading();
                //获取数据
                const activeCompareTopics = this.activeCompareTopic;
                console.log('修改时间',activeCompareTopics);
                _.map(activeCompareTopics,item =>{
                    const topicParams = {
                        topic_id:item.topic_id,
                        topic:item.topic_name,
                        subtopic:this.compareSubTopic,
                        source:this.compareSource,
                        start:this.compareStart,
                        end:this.compareEnd,
                        time_dimension:this.compareTimeRange<=10 ? 0 :1
                    };
                    Api.getSummaryDetail(topicParams).then(resp =>{
                        if(resp.data.code ==0){
                            //this.compareChartLoading = false;
                            //this.comparePieLoading = false;
                            const newTopicData =resp.data.data;
                            const intervalDate = _.pluck(newTopicData,'date');
                            const newChart =_.map(newTopicData,function(item) {
                                return _.reduce(_.values(item.values), function (memo, num) {
                                    return memo + num;
                                }, 0);
                            });
                            this.compareChartOption.legend.data.push(item.topic_name);
                            this.compareChartOption.xAxis.data=intervalDate;
                            this.compareChartOption.series.push(
                                    {
                                        name:item.topic_name,
                                        type:'bar',
                                        areaStyle: {normal: {}},
                                        stack: 'Total',
                                        data: newChart
                                    }
                            );
                            this.comparePieOption.legend.data.push(item.topic_name);
                            this.comparePieOption.series.data.push(
                                    {
                                        value: _.reduce(newChart, (mome, num) => mome + num, 0),
                                        name:item.topic_name
                                    }
                            );
                        }
                    });
                    Api.getSentimentDetail(topicParams).then(resp =>{
                        //this.compareRadarLoading = false;
                        if(resp.data.code == 0){
                            const details = resp.data.data;
                            let all = {happy: [], anger:[], sorrow:[], disgust:[], fear:[]};
                            _.each(details,(detail,index) => {
                                _.each(detail.values,(value,key) =>{
                                    all.happy.push(details[index].values[key].happy);
                                    all.anger.push(details[index].values[key].anger);
                                    all.sorrow.push(details[index].values[key].sorrow);
                                    all.disgust.push(details[index].values[key].disgust);
                                    all.fear.push(details[index].values[key].fear);
                                })
                            });
                            const radar = _.map(_.values(all),item => {
                                        return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                                    }
                            );
                            const allNumber = _.reduce(radar, function(memo, num){ return memo + num; }, 0);
                            const newRadar =[_.map(radar,item =>{
                                return (item/allNumber)*100;
                            })];
                            this.compareRadarOption.legend.data.push(item.topic_name);
                            this.compareRadarOption.series.push(
                                    {
                                        name: item.topic_name,
                                        type: 'radar',
                                        lineStyle: {
                                            normal: {
                                                width: 1.5,
                                                opacity: 0.5
                                            }
                                        },
                                        data: newRadar,
                                        symbol: 'none',
                                        itemStyle: {
                                            normal: {
                                                //color: '#F9713C'
                                            }
                                        },
                                        areaStyle: {
                                            normal: {
                                                opacity: 0.1
                                            }
                                        }
                                    }
                            )
                        }
                    })
                })
            },
            //处理Summary数据相同group添加
            dealAddSummaryData(newTopic, topicParams){
                Api.getSummaryDetail(topicParams).then(resp =>{
                    if(resp.data.code ==0){
                        //this.compareChartLoading = false;
                        //this.comparePieLoading = false;
                        const newTopicData =resp.data.data;
                        const intervalDate = _.pluck(newTopicData,'date');
                        this.intervalTime =intervalDate;
                        this.dealChartData(newTopic,newTopicData);
//处理data问题
                        this.mapData(this.data,intervalDate);


                        /*this.compareChartOption.legend.data.push(newTopic[0].topic_name);
                        this.compareChartOption.xAxis.data=intervalDate;
                        this.compareChartOption.series.push(
                                {
                                    name:newTopic[0].topic_name,
                                    type:'bar',
                                    areaStyle: {normal: {}},
                                    stack: 'Total',
                                    data: newChart
                                }
                        );
                        this.comparePieOption.legend.data.push(newTopic[0].topic_name);
                        this.comparePieOption.series.data.push(
                                {
                                    value: _.reduce(newChart, (mome, num) => mome + num, 0),
                                    name:newTopic[0].topic_name
                                }
                        );*/
                        //
                    }
                });
            },
            //处理SentimentData
            dealAddSentimentData(newTopic, topicParams){
                Api.getSentimentDetail(topicParams).then(resp =>{
                    //this.compareRadarLoading = false;
                    if(resp.data.code == 0){
                        const details = resp.data.data;
                        const intervalDate = _.pluck(details,'date');
                        this.intervalTime =intervalDate;
                        this.dealRadarData(newTopic,details);
                        this.mapRadarData(this.radarData,intervalDate);


                        /*let all = {happy: [], anger:[], sorrow:[], disgust:[], fear:[]};
                        _.each(details,(detail,index) => {
                            _.each(detail.values,(value,key) =>{
                                all.happy.push(details[index].values[key].happy);
                                all.anger.push(details[index].values[key].anger);
                                all.sorrow.push(details[index].values[key].sorrow);
                                all.disgust.push(details[index].values[key].disgust);
                                all.fear.push(details[index].values[key].fear);
                            })
                        });
                        const radar = _.map(_.values(all),item => {
                                    return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                                }
                        );
                        const allNumber = _.reduce(radar, function(memo, num){ return memo + num; }, 0);
                        const newRadar =[_.map(radar,item =>{
                            return (item/allNumber)*100;
                        })];
                        this.compareRadarOption.legend.data.push(newTopic[0].topic_name);
                        this.compareRadarOption.series.push(
                                {
                                    name: newTopic[0].topic_name,
                                    type: 'radar',
                                    lineStyle: {
                                        normal: {
                                            width: 1.5,
                                            opacity: 0.5
                                        }
                                    },
                                    data: newRadar,
                                    symbol: 'none',
                                    itemStyle: {
                                        normal: {
                                            //color: '#F9713C'
                                        }
                                    },
                                    areaStyle: {
                                        normal: {
                                            opacity: 0.1
                                        }
                                    }
                                }
                        )*/
                    }
                })
            },
            //加上后有一个数据sum
            dealAddOnlyOneSummaryData(newTopic,topicParams){
                //this.compareChartLoading = true;
                //this.comparePieLoading = true;
                Api.getSummaryDetail(topicParams).then(resp =>{
                    if(resp.data.code ==0){
                        //this.compareChartLoading = false;
                        //this.comparePieLoading = false;
                        const newTopicData =resp.data.data;
                        const intervalDate = _.pluck(newTopicData,'date');
                        this.intervalTime =intervalDate;
                        this.data = this.VariableChartData.all;//-------------------------------------------------------默认为all了
                        this.dealChartData(newTopic,newTopicData);
//处理data问题
                        this.mapData(this.data,intervalDate);
                    }
                });
            },
            //加上后only一个数据sen
            dealAddOnlyOneSentimentData(newTopic,topicParams){
                //this.compareRadarLoading = true;
                Api.getSentimentDetail(topicParams).then(resp =>{
                    //this.compareRadarLoading = false;
                    if(resp.data.code == 0){
                        const details = resp.data.data;
                        console.log('details',details)
                        const intervalDate = _.pluck(details,'date');
                        this.intervalTime =intervalDate;
                        this.radarData = this.VariableRadarData.all;
                        this.dealRadarData(newTopic,details);
                        this.mapRadarData(this.radarData,intervalDate);
                    }
                })
            }

        },
        vuex:{
            actions:{setTopicList ,setActiveCompareTopic ,setTopicGroupActiveId, setCompareSource, setCompareSubTopic, setCompareStart, setCompareEnd, setCompareTimeRange},
            getters:{topicList ,activeCompareTopic , topicGroupActiveId, compareSource, compareSubTopic, compareStart, compareEnd, compareTimeRange  }
        },
        watch:{
            activeCompareTopic: {
                handler(val, oldVal){
                    //如果新值为空
                    const currentList = this.topicList;
                    const currentGroupId = this.topicGroupActiveId;
                    const activeCompareTopic = this.activeCompareTopic;
                    const currentGroup = _.find(currentList,function(item){return item.group_id ==currentGroupId;});
                    if(val.length == 0){
                        this.compareChartOption.legend.data=[];
                        this.compareChartOption.series=[];
                        this.comparePieOption.legend.data=[];
                        this.comparePieOption.series.data=[];
                        this.compareRadarOption.legend.data=[];
                        this.compareRadarOption.series=[];
                        this.initData();
                        return ;
                    }else if(oldVal.length == 0){
                        //新值不为空---如果老值为空
                        const newTopic = val;
                        const topicParams = {
                            topic_id:_.isEmpty(newTopic) ? '' : newTopic[0].topic_id,
                            topic:_.isEmpty(newTopic) ? '' : newTopic[0].topic_name,
                            subtopic:this.compareSubTopic,
                            source:this.compareSource,
                            start:this.compareStart,
                            end:this.compareEnd,
                            time_dimension:this.compareTimeRange<=10 ? 0 :1
                        };
                        this.dealAddOnlyOneSummaryData(newTopic,topicParams);
                        this.dealAddOnlyOneSentimentData(newTopic,topicParams);

                    }else{
                        //都不为空,判断是否是同一个group--yes
                        if(_.find(currentGroup.list,function(item){return item.topic_name == oldVal[0].topic_name;}) !=undefined){
                            if(val.length > oldVal.length){
                                //this.compareChartLoading = true;
                                //this.comparePieLoading = true;
                                //this.compareRadarLoading = true;
                                const newTopic = _.difference(val, oldVal);
                                console.log(newTopic);
                                const topicParams = {
                                    topic_id:_.isEmpty(newTopic) ? '' : newTopic[0].topic_id,
                                    topic:_.isEmpty(newTopic) ? '' : newTopic[0].topic_name,
                                    subtopic:this.compareSubTopic,
                                    source:this.compareSource,
                                    start:this.compareStart,
                                    end:this.compareEnd,
                                    time_dimension:this.compareTimeRange<=10 ? 0 :1
                                };
                                this.dealAddSummaryData(newTopic,topicParams);
                                this.dealAddSentimentData(newTopic,topicParams);
                            } else {
                                var oldTopic = _.difference(oldVal, val);
                                console.log(oldTopic);
                                console.log('pre',this.VariableRadarData)
                                this.VariableChartData.all=_.omit(this.VariableChartData.all,oldTopic[0].topic_name);
                                this.VariableChartData.wechat=_.omit(this.VariableChartData.wechat,oldTopic[0].topic_name);
                                this.VariableChartData.weibo=_.omit(this.VariableChartData.weibo,oldTopic[0].topic_name);
                                this.VariableChartData.client=_.omit(this.VariableChartData.client,oldTopic[0].topic_name);
                                this.VariableChartData.web=_.omit(this.VariableChartData.web,oldTopic[0].topic_name);
                                this.VariableChartData.overseas=_.omit(this.VariableChartData.overseas,oldTopic[0].topic_name);

                                this.VariableRadarData.all=_.omit(this.VariableRadarData.all,oldTopic[0].topic_name);
                                this.VariableRadarData.wechat=_.omit(this.VariableRadarData.wechat,oldTopic[0].topic_name);
                                this.VariableRadarData.weibo=_.omit(this.VariableRadarData.weibo,oldTopic[0].topic_name);
                                this.VariableRadarData.client=_.omit(this.VariableRadarData.client,oldTopic[0].topic_name);
                                this.VariableRadarData.web=_.omit(this.VariableRadarData.web,oldTopic[0].topic_name);
                                this.VariableRadarData.overseas=_.omit(this.VariableRadarData.overseas,oldTopic[0].topic_name);
                                const intervalDate =this.intervalTime;
                                console.log('after',this.VariableRadarData);
                                this.data =this.VariableChartData.all;
                                this.radarData = this.VariableRadarData.all;
                                this.mapData(this.data,intervalDate);
                                this.mapRadarData(this.radarData,intervalDate);
                            };
                        }else {
                            const newTopic = val;
                            const topicParams = {
                                topic_id:_.isEmpty(newTopic) ? '' : newTopic[0].topic_id,
                                topic:_.isEmpty(newTopic) ? '' : newTopic[0].topic_name,
                                subtopic:this.compareSubTopic,
                                source:this.compareSource,
                                start:this.compareStart,
                                end:this.compareEnd,
                                time_dimension:this.compareTimeRange<=10 ? 0 :1
                            };
                            this.initData();
                            this.dealAddOnlyOneSummaryData(newTopic,topicParams);
                            this.dealAddOnlyOneSentimentData(newTopic,topicParams);
                        }

                    }
                }
            },
            compareSource:{
                handler(){
                    console.log(this.compareSource);
                    //判断修改后的源
                    const newSource = this.compareSource;
                    switch(newSource){
                        case '全部':
                            this.data =this.VariableChartData.all;
                            this.radarData =this.VariableRadarData.all;
                            break;
                        case '微信':
                            this.data =this.VariableChartData.wechat;
                            this.radarData =this.VariableRadarData.wechat;
                            break;
                        case '微博':
                            this.data =this.VariableChartData.weibo;
                            this.radarData =this.VariableRadarData.weibo;
                            break;
                        case '客户端':
                            this.data =this.VariableChartData.client;
                            this.radarData =this.VariableRadarData.client;
                            break;
                        case '网页':
                            this.data =this.VariableChartData.web;
                            this.radarData =this.VariableRadarData.web;
                            break;
                        case '海外':
                            this.data =this.VariableChartData.overseas;
                            this.radarData =this.VariableRadarData.overseas;
                            break;
                        default:
                            break;
                    }
                    //展示修改后的源,刷新
console.log(this.data);
                }
            },
            data:{
                handler(){
                    const intervalDate = this.intervalTime;
                    this.mapData(this.data,intervalDate);

                }
            },
            /*VariableRadarData:{
                handler(){
                    const intervalDate = this.intervalTime;
                    this.mapRadarData(this.radarData,intervalDate);
                }
            },*/
            radarData:{
                handler(){
                    const intervalDate = this.intervalTime;
                    this.mapRadarData(this.radarData,intervalDate);
                }
            }
            /*compareStart: {
                handler(){
                    if(_.isEmpty(this.activeCompareTopic)){
                        return ;
                    }else {
                        this.selectCalendar();
                    }
                }
            },
            compareEnd:{
                handler(){
                    if(_.isEmpty(this.activeCompareTopic)){
                        return ;
                    }else {
                        this.selectCalendar();
                    }
                }
            }*/
        },
        components:{

        }
    }
</script>
