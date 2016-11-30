<template>
    <!--<tabs :actions="actions" ></tabs>-->
    <!--<span>Sentiment</span>-->
    <div class="panel-title">
        <span class="panel-title-text">{{title}}</span>
        <div class="panel-title-delete" @click="deleteItem();"><i class="fa fa-minus"></i></div>
    </div>
    <div class="charts">
        <!--<div class="charts">-->
            <!--<div class="chart timeBar" :click="clickChartAction" v-echarts="sentimentBarOption" :loading="sentimentBarLoading" ></div>-->
            <!--<div class="chart percentBar" v-echarts="sentimentPieOption" :loading="sentimentPieLoading"></div>-->
        <!--</div>-->

       <div class="chart timeBar" :loading="sentimentBarLoading" >
            <echarts :options="sentimentBarOption" :initOptions="sentimentBarOption" :img.sync="master"></echarts>
        </div>
        <div class="chart percentBar"   :loading="sentimentChartLoading" >
            <!--<echarts :options="sentimentChartOption" :initOptions="sentimentChartOption" :img.sync="sub"></echarts>-->
            <echarts :options="sentimentPieOption" :initOptions="sentimentPieOption" :img.sync="sub"></echarts>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "Sentiment.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import moment from 'moment';
    import ListPanel from '../../Common/ListPanel/ListPanel.vue';
    import Echarts from '../../Common/Echarts/Echarts.vue';
    import Tabs from '../../Common/Tabs/Tabs.vue';
    import Local from "../../../local/local";
    import {Chart, Pie} from '../../../config/config';
    import * as Api from '../../../widgets/Api';
    import { insertExportImages, removeExportImages } from "../../../vuex/actions";
    import { exportImages } from '../../../vuex/getters'


    export default{
        props: ['title', 'data', 'remove', 'master', 'sub'],
        vuex: {
            actions: { insertExportImages, removeExportImages },
            getters: { exportImages }
        },
        watch:{
            master:{
                handler(value){
                    this.insertExportImages({
                        topic: this.data.topic,
                        topic_id: this.data.topic_id,
                        key: "sentiment_master",
                        value
                    });
                }
            },
            sub:{
                handler(value){
                    this.insertExportImages({
                        topic: this.data.topic,
                        topic_id: this.data.topic_id,
                        key: "sentiment_slave",
                        value
                    });
                }
            }
        },
        data(){
            const common = Local().common;
            return{
                common,
                options: [{key: 'time', value: '按时间排序'}, {key: 'browser', value: '浏览数排序'}, {key: 'star', value: '点赞数排序'}],
                //list: list.time,
                sortVal: "",
                x: [],
                sentimentArr: ["happy", "anger", "sorrow", "disgust", "fear"],
                sentimentMap: {happy: 0, anger: 1, sorrow: 2, disgust: 3, fear: 4},
                lineData: {
                    all: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    wechat: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    weibo: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    client: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    web: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    overseas: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    sengine: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    }
                },

                sentimentBarLoading: true,
                sentimentBarOption:{
                    isToggle: true,
                    title: _.extend({}, Chart.title, { show: false}),
                    tooltip: _.extend({}, Chart.tooltip, {
                        axisPointer : {
                            type : 'line',
                        }
                    }),
                    animation:false,
                    legend: {
                        data:[common.happy,common.anger,common.sorrow,common.disgust,common.fear]
                    },
                    dataZoom: _.extend({}, Chart.dataZoom),
                    //color:_.extend( Chart.color, {}),
                    grid: _.extend({}, Chart.grid, {
                        bottom: '40rem',
                    }),
                    toolbox: _.extend({}, Chart.toolbox),
                    xAxis: _.extend({}, Chart.xAxis, {
                        type : 'category',  //category
                        data: [],
                        boundaryGap : false
                    }),
                    yAxis: _.extend({}, Chart.yAxis, {
                        type : 'value',
                        boundaryGap : false
                    }),
                    progressive: 4,
                    textStyle: Chart.textStyle,
                    color:['#2FCC71','#E64D3D', '#F1C40F', '#3598DC', '#737373'],
                    graphic:[
                        {
                            type: 'text',
                            z: -10,
                            left: 'center', // 相对父元素居中
                            top: 'middle',  // 相对父元素居中
                            rotation: Math.PI / 4,
                            style: {
                                fill: '#eee',
                                text: '沃德品牌气象站',
                                font: 'bold 34px Microsoft YaHei'
                            }
                        }
                    ],
                    series : [{
                        name:common.happy,
                        type:'line',
                        //areaStyle: {normal: {}},
                        //stack: 'Total',
                        data: []
                    }, {
                        name:common.anger,
                        type:'line',
                        //areaStyle: {normal: {}},
                        //stack: 'Total',
                        data: []
                    }, {
                        name:common.sorrow,
                        type:'line',
                        //areaStyle: {normal: {}},
                        //stack: 'Total',
                        data: []
                    }, {
                        name:common.disgust,
                        type:'line',
                        //areaStyle: {normal: {}},
                        //stack: 'Total',
                        data: []
                    }, {
                        name:common.fear,
                        type:'line',
                        //areaStyle: {normal: {}},
                        //stack: 'Total',
                        data: []
                    }]
                },
                sentimentPieLoading:false,
                sentimentPieOption:{

                    tooltip: {
                        show:true,
                        trigger: 'item',
                        formatter:"{b}:({d}%)"
                    },
                    /*legend: {
                     orient: 'vertical',
                     bottom:0,
                     data:[common.happy,common.anger,common.sorrow,common.disgust,common.fear]
                     },*/
                    legend: _.extend({}, Pie.legend, {
                        bottom: 0,
                        data: [common.happy,common.anger,common.sorrow,common.disgust,common.fear]
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
                                text: '沃德品牌气象站',
                                font: 'bold 34px Microsoft YaHei'
                            }
                        }
                    ],
                    series: [
                        {
                            label:{
                                normal:{
                                    show:true,
                                    formatter:"{d}%"
                                }
                            },
                            name:'',
                            type:'pie',
                            radius: '50%',
                            center: ['50%', '50%'],
                            data:[]
                        }
                    ]
                    /*isActive: true,
                     title: _.extend({}, Pie.title, { show: false}),
                     tooltip : {
                     trigger: 'item',
                     formatter: "{a} <br/>{b} : {c} ({d}%)"
                     },
                     legend: _.extend({}, Pie.legend, {
                     //orient: 'vertical',
                     //x: 'bottom',
                     bottom: 0,
                     data: ["满意", "愤怒", "失望", "反感", "害怕"]
                     }),
                     textStyle: Pie.textStyle,
                     toolbox: Pie.toolbox,
                     series: [
                     {
                     name:'',
                     type:'pie',
                     radius: ['30%', '70%'],
                     avoidLabelOverlap: false,
                     label: {
                     normal: {
                     show: false,
                     position: 'center'
                     },
                     emphasis: {
                     show: true,
                     textStyle: {
                     fontSize: '30',
                     fontWeight: 'bold'
                     }
                     }
                     },
                     labelLine: {
                     normal: {
                     show: false
                     }
                     },
                     data:[]
                     }
                     ]*/
                },

                /*sentimentChartLoading: true,
                sentimentChartOption: {
                    tooltip: _.extend({}, Chart.tooltip, {}),
                    legend: {
                        data: [common.happy, common.anger, common.sorrow, common.disgust, common.fear]
                    },
                    animation:false,
                    grid: _.extend({}, Chart.grid),
                    toolbox: _.extend({}, Chart.toolbox, {
                        feature: {
                            saveAsImage: {}
                        }
                    }),
                    progressive: 4,
                    textStyle: Chart.textStyle,
                    xAxis: _.extend({}, Chart.xAxis, {
                        type: 'value',
//                        interval: 10,
//                        axisLabel: {
//                            formatter: '{value}%'
//                        }
                    }),
                    yAxis: _.extend({}, Chart.yAxis, {
                        type: 'category',
                        data: ['微信', '微博', '网页', '客户端', '海外']
                    }),
                    color: _.extend([], Chart.color),
                    series: [
                        {
                            name: common.happy,
                            type: 'bar',
                            stack: '总量',
                            data: []
                        }, {
                            name: common.anger,
                            type: 'bar',
                            stack: '总量',
                            data: []
                        }, {
                            name: common.sorrow,
                            type: 'bar',
                            stack: '总量',
                            data: []
                        }, {
                            name: common.disgust,
                            type: 'bar',
                            stack: '总量',
                            data: []
                        }, {
                            name: common.fear,
                            type: 'bar',
                            stack: '总量',
                            data: []
                        }
                    ]
                }*/
            }
        },
        methods: {
            actions(val, idx){
                let source = "";
                switch(idx){
                    case 0:
                        source = 'all';
                        break;
                    case 1:
                        source = 'wechat';
                        break;
                    case 2:
                        source = 'weibo';
                        break;
                    case 3:
                        source = 'client';
                        break;
                    case 4:
                        source = 'web';
                        break;
                    case 5:
                        source = 'overseas';
                        break;
                    default:
                        break;
                }
                this.sentimentPieOption.series[0].data =[
                    {value:_.reduce(this.lineData[source].happy,(mome, val) => mome + val, 0), name:this.common.happy},
                    {value:_.reduce(this.lineData[source].anger,(mome, val) => mome + val, 0), name:this.common.anger},
                    {value:_.reduce(this.lineData[source].sorrow,(mome, val) => mome + val, 0), name:this.common.sorrow},
                    {value:_.reduce(this.lineData[source].disgust,(mome, val) => mome + val, 0), name:this.common.disgust},
                    {value:_.reduce(this.lineData[source].fear,(mome, val) => mome + val, 0), name:this.common.fear}
                ];
                _.each(this.lineData[source], (value, key) => {
                    this.sentimentBarOption.series[this.sentimentMap[key]].data = value;
                    //console.log('chakanshuju',value)
                });
                /*_.each(this.lineData[source], (value, key) => {
                    this.sentimentBarOption.series[this.sentimentMap[key]].data = value;
                });*/
            },
            getSentimentDetail(){
                const subtopic = this.data.subtopic,
                        topic_id = this.data.topic_id,
                        source = this.data.source,
                        time_interval = this.data.time_interval,
                        //time_dimension = this.data.time_dimension,
                        time_dimension = time_interval > 7 ? 1 : 0,
//                        start = moment().subtract(time_interval, 'days').format('YYYY-MM-DD'),
//                        end = moment().format('YYYY-MM-DD'),
                        topic = this.data.topic;
                let start,end;
                if(time_interval!=0){
                     start = moment().subtract(time_interval, 'days').format('YYYY-MM-DD'),
                            end = moment().format('YYYY-MM-DD');
                }else {
                     start = moment().subtract(8, 'hour').format('YYYY-MM-DD HH'),
                            end = moment().format('YYYY-MM-DD HH');
                    start = start.split(' ')[0] + 'T' + start.split(' ')[1];
                    end = end.split(' ')[0] + 'T' + end.split(' ')[1];
                    console.log('start', start, end);
                }
                Api.getSentimentDetail({ subtopic, topic_id, source, time_dimension, start, end, topic }).then(resp => {
                    //console.log("getSentimentDetail", JSON.stringify(resp.data.data));
                    if(resp.data.code == 0){

                        const details = resp.data.data;
                        console.log('查看是否进入报告内情绪数据请求',details);
                        this.x = _.map(details, detail => detail.date);
                        const _this = this;
                        //console.log("xxxx", this.x);
                        let all = {happy: [], anger:[], sorrow:[], disgust:[], fear:[]};
                        _.each(details, (detail, index) => {
                            _.each(detail.values, (value, key) => {
                                this.lineData[key].happy.push(detail.values[key].happy);
                                this.lineData[key].anger.push(detail.values[key].anger);
                                this.lineData[key].sorrow.push(detail.values[key].sorrow);
                                this.lineData[key].disgust.push(detail.values[key].disgust);
                                this.lineData[key].fear.push(detail.values[key].fear);
                            });
                            all.happy.push(_this.lineData.wechat.happy[index] + _this.lineData.weibo.happy[index] + _this.lineData.client.happy[index] + _this.lineData.web.happy[index] + _this.lineData.overseas.happy[index]);
                            all.anger.push(this.lineData.wechat.anger[index] + this.lineData.weibo.anger[index] + this.lineData.client.anger[index] + this.lineData.web.anger[index] + this.lineData.overseas.anger[index]);
                            all.sorrow.push(this.lineData.wechat.sorrow[index] + this.lineData.weibo.sorrow[index] + this.lineData.client.sorrow[index] + this.lineData.web.sorrow[index] + this.lineData.overseas.sorrow[index]);
                            all.disgust.push(this.lineData.wechat.disgust[index] + this.lineData.weibo.disgust[index] + this.lineData.client.disgust[index] + this.lineData.web.disgust[index] + this.lineData.overseas.disgust[index]);
                            all.fear.push(this.lineData.wechat.fear[index] + this.lineData.weibo.fear[index] + this.lineData.client.fear[index] + this.lineData.web.fear[index] + this.lineData.overseas.fear[index]);
                        });
                        this.lineData.all = all;
                        //console.log(this.lineData);

                        /*this.sentimentBarLoading = false;
                        this.sentimentChartLoading = false;
                        this.sentimentBarOption.xAxis.data = this.x;*/
                        this.sentimentBarLoading = false;
                        this.sentimentPieLoading = false;
                        this.sentimentBarOption.xAxis.data = this.x;

                        this.actions("", 0);

                        /*_.each(this.sentimentChartOption.series, function(value, index){
                            _.each(this.lineData, function(val, key){
                                if(key == "all") return;
                                const summary = _.reduce(this.lineData[key][this.sentimentArr[index]], (memo, val) => {
                                    return memo + val;
                                }, 0);
                                this.sentimentChartOption.series[index].data.push(summary);
                            }.bind(this));
                        }.bind(this));*/
                        const allNums=_.reduce(this.lineData.all.happy,(mome, val) => mome + val, 0)+_.reduce(this.lineData.all.anger,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.all.sorrow,(mome, val) => mome + val, 0)+_.reduce(this.lineData.all.disgust,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.all.fear,(mome, val) => mome + val, 0);
                        const wechatNums=_.reduce(this.lineData.wechat.happy,(mome, val) => mome + val, 0)+_.reduce(this.lineData.wechat.anger,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.wechat.sorrow,(mome, val) => mome + val, 0)+_.reduce(this.lineData.wechat.disgust,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.wechat.fear,(mome, val) => mome + val, 0);
                        const weiboNums=_.reduce(this.lineData.weibo.happy,(mome, val) => mome + val, 0)+_.reduce(this.lineData.weibo.anger,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.weibo.sorrow,(mome, val) => mome + val, 0)+_.reduce(this.lineData.weibo.disgust,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.weibo.fear,(mome, val) => mome + val, 0);
                        const clientNums=_.reduce(this.lineData.client.happy,(mome, val) => mome + val, 0)+_.reduce(this.lineData.client.anger,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.client.sorrow,(mome, val) => mome + val, 0)+_.reduce(this.lineData.client.disgust,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.client.fear,(mome, val) => mome + val, 0);
                        const webNums=_.reduce(this.lineData.web.happy,(mome, val) => mome + val, 0)+_.reduce(this.lineData.web.anger,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.web.sorrow,(mome, val) => mome + val, 0)+_.reduce(this.lineData.web.disgust,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.web.fear,(mome, val) => mome + val, 0);
                        const overseasNums=_.reduce(this.lineData.overseas.happy,(mome, val) => mome + val, 0)+_.reduce(this.lineData.overseas.anger,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.overseas.sorrow,(mome, val) => mome + val, 0)+_.reduce(this.lineData.overseas.disgust,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.overseas.fear,(mome, val) => mome + val, 0);
                        this.sentimentNums =[
                            allNums,
                            wechatNums,
                            weiboNums,
                            clientNums,
                            webNums,
                            overseasNums
                        ];
                    }

                });
            },
            deleteItem(){
                const detail = this.data;
                this.remove(detail, 'sentiment');
            },
            initData(){
                this.lineData = {
                    all: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    wechat: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    weibo: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    client: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    web: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    overseas: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    sengine: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    }
                };
                /*this.sentimentChartOption.series = [
                 {
                 name: this.common.happy,
                 type: 'bar',
                 stack: '总量',
                 data: []
                 }, {
                 name: this.common.anger,
                 type: 'bar',
                 stack: '总量',
                 data: []
                 }, {
                 name: this.common.sorrow,
                 type: 'bar',
                 stack: '总量',
                 data: []
                 }, {
                 name: this.common.disgust,
                 type: 'bar',
                 stack: '总量',
                 data: []
                 }, {
                 name: this.common.fear,
                 type: 'bar',
                 stack: '总量',
                 data: []
                 }
                 ];*/
            },
            init(){
                this.initData();
                this.getSentimentDetail();
            }
        },
        components:{
            Tabs, ListPanel, Echarts
        },
        ready(){
            this.init();
        }
    }
</script>
