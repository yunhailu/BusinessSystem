<template>
    <div class="hot-panel">
        <!--热点事件散点图-->
        <div class="row">
            <div class="col-md-12 hot-river">
                <card-panel :title="words.hotsRiver" >
                    <div v-echarts="graphChartOption" :loading="graphChartLoading" class="hot-river-scatter" theme="" :img.sync="img"></div>
                </card-panel>
            </div>
        </div>
        <!--热点事件排行，实时热点排行-->
        <div class="row">
            <div class="col-md-6 hot-today">
                <card-panel :title="words.todayHotsRanking">
                    <ul class="hot-today-list">
                        <li v-for="item in hotsTodayRankings"  class="hot-today-list-item" @click="showDetail(item,0);">
                            <span class="hot-today-list-item-index">{{ ($index + 1) }}</span>
                            <span class="hot-today-list-item-text">{{item.title}}</span>
                        </li>
                    </ul>
                </card-panel>
            </div>
            <div class="col-md-6 hot-ranking">
                <card-panel :title="words.hotsRanking">
                    <ul class="hot-ranking-list">
                        <li v-for="item in hotsRankings"  class="hot-ranking-list-item" @click="showDetail(item,1);">
                            <span class="hot-ranking-list-item-index">{{ ($index + 1) }}</span>
                            <span class="hot-ranking-list-item-text">{{item.title}}</span>
                        </li>
                    </ul>
                </card-panel>
            </div>
        </div>
        <!--情绪比例，热词排行-->
        <div class="row">
            <div class="col-md-6 hot-sentiment">
                <card-panel :title="words.sentiment | title">
                    <div v-echarts="sentimentOption" :loading="sentimentLoading" class="hot-sentiment-pie" theme=""></div><!--infographic,macarons-->
                </card-panel>
            </div>
            <div class="col-md-6 hot-words">
                <card-panel :title="words.wordsRanking | title">
                    <div v-echarts="hotWordsOption" :loading="hotWordsLoading" class="hot-words-cloud" ></div>
                </card-panel>
            </div>

        </div>
        <!--热点事件,散点图-->
        <!--<div class="row">
            <div class="col-md-12 hot-river">
                <card-panel :title="words.hotsRiver">
                    <div v-echarts="scatterOption" :loading="scatterLoading" class="hot-river-scatter" theme="" :img.sync="img"></div>
                </card-panel>
            </div>
        </div>-->
    </div>


