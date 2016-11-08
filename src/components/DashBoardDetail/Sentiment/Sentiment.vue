<template>
    <!--<tabs :actions="actions" ></tabs>-->
    <!--<span>Sentiment</span>-->
    <div class="panel-title">
        <span class="panel-title-text">{{title}}</span>
        <div class="panel-title-delete" @click="deleteItem();"><i class="fa fa-minus"></i></div>
    </div>
    <div class="charts">
        <!--<div class="chart timeBar" v-echarts="sentimentBarOption" :img.sync="master" :loading="sentimentBarLoading" ></div>&lt;!&ndash;theme="infographic"&ndash;&gt;-->
        <!--<div class="chart percentBar" v-echarts="sentimentChartOption"  :loading="sentimentChartLoading" ></div>-->

        <div class="chart timeBar"  :img.sync="master" :loading="sentimentBarLoading" >
            <echarts :options="sentimentBarOption" initOptions="sentimentBarOption" :img.sync="master"></echarts>
        </div><!--theme="infographic"-->
        <div class="chart percentBar"   :loading="sentimentChartLoading" >
            <echarts :options="sentimentChartOption" initOptions="sentimentChartOption" :img.sync="sub"></echarts>
        </div>
    </div>
    <!--<div class="charts"></div>-->

    <!--<list-panel :list="list" :options="options" :select-title="selectTitle" :select-value.sync="sortVal"></list-panel>-->
