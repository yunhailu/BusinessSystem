<template>
    <tabs :actions="actions" :datas="sentimentNums"></tabs>
    <!--<span>Sentiment</span>-->
    <div class="charts">
        <div class="chart timeBar" :click="clickChartAction" v-echarts="sentimentBarOption" :loading="sentimentBarLoading" ></div><!--theme="infographic"-->
        <!--<div class="chart percentBar" v-echarts="sentimentChartOption" :loading="sentimentChartLoading" ></div>-->
        <div class="chart percentBar" v-echarts="sentimentPieOption" :loading="sentimentPieLoading"></div>
    </div>
    <!--<div class="charts"></div>-->

    <list-panel :list="list" :options="options" :select-title="selectTitle" :select-value.sync="sortVal"></list-panel>
    <tips :visible.sync="loadingParams.visiable" :tipsparam.sync="loadingParams"></tips>
</template>
<style lang="less" scoped>
    @import "Sentiment.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    //import { list } from "../../config/tmpData";
    import ListPanel from '../Common/ListPanel/ListPanel.vue';
    import Tabs from '../Common/Tabs/Tabs.vue';
    import Tips from '../Common/Tips/Tips.vue';
    import Local from "../../local/local";
    import {Chart, Pie} from '../../config/config';
    import * as Api from '../../widgets/Api';
    import { analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, activeAnalyticsTopic } from '../../vuex/getters';


    export default{
        data(){
            const common = Local().common;
            return{
                common,
                loadingParams: {
                    visiable: false,
                    type: 'loading',
                    content: "请稍后......"
                },
                options: [{key: 'time', value: '按时间排序'}, {key: 'browser', value: '浏览数排序'}, {key: 'star', value: '点赞数排序'}],
                //list: list.time,
                list: [],
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
                    }
                },

                sentimentBarLoading: true,
                sentimentBarOption:{
                    isToggle: true,
                    title: _.extend({}, Chart.title, { show: false}),
                    tooltip: _.extend({}, Chart.tooltip, {
                        axisPointer : {
                            type : 'line'
                        }
                    }),
                    legend: {
                        data:[common.happy,common.anger,common.sorrow,common.disgust,common.fear]
                    },
                    dataZoom: _.extend({}, Chart.dataZoom),
                    color:_.extend( Chart.color, {}),
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


               /* sentimentChartLoading: true,
                sentimentChartOption: {
                    tooltip: _.extend({}, Chart.tooltip, {}),
                    legend: {
                        data: [common.happy, common.anger, common.sorrow, common.disgust, common.fear]
                    },
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
                },*/
               sentimentPieLoading:false,
                sentimentPieOption:{

                    tooltip: {
                        show:true,
                        trigger: 'item',
                        formatter:"{b}:({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x : 'right',
                        y : 'bottom',
                        data:[common.happy,common.anger,common.sorrow,common.disgust,common.fear]
                    },

                    color:['#2FCC71','#E64D3D', '#F1C40F', '#3598DC', '#737373'],
                    textStyle: Pie.textStyle,
                    toolbox: Pie.toolbox,
                    series: [

                        {
                            /*label:{
                                normal:{
                                    show:true,
                                    formatter:"{b}:({d}%)"
                                }
                            },*/
                            name:'',
                            type:'pie',
                            radius: '60%',
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
                sentimentNums: []
            }
        },
        vuex: {
            getters: { analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, activeAnalyticsTopic }
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
                //this.sentimentPieOption.series[0].name = source;
                this.sentimentPieOption.series[0].data =[
                    {value:_.reduce(this.lineData[source].happy,(mome, val) => mome + val, 0), name:this.common.happy},
                    {value:_.reduce(this.lineData[source].anger,(mome, val) => mome + val, 0), name:this.common.anger},
                    {value:_.reduce(this.lineData[source].sorrow,(mome, val) => mome + val, 0), name:this.common.sorrow},
                    {value:_.reduce(this.lineData[source].disgust,(mome, val) => mome + val, 0), name:this.common.disgust},
                    {value:_.reduce(this.lineData[source].fear,(mome, val) => mome + val, 0), name:this.common.fear}
                ];
                _.each(this.lineData[source], (value, key) => {
                    this.sentimentBarOption.series[this.sentimentMap[key]].data = value;
                    console.log('chakanshuju',value)
                });
                //this.getCommentList();
            },
            clickChartAction(opts){
                console.log('clickChartAction opts', opts);
                this.loadingParams.visiable = true;
                const topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_dimension = 0,
                        type = "time",
                        end = opts.name.split(":")[0],
                        start = opts.name.split(":")[0];
                Api.getCommentList({type, topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    //console.log(resp.data);
                    this.loadingParams.visiable = false;
                    if(resp.data.code == 0){
                        this.list = resp.data.data;
                    }
                });
            },
            getCommentList(type = 'time'){
                const topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0,
                        end = this.analyticsEnd,
                        start = this.analyticsStart;
                Api.getCommentList({type, topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    //console.log(resp.data);
                    this.loadingParams.visiable = false;
                    if(resp.data.code == 0){
                        this.list = resp.data.data;
                    }
                });
            },
            getSentimentDetail(){
                const topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0,
                        end = this.analyticsEnd,
                        start = this.analyticsStart;
                Api.getSentimentDetail({ topic_id, topic, subtopic, source, start, end, time_dimension }).then(resp => {
                    //console.log("getSentimentDetail", JSON.stringify(resp.data.data));
                    this.loadingParams.visiable = false;
                    if(resp.data.code == 0){
                        const details = resp.data.data;
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

                        this.sentimentBarLoading = false;
                        //this.sentimentChartLoading = false;
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

                        //console.log('all', this.lineData.all);
                        //console.log('wechat', this.lineData.wechat);
                        this.sentimentNums = [
                            _.chain(this.lineData.all).map(item => _.reduce(item, (memo, val) => (memo + val), 0)).reduce((memo, val) => (memo, val), 0).value(),
                            _.chain(this.lineData.wechat).map(item => _.reduce(item, (memo, val) => (memo + val), 0)).reduce((memo, val) => (memo, val), 0).value(),
                            _.chain(this.lineData.weibo).map(item => _.reduce(item, (memo, val) => (memo + val), 0)).reduce((memo, val) => (memo, val), 0).value(),
                            _.chain(this.lineData.client).map(item => _.reduce(item, (memo, val) => (memo + val), 0)).reduce((memo, val) => (memo, val), 0).value(),
                            _.chain(this.lineData.web).map(item => _.reduce(item, (memo, val) => (memo + val), 0)).reduce((memo, val) => (memo, val), 0).value(),
                            _.chain(this.lineData.overseas).map(item => _.reduce(item, (memo, val) => (memo + val), 0)).reduce((memo, val) => (memo, val), 0).value()
                        ];
                    }

                });
                console.log('查看测试数据',this.lineData);
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
                this.getCommentList();
                console.log('chakanshuju',this.lineData);
            }
        },
        ready(){
            if(this.activeAnalyticsTopic && this.activeAnalyticsTopic.topic_id){
                this.init();
            }
        },
        watch: {
            activeAnalyticsTopic: {
                handler(val){
                    this.sentimentBarLoading = true;
                    //this.sentimentChartLoading = true;
                    this.sentimentPieLoading = true;
                    this.init(val);
                }
            },
            analyticsDateChange: {
                handler(val){
                    this.loadingParams.visiable = true;
                    this.init();
                }
            },
            analyticsSubTopic: {
                handler(val){
                    this.loadingParams.visiable = true;
                    this.init();
                }
            },
            analyticsSource: {
                handler(val){
                    this.loadingParams.visiable = true;
                    this.getCommentList();
                }
            },
            sortVal: {
                handler(val, oldVal){
                    if(val != oldVal){
                        // 展示不同的列表信息
                        //console.log(val, oldVal);
                        //this.list = list[val.key];
                        this.getCommentList(val.key);
                    }
                }
            }
        },
        components:{
            Tabs, ListPanel, Tips
        },
//        route: {
//            data(){
//                this.init();
//            }
//        }
    }
</script>
