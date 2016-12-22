<template>

    <div v-show="showRow" class="container">
    <div  class="hot-panel">
        <!--热点事件散点图-->
        <div class="row">
            <div class="col-md-12 hot-river">
                <card-panel :title="words.hotsRiver" >
                    <a class="fullpage pull-right" href='Javascript: void(0)' v-on:click="getFull(false)"><i class="fa fa-expand"></i> 全屏</a>
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
    </div>
    </div>

        <div v-show="!showRow" v-bind:style="{height:sheight +'px'}" class="bg">
            <card-panel :title="words.hotsRiver" >
                <a class="fullpage pull-right" href='Javascript: void(0)' v-on:click="getFull(true)"><i class="fa fa-compress"></i>返回</a>
                <div  v-bind:style="{height:sheightin +'px'}" v-echarts="graphChartOption" :loading="graphChartLoading" class="hot-river-scatter" theme="" :img.sync="img"></div>
            </card-panel>
        </div>

    <!--注释的热点事件散点图-->
    <!--<div class="row">
        <div class="col-md-12 hot-river">
            <card-panel :title="words.hotsRiver">
                <div v-echarts="scatterOption" :loading="scatterLoading" class="hot-river-scatter" theme="" :img.sync="img"></div>
            </card-panel>
        </div>
    </div>-->


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
                hotColor:["rgba(253,0,0,1)","rgba(216,0,253,1)","rgba(0,0,253,1)","rgba(0,253,253,1)","rgba(0,253,0,1)","rgba(253,253,0,1)","rgba(253,150,0,1)","rgba(150,64,65,1)","rgba(60,118,61,1)","rgba(60,61,130,1)"],
                hotOpacityColor:["rgba(253,0,0,0.6)","rgba(216,0,253,0.6)","rgba(0,0,253,0.6)","rgba(0,253,253,0.6)","rgba(0,253,0,0.6)","rgba(253,253,0,0.6)","rgba(253,150,0,0.6)","rgba(150,64,65,0.6)","rgba(60,118,61,0.6)","rgba(60,61,130,0.6)"],
                sheight:800,
                sheightin:700,
                // 热点情绪占比
                showRow:true,
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
                    graphic:Pie.graphic,
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
                    graphic:Chart.graphic,
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
                        data: ["传播源点", "一层转发", "二层转发", "三层转发", "四层转发", "五层转发", "六层转发","七层转发", "八层转发", "九层转发","十层转发"],
                        left: 10,
                        top:23,
                        width: 120
                    },
                    animationDuration: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    //加上之后导致title字体大小被改变