</template>
<style lang="less" scoped>
    @import "Sentiment.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import moment from 'moment';
    //import { list } from "../../../config/tmpData";
    import ListPanel from '../../Common/ListPanel/ListPanel.vue';
    import Echarts from '../../Common/Echarts/Echarts.vue';
    import Tabs from '../../Common/Tabs/Tabs.vue';
    import Local from "../../../local/local";
    import {Chart, Pie} from '../../../config/config';
    import * as Api from '../../../widgets/Api';


    export default{
        props: ['title', 'data', 'remove', 'master', 'sub'],
        data(){
            const common = Local().common;
            return{
                common,
                options: [{key: 'time', value: '按时间排序'}, {key: 'browser', value: '浏览数排序'}, {key: 'star', value: '点赞数排序'}],
                //list: list.time,
                sortVal: "",
                x: [],
                sentimentArr: ["happy", "anger", "sorrow", "disgust", "fear"],
                sentimentMap: {happy: 0, anger: 1, sorrow: 2, disgust: 3, fear: 4},
                lineData: {
                    all: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    wechat: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    weibo: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    client: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    web: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    overseas: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    }
                },

                sentimentBarLoading: true,
                sentimentBarOption:{
                    isToggle: true,
                    title: _.extend({}, Chart.title, { show: false}),
                    tooltip: _.extend({}, Chart.tooltip, {
                        axisPointer : {
                            type : 'line',
                        }
                    }),
                    legend: {
                        data:[common.happy,common.anger,common.sorrow,common.disgust,common.fear]
                    },
                    dataZoom: _.extend({}, Chart.dataZoom),
                    color:_.extend( Chart.color, {}),
                    grid: _.extend({}, Chart.grid, {
                        bottom: '40rem',
                    }),
                    toolbox: _.extend({}, Chart.toolbox),
                    xAxis: _.extend({}, Chart.xAxis, {
                        type : 'category',  //category
                        data: [],
                        boundaryGap : false
                    }),
                    yAxis: _.extend({}, Chart.yAxis, {
                        type : 'value',
                        boundaryGap : false
                    }),
                    progressive: 4,
                    textStyle: Chart.textStyle,
                    series : [{
                        name:common.happy,
                        type:'line',
                        //areaStyle: {normal: {}},
                        stack: 'Total',
                        data: []
                    }, {
                        name:common.anger,
                        type:'line',
                        //areaStyle: {normal: {}},
                        stack: 'Total',
                        data: []
                    }, {
                        name:common.sorrow,
                        type:'line',
                        //areaStyle: {normal: {}},
                        stack: 'Total',
                        data: []
                    }, {
                        name:common.disgust,
                        type:'line',
                        //areaStyle: {normal: {}},
                        stack: 'Total',
                        data: []
                    }, {
                        name:common.fear,
                        type:'line',
                        //areaStyle: {normal: {}},
                        stack: 'Total',
                        data: []
                    }]
                },


                sentimentChartLoading: true,
                sentimentChartOption: {
                    tooltip: _.extend({}, Chart.tooltip, {}),
                    legend: {
                        data: [common.happy, common.anger, common.sorrow, common.disgust, common.fear]
                    },
                    grid: _.extend({}, Chart.grid),
                    toolbox: _.extend({}, Chart.toolbox, {
                        feature: {
                            saveAsImage: {}
                        }
                    }),
                    progressive: 4,
                    textStyle: Chart.textStyle,
                    xAxis: _.extend({}, Chart.xAxis, {
                        type: 'value',
//                        interval: 10,
//                        axisLabel: {
//                            formatter: '{value}%'
//                        }
                    }),
                    yAxis: _.extend({}, Chart.yAxis, {
                        type: 'category',
                        data: ['微信', '微博', '网页', '客户端', '海外']
                    }),
                    color: _.extend([], Chart.color),
                    series: [
                        {
                            name: common.happy,
                            type: 'bar',
                            stack: '总量',
                            data: []
                        }, {
                            name: common.anger,
                            type: 'bar',
                            stack: '总量',
                            data: []
                        }, {
                            name: common.sorrow,
                            type: 'bar',
                            stack: '总量',
                            data: []
                        }, {
                            name: common.disgust,
                            type: 'bar',
                            stack: '总量',
                            data: []
                        }, {
                            name: common.fear,
                            type: 'bar',
                            stack: '总量',
                            data: []
                        }
                    ]
                }
            }
        },
        methods: {
            actions(val, idx){
                let source = "";
                switch(idx){
                    case 0:
                        source = 'all';
                        break;
                    case 1:
                        source = 'wechat';
                        break;
                    case 2:
                        source = 'weibo';
                        break;
                    case 3:
                        source = 'client';
                        break;
                    case 4:
                        source = 'web';
                        break;
                    case 5:
                        source = 'overseas';
                        break;
                    default:
                        break;
                }
                _.each(this.lineData[source], (value, key) => {
                    this.sentimentBarOption.series[this.sentimentMap[key]].data = value;
                });
            },
            getSentimentDetail(){
                const subtopic = this.data.subtopic,
                        topic_id = this.data.topic_id,
                        source = this.data.source,
                        time_interval = this.data.time_interval,
                        //time_dimension = this.data.time_dimension,
                        time_dimension = time_interval > 7 ? 1 : 0,
                        start = moment().subtract(time_interval, 'days').format('YYYY-MM-DD'),
                        end = moment().format('YYYY-MM-DD'),
                        topic = this.data.topic;
                Api.getSentimentDetail({ subtopic, topic_id, source, time_dimension, start, end, topic }).then(resp => {
                    //console.log("getSentimentDetail", JSON.stringify(resp.data.data));
                    if(resp.data.code == 0){
                        const details = resp.data.data;
                        this.x = _.map(details, detail => detail.date);
                        const _this = this;
                        //console.log("xxxx", this.x);
                        let all = {happy: [], anger:[], sorrow:[], disgust:[], fear:[]};
                        _.each(details, (detail, index) => {
                            _.each(detail.values, (value, key) => {
                                this.lineData[key].happy.push(detail.values[key].happy);
                                this.lineData[key].anger.push(detail.values[key].anger);
                                this.lineData[key].sorrow.push(detail.values[key].sorrow);
                                this.lineData[key].disgust.push(detail.values[key].disgust);
                                this.lineData[key].fear.push(detail.values[key].fear);
                            });
                            all.happy.push(_this.lineData.wechat.happy[index] + _this.lineData.weibo.happy[index] + _this.lineData.client.happy[index] + _this.lineData.web.happy[index] + _this.lineData.overseas.happy[index]);
                            all.anger.push(this.lineData.wechat.anger[index] + this.lineData.weibo.anger[index] + this.lineData.client.anger[index] + this.lineData.web.anger[index] + this.lineData.overseas.anger[index]);
                            all.sorrow.push(this.lineData.wechat.sorrow[index] + this.lineData.weibo.sorrow[index] + this.lineData.client.sorrow[index] + this.lineData.web.sorrow[index] + this.lineData.overseas.sorrow[index]);
                            all.disgust.push(this.lineData.wechat.disgust[index] + this.lineData.weibo.disgust[index] + this.lineData.client.disgust[index] + this.lineData.web.disgust[index] + this.lineData.overseas.disgust[index]);
                            all.fear.push(this.lineData.wechat.fear[index] + this.lineData.weibo.fear[index] + this.lineData.client.fear[index] + this.lineData.web.fear[index] + this.lineData.overseas.fear[index]);
                        });
                        this.lineData.all = all;
                        //console.log(this.lineData);

                        this.sentimentBarLoading = false;
                        this.sentimentChartLoading = false;
                        this.sentimentBarOption.xAxis.data = this.x;

                        this.actions("", 0);

                        _.each(this.sentimentChartOption.series, function(value, index){
                            _.each(this.lineData, function(val, key){
                                if(key == "all") return;
                                const summary = _.reduce(this.lineData[key][this.sentimentArr[index]], (memo, val) => {
                                    return memo + val;
                                }, 0);
                                this.sentimentChartOption.series[index].data.push(summary);
                            }.bind(this));
                        }.bind(this));
                    }

                });
            },
            deleteItem(){
                const detail = this.data;
                this.remove(detail, 'sentiment');
            },
            init(){
                this.getSentimentDetail();
            }
        },
        watch: {
            sortVal: {
                handler(val, oldVal){
                    if(val != oldVal){
                        // 展示不同的列表信息
                        //console.log(val, oldVal);
                        //this.list = list[val.key];
                    }
                }
            }
        },
        components:{
            Tabs, ListPanel, Echarts
        },
        ready(){
            this.init();
        }
    }
</script>
