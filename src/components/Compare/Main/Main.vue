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
                        const newChart =_.map(newTopicData,function(item) {
                            return _.reduce(_.values(item.values), function (memo, num) {
                                return memo + num;
                            }, 0);
                        });
                        this.compareChartOption.legend.data.push(newTopic[0].topic_name);
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
                        );
                    }
                });
            },
            //处理SentimentData
            dealAddSentimentData(newTopic, topicParams){
                Api.getSentimentDetail(topicParams).then(resp =>{
                    //this.compareRadarLoading = false;
                    if(resp.data.code == 0){
                        const details = resp.data.data;
                        const _this = this;
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
                        )
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
                        const newChart =_.map(newTopicData, (item) => {
                            return _.reduce(_.values(item.values), (memo, num) => {
                                return (memo + num);
                            }, 0);
                        });
                        console.log('newChart', newChart);
                        this.compareChartOption.legend.data=[newTopic[0].topic_name];
                        this.compareChartOption.xAxis.data=intervalDate;
                        this.compareChartOption.series=[
                            {
                                name:newTopic[0].topic_name,
                                type:'bar',
                                areaStyle: {normal: {}},
                                stack: 'Total',
                                data: newChart
                            }
                        ];
                        this.comparePieOption.legend.data=[newTopic[0].topic_name];
                        this.comparePieOption.series.data=[
                            {
                                value: _.reduce(newChart, (mome, num) => mome + num, 0),
                                name:newTopic[0].topic_name
                            }
                        ];
                        console.log(this.compareChartOption, this.comparePieOption);
                    }
                });
            },
            //加上后又一个数据sen
            dealAddOnlyOneSentimentData(newTopic,topicParams){
                //this.compareRadarLoading = true;
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
                        })
                        const valAll =_.values(all);
                        const radar = _.map(_.values(all),item => {
                                    return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                                }
                        );
                        const allNumber = _.reduce(radar, function(memo, num){ return memo + num; }, 0);
                        const newRadar =[_.map(radar,item =>{
                            return (item/allNumber)*100;
                        })];
                        this.compareRadarOption.legend.data=[newTopic[0].topic_name];
                        this.compareRadarOption.series=[
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
                        ]
                        //console.log(JSON.stringify(this.compareRadarOption));
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
                                const idx = this.compareChartOption.legend.data.indexOf(oldTopic[0].topic_name)
                                this.compareChartOption.legend.data.splice(idx,1);
                                this.compareChartOption.series.splice(idx,1);
                                this.comparePieOption.legend.data.splice(idx,1);
                                this.comparePieOption.series.data.splice(idx,1);
                                this.compareRadarOption.legend.data.splice(idx,1);
                                this.compareRadarOption.series.splice(idx,1);
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
                            this.dealAddOnlyOneSummaryData(newTopic,topicParams);
                            this.dealAddOnlyOneSentimentData(newTopic,topicParams);
                        }

                    }
                }
            },
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