//                    graphic:Chart.graphic,
                    series: [
                        {
                            name: '传播路径',
                            type: 'graph',
                            layout: 'force',
                            force: {
                                initLayout:"",
                                repulsion: 30,
                                gravity: 0.01,
                                edgeLength: 100,
                                layoutAnimation: true,
                            },
                            draggable:true,
                            data: [],
                            links: [],
                            categories: [{"name": "传播源点"}, {"name": "一层转发"}, {"name": "二层转发"}, {"name": "三层转发"}, {"name": "四层转发"}, {"name": "五层转发"}, {"name": "六层转发"}, {"name": "七层转发"}, {"name": "八层转发"}, {"name": "九层转发"}, {"name": "十层转发"}],
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
            getFull(boot){
                this.sheight= 0.8*window.screen.availHeight;
                this.sheightin= 0.75*window.screen.availHeight;
                this.showRow=boot;
                this.getRealList();
                this.getTodayList();
                //this.getHotRealtime();
                //this.graphchart();
                console.log('fullpages');


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
                console.log('this.popHostRanking',this.popHotsRanking);
                const chartData=[];
                const chartList=[];
                _.each(this.popHotsRanking,(item,index)=>{
                    chartData.push({"id":10*index+0+'',"name":item,"symbolSize":39.12381,"attributes":{"modularity_class":0},"x":-266.82776,"y":29.6904,"value":28.685715,"itemStyle":{"normal":{"color":(this.hotColor)[index]}},"label":{"normal":{"show":true}},"category":index});
                    chartData.push({"id":10*index+1+'',"name":"Napoleon","symbolSize":22.6666666666666665,"attributes":{"modularity_class":0},"x":-418.08344,"y":446.8853,"value":4,"itemStyle":{"normal":{"color":(this.hotOpacityColor)[index]}},"label":{"normal":{"show":false}},"category":index});
                    chartData.push({"id":10*index+2+'',"name":"MlleBaptistine","symbolSize":26.323809333333333,"attributes":{"modularity_class":0},"x":-212.76357,"y":245.29176,"value":9.485714,"itemStyle":{"normal":{"color":(this.hotOpacityColor)[index]}},"label":{"normal":{"show":false}},"category":index});
                    chartData.push({"id":10*index+3+'',"name":"MmeMagloire","symbolSize":26.323809333333333,"attributes":{"modularity_class":0},"x":-242.82404,"y":235.26283,"value":9.485714,"itemStyle":{"normal":{"color":(this.hotOpacityColor)[index]}},"label":{"normal":{"show":false}},"category":index});
                    chartData.push({"id":10*index+4+'',"name":"CountessDeLo","symbolSize":26.6666666666666665,"attributes":{"modularity_class":0},"x":-379.30386,"y":429.06424,"value":4,"itemStyle":{"normal":{"color":(this.hotOpacityColor)[index]}},"label":{"normal":{"show":false}},"category":index});
                    chartData.push({"id":10*index+5+'',"name":"Geborand","symbolSize":22.6666666666666665,"attributes":{"modularity_class":0},"x":-417.26337,"y":406.03506,"value":4,"itemStyle":{"normal":{"color":(this.hotOpacityColor)[index]}},"label":{"normal":{"show":false}},"category":index});
                    chartData.push({"id":10*index+6+'',"name":"Geborand","symbolSize":22.6666666666666665,"attributes":{"modularity_class":0},"x":-417.26337,"y":406.03506,"value":4,"itemStyle":{"normal":{"color":(this.hotOpacityColor)[index]}},"label":{"normal":{"show":false}},"category":index});
                    chartData.push({"id":10*index+7+'',"name":"Geborand","symbolSize":22.6666666666666665,"attributes":{"modularity_class":0},"x":-417.26337,"y":406.03506,"value":4,"itemStyle":{"normal":{"color":(this.hotOpacityColor)[index]}},"label":{"normal":{"show":false}},"category":index});
                    chartData.push({"id":10*index+8+'',"name":"Geborand","symbolSize":22.6666666666666665,"attributes":{"modularity_class":0},"x":-417.26337,"y":406.03506,"value":4,"itemStyle":{"normal":{"color":(this.hotOpacityColor)[index]}},"label":{"normal":{"show":false}},"category":index});
                    chartData.push({"id":10*index+9+'',"name":"Geborand","symbolSize":22.6666666666666665,"attributes":{"modularity_class":0},"x":-417.26337,"y":406.03506,"value":4,"itemStyle":{"normal":{"color":(this.hotOpacityColor)[index]}},"label":{"normal":{"show":false}},"category":index});
                    //this.graphChartOption.series[0].links.push({"id":10*index+0,"name":null,"source":10*index+0,"target":10*index+0,"lineStyle":{"normal":{width:2}}});
                    chartList.push({"id":10*index+1+'',"name":null,"source":10*index+1+'',"target":10*index+0+'',"lineStyle":{"normal":{width:0}}});
                    chartList.push({"id":10*index+2+'',"name":null,"source":10*index+2+'',"target":10*index+0+'',"lineStyle":{"normal":{width:0}}});
                    chartList.push({"id":10*index+3+'',"name":null,"source":10*index+3+'',"target":10*index+0+'',"lineStyle":{"normal":{width:0}}});
                    chartList.push({"id":10*index+4+'',"name":null,"source":10*index+4+'',"target":10*index+0+'',"lineStyle":{"normal":{width:0}}});
                    chartList.push({"id":10*index+5+'',"name":null,"source":10*index+5+'',"target":10*index+0+'',"lineStyle":{"normal":{width:0}}});
                    chartList.push({"id":10*index+6+'',"name":null,"source":10*index+6+'',"target":10*index+0+'',"lineStyle":{"normal":{width:0}}});
                    chartList.push({"id":10*index+7+'',"name":null,"source":10*index+7+'',"target":10*index+0+'',"lineStyle":{"normal":{width:0}}});
                    chartList.push({"id":10*index+8+'',"name":null,"source":10*index+8+'',"target":10*index+0+'',"lineStyle":{"normal":{width:0}}});
                    chartList.push({"id":10*index+9+'',"name":null,"source":10*index+9+'',"target":10*index+0+'',"lineStyle":{"normal":{width:0}}});
                });
                this.graphChartOption.series[0].data = chartData;
                this.graphChartOption.series[0].links = chartList;
                console.log(this.graphChartOption.series[0].data,this.graphChartOption.series[0].links)
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

//						this.hotsRankings=_.filter(hgffd1, (info, index) => {
//                        return (index < 5);
//                    });

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
						
//						this.hotsTodayRankings=_.filter(gy1, (info, index) => {
//                        return (index < 5);
//                    });

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
            //this.getHotRealtime();
            //this.graphchart();

        },
        components:{ CardPanel }
    }
</script>
