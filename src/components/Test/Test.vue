<template>
    <div class="chart" v-echarts="barChartOption" :loading="barChartLoading"></div>
    <div class="chart" v-echarts="pieChartOption" :loading="barChartLoading"></div>
    <!--<div class="chart" v-echarts="mapChartOption" :loading="barChartLoading"></div>-->
</template>
<style lang="less">
    @import "Test.less";
</style>
<script>
    import Echart from 'echarts';

    export default{
        data(){
            return{
                barChartLoading: false,
                barChartOption: {
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [25, 20, 36, 10, 10, 20]
                    }]
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
