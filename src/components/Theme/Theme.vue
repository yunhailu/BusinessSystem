<template>
    <tabs :datas="themeNums"></tabs>
    <!--<span>Theme</span>-->
    <div class="theme-word">
        <div class="theme-word-chart" v-echarts="themeWordOption" :loading="themeWordLoading"  theme="infographic" :click="clickAction"></div>
        <div class="theme-word-ranking">
            <dl class="list up-list">
                <dt class="list-title">排名变化</dt>
                <dd v-for="item in trendList" class="list-item up-list-item">
                    <div :id="item.id">
                        <i class="fa fa-level-up" v-if="item.trend == 'up'"></i>
                        <i class="fa fa-level-down" v-if="item.trend == 'down'"></i>
                        <span class="list-item-con">{{item.name}} - {{item.rate}}</span>
                    </div>
                </dd>
            </dl>
            <!--<dl class="list up-list">-->
                <!--<dt class="list-title">UP</dt>-->
                <!--<dd v-for="item in upList" class="list-item up-list-item">-->
                    <!--<div :id="item.id">-->
                        <!--<i class="fa fa-level-up"></i>-->
                        <!--<span class="list-item-con">{{item.rate}} - {{item.name}}</span>-->
                    <!--</div>-->
                <!--</dd>-->
            <!--</dl>-->
            <!--<dl class="list down-list">-->
                <!--<dt class="list-title">DOWN</dt>-->
                <!--<dd v-for="item in downList" class="list-item down-list-item">-->
                    <!--<div :id="item.id">-->
                        <!--<i class="fa fa-level-down"></i>-->
                        <!--<span class="list-item-con">{{item.rate}} - {{item.name}}</span>-->
                    <!--</div>-->
                <!--</dd>-->
            <!--</dl>-->
        </div>
    </div>
    <div class="theme-chart">
        <div class="chart"  v-echarts="themeScatterOption" :loading="themeScatterLoading"  theme="macarons"></div>
        <div class="chart"  v-echarts="themeLineOption" :loading="themeLineLoading"  theme="macarons"></div>
        <div class="chart best"  v-echarts="themeBestOption" :loading="themeBestLoading"  theme="macarons"></div>
    </div>
