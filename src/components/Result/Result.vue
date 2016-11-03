<template>
    <tabs :actions="actions" :datas="summaryNums"></tabs>
    <!--<span>Result</span>-->
    <div class="charts">
        <!--<div class="arrow animated rubberBand" @click="toggle">-->
            <!--<i class="fa fa-angle-left fa-3x" transition="rotate" :class="[resultPieChartOption.isActive ? 'fa-rotate-180' : '']"></i>-->
        <!--</div>-->
        <div class="chart" v-echarts="resultChartOption" :click="clickChartAction" :loading="resultChartLoading" :class="[resultChartOption.isToggle ? 'active' : '']" :resize="resultChartOption.isToggle" theme="macarons"></div>
        <div class="pie" v-echarts="resultPieChartOption" :loading="resultPieChartLoading" :class="[resultPieChartOption.isActive ? 'active' : '']" translate="show-pie"  theme="macarons"></div>
    </div>
    <list-panel :list="list" :options="options" :select-title="selectTitle" :select-value.sync="sortVal"></list-panel>
    <tips :visible.sync="loadingParams.visiable" :tipsparam.sync="loadingParams"></tips>
</template>
<style lang="less" scoped>
    @import "Result.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import moment from 'moment';
    import Local from "../../local/local";
    import * as Api from "../../widgets/Api";
    import { Chart, Pie } from '../../config/config';
    import { list } from "../../config/tmpData";
    import ListPanel from '../Common/ListPanel/ListPanel.vue';
    import Tabs from '../Common/Tabs/Tabs.vue';
    import Tips from '../Common/Tips/Tips.vue';
    import { analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsStart, analyticsEnd, activeAnalyticsTopic } from '../../vuex/getters';

    export default{
        data(){
            return{
                loadingParams: {
                    visiable: false,
                    type: 'loading',
                    content: "请稍后......"
                },
                sourceActive: 0,
                //list: list.time,
                list: [],
                options: [{key: 'time', value: '按时间排序'}, {key: 'browser', value: '浏览数排序'}, {key: 'star', value: '点赞数排序'}],
                sortVal: "",
                x: [],
                lineData: {
                    all: [],
                    wechat: [],
                    weibo: [],
                    client: [],
                    web: [],
                    overseas: []
                },
                words: Local().analytics,
                selectTitle: Local().common.sortBy,
                chartInstance: null,
                resultChartLoading: true,
                resultChartOption: {
                    isToggle: true,
                    title: _.extend({}, Chart.title, { show: false}),
                    tooltip: Chart.tooltip,
//                    legend: {
//                        data: ['All']
//                    },
                    grid: Chart.grid,
                    toolbox: Chart.toolbox,
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
                    series : [{
                        name:"总数",
                        type:'line',
                        areaStyle: {normal: {}},
                        //stack: 'Total',
                        data: []
                    }]
                },
                resultPieChartLoading: true,
                resultPieChartOption: {
                    isActive: true,
                    title: _.extend({}, Pie.title, { show: false}),
                    tooltip: _.extend({}, Pie.tooltip),
                    legend: _.extend({}, Pie.legend, {
                        //orient: 'vertical',
                        //x: 'bottom',
                        bottom: 0,
                        data: ["微信", "微博", "客户端", "网页", "海外"]
                    }),
                    textStyle: Pie.textStyle,
                    toolbox: Pie.toolbox,
                    series: [_.extend({}, Pie.series, {
                        name: '微信',
                        center: ['50%', '45%'],
                        data:[]
                    }), _.extend({}, Pie.series, {
                        name: '微博',
                        center: ['50%', '45%'],
                        data:[]
                    }),_.extend({}, Pie.series, {
                        name: '客户端',
                        center: ['50%', '45%'],
                        data:[]
                    }),_.extend({}, Pie.series, {
                        name: '网页',
                        center: ['50%', '45%'],
                        data:[]
                    }),_.extend({}, Pie.series, {
                        name: '海外',
                        center: ['50%', '45%'],
                        data:[]
                    })]
                },
                actions: function(val, idx){
                    //this.resultChartOption = {};
                    const lineData = this.lineData;
                    const x = this.x;
                    let data;
                    switch (idx){
                        case 0:
                            data = lineData.all;
                            break;
                        case 1:
                            data = lineData.wechat;
                            break;
                        case 2:
                            data = lineData.weibo;
                            break;
                        case 3:
                            data = lineData.client;
                            break;
                        case 4:
                            data = lineData.web;
                            break;
                        case 5:
                            data = lineData.overseas;
                            break;
                        default:
                            data = lineData.all;
                            break;
                    }
                    this.resultChartOption = _.extend({}, this.resultChartOption, {
                        xAxis: _.extend({}, this.resultChartOption.xAxis, {
                            type : 'category',  //category
                            data: x,
                            boundaryGap : false
                        }),
                        series: [{
                            name:"总数",
                            type:'line',
                            areaStyle: {normal: {}},
                            //stack: 'Total',
                            data: data
                        }]
                    });
                    if(idx == 0){
                        this.resultPieChartOption = _.extend({}, this.resultPieChartOption, {
                            series: _.extend({}, Pie.series, {
                                name: 'Result',
                                center: ['50%', '45%'],
                                data:[
                                    {value: _.reduce(lineData.wechat, (mome, val) => mome + val, 0), name: "微信"},
                                    {value: _.reduce(lineData.weibo, (mome, val) => mome + val, 0), name:"微博"},
                                    {value: _.reduce(lineData.client, (mome, val) => mome + val, 0), name:"客户端"},
                                    {value: _.reduce(lineData.web, (mome, val) => mome + val, 0), name:"网页"},
                                    {value: _.reduce(lineData.overseas, (mome, val) => mome + val, 0), name:"海外"}
                                ]
                            })
                        });
                        this.resultChartOption.isToggle = true;
                        this.resultPieChartOption.isActive = true;
                    } else {
                        this.resultChartOption.isToggle = false;
                        this.resultPieChartOption.isActive = false;
                    }
                    //console.log(val, idx);
                    //this.getCommentList();
                }.bind(this),

                isChartScale: true,
                isActivePie: true,

                summaryNums: []
            }
        },
        vuex: {
            getters: {analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsStart, analyticsEnd, activeAnalyticsTopic}
        },
        methods: {
            toggle(){
                this.resultChartOption.isToggle = !this.resultChartOption.isToggle;
                this.resultPieChartOption.isActive = !this.resultPieChartOption.isActive;
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
            getSummaryDetail(){
                //console.log(this.analyticsType, this.analyticsTimeRange, this.analyticsSource, this.analyticsSubTopic, this.activeAnalyticsTopic);
                const topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0,
                        end = this.analyticsEnd,
                        start = this.analyticsStart;
                //console.log(start, end);

                Api.getSummaryDetail({topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    //console.log('getSummaryDetail', resp.data);
                    if(resp.data.code == 0){
                        const details = resp.data.data;
                        this.x = _.map(details, detail => detail.date);
                        //console.log("xxxx", this.x);
                        _.each(details, detail => {
                            this.lineData.wechat.push(detail.values.wechat);
                            this.lineData.weibo.push(detail.values.weibo);
                            this.lineData.client.push(detail.values.client);
                            this.lineData.web.push(detail.values.web);
                            this.lineData.overseas.push(detail.values.overseas);
                            const all = detail.values.wechat + detail.values.weibo + detail.values.client + detail.values.web + detail.values.overseas;
                            this.lineData.all.push(all);
                        });
                        this.resultChartLoading = false;
                        this.resultPieChartLoading = false;
                        this.actions("全部", 0);
                        this.summaryNums = [
                                _.reduce(this.lineData.all, (memo, value) => (memo + value), 0),
                                _.reduce(this.lineData.wechat, (memo, value) => (memo + value), 0),
                                _.reduce(this.lineData.weibo, (memo, value) => (memo + value), 0),
                                _.reduce(this.lineData.client, (memo, value) => (memo + value), 0),
                                _.reduce(this.lineData.web, (memo, value) => (memo + value), 0),
                                _.reduce(this.lineData.overseas, (memo, value) => (memo + value), 0)
                        ];
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
            initData(){
                this.lineData = {
                    all: [],
                    wechat: [],
                    weibo: [],
                    client: [],
                    web: [],
                    overseas: []
                };
            },
            init(topic){
                //console.log('topic', topic);
                this.initData();
                this.getSummaryDetail();
                this.getCommentList();
            }
        },
        watch: {
            activeAnalyticsTopic: {
                handler(val){
                    this.resultChartLoading = true;
                    this.resultPieChartLoading = true;
                    this.init(val);
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
        ready(){
            if(this.activeAnalyticsTopic && this.activeAnalyticsTopic.topic_id){
                this.init();
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
