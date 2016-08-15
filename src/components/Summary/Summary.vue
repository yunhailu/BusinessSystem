<template>
    <div class="chart" v-echarts="barChartOption" :loading="barChartLoading"></div>
    <div class="chart" v-echarts="pieChartOption" :loading="barChartLoading"></div>
    <!--<div class="chart" v-echarts="mapChartOption" :loading="barChartLoading"></div>-->
</template>
<style lang="less">
    @import "Summary.less";
</style>
<script>
    import Echart from 'echarts';

    export default{
        data(){
            return{
                barChartLoading: false,
                barChartOption: {
//                    title: {
//                        text: 'ECharts 入门示例'
//                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['周一','周二','周三','周四','周五','周六','周日']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'直接访问',
                            type:'bar',
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'邮件营销',
                            type:'bar',
                            stack: '广告',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'联盟广告',
                            type:'bar',
                            stack: '广告',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'视频广告',
                            type:'bar',
                            stack: '广告',
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'搜索引擎',
                            type:'bar',
                            data:[862, 1018, 964, 1026, 1679, 1600, 1570],
                            markLine : {
                                lineStyle: {
                                    normal: {
                                        type: 'dashed'
                                    }
                                },
                                data : [
                                    [{type : 'min'}, {type : 'max'}]
                                ]
                            }
                        },
                        {
                            name:'百度',
                            type:'bar',
                            barWidth : 5,
                            stack: '搜索引擎',
                            data:[620, 732, 701, 734, 1090, 1130, 1120]
                        },
                        {
                            name:'谷歌',
                            type:'bar',
                            stack: '搜索引擎',
                            data:[120, 132, 101, 134, 290, 230, 220]
                        },
                        {
                            name:'必应',
                            type:'bar',
                            stack: '搜索引擎',
                            data:[60, 72, 71, 74, 190, 130, 110]
                        },
                        {
                            name:'其他',
                            type:'bar',
                            stack: '搜索引擎',
                            data:[62, 82, 91, 84, 109, 110, 120]
                        }
                    ]
                },

                pieChartOption: {
                    title : {
                        //text: '某站点用户访问来源',
                        //subtext: '纯属虚构',
                        //x:'center'
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
//                        orient: 'horizontal',
//                        left: 'center',
//                        bottom: 0,
//                        data:['直达','其它外链','搜索引擎','直接输入网址或书签','cnblogs.com','微博','微信','百度','谷歌','360','必应','其他']
                    },
                    series: [
                        {
                            name:'访问来源', //内环
                            type:'pie',
                            //selectedMode: 'single', //单一选中模式
                            radius: ['15%', '40%'], //饼图的半径 [内半径，外半径]

                            label: {
                                normal: {
                                    position: 'inner' //内置文本标签
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false     //不需要设置引导线
                                }
                            },
                            data:[
                                {value:335, name:'直达'/*, selected:true*/},
                                {value:679, name:'其它外链'},
                                {value:1548, name:'搜索引擎'}
                            ]
                        },
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '65%'],

                            data:[
                                {value:335, name:'直接输入网址或书签'},
                                {value:310, name:'cnblogs.com'},
                                {value:234, name:'微博'},
                                {value:135, name:'微信'},
                                {value:1048, name:'百度'},
                                {value:251, name:'谷歌'},
                                {value:147, name:'360'},
                                {value:42, name:'必应'},
                                {value:60, name:'其他'}
                            ]
                        }
                    ]
                },

                mapChartOption: {

                }
            }
        },
        route:{
            data(transition){
                //redirect();
                //transition.next();
            }
        }
    }
</script>
