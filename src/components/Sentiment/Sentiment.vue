<template>
    <span>Sentiment</span>
    <div class="charts">
        <div class="chart" v-echarts="sentimentChartOption" :loading="sentimentChartLoading" ></div>
    </div>
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
            return{
                sentimentChartLoading: false,
                sentimentChartOption: {
                    tooltip: _.extend({}, Chart.tooltip, {}),
                    legend: {
                        data: ['Happy', 'Anger', 'Sorrow', 'Disgust', 'Fear']
                    },
                    grid: _.extend({}, Chart.grid, {}),
                    toolbox: _.extend(Chart.toolbox, {
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
                    color:_.extend( Chart.color, {}),
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
//                                    color(value){
//                                        if(params.series.data[params.dataIndex] != null && params.series.data[params.dataIndex].color != undefined)
//                                        {
//                                            return params.series.data[params.dataIndex].color;
//                                        }else
//                                        {
//                                            return params.series.color;
//                                        }
//                                    }
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
                }
            }
        },
        components:{

        }
    }
</script>
