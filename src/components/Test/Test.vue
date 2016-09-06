<template>
    <div class="chart" v-echarts="barChartOption" :loading="barChartLoading" theme="default"></div>
    <div class="chart" v-echarts="pieChartOption" :loading="barChartLoading" theme="infographic"></div>
    <div class="chart" v-echarts="mapChartOption" :loading="mapChartLoading" theme="macarons"></div>
    <div class="chart" v-echarts="wordChartOption" :loading="wordChartLoading" theme="infographic"></div>
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

                wordChartLoading: false,
                wordChartOption: {
                    tooltip: {},
                    series: {
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
                            }, {
                                name: 'Macys',
                                value: 6181
                            }, {
                                name: 'Amy Schumer',
                                value: 4386
                            }, {
                                name: 'Jurassic World',
                                value: 4055
                            }, {
                                name: 'Charter Communications',
                                value: 2467
                            }, {
                                name: 'Chick Fil A',
                                value: 2244
                            }, {
                                name: 'Planet Fitness',
                                value: 1898
                            }, {
                                name: 'Pitch Perfect',
                                value: 1484
                            }, {
                                name: 'Express',
                                value: 1112
                            }, {
                                name: 'Home',
                                value: 965
                            }, {
                                name: 'Johnny Depp',
                                value: 847
                            }, {
                                name: 'Lena Dunham',
                                value: 582
                            }, {
                                name: 'Lewis Hamilton',
                                value: 555
                            }, {
                                name: 'KXAN',
                                value: 550
                            }, {
                                name: 'Mary Ellen Mark',
                                value: 462
                            }, {
                                name: 'Farrah Abraham',
                                value: 366
                            }, {
                                name: 'Rita Ora',
                                value: 360
                            }, {
                                name: 'Serena Williams',
                                value: 282
                            }, {
                                name: 'NCAA baseball tournament',
                                value: 273
                            }, {
                                name: 'Point Break',
                                value: 265
                            }
                        ]
                    }
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
            }
        }
    }
</script>
