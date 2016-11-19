<template>
    <!--<tabs></tabs>-->
    <!--<span>Theme</span>-->
    <div class="panel-title">
        <span class="panel-title-text">{{title}}</span>
        <div class="panel-title-delete" @click="deleteItem();"><i class="fa fa-minus"></i></div>
    </div>
    <div class="theme-word">
        <!--<div class="theme-word-chart" v-echarts="themeWordOption" :loading="themeWordLoading"  theme="infographic" :click="clickAction"></div>-->
        <div class="theme-word-chart">
            <echarts :options="themeWordOption" initOptions="themeWordOption" :img.sync="wordcloud" theme="infographic"></echarts>
        </div>
        <!--修改1行-->
        <!--<div class="theme-word-chart" v-echarts="themeWordOption" :loading="themeWordLoading"  theme="infographic">-->
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
        </div>
    </div>
    <div class="theme-chart">
        <!--<div class="chart"  v-echarts="themeScatterOption" :loading="themeScatterLoading"  theme="macarons"></div>-->

        <!--<div class="chart"  v-echarts="themeLineOption" :loading="themeLineLoading"  theme="macarons"></div>-->
        <!--<div class="chart best"  v-echarts="themeBestOption" :loading="themeBestLoading"  theme="macarons"></div>-->

        <div class="chart">
            <echarts :options="themeScatterOption" initOptions="themeScatterOption" :img.sync="scatter" theme="macarons"></echarts>
        </div>
        <div class="chart">
            <echarts :options="themeLineOption" initOptions="themeLineOption" :img.sync="bar" theme="macarons"></echarts>
        </div>
        <div class="chart best">
            <echarts :options="themeBestOption" initOptions="themeBestOption" :img.sync="top" theme="macarons"></echarts>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "Theme.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import moment from 'moment';
    import Tabs from '../../Common/Tabs/Tabs.vue';
    import Echarts from '../../Common/Echarts/Echarts.vue';
    import Local from "../../../local/local";
    import { Chart, Pie } from '../../../config/config';
    import { themeScatterData } from '../../../config/tmpData';
    import * as Api from '../../../widgets/Api';
    import { insertExportImages, removeExportImages } from "../../../vuex/actions";
    import { exportImages } from '../../../vuex/getters'

    export default{
        props: ['title', 'data', 'remove', 'wordcloud', 'bar', 'top'],
        vuex: {
            actions: { insertExportImages, removeExportImages },
            getters: { exportImages }
        },
        watch:{
            bar:{
                handler(value){
                    this.insertExportImages({
                        topic: this.data.topic,
                        topic_id: this.data.topic_id,
                        key: "theme_trend",
                        value
                    });
                }
            },
            scatter:{
                handler(value){
                    this.insertExportImages({
                        topic: this.data.topic,
                        topic_id: this.data.topic_id,
                        key: "theme_scatter",
                        value
                    });
                }
            },
            top:{
                handler(value){
                    this.insertExportImages({
                        topic: this.data.topic,
                        topic_id: this.data.topic_id,
                        key: "theme_top",
                        value
                    });
                }
            },
            wordcloud:{
                handler(value){
                    this.insertExportImages({
                        topic: this.data.topic,
                        topic_id: this.data.topic_id,
                        key: "theme_wordcloud",
                        value
                    });
                }
            }
        },
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
                        animation:false,
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

                themeScatterOption: {
                    legend: _.extend({}, Chart.legend, {
                        y: 'top',
                        data: ['南海问题', '每日关注', '货币战争', '网易新闻', '阿里影业'],
                        textStyle: {
                            //color: '#fff',
//                            fontSize: 16
                        }
                    }),
                    animation:false,
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
                    animation:false,
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
                themeLineLoading: true
            }
        },
        methods: {
            //动态气泡图--->
            getBubblChart(){
                const topic_id = this.data.topic_id,
                        end='2016-11-15',
                        start='2016-11-11';
                //end = this.analyticsEnd,
                //start = this.analyticsStart;
                Api.getBubblChart({topic_id,start,end}).then(resp => {
                    //console.log('13',resp.data);
                    if(resp.data.code == 0){
                        console.log('12',resp.data.data);
                        //console.log('12',resp.data.data[0]);
                        const yuy =_.keys(resp.data.data);
                        this.themeScatterOption.legend.data=yuy;
                        // console.log('话题',yuy);
                        //console.log('话题',yuy[0]);
                        this.themeScatterOption.series[0].name=yuy[0];
                        this.themeScatterOption.series[1].name=yuy[1];
                        this.themeScatterOption.series[2].name=yuy[2];
                        this.themeScatterOption.series[3].name=yuy[3];
                        this.themeScatterOption.series[4].name=yuy[4];

                        const yuy0 =_.values(resp.data.data);
                        const datearr1 = _.pluck(yuy0[0],'date');
                        const datearr2 = _.pluck(yuy0[1],'date');
                        const datearr3 = _.pluck(yuy0[2],'date');
                        const datearr4 = _.pluck(yuy0[3],'date');
                        const datearr5 = _.pluck(yuy0[4],'date');

                        const sizedate=[];
                        sizedate.push(_.size(datearr1));
                        sizedate.push(_.size(datearr2));
                        sizedate.push(_.size(datearr3));
                        sizedate.push(_.size(datearr4));
                        sizedate.push(_.size(datearr5));

                        const uye=_.max(sizedate);
                        console.log('sizedate',sizedate);


                        if(_.size(datearr1)==uye){
                            this.themeScatterOption.xAxis.data=datearr1;

                        }else if(_.size(datearr2)==uye)
                        {
                            this.themeScatterOption.xAxis.data=datearr2;

                        }else if(_.size(datearr3)==uye){
                            this.themeScatterOption.xAxis.data=datearr3;

                        }else if(_.size(datearr4)==uye){
                            this.themeScatterOption.xAxis.data=datearr4;

                        }else if(_.size(datearr5)==uye)
                        {
                            this.themeScatterOption.xAxis.data=datearr5;

                        }
                        //console.log('数据',yuy0); //数据组的所有数据
                        const dataOne=yuy0[0];
                        const dataTwue=yuy0[1];
                        const dataThree=yuy0[2];
                        const dataFour=yuy0[3];
                        const dataFire=yuy0[4];
                        //console.log('dataOne:',dataOne);
                        const result0 = [];
                        for(var i=0; i < dataOne.length; i++) {
                            dataOne[i]=_.omit(dataOne[i],'date');
                            dataOne[i]=_.pick(dataOne[i],'count','share','like','comment','view');
                            dataOne[i][0]=i+1;
                            result0.push(_.values(dataOne[i]));
                        };
                        const result1 = [];
                        for(var i=0; i < dataTwue.length; i++) {
                            dataTwue[i]=_.omit(dataTwue[i],'date');
                            dataTwue[i]=_.pick(dataTwue[i],'count','share','like','comment','view');
                            dataTwue[i][0]=i+1
                            result1.push(_.values(dataTwue[i]));
                        };
                        const result2 = [];
                        for(var i=0; i < dataThree.length; i++) {
                            dataThree[i]=_.omit(dataThree[i],'date');
                            dataThree[i]=_.pick(dataThree[i],'count','share','like','comment','view');
                            dataThree[i][0]=i+1
                            result2.push(_.values(dataThree[i]));
                        };
                        const result3 = [];
                        for(var i=0; i < dataFour.length; i++) {
                            dataFour[i]=_.omit(dataFour[i],'date');
                            dataFour[i]=_.pick(dataFour[i],'count','share','like','comment','view');
                            dataFour[i][0]=i+1
                            result3.push(_.values(dataFour[i]));
                        };
                        const result4 = [];
                        for(var i=0; i < dataFire.length; i++) {
                            dataFire[i]=_.omit(dataFire[i],'date');
                            dataFire[i]=_.pick(dataFire[i],'count','share','like','comment','view');
                            dataFire[i][0]=i+1
                            result4.push(_.values(dataFire[i]));
                        };
                        //   console.log('result1',result1);
                        //  console.log('result2',result2);
                        //console.log('result3',result3);
                        //console.log('result4',result4);
                        this.themeScatterOption.series[0].data=result0;
                        this.themeScatterOption.series[1].data=result1;
                        this.themeScatterOption.series[2].data=result2;
                        this.themeScatterOption.series[3].data=result3;
                        this.themeScatterOption.series[4].data=result4;
                        const uiy=_.omit(yuy0[0],'date');
                        console.log('数组0',uiy);
                        console.log('数组1',yuy0[0]);
                        console.log('数组2',yuy0[1]);
                        console.log('数组3',yuy0[2]);
                        console.log('数组4',yuy0[3]);
                        console.log('数组5',yuy0[4]);
                        // const gu=_.each(yuy0[0],value,list);
                        // console.log('gu',gu);
                    }
                });
            },
            //<----
            clickAction(e){
                console.log(e);
                alert(e.name + ": " + e.value);
            },
            getTrendList(){
                const subtopic = this.data.subtopic,
                    topic_id = this.data.topic_id,
                    source = this.data.source,
                    time_interval = this.data.time_interval,
                    //time_dimension = this.data.time_dimension,
                    time_dimension = time_interval > 7 ? 1 : 0,
                    start = moment().subtract(time_interval, 'days').format('YYYY-MM-DD'),
                    end = moment().format('YYYY-MM-DD'),
                    topic = this.data.topic;
                return Api.getTrendList({topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    //console.log('getTrendList', resp);
                    if(resp.data.code == 0){
                        this.trendList = _.filter(resp.data.data, (item, index) => (index < 10));
//                        this.upList = resp.data.data.up;
//                        this.downList = resp.data.data.down;
                    }
                });
            },
            getWordCloud(){
                const subtopic = this.data.subtopic,
                        topic_id = this.data.topic_id,
                        source = this.data.source,
                        time_interval = this.data.time_interval,
                        //time_dimension = this.data.time_dimension,
                        time_dimension = time_interval > 7 ? 1 : 0,
                        start = moment().subtract(time_interval, 'days').format('YYYY-MM-DD'),
                        end = moment().format('YYYY-MM-DD'),
                        topic = this.data.topic;
                return Api.getWordCloud({ topic_id, topic, subtopic, source, start, end, time_dimension }).then(resp => {
                    //console.log('getWordCloud',resp);
                    if(resp.data.code == 0){
                        this.themeWordLoading = false;
                        this.themeWordOption.series.data = resp.data.data;

                        const bestList = _.chain(resp.data.data).filter((item, index) => (index <= 20)).sortBy('value').value();
                        const yAxis = _.map(bestList, value => value.name);
                        const data = _.map(bestList, value => value.value);
                        this.themeBestLoading = false;
                        this.themeBestOption.yAxis.data = yAxis;
                        this.themeBestOption.series[0].data = data;
                    }
                });
            },
//            getThemeBest(){
//                return Api.getThemeBest({}).then(resp => {
//                    //console.log('getThemeBest',resp);
//                    if(resp.data.code == 0){
//                        const bestList = _.sortBy(resp.data.data, 'value');
//                        const yAxis = _.map(bestList, value => value.name);
//                        const data = _.map(bestList, value => value.value);
//                        this.themeBestLoading = false;
//                        this.themeBestOption.yAxis.data = yAxis;
//                        this.themeBestOption.series[0].data = data;
//                    }
//                });
//            },
            getThemeDetail(){
                const subtopic = this.data.subtopic,
                    topic_id = this.data.topic_id,
                    source = this.data.source,
                    time_interval = this.data.time_interval,
                    //time_dimension = this.data.time_dimension,
                    time_dimension = time_interval > 7 ? 1 : 0,
                    start = moment().subtract(time_interval, 'days').format('YYYY-MM-DD'),
                    end = moment().format('YYYY-MM-DD'),
                    topic = this.data.topic;
                Api.getThemeDetail({ topic_id, topic, subtopic, source, start, end, time_dimension }).then(resp => {
                    //console.log('getThemeDetail', resp.data);
                    if(resp.data.code == 0){
                        const details = resp.data.data;
                        this.themeLineLoading = false;
                        this.themeLineOption.xAxis.data = _.map(details, detail => detail.date);
                    console.log('details',details);
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
            deleteItem(){
                const detail = this.data;
                this.remove(detail, 'theme');
            },
            init(){
                this.getBubblChart();
                this.getTrendList();
                this.getWordCloud();
                //this.getThemeBest();
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
            Tabs, Echarts
        },
        ready(){
            this.init();
        }
    }
</script>
