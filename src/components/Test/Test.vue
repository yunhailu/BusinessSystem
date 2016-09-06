<template>
    <div class="chart" v-echarts="barChartOption" :loading="barChartLoading"></div>
    <div class="chart" v-echarts="pieChartOption" :loading="barChartLoading"></div>
    <div class="chart" v-echarts="mapChartOption" :loading="mapChartLoading"></div>
    <div class="chart" v-echarts="wordChartOption" :loading="wordChartLoading"></div>
    <div class="chart" v-echarts="wordChartOption2" :loading="wordChartLoading"></div>
    <!--<div class="chart" v-echarts="mapChartOption" :loading="barChartLoading"></div>-->

    <!--<input type="text" @click="showCalendar" v-model="value" placeholder="请输入日期">-->
    <input type="text" @click="showCalendar" v-model="cal.value"> {{cal.value}}</input>
    <calendar :show.sync="cal.show" :value.sync="cal.value" :x="cal.x" :y="cal.y" :begin="cal.begin" :end="cal.end" :type="cal.type" :range="cal.range"></calendar>
</template>
<style lang="less" scoped>
    @import "Test.less";
</style>
<script>
    import Echart from 'echarts';
    import Calendar from '../Common/Calendar/Calendar.vue';
    import China from 'echarts/map/js/china';
    import WordCloud from 'echarts-wordcloud';

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
                            type : 'value',
                            splitLine: {
                                lineStyle: {
                                    type: 'solid'//solid  dashed  dotted
                                }
                            }
                        }
                    ],
                    progressive: 4,
                    textStyle: {
                        fontFamily: 'pingfang'
                    },
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

                mapChartLoading: false,
                mapChartOption: {
                    title : {
                        text: 'iphone销量',
                        subtext: '纯属虚构',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        x:'left',
                        data:['iphone4','iphone5','iphone6']
                    },
                    dataRange: {
                        min: 0,
                        max: 2500,
                        x: 'left',
                        y: 'bottom',
                        text:['高','低'],           // 文本，默认为数值文本
                        calculable : true
                    },
                    toolbox: {
                        show: true,
                        orient : 'vertical',
                        x: 'right',
                        y: 'center',
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    roamController: {
                        show: true,
                        x: 'right',
                        mapTypeControl: {
                            'china': true
                        }
                    },
                    series : [
                        {
                            name: 'iphone4',
                            type: 'map',
                            mapType: 'china',
                            roam: false,
                            itemStyle:{
                                normal:{label:{show:true}},
                                emphasis:{label:{show:true}}
                            },
                            data:[
                                {name: '北京',value: Math.round(Math.random()*1000)},
                                {name: '天津',value: Math.round(Math.random()*1000)},
                                {name: '上海',value: Math.round(Math.random()*1000)},
                                {name: '重庆',value: Math.round(Math.random()*1000)},
                                {name: '河北',value: Math.round(Math.random()*1000)},
                                {name: '河南',value: Math.round(Math.random()*1000)},
                                {name: '云南',value: Math.round(Math.random()*1000)},
                                {name: '辽宁',value: Math.round(Math.random()*1000)},
                                {name: '黑龙江',value: Math.round(Math.random()*1000)},
                                {name: '湖南',value: Math.round(Math.random()*1000)},
                                {name: '安徽',value: Math.round(Math.random()*1000)},
                                {name: '山东',value: Math.round(Math.random()*1000)},
                                {name: '新疆',value: Math.round(Math.random()*1000)},
                                {name: '江苏',value: Math.round(Math.random()*1000)},
                                {name: '浙江',value: Math.round(Math.random()*1000)},
                                {name: '江西',value: Math.round(Math.random()*1000)},
                                {name: '湖北',value: Math.round(Math.random()*1000)},
                                {name: '广西',value: Math.round(Math.random()*1000)},
                                {name: '甘肃',value: Math.round(Math.random()*1000)},
                                {name: '山西',value: Math.round(Math.random()*1000)},
                                {name: '内蒙古',value: Math.round(Math.random()*1000)},
                                {name: '陕西',value: Math.round(Math.random()*1000)},
                                {name: '吉林',value: Math.round(Math.random()*1000)},
                                {name: '福建',value: Math.round(Math.random()*1000)},
                                {name: '贵州',value: Math.round(Math.random()*1000)},
                                {name: '广东',value: Math.round(Math.random()*1000)},
                                {name: '青海',value: Math.round(Math.random()*1000)},
                                {name: '西藏',value: Math.round(Math.random()*1000)},
                                {name: '四川',value: Math.round(Math.random()*1000)},
                                {name: '宁夏',value: Math.round(Math.random()*1000)},
                                {name: '海南',value: Math.round(Math.random()*1000)},
                                {name: '台湾',value: Math.round(Math.random()*1000)},
                                {name: '香港',value: Math.round(Math.random()*1000)},
                                {name: '澳门',value: Math.round(Math.random()*1000)}
                            ]
                        },
                        {
                            name: 'iphone5',
                            type: 'map',
                            mapType: 'china',
                            itemStyle:{
                                normal:{label:{show:true}},
                                emphasis:{label:{show:true}}
                            },
                            data:[
                                {name: '北京',value: Math.round(Math.random()*1000)},
                                {name: '天津',value: Math.round(Math.random()*1000)},
                                {name: '上海',value: Math.round(Math.random()*1000)},
                                {name: '重庆',value: Math.round(Math.random()*1000)},
                                {name: '河北',value: Math.round(Math.random()*1000)},
                                {name: '安徽',value: Math.round(Math.random()*1000)},
                                {name: '新疆',value: Math.round(Math.random()*1000)},
                                {name: '浙江',value: Math.round(Math.random()*1000)},
                                {name: '江西',value: Math.round(Math.random()*1000)},
                                {name: '山西',value: Math.round(Math.random()*1000)},
                                {name: '内蒙古',value: Math.round(Math.random()*1000)},
                                {name: '吉林',value: Math.round(Math.random()*1000)},
                                {name: '福建',value: Math.round(Math.random()*1000)},
                                {name: '广东',value: Math.round(Math.random()*1000)},
                                {name: '西藏',value: Math.round(Math.random()*1000)},
                                {name: '四川',value: Math.round(Math.random()*1000)},
                                {name: '宁夏',value: Math.round(Math.random()*1000)},
                                {name: '香港',value: Math.round(Math.random()*1000)},
                                {name: '澳门',value: Math.round(Math.random()*1000)}
                            ]
                        },
                        {
                            name: 'iphone6',
                            type: 'map',
                            mapType: 'china',
                            itemStyle:{
                                normal:{label:{show:true}},
                                emphasis:{label:{show:true}}
                            },
                            data:[
                                {name: '北京',value: Math.round(Math.random()*1000)},
                                {name: '天津',value: Math.round(Math.random()*1000)},
                                {name: '上海',value: Math.round(Math.random()*1000)},
                                {name: '广东',value: Math.round(Math.random()*1000)},
                                {name: '台湾',value: Math.round(Math.random()*1000)},
                                {name: '香港',value: Math.round(Math.random()*1000)},
                                {name: '澳门',value: Math.round(Math.random()*1000)}
                            ]
                        }
                    ]
                },

                wordChartLoading: true,
                wordChartOption: {
                    tooltip: {},
                    series: [ {
                        type: 'wordCloud',
                        gridSize: 2,
                        sizeRange: [12, 50],
                        rotationRange: [-90, 90],
                        shape: 'pentagon',
                        width: 600,
                        height: 400,
                        textStyle: {
                            normal: {
                                color: function () {
                                    return 'rgb(' + [
                                                Math.round(Math.random() * 160),
                                                Math.round(Math.random() * 160),
                                                Math.round(Math.random() * 160)
                                            ].join(',') + ')';
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        data: [
                            {
                                name: 'Sam S Club',
                                value: 10000,
                                textStyle: {
                                    normal: {
                                        color: 'black'
                                    },
                                    emphasis: {
                                        color: 'red'
                                    }
                                }
                            },
                            {
                                name: 'Macys',
                                value: 6181
                            },
                            {
                                name: 'Amy Schumer',
                                value: 4386
                            },
                            {
                                name: 'Jurassic World',
                                value: 4055
                            },
                            {
                                name: 'Charter Communications',
                                value: 2467
                            },
                            {
                                name: 'Chick Fil A',
                                value: 2244
                            },
                            {
                                name: 'Planet Fitness',
                                value: 1898
                            },
                            {
                                name: 'Pitch Perfect',
                                value: 1484
                            },
                            {
                                name: 'Express',
                                value: 1112
                            },
                            {
                                name: 'Home',
                                value: 965
                            },
                            {
                                name: 'Johnny Depp',
                                value: 847
                            },
                            {
                                name: 'Lena Dunham',
                                value: 582
                            },
                            {
                                name: 'Lewis Hamilton',
                                value: 555
                            },
                            {
                                name: 'KXAN',
                                value: 550
                            },
                            {
                                name: 'Mary Ellen Mark',
                                value: 462
                            },
                            {
                                name: 'Farrah Abraham',
                                value: 366
                            },
                            {
                                name: 'Rita Ora',
                                value: 360
                            },
                            {
                                name: 'Serena Williams',
                                value: 282
                            },
                            {
                                name: 'NCAA baseball tournament',
                                value: 273
                            },
                            {
                                name: 'Point Break',
                                value: 265
                            }
                        ]
                    } ]
                },
                maskImage: new Image(),
                wordChartOption2: {
                    series: [ {
                        type: 'wordCloud',
                        sizeRange: [10, 100],
                        rotationRange: [-90, 90],
                        rotationStep: 45,
                        gridSize: 2,
                        shape: 'pentagon',
                        maskImage: this.maskImage,
                        textStyle: {
                            normal: {
                                color: function () {
                                    return 'rgb(' + [
                                                Math.round(Math.random() * 160),
                                                Math.round(Math.random() * 160),
                                                Math.round(Math.random() * 160)
                                            ].join(',') + ')';
                                }
                            }
                        },
                        data: this.createData().sort(function (a, b) {
                            return b.value  - a.value;
                        })
                    }]
                },

                cal: {
                    show: false,
                    type: "date", //date datetime
                    value: "2015-12-11",
                    begin: "2015-12-20",
                    end: "2015-12-25",
                    x: 0,
                    y: 0,
                    range:true,//是否多选
                }
            }
        },
        methods:{
            createData() {
                var keywords = {
                    "visualMap": 22199,
                    "continuous": 10288,
                    "contoller": 620,
                    "series": 274470,
                    "gauge": 12311,
                    "detail": 1206,
                    "piecewise": 4885,
                    "textStyle": 32294,
                    "markPoint": 18574,
                    "pie": 38929,
                    "roseType": 969,
                    "label": 37517,
                    "emphasis": 12053,
                    "yAxis": 57299,
                    "name": 15418,
                    "type": 22905,
                    "gridIndex": 5146,
                    "normal": 49487,
                    "itemStyle": 33837,
                    "min": 4500,
                    "silent": 5744,
                    "animation": 4840,
                    "offsetCenter": 232,
                    "inverse": 3706,
                    "borderColor": 4812,
                    "markLine": 16578,
                    "line": 76970,
                    "radiusAxis": 6704,
                    "radar": 15964,
                    "data": 60679,
                    "dataZoom": 24347,
                    "tooltip": 43420,
                    "toolbox": 25222,
                    "geo": 16904,
                    "parallelAxis": 4029,
                    "parallel": 5319,
                    "max": 3393,
                    "bar": 43066,
                    "heatmap": 3110,
                    "map": 20285,
                    "animationDuration": 3425,
                    "animationDelay": 2431,
                    "splitNumber": 5175,
                    "axisLine": 12738,
                    "lineStyle": 19601,
                    "splitLine": 7133,
                    "axisTick": 8831,
                    "axisLabel": 17516,
                    "pointer": 590,
                    "color": 23426,
                    "title": 38497,
                    "formatter": 15214,
                    "slider": 7236,
                    "legend": 66514,
                    "grid": 28516,
                    "smooth": 1295,
                    "smoothMonotone": 696,
                    "sampling": 757,
                    "feature": 12815,
                    "saveAsImage": 2616,
                    "polar": 6279,
                    "calculable": 879,
                    "backgroundColor": 9419,
                    "excludeComponents": 130,
                    "show": 20620,
                    "text": 2592,
                    "icon": 2782,
                    "dimension": 478,
                    "inRange": 1060,
                    "animationEasing": 2983,
                    "animationDurationUpdate": 2259,
                    "animationDelayUpdate": 2236,
                    "animationEasingUpdate": 2213,
                    "xAxis": 89459,
                    "angleAxis": 5469,
                    "showTitle": 484,
                    "dataView": 2754,
                    "restore": 932,
                    "timeline": 10104,
                    "range": 477,
                    "value": 5732,
                    "precision": 878,
                    "target": 1433,
                    "zlevel": 5361,
                    "symbol": 8718,
                    "interval": 7964,
                    "symbolSize": 5300,
                    "showSymbol": 1247,
                    "inside": 8913,
                    "xAxisIndex": 3843,
                    "orient": 4205,
                    "boundaryGap": 5073,
                    "nameGap": 4896,
                    "zoomLock": 571,
                    "hoverAnimation": 2307,
                    "legendHoverLink": 3553,
                    "stack": 2907,
                    "throttle": 466,
                    "connectNulls": 897,
                    "clipOverflow": 826,
                    "startValue": 551,
                    "minInterval": 3292,
                    "opacity": 3097,
                    "splitArea": 4775,
                    "filterMode": 635,
                    "end": 409,
                    "left": 6475,
                    "funnel": 2238,
                    "lines": 6403,
                    "baseline": 431,
                    "align": 2608,
                    "coord": 897,
                    "nameTextStyle": 7477,
                    "width": 4338,
                    "shadowBlur": 4493,
                    "effect": 929,
                    "period": 225,
                    "areaColor": 631,
                    "borderWidth": 3654,
                    "nameLocation": 4418,
                    "position": 11723,
                    "containLabel": 1701,
                    "scatter": 10718,
                    "areaStyle": 5310,
                    "scale": 3859,
                    "pieces": 414,
                    "categories": 1000,
                    "selectedMode": 3825,
                    "itemSymbol": 273,
                    "effectScatter": 7147,
                    "fontStyle": 3376,
                    "fontSize": 3386,
                    "margin": 1034,
                    "iconStyle": 2257,
                    "link": 1366,
                    "axisPointer": 5245,
                    "showDelay": 896,
                    "graph": 22194,
                    "subtext": 1442,
                    "selected": 2881,
                    "barCategoryGap": 827,
                    "barGap": 1094,
                    "barWidth": 1521,
                    "coordinateSystem": 3622,
                    "barBorderRadius": 284,
                    "z": 4014,
                    "polarIndex": 1456,
                    "shadowOffsetX": 3046,
                    "shadowColor": 3771,
                    "shadowOffsetY": 2475,
                    "height": 1988,
                    "barMinHeight": 575,
                    "lang": 131,
                    "symbolRotate": 2752,
                    "symbolOffset": 2549,
                    "showAllSymbol": 942,
                    "transitionDuration": 993,
                    "bottom": 3724,
                    "fillerColor": 229,
                    "nameMap": 1249,
                    "barMaxWidth": 747,
                    "radius": 2103,
                    "center": 2425,
                    "magicType": 3276,
                    "labelPrecision": 248,
                    "option": 654,
                    "seriesIndex": 935,
                    "controlPosition": 121,
                    "itemGap": 3188,
                    "padding": 3481,
                    "shadowStyle": 347,
                    "boxplot": 1394,
                    "labelFormatter": 264,
                    "realtime": 631,
                    "dataBackgroundColor": 239,
                    "showDetail": 247,
                    "showDataShadow": 217,
                    "x": 684,
                    "valueDim": 499,
                    "onZero": 931,
                    "right": 3255,
                    "clockwise": 1035,
                    "itemWidth": 1732,
                    "trigger": 3840,
                    "axis": 379,
                    "selectedOffset": 670,
                    "startAngle": 1293,
                    "minAngle": 590,
                    "top": 4637,
                    "avoidLabelOverlap": 870,
                    "labelLine": 3785,
                    "sankey": 2933,
                    "endAngle": 213,
                    "start": 779,
                    "roam": 1738,
                    "fontWeight": 2828,
                    "fontFamily": 2490,
                    "subtextStyle": 2066,
                    "indicator": 853,
                    "sublink": 708,
                    "zoom": 1038,
                    "subtarget": 659,
                    "length": 1060,
                    "itemSize": 505,
                    "controlStyle": 452,
                    "yAxisIndex": 2529,
                    "edgeLabel": 1188,
                    "radiusAxisIndex": 354,
                    "scaleLimit": 1313,
                    "geoIndex": 535,
                    "regions": 1892,
                    "itemHeight": 1290,
                    "nodes": 644,
                    "candlestick": 3166,
                    "crossStyle": 466,
                    "edges": 369,
                    "links": 3277,
                    "layout": 846,
                    "barBorderColor": 721,
                    "barBorderWidth": 498,
                    "treemap": 3865,
                    "y": 367,
                    "valueIndex": 704,
                    "showLegendSymbol": 482,
                    "mapValueCalculation": 492,
                    "optionToContent": 264,
                    "handleColor": 187,
                    "handleSize": 271,
                    "showContent": 1853,
                    "angleAxisIndex": 406,
                    "endValue": 327,
                    "triggerOn": 1720,
                    "contentToOption": 169,
                    "buttonColor": 71,
                    "rotate": 1144,
                    "hoverLink": 335,
                    "outOfRange": 491,
                    "textareaColor": 58,
                    "textareaBorderColor": 58,
                    "textColor": 60,
                    "buttonTextColor": 66,
                    "category": 336,
                    "hideDelay": 786,
                    "alwaysShowContent": 1267,
                    "extraCssText": 901,
                    "effectType": 277,
                    "force": 1820,
                    "rippleEffect": 723,
                    "edgeSymbolSize": 329,
                    "showEffectOn": 271,
                    "gravity": 199,
                    "edgeLength": 193,
                    "layoutAnimation": 152,
                    "length2": 169,
                    "enterable": 957,
                    "dim": 83,
                    "readOnly": 143,
                    "levels": 444,
                    "textGap": 256,
                    "pixelRatio": 84,
                    "nodeScaleRatio": 232,
                    "draggable": 249,
                    "brushType": 158,
                    "radarIndex": 152,
                    "large": 182,
                    "edgeSymbol": 675,
                    "largeThreshold": 132,
                    "leafDepth": 73,
                    "childrenVisibleMin": 73,
                    "minSize": 35,
                    "maxSize": 35,
                    "sort": 90,
                    "funnelAlign": 61,
                    "source": 336,
                    "nodeClick": 200,
                    "curveness": 350,
                    "areaSelectStyle": 104,
                    "parallelIndex": 52,
                    "initLayout": 359,
                    "trailLength": 116,
                    "boxWidth": 20,
                    "back": 53,
                    "rewind": 110,
                    "zoomToNodeRatio": 80,
                    "squareRatio": 60,
                    "parallelAxisDefault": 358,
                    "checkpointStyle": 440,
                    "nodeWidth": 49,
                    "color0": 62,
                    "layoutIterations": 56,
                    "nodeGap": 54,
                    "color(Array": 76,
                    "<string>)": 76,
                    "repulsion": 276,
                    "tiled": 105,
                    "currentIndex": 145,
                    "axisType": 227,
                    "loop": 97,
                    "playInterval": 112,
                    "borderColor0": 23,
                    "gap": 43,
                    "autoPlay": 123,
                    "showPlayBtn": 25,
                    "breadcrumb": 119,
                    "colorMappingBy": 85,
                    "id": 18,
                    "blurSize": 85,
                    "minOpacity": 50,
                    "maxOpacity": 54,
                    "prevIcon": 12,
                    "children": 21,
                    "shape": 98,
                    "nextIcon": 12,
                    "showNextBtn": 17,
                    "stopIcon": 21,
                    "visibleMin": 83,
                    "visualDimension": 97,
                    "colorSaturation": 56,
                    "colorAlpha": 66,
                    "emptyItemWidth": 10,
                    "inactiveOpacity": 4,
                    "activeOpacity": 4,
                    "showPrevBtn": 19,
                    "playIcon": 26,
                    "ellipsis": 19,
                    "gapWidth": 19,
                    "borderColorSaturation": 10,
                    "handleIcon": 2,
                    "handleStyle": 6,
                    "borderType": 1,
                    "constantSpeed": 1,
                    "polyline": 2,
                    "blendMode": 1,
                    "dataBackground": 1,
                    "textAlign": 1,
                    "textBaseline": 1,
                    "brush": 3
                };
                var data = [];
                for (var name in keywords) {
                    data.push({
                        name: name,
                        value: Math.sqrt(keywords[name])
                    })
                }
                return data;
            },
            loadImage(){
                this.maskImage.onload = () =>  {
                    //this.wordChartOption2.series[0].maskImage
                    //chart.setOption(option);
                    this.wordChartLoading = false;
                }
                this.maskImage.src = '../../../images/logo.jpg';
            },
            showCalendar:function(e){
                e.stopPropagation();
                var that=this;
                that.cal.show=true;
                that.cal.x=e.target.offsetLeft;
                that.cal.y=e.target.offsetTop+e.target.offsetHeight+8;
                var bindHide=function(e){
                    e.stopPropagation();
                    that.cal.show=false;
                    document.removeEventListener('click',bindHide,false);
                };
                setTimeout(function(){
                    document.addEventListener('click',bindHide,false);
                },500);
            }
        },
        components: {
            calendar: Calendar
        },
        route:{
            data(transition){
                //redirect();
                //transition.next();
                this.loadImage();
            }
        }
    }
</script>
