<template>
    <!--<tabs :actions="actions" ></tabs>-->
    <!--<span>Result</span>-->
    <div class="panel-title">
        <span class="panel-title-text">{{title}}</span>
        <div class="panel-title-delete" @click="deleteItem();"><i class="fa fa-minus"></i></div>
    </div>
    <div class="charts">
        <!--<div class="arrow animated rubberBand" @click="toggle">-->
            <!--<i class="fa fa-angle-left fa-3x" transition="rotate" :class="[resultPieChartOption.isActive ? 'fa-rotate-180' : '']"></i>-->
        <!--</div>-->
        <!--<div class="chart" v-echarts="resultChartOption" :loading="resultChartLoading" :img.sync="master" :class="[data.source=='all' ? 'active' : '']" :resize="resultChartOption.isToggle" theme="macarons"></div>-->
        <!--<div class="pie" v-echarts="resultPieChartOption" :loading="resultPieChartLoading" :img.sync="sub" :class="[data.source=='all' ? 'active' : '']" translate="show-pie"  theme="macarons"></div>-->

        <div class="chart" :img.sync="master" :class="[data.source=='all' ? 'active' : '']" :resize="resultChartOption.isToggle" theme="macarons">
            <echarts :options="resultChartOption" initOptions="resultChartOption" :img.sync="master" theme="macarons"></echarts>
        </div>
        <div class="pie" :img.sync="sub" :class="[data.source=='all' ? 'active' : '']" translate="show-pie"  theme="macarons">
            <echarts :options="resultPieChartOption" initOptions="resultPieChartOption" :img.sync="sub" theme="macarons"></echarts>
        </div>
    </div>
    <list-panel :list="list" :options="options" :select-title="selectTitle" :select-value.sync="sortVal" :tools="isShowTools"></list-panel>
</template>
<style lang="less" scoped>
    @import "Result.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import moment from 'moment';
    import Local from "../../../local/local";
    import * as Api from "../../../widgets/Api";
    import { Chart, Pie } from '../../../config/config';
    import { list } from "../../../config/tmpData";
    import ListPanel from '../../Common/ListPanel/ListPanel.vue';
    import Tabs from '../../Common/Tabs/Tabs.vue';
    import Echarts from '../../Common/Echarts/Echarts.vue';

    export default{
        props: ['title', 'data', 'remove', 'master', 'sub'],
        data(){
            return{
                isShowTools: false,
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
                    series : []
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
                    series: _.extend({}, Pie.series, {
                        name: 'Result',
                        center: ['50%', '45%'],
                        data:[]
                    })
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
                }.bind(this),

                isChartScale: true,
                isActivePie: true
            }
        },
        methods: {
            toggle(){
//                this.isChartScale = !this.isChartScale;
//                this.isActivePie = !this.isActivePie;
                this.resultChartOption.isToggle = !this.resultChartOption.isToggle;
                this.resultPieChartOption.isActive = !this.resultPieChartOption.isActive;
            },
            getSummaryDetail(){
                const subtopic = this.data.subtopic,
                        topic_id = this.data.topic_id,
                        source = this.data.source,
                        time_interval = this.data.time_interval,
                        //time_dimension = this.data.time_dimension,
                        time_dimension = time_interval > 7 ? 1 : 0,
                        start = moment().subtract(time_interval, 'days').format('YYYY-MM-DD'),
                        end = moment().format('YYYY-MM-DD'),
                        topic = this.data.topic;
                Api.getSummaryDetail({ subtopic, topic_id, source, time_dimension, start, end, topic }).then(resp => {
                    //console.log('getSummaryDetail', resp);
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
                    }
                });
            },
            getCommentList(type = 'time'){
                const subtopic = this.data.subtopic,
                    topic_id = this.data.topic_id,
                    source = this.data.source,
                    time_interval = this.data.time_interval,
                    //time_dimension = this.data.time_dimension,
                    time_dimension = time_interval > 7 ? 1 : 0,
                    start = moment().subtract(time_interval, 'days').format('YYYY-MM-DD'),
                    end = moment().format('YYYY-MM-DD'),
                    topic = this.data.topic;
                Api.getCommentList({ type, subtopic, topic_id, source, time_dimension, start, end, topic }).then(resp => {
                    //console.log(resp.data);
                    if(resp.data.code == 0){
                        this.list = _.filter(resp.data.data, (item, index) => { return index < 20; });
                    }
                });
            },
            deleteItem(){
                const detail = this.data;
                this.remove(detail, 'summary');
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
            init(){
                this.initData();
                this.getSummaryDetail();
                this.getCommentList();
            }
        },
        watch: {
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
            Tabs, ListPanel, Echarts
        },
        ready(){
            this.init();
        },
//        route: {
//            data(){
//                this.init();
//            }
//        }
    }
</script>
