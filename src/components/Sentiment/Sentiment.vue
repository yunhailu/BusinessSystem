<template>
    <span>Sentiment</span>
    <div class="charts">
        <div class="chart percentBar" v-echarts="sentimentChartOption" :loading="sentimentChartLoading" ></div>
        <div class="chart timeBar" v-echarts="sentimentBarOption" :loading="sentimentBarLoading" theme="infographic"></div>
    </div>
    <!--<div class="charts"></div>-->
</template>
<style lang="less" scoped>
    @import "Sentiment.less";
</style>
<script>
    import _ from 'underscore';
    import Local from "../../local/local";
    import {Chart, Pie} from '../../config/config';

    export default{
        data(){
            const data = {
                happy: [1,4,0,6,1,1,0,0,0,1,0,1,4,0,4,3,0,0,4,1,9,4,0,1,0,0,1,1,1,1,3,1,1,4,0,3,4,3,1,1,1,0,0,0,1,6,1,1,1,3,1,4,3,4,1,0,0,1,3,0,0,1,1,1,1,0,1,0,3,0,0,12,8,3,4,6,0,4,0,3,1,1,0,1,1,1,1,4,1,4,0,9,8,4,1,0,0,1,3,1,4,1,1,1,3,1,1,3,16,0,0,0,4,3,1,0,0,1,0,1,3],
                anger: [1,4,6,21,4,1,6,4,1,0,0,0,0,3,6,4,3,1,9,3,11,0,1,0,11,4,0,1,0,0,27,3,6,3,4,0,11,4,3,1,0,1,1,8,3,1,6,0,1,12,4,16,1,3,12,1,8,3,3,1,3,1,0,4,1,0,0,1,6,3,14,4,4,6,0,9,1,4,9,0,1,0,1,8,0,1,0,3,1,33,6,21,4,4,1,4,1,0,1,0,3,3,0,1,3,3,8,1,4,1,6,3,3,0,16,1,1,1,0,0,1],
                sorrow: [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0],
                disgust: [0,0,0,3,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,3,0,3,1,0,0,0,0,0,0,0,0,1,0,0,0,1,3,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,1,1,0,0,3,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,1,1,0,0,0,3,1,0,1,0,0,0,0,0,0,0,0,1,1,0,0],
                fear: [0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,3,0,1,0,0,0,0,0,0,1,1,0,0,0,0,1,0,1,0,0,1,4,0,0,0,0,0,0,0,0,0,0,0,1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0]
            };
            return{
                sentimentChartLoading: false,
                sentimentChartOption: {
                    tooltip: _.extend({}, Chart.tooltip, {}),
                    legend: {
                        data: ['Happy', 'Anger', 'Sorrow', 'Disgust', 'Fear']
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
                        interval: 10,
                        axisLabel: {
                            formatter: '{value}%'
                        }
                    }),
                    yAxis: _.extend({}, Chart.yAxis, {
                        type: 'category',
                        data: ['微信', '微博', '网页', '客户端']
                    }),
                    color: _.extend([], Chart.color),
                    series: [
                        {
                            name: 'Happy',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            itemStyle: {
                                normal: {

                                }
                            },
                            data: [25, 50, 10, 15]
                        },
                        {
                            name: 'Anger',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [25, 5, 10, 10]
                        },
                        {
                            name: 'Sorrow',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [10, 10, 20, 35]
                        },
                        {
                            name: 'Disgust',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [35, 15, 50, 40]
                        },
                        {
                            name: 'Fear',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [5, 20, 10, 0]
                        }
                    ]
                },

                sentimentBarLoading: false,
                sentimentBarOption:{
                    isToggle: true,
                    title: _.extend({}, Chart.title, { show: false}),
                    tooltip: _.extend({}, Chart.tooltip, {}),
                    legend: {
                        data:['Happy','Anger','Sorrow','Disgust','Fear']
                    },
                    dataZoom: _.extend({}, Chart.dataZoom),
                    //color:_.extend( Chart.color, {}),
                    grid: _.extend({}, Chart.grid, {
                        bottom: '40rem',
                    }),
                    toolbox: _.extend({}, Chart.toolbox),
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
                    series : [{
                        name:'Happy',
                        type:'bar',
                        areaStyle: {normal: {}},
                        stack: 'Total',
                        data: data.happy
                    }, {
                        name:'Anger',
                        type:'bar',
                        areaStyle: {normal: {}},
                        stack: 'Total',
                        data: data.anger
                    }, {
                        name:'Sorrow',
                        type:'bar',
                        areaStyle: {normal: {}},
                        stack: 'Total',
                        data: data.sorrow
                    }, {
                        name:'Disgust',
                        type:'bar',
                        areaStyle: {normal: {}},
                        stack: 'Total',
                        data: data.disgust
                    }, {
                        name:'Fear',
                        type:'bar',
                        areaStyle: {normal: {}},
                        stack: 'Total',
                        data: data.fear
                    }]
                }
            }
        },
        components:{

        }
    }
</script>
