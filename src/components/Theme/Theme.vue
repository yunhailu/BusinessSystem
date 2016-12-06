<template>
    <tabs :datas="themeNums"></tabs>
    <!--<span>Theme</span>-->
    <div class="theme-word">
        <div class="theme-word-chart" v-echarts="themeWordOption" :loading="themeWordLoading"  theme="infographic"></div><!-- :click="clickAction"-->
        <div class="theme-word-ranking">
            <dl class="list up-list">
                <dt class="list-title">{{words.ranking}}</dt>
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

    <div class="theme-map">
        <div class="theme-map-chart" v-echarts="themeMapOption" :loading="themeWordLoading"  theme="macarons" ></div>
        <div class="theme-map-ranking">
            <div class="theme-map-chart" v-echarts="themePieOption" :loading="themePieLoading"  theme="macarons" :click="clickAction"></div>
            <!--<dl class="list up-list">-->
                <!--<dt class="list-title">排名变化</dt>-->
                <!--<dd v-for="item in trendList" class="list-item up-list-item">-->
                    <!--<div :id="item.id">-->
                        <!--<i class="fa fa-level-up" v-if="item.trend == 'up'"></i>-->
                        <!--<i class="fa fa-level-down" v-if="item.trend == 'down'"></i>-->
                        <!--<span class="list-item-con">{{item.name}} - {{item.rate}}</span>-->
                    <!--</div>-->
                <!--</dd>-->
            <!--</dl>-->


        </div>
    </div>


    <tips :visible.sync="loadingParams.visiable" :tipsparam.sync="loadingParams"></tips>