</template>
<style lang="less" scoped>
    @import "Theme.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import Tabs from '../Common/Tabs/Tabs.vue';
    import Local from "../../local/local";
    import { Chart, Pie } from '../../config/config';
    import { themeScatterData } from '../../config/tmpData';
    import * as Api from '../../widgets/Api';
    import { analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsStart, analyticsEnd, activeAnalyticsTopic } from '../../vuex/getters';

    export default{
        data(){
            const words = Local().theme;
            return{
                words,
                themeWordLoading: true,
                themeWordOption: {
                    tooltip: {},
                    series: {
                        //grid: {x:0, x2:0},
                        type: 'wordCloud',
                        gridSize: 14,
                        sizeRange: [12, 50],
                        rotationRange: [-90, 90],
                        shape: 'circle',
                        width: '95%',
                        height: '90%',
                        textPadding: 6,
                        textStyle: {
                            normal: {
                                color: function () {
                                    return 'rgb(' + [
                                                Math.round(Math.random() * 160 + 50),
                                                Math.round(Math.random() * 160 + 50),
                                                Math.round(Math.random() * 160 + 50)
                                            ].join(',') + ')';
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        data: []
                    }
                },

                upList: [],

                downList: [],

                trendList: [],

                themeScatterOption: {
                    legend: _.extend({}, Chart.legend, {
                        y: 'top',
                        data: ['南海问题', '每日关注', '货币战争', '网易新闻', '阿里影业'],
                        textStyle: {
                            //color: '#fff',
//                            fontSize: 16
                        }
                    }),
                    tooltip: _.extend({}, Chart.tooltip, {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        formatter: function (obj) {
                            var value = obj.value;
                            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                                    + obj.seriesName
                                    + '</div>'
                                    + '转发数：' + value[1] + '<br>'
                                    + '点赞数：' + value[2] + '<br>'
                                    + '评论数：' + value[5] + '<br>';
                        }
                    }),
                    textStyle: _.extend({}, Chart.textStyle),
                    visualMap: [
                        {
                            right: '0%',
                            top: '10%',
                            dimension: 2,
                            min: 0,
                            max: 300,
                            itemWidth: 30,
                            itemHeight: 120,
                            calculable: true,
                            precision: 0.1,
                            text: ['圆形大小：文章转发数'],
                            textGap: 30,
//                            textStyle: {
//                                color: '#fff'
//                            },
                            inRange: {
                                symbolSize: [10, 70]
                            },
                            outOfRange: {
                                symbolSize: [10, 70],
                                color: ['rgba(50,50,50,.2)']
                            },
                            controller: {
                                inRange: {
                                    color: ['#aeaeae']
                                },
                                outOfRange: {
                                    color: ['#444']
                                }
                            }
                        }
                    ],
                    grid: _.extend({}, Chart.grid, {
                        right: '10%'
                    }),
                    xAxis:  _.extend({}, Chart.xAxis, {
                        type : 'category',  //category
                        data : ["2016-08-21:12","2016-08-21:14","2016-08-21:15","2016-08-21:16","2016-08-21:17","2016-08-21:18","2016-08-21:20","2016-08-21:22","2016-08-22:00","2016-08-22:03","2016-08-22:05","2016-08-22:06","2016-08-22:08","2016-08-22:09","2016-08-22:10","2016-08-22:11","2016-08-22:12","2016-08-22:13","2016-08-22:14","2016-08-22:15","2016-08-22:16","2016-08-22:17","2016-08-22:18","2016-08-22:19","2016-08-22:20","2016-08-22:21","2016-08-22:22","2016-08-23:00","2016-08-23:03","2016-08-23:06","2016-08-23:08","2016-08-23:09","2016-08-23:10","2016-08-23:11","2016-08-23:12","2016-08-23:13","2016-08-23:14","2016-08-23:15","2016-08-23:16","2016-08-23:17","2016-08-23:18","2016-08-23:19","2016-08-23:20","2016-08-23:22","2016-08-23:23","2016-08-24:00","2016-08-24:01","2016-08-24:06","2016-08-24:07","2016-08-24:08","2016-08-24:09","2016-08-24:10","2016-08-24:11","2016-08-24:12","2016-08-24:14","2016-08-24:15","2016-08-24:16","2016-08-24:17","2016-08-24:18","2016-08-24:20","2016-08-24:21","2016-08-24:22","2016-08-25:00","2016-08-25:02","2016-08-25:03","2016-08-25:05","2016-08-25:06","2016-08-25:07","2016-08-25:08","2016-08-25:09","2016-08-25:10","2016-08-25:11","2016-08-25:12","2016-08-25:14","2016-08-25:15","2016-08-25:16","2016-08-25:17","2016-08-25:18","2016-08-25:19","2016-08-25:20","2016-08-25:21","2016-08-25:22","2016-08-25:23","2016-08-26:00","2016-08-26:01","2016-08-26:06","2016-08-26:07","2016-08-26:08","2016-08-26:09","2016-08-26:10","2016-08-26:11","2016-08-26:12","2016-08-26:13","2016-08-26:14","2016-08-26:15","2016-08-26:16","2016-08-26:17","2016-08-26:18","2016-08-26:22","2016-08-26:23","2016-08-27:00","2016-08-27:01","2016-08-27:02","2016-08-27:06","2016-08-27:08","2016-08-27:09","2016-08-27:10","2016-08-27:11","2016-08-27:12","2016-08-27:13","2016-08-27:14","2016-08-27:15","2016-08-27:16","2016-08-27:17","2016-08-27:18","2016-08-27:19","2016-08-27:20","2016-08-28:00","2016-08-28:01","2016-08-28:06","2016-08-28:08"],
                        //type: 'value',
                        name: '日期',
                        nameGap: 16,
                        nameTextStyle: {
                            fontSize: 14
                        },
                        max: 31,
                        splitLine: {
                            show: false
                        },
//                        axisLine: {
//                            lineStyle: {
//                                color: '#eee'
//                            }
//                        }
                    }),
                    yAxis: _.extend({}, Chart.yAxis, {
                        type: 'value',
                        name: '文章数量',
                        nameLocation: 'end',
                        nameGap: 20,
                        splitLine: {
                            show: false
                        }
                    }),
                    series: [
                        {
                            name: '南海问题',
                            type: 'scatter',
                            itemStyle: {
                                normal: {
                                    opacity: 0.8,
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                                }
                            },
                            data: themeScatterData.dataBJ
                        }, {
                            name: '每日关注',
                            type: 'scatter',
                            itemStyle: {
                                normal: {
                                    opacity: 0.8,
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                                }
                            },
                            data: themeScatterData.dataSH
                        }, {
                            name: '货币战争',
                            type: 'scatter',
                            itemStyle: {
                                normal: {
                                    opacity: 0.8,
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                                }
                            },
                            data: themeScatterData.dataGZ
                        },{
                            name: '网易新闻',
                            type: 'scatter',
                            itemStyle: {
                                normal: {
                                    opacity: 0.8,
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                                }
                            },
                            data: themeScatterData.dataWeb
                        }, {
                            name: '阿里影业',
                            type: 'scatter',
                            itemStyle: {
                                normal: {
                                    opacity: 0.8,
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                                }
                            },
                            data: themeScatterData.dataClient
                        }
                    ]
                },
                themeScatterLoading: false,

                themeBestOption: {
                    title: _.extend({}, Chart.title, {text: words.topics, left: 10, top: 20}),
                    tooltip: _.extend({}, Chart.tooltip),
//                    legend: {
//                        data: ['话题排行']
//                    },
                    grid: _.extend({}, Chart.grid),
                    textStyle: _.extend({}, Chart.textStyle),
                    xAxis: _.extend({}, Chart.xAxis, { type: 'value' }),
                    yAxis: _.extend({}, Chart.yAxis, {
                        type: 'category',
                        data: []
                    }),
                    series: [
                        {
                            name: words.topics,
                            type: 'bar',
                            stack: 'Total',
                            itemStyle: {
                                normal: {
                                    color: function(params){
                                        let colorList = _.extend([], Chart.color3).reverse();
                                        if(colorList.length < 20){
                                            colorList = colorList.concat(colorList);
                                        }
                                        return colorList[params.dataIndex]
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    textStyle: {fontWeight: 'lighter', fontSize: 10},
                                    lineHeight: 12
                                }
                            },
                            data: []
                        }
                    ]
                },
                themeBestLoading: true,

                themeLineOption: {
                    title: _.extend({}, Chart.title, { show: false}),
                    tooltip: _.extend({}, Chart.tooltip, {
                        axisPointer : {
                            type : 'line'
                        }
                    }),
                    //color: _.extend([], Chart.color),
                    //backgroundColor: '#f9f9f9',
                    legend: {
                        data:[]
                    },
                    dataZoom: _.extend({}, Chart.dataZoom),
                    grid: _.extend({}, Chart.grid, {
                        bottom: '40rem',
                    }),
                    toolbox: _.extend({}, Chart.toolbox, {
                        feature: {
                            saveAsImage: {}
                        }
                    }),
                    xAxis: _.extend({}, Chart.xAxis, {
                        type : 'category',  //category
                        data : ["2016-08-21:12","2016-08-21:14","2016-08-21:15","2016-08-21:16","2016-08-21:17","2016-08-21:18","2016-08-21:20","2016-08-21:21","2016-08-22:00","2016-08-22:03","2016-08-22:05","2016-08-22:06","2016-08-22:08","2016-08-22:09","2016-08-22:10","2016-08-22:11","2016-08-22:12","2016-08-22:13","2016-08-22:14","2016-08-22:15","2016-08-22:16","2016-08-22:17","2016-08-22:18","2016-08-22:19","2016-08-22:20","2016-08-22:21","2016-08-22:22","2016-08-23:00","2016-08-23:03","2016-08-23:06","2016-08-23:08","2016-08-23:09","2016-08-23:10","2016-08-23:11","2016-08-23:12","2016-08-23:13","2016-08-23:14","2016-08-23:15","2016-08-23:16","2016-08-23:17","2016-08-23:18","2016-08-23:19","2016-08-23:20","2016-08-23:22","2016-08-23:23","2016-08-24:00","2016-08-24:01","2016-08-24:06","2016-08-24:07","2016-08-24:08","2016-08-24:09","2016-08-24:10","2016-08-24:11","2016-08-24:12","2016-08-24:14","2016-08-24:15","2016-08-24:16","2016-08-24:17","2016-08-24:18","2016-08-24:20","2016-08-24:21","2016-08-24:22","2016-08-25:00","2016-08-25:02","2016-08-25:03","2016-08-25:05","2016-08-25:06","2016-08-25:07","2016-08-25:08","2016-08-25:09","2016-08-25:10","2016-08-25:11","2016-08-25:12","2016-08-25:14","2016-08-25:15","2016-08-25:16","2016-08-25:17","2016-08-25:18","2016-08-25:19","2016-08-25:20","2016-08-25:21","2016-08-25:22","2016-08-25:23","2016-08-26:00","2016-08-26:01","2016-08-26:06","2016-08-26:07","2016-08-26:08","2016-08-26:09","2016-08-26:10","2016-08-26:11","2016-08-26:12","2016-08-26:13","2016-08-26:14","2016-08-26:15","2016-08-26:16","2016-08-26:17","2016-08-26:18","2016-08-26:22","2016-08-26:23","2016-08-27:00","2016-08-27:01","2016-08-27:02","2016-08-27:06","2016-08-27:08","2016-08-27:09","2016-08-27:10","2016-08-27:11","2016-08-27:12","2016-08-27:13","2016-08-27:14","2016-08-27:15","2016-08-27:16","2016-08-27:17","2016-08-27:18","2016-08-27:19","2016-08-27:20","2016-08-28:00","2016-08-28:01","2016-08-28:06","2016-08-28:08"],
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
                themeLineLoading: true,

                themeNums: [0,0,0,0,0,0]
            }
        },
        vuex: {
            getters: {analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsStart, analyticsEnd, activeAnalyticsTopic}
        },
        watch: {
            activeAnalyticsTopic: {
                handler(val){
                    this.themeBestLoading = true;
                    this.themeLineLoading = true;
                    this.themeWordLoading = true;
                    this.init(val);
                }
            }
        },
        ready(){
            if(this.activeAnalyticsTopic && this.activeAnalyticsTopic.topic_id){
                this.init();
            }
        },
        methods: {
            clickAction(e){
                console.log(e);
                alert(e.name + ": " + e.value);
            },
            getTrendList(){
                const topic_id = this.activeAnalyticsTopic.topic_id,
                    topic = this.activeAnalyticsTopic.topic_name,
                    subtopic = this.analyticsSubTopic,
                    source = this.analyticsSource,
                    time_interval = this.analyticsTimeRange,
                    time_dimension = time_interval > 7 ? 1 : 0,
                    end = this.analyticsEnd,
                    start = this.analyticsStart;
                return Api.getTrendList({topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    //console.log('getTrendList', resp);
                    if(resp.data.code == 0){
                        this.trendList = resp.data.data;
//                        this.upList = resp.data.data.up;
//                        this.downList = resp.data.data.down;
                    }
                });
            },
            getWordCloud(){
                const topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0,
                        end = this.analyticsEnd,
                        start = this.analyticsStart;
                return Api.getWordCloud({topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    //console.log('getWordCloud',resp);
                    if(resp.data.code == 0){
                        this.themeWordLoading = false;
                        this.themeWordOption.series.data = resp.data.data;
                    }
                });
            },
            getThemeBest(){
                const topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0,
                        end = this.analyticsEnd,
                        start = this.analyticsStart;
                return Api.getThemeBest({topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    //console.log('getThemeBest',resp);
                    if(resp.data.code == 0){
                        const bestList = _.sortBy(resp.data.data, 'value');
                        const yAxis = _.map(bestList, value => value.name);
                        const data = _.map(bestList, value => value.value);
                        this.themeBestLoading = false;
                        this.themeBestOption.yAxis.data = yAxis;
                        this.themeBestOption.series[0].data = data;
                    }
                });
            },
            getThemeDetail(){
                const topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0,
                        end = this.analyticsEnd,
                        start = this.analyticsStart;
                Api.getThemeDetail({topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    //console.log('getThemeDetail', resp.data);
                    if(resp.data.code == 0){
                        const details = resp.data.data;
                        this.themeLineLoading = false;
                        this.themeLineOption.xAxis.data = _.map(details, detail => detail.date);
                        this.themeLineOption.legend.data = _.map(details[0].values, item => item.name);
                        this.themeLineOption.series = _.map(this.themeLineOption.legend.data, legend => {
                            const data = _.chain(details)
                                    .map(detail => (_.filter(detail.values, value => (value.name == legend))[0]))
                                    .map(item => item.value).value();
                            return ({
                                name: legend,
                                type:'line',
                                data
                            });
                        });
                    }
                });
            },
            init(){
                this.getTrendList();
                this.getWordCloud();
                this.getThemeBest();
                this.getThemeDetail();
            }
        },
        created(){
//            this.markImage.onload = function () {
//                const option = this.themeWordOption.maskImage;
//                this.themeWordOption.maskImage = this.maskImage;
//            }
//            this.markImage.src = "../../../images/search.png";
        },
        components:{
            Tabs
        },
//        route: {
//            data(){
//                this.init();
//            }
//        }
    }
</script>
