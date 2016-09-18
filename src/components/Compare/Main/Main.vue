<template>
    <span>Compare Panel</span>
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

    export default{
        props: [],
        data(){
            const data = {
                didi: [1,4,0,6,1,1,0,0,0,1,0,1,4,0,4,3,0,0,4,1,9,4,0,1,0,0,1,1,1,1,3,1,1,4,0,3,4,3,1,1,1,0,0,0,1,6,1,1,1,3,1,4,3,4,1,0,0,1,3,0,0,1,1,1,1,0,1,0,3,0,0,12,8,3,4,6,0,4,0,3,1,1,0,1,1,1,1,4,1,4,0,9,8,4,1,0,0,1,3,1,4,1,1,1,3,1,1,3,16,0,0,0,4,3,1,0,0,1,0,1,3],
                ubar: [1,4,6,21,4,1,6,4,1,0,0,0,0,3,6,4,3,1,9,3,11,0,1,0,11,4,0,1,0,0,27,3,6,3,4,0,11,4,3,1,0,1,1,8,3,1,6,0,1,12,4,16,1,3,12,1,8,3,3,1,3,1,0,4,1,0,0,1,6,3,14,4,4,6,0,9,1,4,9,0,1,0,1,8,0,1,0,3,1,33,6,21,4,4,1,4,1,0,1,0,3,3,0,1,3,3,8,1,4,1,6,3,3,0,16,1,1,1,0,0,1],
                yidao: [5,10,2,0,4,0,0,5,0,0,1,10,0,0,20,4,0,2,0,0,1,0,2,0,3,0,0,1,2,2,3,0,3,0,3,0,1,1,0,3,0,0,1,0,4,5,0,5,0,1,1,0,1,0,2,3,2,0,11,0,10,4,5,0,0,1,0,0,0,6,2,0,3,3,0,1,4,6,4,0,0,4,1,2,4,0,3,1,0,4,3,2,1,8,2,1,3,4,4,6,0,1,1,2,0,1,4,2,1,2,2,1,3,1,1,1,3,5,6,4,1],
                disgust: [0,0,0,3,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,3,0,3,1,0,0,0,0,0,0,0,0,1,0,0,0,1,3,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,1,1,0,0,3,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,1,1,0,0,0,3,1,0,1,0,0,0,0,0,0,0,0,1,1,0,0],
                fear: [0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,3,0,1,0,0,0,0,0,0,1,1,0,0,0,0,1,0,1,0,0,1,4,0,0,0,0,0,0,0,0,0,0,0,1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0]
            };
            const radar = {
                didi: [
                    [55,9,56,46,18,6]
                ],
                ubar: [
                    [26,37,27,63,27,13]
                ],
                yidao: [
                    [91,45,75,30,34,23]
                ]
            };
            return{
                compareChartLoading: false,
                compareChartOption: {
                    title: _.extend({}, Chart.title, { show: false}),
                    tooltip: Chart.tooltip,
                    legend: {
                        data:['滴滴','Ubar','易道']
                    },
                    grid: Chart.grid,
                    toolbox: Chart.toolbox,
                    color: _.extend([], Chart.color),
                    //color: _.extend([], ['#F9713C', '#B3E4A1', 'rgb(238, 197, 102)']),
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
                        name:'滴滴',
                        type:'bar',
                        areaStyle: {normal: {}},
                        stack: 'Total',
                        data: data.didi
                    }, {
                        name:'Ubar',
                        type:'bar',
                        areaStyle: {normal: {}},
                        stack: 'Total',
                        data: data.ubar
                    }, {
                        name:'易道',
                        type:'bar',
                        areaStyle: {normal: {}},
                        stack: 'Total',
                        data: data.yidao
                    }]
                },

                comparePieLoading: false,
                comparePieOption: {
                    title: _.extend({}, Pie.title, { show: false}),
                    tooltip: _.extend({}, Pie.tooltip),
                    legend: _.extend({}, Pie.legend, {
                        //orient: 'vertical',
                        //x: 'bottom',
                        bottom: 0,
                        data:['滴滴','Ubar','易道']
                    }),
                    textStyle: Pie.textStyle,
                    toolbox: Pie.toolbox,
                    color: _.extend([], Chart.color),
                    //color: _.extend([], ['#F9713C', '#B3E4A1', 'rgb(238, 197, 102)']),
                    series: _.extend({}, Pie.series, {
                        name: 'Compare',
                        radius: ['25%', '60%'],
                        data:[
                            {value: _.reduce(data.didi, (mome, num) => mome + num, 0), name:'滴滴'},
                            {value:_.reduce(data.ubar, (mome, num) => mome + num, 0), name:'Ubar'},
                            {value:_.reduce(data.yidao, (mome, num) => mome + num, 0), name:'易道'}
                        ]
                    })
                },

                compareRadarLoading: false,
                compareRadarOption: {
                    backgroundColor: '-webkit-radial-gradient(#e9e9e9 5%, #f9f9f9 60%);',
                    //backgroundColor: '#e9e9e9',
                    title: {
                        //text: 'AQI - 雷达图',
//                        left: 'center',
//                        textStyle: {
//                            color: '#999'
//                        }
                    },
                    legend: {
                        bottom: 1,
                        data: ['滴滴', 'Ubar', '易道'],
//                        itemGap: 20,
//                        textStyle: {
//                            color: '#fff',
//                            fontSize: 14
//                        },
//                        selectedMode: 'single'
                    },
                    color: _.extend([], Chart.color),
                    radar: {
                        indicator: [
                            {name: 'Happy', max: 100},
                            {name: 'Anger', max: 100},
                            {name: 'Sorrow', max: 100},
                            {name: 'Disgust', max: 100},
                            {name: 'Fear', max: 100}
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
                    series: [{
                        name: '滴滴',
                        type: 'radar',
                        lineStyle: {
                            normal: {
                                width: 1.5,
                                opacity: 0.5
                            }
                        },
                        data: radar.didi,
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
                    }, {
                        name: 'Ubar',
                        type: 'radar',
                        lineStyle: {
                            normal: {
                                width: 1.5,
                                opacity: 0.5
                            }
                        },
                        data: radar.ubar,
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                //color: '#B3E4A1'
                            }
                        },
                        areaStyle: {
                            normal: {
                                opacity: 0.1
                            }
                        }
                    }, {
                        name: '易道',
                        type: 'radar',
                        lineStyle: {
                            normal: {
                                width: 1.5,
                                opacity: 0.5
                            }
                        },
                        data: radar.yidao,
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                //color: 'rgb(238, 197, 102)'
                            }
                        },
                        areaStyle: {
                            normal: {
                                opacity: 0.1
                            }
                        }
                    }]
                }
            }
        },
        components:{

        }
    }
</script>