</template>
<style lang="less" scoped>
    @import "Theme.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import Tabs from '../Common/Tabs/Tabs.vue';
    import Tips from '../Common/Tips/Tips.vue';
    import Local from "../../local/local";
    import { Chart, Pie } from '../../config/config';
    import { themeScatterData } from '../../config/tmpData';
    import China from 'echarts/map/js/china';
    import * as Api from '../../widgets/Api';
    import { analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, activeAnalyticsTopic } from '../../vuex/getters';

    export default{
        data(){
            const words = Local().theme;
            const common = Local().common;
            return{
                words,
                loadingParams: {
                    visiable: false,
                    type: 'loading',
                    content:common.waitWords
                },
                themeWordLoading: true,
                themeWordOption: {
                    tooltip: {},
                    graphic:Chart.graphic,
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

                //地图的option
                themeMapLoading: true,
                themeMapOption: {
                    // title : {
                    //     text: 'iphone销量',
                    //     subtext: '纯属虚构',
                    //     x:'center'
                    // },
                    tooltip : {
                        trigger: 'item'
                    },
                    legend: {
                        show:false,
                        orient: 'vertical',
                        x:'left',
                        data:['热门微博用户','热门微博']
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
                        x: 'right',
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
                    graphic:Chart.graphic,
                    series : [
                        {
                            name: '热门微博用户',
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
                            name: '热门微博',
                            type: 'map',
                            mapType: 'china',
                            roam: false,
                            itemStyle:{
                                normal:{label:{show:true}},
                                emphasis:{label:{show:true}}
                            },
                            data:[
                                {name: '天津',value: Math.round(Math.random()*1000)},
                                {name: '重庆',value: Math.round(Math.random()*1000)},
                                {name: '河北',value: Math.round(Math.random()*1000)},
                                {name: '云南',value: Math.round(Math.random()*1000)},
                                {name: '辽宁',value: Math.round(Math.random()*1000)},
                                {name: '湖南',value: Math.round(Math.random()*1000)},
                                {name: '安徽',value: Math.round(Math.random()*1000)},
                                {name: '新疆',value: Math.round(Math.random()*1000)},
                                {name: '浙江',value: Math.round(Math.random()*1000)},
                                {name: '湖北',value: Math.round(Math.random()*1000)},
                                {name: '山西',value: Math.round(Math.random()*1000)},
                                {name: '内蒙古',value: Math.round(Math.random()*1000)},
                                {name: '吉林',value: Math.round(Math.random()*1000)},
                                {name: '广东',value: Math.round(Math.random()*1000)},
                                {name: '台湾',value: Math.round(Math.random()*1000)},
                                {name: '澳门',value: Math.round(Math.random()*1000)}
                            ]
                        }
                    ]
                },


                //pie option
                themePieLoading: false,
                themePieOption: {
                    title : {
                    text: '微博男女比例分布',
                    x:'center'
                },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        show:false,
                        orient: 'vertical',
                        left:'left',
                        data:['男生','女生']
                    },
                    graphic:Pie.graphic,
                    series : [
                        {
                            name: '微博男女比例分布',
                            type: 'pie',
                            radius: ['15%', '40%'],
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'男'},
                                {value:310, name:'女'}
                            ],
                            label: {
                                normal: {
                                    show:true,
                                    formatter: " {b}:({d}%)"

                                }},
                            itemStyle: {

                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]},


                //----end------

                upList: [],

                downList: [],

                trendList: [],
                themeScatterLoading:true,
                themeScatterOption: {
                    legend: {
                        y: 'top',
                        //data: ['南海问题', '每日关注', '货币战争', '网易新闻', '阿里影业'],
                        data: [],
                        textStyle: {
                            //color: '#fff',
//                            fontSize: 16
                        }
                    },
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
                                    + '转发数：' + value[2] + '<br>'
                                    + '点赞数：' + value[3] + '<br>'
                                    + '评论数：' + value[4] + '<br>';
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
                    xAxis:{
                        type : 'category',  //category
                        //data : ["2016-08-21:12","2016-08-21:14","2016-08-21:15","2016-08-21:16","2016-08-21:17","2016-08-21:18","2016-08-21:20","2016-08-21:22","2016-08-22:00","2016-08-22:03","2016-08-22:05","2016-08-22:06","2016-08-22:08","2016-08-22:09","2016-08-22:10","2016-08-22:11","2016-08-22:12","2016-08-22:13","2016-08-22:14","2016-08-22:15","2016-08-22:16","2016-08-22:17","2016-08-22:18","2016-08-22:19","2016-08-22:20","2016-08-22:21","2016-08-22:22","2016-08-23:00","2016-08-23:03","2016-08-23:06","2016-08-23:08","2016-08-23:09","2016-08-23:10","2016-08-23:11","2016-08-23:12","2016-08-23:13","2016-08-23:14","2016-08-23:15","2016-08-23:16","2016-08-23:17","2016-08-23:18","2016-08-23:19","2016-08-23:20","2016-08-23:22","2016-08-23:23","2016-08-24:00","2016-08-24:01","2016-08-24:06","2016-08-24:07","2016-08-24:08","2016-08-24:09","2016-08-24:10","2016-08-24:11","2016-08-24:12","2016-08-24:14","2016-08-24:15","2016-08-24:16","2016-08-24:17","2016-08-24:18","2016-08-24:20","2016-08-24:21","2016-08-24:22","2016-08-25:00","2016-08-25:02","2016-08-25:03","2016-08-25:05","2016-08-25:06","2016-08-25:07","2016-08-25:08","2016-08-25:09","2016-08-25:10","2016-08-25:11","2016-08-25:12","2016-08-25:14","2016-08-25:15","2016-08-25:16","2016-08-25:17","2016-08-25:18","2016-08-25:19","2016-08-25:20","2016-08-25:21","2016-08-25:22","2016-08-25:23","2016-08-26:00","2016-08-26:01","2016-08-26:06","2016-08-26:07","2016-08-26:08","2016-08-26:09","2016-08-26:10","2016-08-26:11","2016-08-26:12","2016-08-26:13","2016-08-26:14","2016-08-26:15","2016-08-26:16","2016-08-26:17","2016-08-26:18","2016-08-26:22","2016-08-26:23","2016-08-27:00","2016-08-27:01","2016-08-27:02","2016-08-27:06","2016-08-27:08","2016-08-27:09","2016-08-27:10","2016-08-27:11","2016-08-27:12","2016-08-27:13","2016-08-27:14","2016-08-27:15","2016-08-27:16","2016-08-27:17","2016-08-27:18","2016-08-27:19","2016-08-27:20","2016-08-28:00","2016-08-28:01","2016-08-28:06","2016-08-28:08"],
                        data:[],
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
                    },
                    yAxis: _.extend({}, Chart.yAxis, {
                        type: 'value',
                        name: '文章数量',
                        nameLocation: 'end',
                        nameGap: 20,
                        splitLine: {
                            show: false
                        }
                    }),
                    graphic:Chart.graphic,
                    series: [
                        {
                            name: '',
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
                            //data: themeScatterData.dataBJ
                            data: []
                        }, {
                            name: '',
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

                            //data: themeScatterData.dataSH

                            data:[]
                        }, {
                            name: '',
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
                            //data: themeScatterData.dataGZ
                            data:[]
                        },{
                            name: '',
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
                            //data: themeScatterData.dataWeb
                            data:[]
                        }, {
                            name: '',
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
                            //data: themeScatterData.dataClient

                            data:[]
                        }
                    ]
                },
                //themeScatterLoading: false,

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
                    graphic:Chart.graphic,
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
                    graphic:Chart.graphic,
                    series : []
                },
                themeLineLoading: true,

                themeNums: [0,0,0,0,0,0]
            }
        },
        vuex: {
            getters: {analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, activeAnalyticsTopic}
        },
        watch: {
            activeAnalyticsTopic: {
                handler(val){
                    this.themeBestLoading = true;
                    this.themeLineLoading = true;
                    this.themeWordLoading = true;
                    this.init(val);
                }
            },
            analyticsSubTopic: {
                handler(val){
                    this.loadingParams.visiable = true;
                    this.init();
                }
            },
            analyticsDateChange: {
                handler(val){
                    this.loadingParams.visiable = true;
                    this.init();
                }
            }
        },
        ready(){
            if(this.activeAnalyticsTopic && this.activeAnalyticsTopic.topic_id){
                this.init();
            }
        },
        methods: {
            getBubblChart(){
                this.themeScatterLoading=true;
                const topic_id = this.activeAnalyticsTopic.topic_id;
                //end='2016-11-15',
                //start='2016-11-11';
                        let end =this.analyticsEnd,
                        start = this.analyticsStart;
                if(start.includes(' ') && end.includes(' ')){
                    start = start.split(' ')[0]+'T'+start.split(' ')[1];
                    end = end.split(' ')[0]+'T'+end.split(' ')[1];
                    console.log('start',start,end);
                }
                Api.getBubblChart({topic_id,start,end}).then(resp => {
                    //console.log('13',resp.data);
                    if(resp.data.code == 0){
                    this.themeScatterLoading = false;
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
                        console.log('数据',yuy0); //数据组的所有数据
                        
                        const dataOne=yuy0[0];
                        const dataTwue=yuy0[1];
                        const dataThree=yuy0[2];
                        const dataFour=yuy0[3];
                        const dataFire=yuy0[4];
                        
                        console.log('dataOne:',dataOne);

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
         convertData (data) {
             this.themeMapOption.series[0].data=[
                 {name: '海门', value: 9},
                 {name: '鄂尔多斯', value: 12},
                 {name: '招远', value: 12},
                 {name: '舟山', value: 12},
                 {name: '齐齐哈尔', value: 14},
                 {name: '盐城', value: 15},
                 {name: '赤峰', value: 16},
                 {name: '青岛', value: 18},
                 {name: '乳山', value: 18},
                 {name: '金昌', value: 19},
                 {name: '泉州', value: 21},
                 {name: '莱西', value: 21},
                 {name: '日照', value: 21},
                 {name: '胶南', value: 22},
                 {name: '南通', value: 23},
                 {name: '拉萨', value: 24},
                 {name: '云浮', value: 24},
                 {name: '梅州', value: 25},
                 {name: '文登', value: 25},
                 {name: '上海', value: 25},
                 {name: '攀枝花', value: 25},
                 {name: '威海', value: 25},
                 {name: '承德', value: 25},
                 {name: '厦门', value: 26},
                 {name: '汕尾', value: 26},
                 {name: '潮州', value: 26},
                 {name: '丹东', value: 27},
                 {name: '太仓', value: 27},
                 {name: '曲靖', value: 27},
                 {name: '烟台', value: 28},
                 {name: '福州', value: 29},
                 {name: '瓦房店', value: 30},
                 {name: '即墨', value: 30},
                 {name: '抚顺', value: 31},
                 {name: '玉溪', value: 31},
                 {name: '张家口', value: 31},
                 {name: '阳泉', value: 31},
                 {name: '莱州', value: 32},
                 {name: '湖州', value: 32},
                 {name: '汕头', value: 32},
                 {name: '昆山', value: 33},
                 {name: '宁波', value: 33},
                 {name: '湛江', value: 33},
                 {name: '揭阳', value: 34},
                 {name: '荣成', value: 34},
                 {name: '连云港', value: 35},
                 {name: '葫芦岛', value: 35},
                 {name: '常熟', value: 36},
                 {name: '东莞', value: 36},
                 {name: '河源', value: 36},
                 {name: '淮安', value: 36},
                 {name: '泰州', value: 36},
                 {name: '南宁', value: 37},
                 {name: '营口', value: 37},
                 {name: '惠州', value: 37},
                 {name: '江阴', value: 37},
                 {name: '蓬莱', value: 37},
                 {name: '韶关', value: 38},
                 {name: '嘉峪关', value: 38},
                 {name: '广州', value: 38},
                 {name: '延安', value: 38},
                 {name: '太原', value: 39},
                 {name: '清远', value: 39},
                 {name: '中山', value: 39},
                 {name: '昆明', value: 39},
                 {name: '寿光', value: 40},
                 {name: '盘锦', value: 40},
                 {name: '长治', value: 41},
                 {name: '深圳', value: 41},
                 {name: '珠海', value: 42},
                 {name: '宿迁', value: 43},
                 {name: '咸阳', value: 43},
                 {name: '铜川', value: 44},
                 {name: '平度', value: 44},
                 {name: '佛山', value: 44},
                 {name: '海口', value: 44},
                 {name: '江门', value: 45},
                 {name: '章丘', value: 45},
                 {name: '肇庆', value: 46},
                 {name: '大连', value: 47},
                 {name: '临汾', value: 47},
                 {name: '吴江', value: 47},
                 {name: '石嘴山', value: 49},
                 {name: '沈阳', value: 50},
                 {name: '苏州', value: 50},
                 {name: '茂名', value: 50},
                 {name: '嘉兴', value: 51},
                 {name: '长春', value: 51},
                 {name: '胶州', value: 52},
                 {name: '银川', value: 52},
                 {name: '张家港', value: 52},
                 {name: '三门峡', value: 53},
                 {name: '锦州', value: 54},
                 {name: '南昌', value: 54},
                 {name: '柳州', value: 54},
                 {name: '三亚', value: 54},
                 {name: '自贡', value: 56},
                 {name: '吉林', value: 56},
                 {name: '阳江', value: 57},
                 {name: '泸州', value: 57},
                 {name: '西宁', value: 57},
                 {name: '宜宾', value: 58},
                 {name: '呼和浩特', value: 58},
                 {name: '成都', value: 58},
                 {name: '大同', value: 58},
                 {name: '镇江', value: 59},
                 {name: '桂林', value: 59},
                 {name: '张家界', value: 59},
                 {name: '宜兴', value: 59},
                 {name: '北海', value: 60},
                 {name: '西安', value: 61},
                 {name: '金坛', value: 62},
                 {name: '东营', value: 62},
                 {name: '牡丹江', value: 63},
                 {name: '遵义', value: 63},
                 {name: '绍兴', value: 63},
                 {name: '扬州', value: 64},
                 {name: '常州', value: 64},
                 {name: '潍坊', value: 65},
                 {name: '重庆', value: 66},
                 {name: '台州', value: 67},
                 {name: '南京', value: 67},
                 {name: '滨州', value: 70},
                 {name: '贵阳', value: 71},
                 {name: '无锡', value: 71},
                 {name: '本溪', value: 71},
                 {name: '克拉玛依', value: 72},
                 {name: '渭南', value: 72},
                 {name: '马鞍山', value: 72},
                 {name: '宝鸡', value: 72},
                 {name: '焦作', value: 75},
                 {name: '句容', value: 75},
                 {name: '北京', value: 79},
                 {name: '徐州', value: 79},
                 {name: '衡水', value: 80},
                 {name: '包头', value: 80},
                 {name: '绵阳', value: 80},
                 {name: '乌鲁木齐', value: 84},
                 {name: '枣庄', value: 84},
                 {name: '杭州', value: 84},
                 {name: '淄博', value: 85},
                 {name: '鞍山', value: 86},
                 {name: '溧阳', value: 86},
                 {name: '库尔勒', value: 86},
                 {name: '安阳', value: 90},
                 {name: '开封', value: 90},
                 {name: '济南', value: 92},
                 {name: '德阳', value: 93},
                 {name: '温州', value: 95},
                 {name: '九江', value: 96},
                 {name: '邯郸', value: 98},
                 {name: '临安', value: 99},
                 {name: '兰州', value: 99},
                 {name: '沧州', value: 100},
                 {name: '临沂', value: 103},
                 {name: '南充', value: 104},
                 {name: '天津', value: 105},
                 {name: '富阳', value: 106},
                 {name: '泰安', value: 112},
                 {name: '诸暨', value: 112},
                 {name: '郑州', value: 113},
                 {name: '哈尔滨', value: 114},
                 {name: '聊城', value: 116},
                 {name: '芜湖', value: 117},
                 {name: '唐山', value: 119},
                 {name: '平顶山', value: 119},
                 {name: '邢台', value: 119},
                 {name: '德州', value: 120},
                 {name: '济宁', value: 120},
                 {name: '荆州', value: 127},
                 {name: '宜昌', value: 130},
                 {name: '义乌', value: 132},
                 {name: '丽水', value: 133},
                 {name: '洛阳', value: 134},
                 {name: '秦皇岛', value: 136},
                 {name: '株洲', value: 143},
                 {name: '石家庄', value: 147},
                 {name: '莱芜', value: 148},
                 {name: '常德', value: 152},
                 {name: '保定', value: 153},
                 {name: '湘潭', value: 154},
                 {name: '金华', value: 157},
                 {name: '岳阳', value: 169},
                 {name: '长沙', value: 175},
                 {name: '衢州', value: 177},
                 {name: '廊坊', value: 193},
                 {name: '菏泽', value: 194},
                 {name: '合肥', value: 229},
                 {name: '武汉', value: 273},
                 {name: '大庆', value: 279}
             ];


        },
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
                    time_dimension = time_interval > 7 ? 1 : 0;
                let end =this.analyticsEnd,
                    start = this.analyticsStart;
                if(start.includes(' ') && end.includes(' ')){
                    start = start.split(' ')[0]+'T'+start.split(' ')[1];
                    end = end.split(' ')[0]+'T'+end.split(' ')[1];
                    console.log('start',start,end);
                }
                    /*end = this.analyticsEnd,
                    start = this.analyticsStart;*/
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
                const topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0;
                let end =this.analyticsEnd,
                        start = this.analyticsStart;
                if(start.includes(' ') && end.includes(' ')){
                    start = start.split(' ')[0]+'T'+start.split(' ')[1];
                    end = end.split(' ')[0]+'T'+end.split(' ')[1];
                    console.log('start',start,end);
                }
//                        end = this.analyticsEnd,
//                        start = this.analyticsStart;
                return Api.getWordCloud({topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    //console.log('getWordCloud',resp);
                    this.loadingParams.visiable = false;
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
//                const topic_id = this.activeAnalyticsTopic.topic_id,
//                        topic = this.activeAnalyticsTopic.topic_name,
//                        subtopic = this.analyticsSubTopic,
//                        source = this.analyticsSource,
//                        time_interval = this.analyticsTimeRange,
//                        time_dimension = time_interval > 7 ? 1 : 0,
//                        end = this.analyticsEnd,
//                        start = this.analyticsStart;
//                return Api.getThemeBest({topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
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
                const topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0;
                let end =this.analyticsEnd,
                        start = this.analyticsStart;
                if(start.includes(' ') && end.includes(' ')){
                    start = start.split(' ')[0]+'T'+start.split(' ')[1];
                    end = end.split(' ')[0]+'T'+end.split(' ')[1];
                    console.log('start',start,end);
                }
//                        end = this.analyticsEnd,
//                        start = this.analyticsStart;
                Api.getThemeDetail({topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    //console.log('getThemeDetail', resp.data);
                    if(resp.data.code == 0){
                        const details = resp.data.data;
                        //if(details.length) return ;
                        this.themeLineLoading = false;
                        this.themeLineOption.xAxis.data = _.map(details, detail => detail.date);
                    console.log('details',details);
                        this.themeLineOption.legend.data = _.map(details[0].values, item => item.name+'');
                    console.log('this.themeLineOption.legend.data',this.themeLineOption.legend.data);
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
                this.getBubblChart();
                this.getTrendList();
                this.getWordCloud();
                //this.getThemeBest();
                this.getThemeDetail();
                // this.convertData();
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
            Tabs, Tips
        },
//        route: {
//            data(){
//                this.init();
//            }
//        }
    }
</script>
