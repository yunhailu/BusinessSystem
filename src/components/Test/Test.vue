<template>
    <div id="test-chart" v-echarts="barChartOption" :loading="barChartLoading"></div>
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