</template>
<style lang="less" scoped>
    @import "HotEvent.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import Local from '../../local/local';
    import { Chart, Pie } from '../../config/config';
    import * as Api from '../../widgets/Api';
    import CardPanel from '../Common/CardPanel/CardPanel.vue';

    export default{
        data(){
            const words = Local().hotEvent;
            const common = Local().common;
            return{
                words,
                common,
                img: "",
                activeHot: {
                    name: "",
                    value: ""
                },
                source:"实时",
                hot:'',
                // 热点情绪占比
                sentimentOption: {
                    title: _.extend({}, Pie.title, { show: false}),
                    tooltip: _.extend({}, Pie.tooltip),
                    legend: _.extend({}, Pie.legend, {
                        orient: 'vertical',
                        left: 10,
                        top: 10,
                        data: [common.happy, common.anger, common.sorrow, common.disgust, common.fear]
                    }),
                    color:['#2FCC71','#E64D3D', '#F1C40F', '#3598DC', '#737373'],
                    textStyle: Pie.textStyle,
                    toolbox: Pie.toolbox,
                    graphic:[
                        {
                            type: 'text',
                            z: -10,
                            left: 'center', // 相对父元素居中
                            top: 'middle',  // 相对父元素居中
                            rotation: Math.PI / 4,
                            style: {
                                fill: '#eee',
                                text: '品牌气象站',
                                font: 'bold 34px Microsoft YaHei'
                            }
                        }
                    ],
                    series:[
                        {
                            name: words.sentiment,
                            type:'pie',
                            radius: ['25%', '80%'],
                            center: ['50%', '50%'],
                            roseType : 'radius',
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            lableLine: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data:[]
                        },
                    ],
                },
                sentimentLoading: false,

                //实时热点排行
                hotsRanking: [],
                hotsRankings:{},
                popHotsRanking:[],

                //热点字符云
                hotWordsLoading: false,
                hotWordsOption: {
                    tooltip: {},
                    graphic:[
                        {
                            type: 'text',
                            z: -10,
                            left: 'center', // 相对父元素居中
                            top: 'middle',  // 相对父元素居中
                            rotation: Math.PI / 4,
                            style: {
                                fill: '#eee',
                                text: '品牌气象站',
                                font: 'bold 34px Microsoft YaHei'
                            }
                        }
                    ],
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
                        //data: [{"name":"brush","value":1.7320508075688772}],数据结构
                        data: []
                    }
                },

                //今日热点排行
                hotsTodayRanking: [],
                hotsTodayRankings: {},
                activeEvent:{},
                // 热点事件散点图-------over
                scatterOption: {
                    tooltip: { position: 'top', formatter(params, ticket, callback){
                        //console.log(params);
                        return `值: ${params.value[1]}`;
                    }},
                    textStyle: _.extend({}, Chart.textStyle),
                    title: [],
                    singleAxis: [],
                    graphic:[
                        {
                            type: 'text',
                            z: -10,
                            left: 'center', // 相对父元素居中
                            top: 'middle',  // 相对父元素居中
                            rotation: Math.PI / 4,
                            style: {
                                fill: '#eee',
                                text: '品牌气象站',
                                font: 'bold 34px Microsoft YaHei'
                            }
                        }
                    ],
                    series: []
                },
                scatterLoading: true,

                //气泡图热点事件

                graphChartLoading: true,
                graphChartOption: {
                    title: {

                        text: '媒体展示',
                        textStyle: {
                            color:'#3C3F41',
                            fontStyle: 'normal',
                            fontWeight: 'border',
                            fontSize: 16,
                        },
                        top:0,
                        left: 'right',
                        link:'/media',
                        target:'blank'

                    },
                    tooltip: {

                        formatter: '{b}'
                    },
                    legend: {
                        show:false,
                        data: ["传播源点", "一层转发", "二层转发", "三层转发", "四层转发", "五层转发", "六层转发","六层以上"],
                        left: 10,
                        top:23,
                        width: 120
                    },
                    animationDuration: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    //加上之后导致title字体大小被改变
//                    graphic:[
//                        {
//                            type: 'text',
//                            z: -10,
//                            left: 'center', // 相对父元素居中
//                            top: 'middle',  // 相对父元素居中
//                            rotation: Math.PI / 4,
//                            style: {
//                                fill: '#eee',
//                                text: '品牌气象站',
//                                font: 'bold 34px Microsoft YaHei'
//                            }
//                        }
//                    ],
                    series: [
                        {
                            name: '传播路径',
                            type: 'graph',
                            layout: 'force',
                            force: {
                                initLayout:"",
                                repulsion: 150,
                                gravity: 0.01,
                                edgeLength: 100,
                                layoutAnimation: true,
                            },
                            draggable:true,
                            data: [],
                            links: [],
                            categories: [{"name": "传播源点"}, {"name": "一层转发"}, {"name": "二层转发"}, {"name": "三层转发"}, {"name": "四层转发"}, {"name": "五层转发"}, {"name": "六层转发"}, {"name": "六层以上"}],
                            roam: true,
                            label: {
                                normal: {
                                    position: 'inside',
                                    formatter: '{b}',
                                    textStyle: {
                                        color: '#666',
                                        fontStyle: 'normal',
                                        fontWeight: 'normal',
                                        fontFamily: 'sans-serif',
                                        fontSize: 14,
                                    }
                                }
                            }
                        }
                    ]
                },
                graphChartLoading: false,
                graphData:[]


            }
        },
        methods: {
            getHotRealtime(){
                return Api.getHotRealtime({}).then(resp => {
                    console.log('getHotRealtime', resp.data);
                    if(resp.data.code == 0){
                        this.scatterLoading = false;
                        const scatters = resp.data.data;
                        this.scatterOption.title = _.map(scatters, (scatter, index) => {
                            return ({
                                textBaseline: 'middle',
                                textStyle: {fontSize: 16},
                                top: `${index * 20 + 10}%`,
                                text: scatter.name
                            });
                        });
                        this.scatterOption.singleAxis = _.map(scatters, (scatter, index) => {
                            return ({
                                left: 180,
                                type: 'category',
                                boundaryGap: false,
                                data: _.map(scatter.data, item => item.date),
                                top: `${4 + index * 20}%`,
                                height: '10%',
                                axisLine: {
                                    lineStyle: {color: '#aaa'}
                                },
                                splitLine: {
                                    lineStyle: {type: 'dashed'}
                                },
                                axisLabel: {
                                    interval: 2
                                }
                            });
                        });
                        this.scatterOption.series = _.map(scatters, (scatter, index) => {
                            const max = _.chain(scatter.data)
                                        .map(value => value.value)
                                        .max(value => value).value(),
                                    step = Math.ceil(max / 50);
                            return ({
                                singleAxisIndex: index,
                                coordinateSystem: 'singleAxis',
                                type: 'scatter',
                                data: _.map(scatter.data, (item, index) => [index, item.value]),
                                symbolSize(dataItem) {
                                    return dataItem[1] / step;
                                }
                            });
                        });
                    }
                });
            },
            showDetail(item,idx){
                if(idx ==0){
                    this.source = '今日';
                };
                if(idx ==1){
                    this.source ='实时';
                }
                this.activeHot = {name:item.title,value:item};
                console.log('aaa',this.activeHot);
                this.showChart(this.activeHot);
            },
            showChart(activeHot){
                const activeSentiment = activeHot.value.sentiment;
                const activeWordCloud = activeHot.value.word_cloud;
                console.log('activeWordCloud',activeWordCloud);
                console.log('activeSentiment',activeSentiment.happy,activeSentiment.anger,this.common.disgust);
                this.sentimentOption.series[0].data=[
                 {value:activeSentiment.happy,name : this.common.happy}, {value: activeSentiment.anger, name: this.common.anger}, {value: activeSentiment.sorrow, name: this.common.sorrow},{value: activeSentiment.disgust, name: this.common.disgust}, {value: activeSentiment.fear, name: this.common.fear}
                 ];
                 this.hotWordsOption.series.data=_.map(activeWordCloud,(value,key)=>{
                     return {"name":key,"value":value}
                 })
                console.log('this.hotWordsOption.series.data',this.hotWordsOption.series.data)
            },
            graphchart(){
                this.graphChartOption.series[0].data=[
                    {"id":"0","name":(this.popHotsRanking)[0],"itemStyle":null,"symbolSize":19.12381,"x":-266.82776,"y":299.6904,"attributes":{"modularity_class":0},"value":28.685715,"label":{"normal":{"show":true}},"category":5},
                    {"id":"1","name":"Napoleon","itemStyle":null,"symbolSize":22.6666666666666665,"x":-418.08344,"y":446.8853,"attributes":{"modularity_class":0},"value":4,"label":{"normal":{"show":false}},"category":0},
                    {"id":"2","name":"MlleBaptistine","itemStyle":null,"symbolSize":26.323809333333333,"x":-212.76357,"y":245.29176,"attributes":{"modularity_class":1},"value":9.485714,"label":{"normal":{"show":false}},"category":0},
                    {"id":"3","name":"MmeMagloire","itemStyle":null,"symbolSize":26.323809333333333,"x":-242.82404,"y":235.26283,"attributes":{"modularity_class":0},"value":9.485714,"label":{"normal":{"show":false}},"category":0},
                    {"id":"4","name":"CountessDeLo","itemStyle":null,"symbolSize":16.6666666666666665,"x":-379.30386,"y":429.06424,"attributes":{"modularity_class":0},"value":4,"label":{"normal":{"show":false}},"category":0},
                    {"id":"5","name":"Geborand","itemStyle":null,"symbolSize":22.6666666666666665,"x":-417.26337,"y":406.03506,"attributes":{"modularity_class":0},"value":4,"label":{"normal":{"show":false}},"category":0},

                    {"id":"6","name":"Champtercier","itemStyle":null,"symbolSize":19.6666666666666665,"x":-332.6012,"y":485.16974,"attributes":{"modularity_class":0},"value":4,"label":{"normal":{"show":false}},"category":2},
                    {"id":"7","name":"Cravatte","itemStyle":null,"symbolSize":22.6666666666666665,"x":-382.69568,"y":475.09113,"attributes":{"modularity_class":0},"value":4,"label":{"normal":{"show":false}},"category":2},
                    {"id":"8","name":"Count","itemStyle":null,"symbolSize":19.6666666666666665,"x":-320.384,"y":387.17325,"attributes":{"modularity_class":0},"value":4,"label":{"normal":{"show":false}},"category":2},
                    {"id":"9","name":"OldMan","itemStyle":null,"symbolSize":22.6666666666666665,"x":-344.39832,"y":451.16772,"attributes":{"modularity_class":0},"value":4,"label":{"normal":{"show":false}},"category":2},
                    {"id":"10","name":(this.popHotsRanking)[1],"itemStyle":null,"symbolSize":22.6666666666666665,"x":-89.34107,"y":234.56128,"attributes":{"modularity_class":1},"value":4,"label":{"normal":{"show":true}},"category":1},

                    {"id":"11","name":(this.popHotsRanking)[2],"itemStyle":null,"symbolSize":26.66666666666667,"x":-87.93029,"y":-6.8120565,"attributes":{"modularity_class":0},"value":100,"label":{"normal":{"show":true}},"category":4},
                    {"id":"12","name":"Marguerite","itemStyle":null,"symbolSize":24.495239333333333,"x":-339.77908,"y":-184.69139,"attributes":{"modularity_class":1},"value":6.742859,"label":{"normal":{"show":false}},"category":1},
                    {"id":"13","name":"MmeDeR","itemStyle":null,"symbolSize":22.6666666666666665,"x":-194.31313,"y":178.55301,"attributes":{"modularity_class":1},"value":4,"label":{"normal":{"show":false}},"category":1},
                    {"id":"14","name":"Isabeau","itemStyle":null,"symbolSize":23.6666666666666665,"x":-158.05168,"y":201.99768,"attributes":{"modularity_class":1},"value":4,"label":{"normal":{"show":false}},"category":1},
                    {"id":"15","name":"Gervais","itemStyle":null,"symbolSize":23.6666666666666665,"x":-127.701546,"y":242.55057,"attributes":{"modularity_class":1},"value":4,"label":{"normal":{"show":false}},"category":1},

                    {"id":"16","name":"Tholomyes","itemStyle":null,"symbolSize":27.295237333333333,"x":-385.2226,"y":-393.5572,"attributes":{"modularity_class":2},"value":25.942856,"label":{"normal":{"show":false}},"category":1},
                    {"id":"17","name":"Listolier","itemStyle":null,"symbolSize":19.638097333333334,"x":-516.55884,"y":-393.98975,"attributes":{"modularity_class":2},"value":20.457146,"label":{"normal":{"show":false}},"category":4},
                    {"id":"18","name":"Fameuil","itemStyle":null,"symbolSize":29.638097333333334,"x":-464.79382,"y":-493.57944,"attributes":{"modularity_class":2},"value":20.457146,"label":{"normal":{"show":false}},"category":4},
                    {"id":"19","name":"Blacheville","itemStyle":null,"symbolSize":23.638097333333334,"x":-515.1624,"y":-456.9891,"attributes":{"modularity_class":2},"value":20.457146,"label":{"normal":{"show":false}},"category":4},
                    {"id":"20","name":"Favourite","itemStyle":null,"symbolSize":23.638097333333334,"x":-408.12122,"y":-464.5048,"attributes":{"modularity_class":2},"value":20.457146,"label":{"normal":{"show":false}},"category":5},
                    {"id":"21","name":(this.popHotsRanking)[3],"itemStyle":null,"symbolSize":23.638097333333334,"x":-408.12122,"y":-464.5048,"attributes":{"modularity_class":3},"value":20.457146,"label":{"normal":{"show":true}},"category":4},

                    {"id":"22","name":(this.popHotsRanking)[4],"itemStyle":null,"symbolSize":23.638097333333334,"x":-208.12122,"y":-234.5048,"attributes":{"modularity_class":1},"value":5.457146,"label":{"normal":{"show":true}},"category":3},
                    {"id":"23","name":"Favourite","itemStyle":null,"symbolSize":25.638097333333334,"x":-308.12122,"y":-454.5048,"attributes":{"modularity_class":2},"value":6.457146,"label":{"normal":{"show":false}},"category":7},
                    {"id":"24","name":"Favourite","itemStyle":null,"symbolSize":24.338097333333334,"x":-508.12122,"y":-424.5048,"attributes":{"modularity_class":2},"value":8.457146,"label":{"normal":{"show":false}},"category":7},
                    {"id":"25","name":"Favourite","itemStyle":null,"symbolSize":22.638097333333334,"x":-228.12122,"y":-254.5048,"attributes":{"modularity_class":2},"value":4.457146,"label":{"normal":{"show":false}},"category":7},
                    {"id":"26","name":"Favourite","itemStyle":null,"symbolSize":24.568097333333334,"x":-438.12122,"y":-334.5048,"attributes":{"modularity_class":2},"value":7.457146,"label":{"normal":{"show":false}},"category":7},

                ];
                this.graphChartOption.series[0].links=[

                    {"id":"0","name":null,"source":"1","target":"0","lineStyle":{"normal":{width:0}}},
                    {"id":"1","name":null,"source":"2","target":"0","lineStyle":{"normal":{width:0}}},
                    {"id":"2","name":null,"source":"3","target":"0","lineStyle":{"normal":{width:0}}},
                    {"id":"3","name":null,"source":"3","target":"0","lineStyle":{"normal":{width:0}}},
                    {"id":"4","name":null,"source":"4","target":"0","lineStyle":{"normal":{width:0}}},
                    {"id":"5","name":null,"source":"5","target":"0","lineStyle":{"normal":{width:0}}},

                    {"id":"6","name":null,"source":"6","target":"10","lineStyle":{"normal":{width:0}}},
                    {"id":"7","name":null,"source":"7","target":"10","lineStyle":{"normal":{width:0}}},
                    {"id":"8","name":null,"source":"8","target":"10","lineStyle":{"normal":{width:0}}},
                    {"id":"9","name":null,"source":"9","target":"10","lineStyle":{"normal":{width:0}}},
                    {"id":"10","name":null,"source":"10","target":"10","lineStyle":{"normal":{width:0}}},

                    {"id":"11","name":null,"source":"11","target":"11","lineStyle":{"normal":{width:0}}},
                    {"id":'12',"name":null,"source":"12","target":"11","lineStyle":{"normal":{width:0}}},
                    {"id":"13","name":null,"source":"13","target":"11","lineStyle":{"normal":{width:0}}},
                    {"id":"14","name":null,"source":"14","target":"11","lineStyle":{"normal":{width:0}}},
                    {"id":"15","name":null,"source":"15","target":"11","lineStyle":{"normal":{width:0}}},
                    {"id":"16","name":null,"source":"16","target":"11","lineStyle":{"normal":{width:0}}},

                    {"id":"17","name":null,"source":"17","target":"21","lineStyle":{"normal":{width:0}}},
                    {"id":"18","name":null,"source":"18","target":"21","lineStyle":{"normal":{width:0}}},
                    {"id":"19","name":null,"source":"19","target":"21","lineStyle":{"normal":{width:0}}},
                    {"id":"20","name":null,"source":"20","target":"21","lineStyle":{"normal":{width:0}}},
                    {"id":"21","name":null,"source":"21","target":"21","lineStyle":{"normal":{width:0}}},

                    {"id":"22","name":null,"source":"22","target":"22","lineStyle":{"normal":{width:0}}},
                    {"id":"23","name":null,"source":"23","target":"22","lineStyle":{"normal":{width:0}}},
                    {"id":"24","name":null,"source":"24","target":"22","lineStyle":{"normal":{width:0}}},
                    {"id":"25","name":null,"source":"25","target":"22","lineStyle":{"normal":{width:0}}},
                    {"id":"26","name":null,"source":"26","target":"22","lineStyle":{"normal":{width:0}}},


                ];
            },

            //实时
            getRealList(){
                Api.getRealList({}).then(resp=>{
                    console.log('resp',resp);
                    if(resp.data.code ==0){
                        this.hotsRanking =_.keys(resp.data.data);
                        this.popHotsRanking =_.map(this.hotsRanking,val =>{
                            if(val.length>30){
                                val =val.substring(0,30)+'...';
                            }
                            return val;
                        })
                        this.hotsRankings =_.each(_.toArray( _.object(_.pairs(resp.data.data))),(value,key)=>{
                            return value.title = (this.hotsRanking)[key];
                        });
                        console.log('this.hotsRankings',this.hotsRankings);
                        console.log('this.hotsRanking',this.hotsRanking);
                        this.graphchart();
                    }
                })
            },
            //当天
            getTodayList(){
                Api.getTodayList({}).then(resp => {
                    console.log('resp', resp);
                    if (resp.data.code == 0) {
                        this.hotsTodayRanking = _.keys(resp.data.data);
                        this.hotsTodayRankings = _.each(_.toArray(_.object(_.pairs(resp.data.data))), (value, key)=> {
                            return value.title = (this.hotsTodayRanking)[key];
                        });
                        if (this.activeHot.name == '') {
                            this.activeHot = {name: (this.hotsTodayRanking)[0], value: (this.hotsTodayRankings)[0]};

                            console.log('初始化this.activeHot', this.activeHot);
                            this.showChart(this.activeHot);
                    }
                }
            }
                )
                }
        },
        filters: {
            title(title){
                let hot = this.activeHot.name;
                const source = this.source;
                if(hot.length>=18){
                    hot = hot.substring(0,15)+'...';
                };
                return `${title} (${source}:${hot} )`;

            }
        },
        created(){
            this.getRealList();
            this.getTodayList();
            this.getHotRealtime();
            this.graphchart();

        },
        components:{ CardPanel }
    }
</script>
