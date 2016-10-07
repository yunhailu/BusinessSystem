<template>
    <tabs :actions="actions" ></tabs>
    <div>Evaluation</div>
    <div class="charts">
        <div class="chart commentLeftBar" v-echarts="commentBarOption" :loading="commentBarLoading" theme="macarons"></div><!--theme="infographic"-->
        <div class="chart commentRightBar" v-echarts="commentChartOption" :loading="commentChartLoading" v-show="isShow" theme="macarons"></div>
        <div class="chart commentRightBar" v-echarts="commentPieOption" :loading="commentChartLoading" v-show="!isShow" theme="macarons"></div>
    </div>
    <list-panel :list="list" :options="options" :select-title="selectTitle" :select-value.sync="sortVal"></list-panel>
</template>
<style lang="less" scoped>
    @import "Comment.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import { Chart, Pie } from '../../config/config';
    import Local from '../../local/local';
    import * as Api from '../../widgets/Api';
    import { list } from "../../config/tmpData";
    import ListPanel from '../Common/ListPanel/ListPanel.vue';
    import Tabs from '../Common/Tabs/Tabs.vue';

    export default{
        data(){
            const words = Local().comment, common = Local().common;
            return{
                words,
                common,
                selectTitle: Local().common.sortBy,
                list: list.time,
                options: [{key: 'time', value: '按时间排序'}, {key: 'browser', value: '浏览数排序'}, {key: 'star', value: '点赞数排序'}],
                sortVal: "",
                x: [],
                isShow: true,
                commentArr: ["positive", "negative", "neutral"],
                commentMap: {"positive": 0, "negative": 1, "neutral": 2},
                lineData: {
                    all: {positive: [], negative: [], neutral: []},
                    wechat: {positive: [], negative: [], neutral: []},
                    weibo: {positive: [], negative: [], neutral: []},
                    client: {positive: [], negative: [], neutral: []},
                    web: {positive: [], negative: [], neutral: []},
                    overseas: {positive: [], negative: [], neutral: []}
                },

                commentBarLoading: true,
                commentBarOption: {
                    title: _.extend({}, Chart.title, { show: false}),
                    tooltip: _.extend({}, Chart.tooltip, {
                        axisPointer : { type : 'line' }
                    }),
                    legend: {
                        data:[words.positive, words.negative, words.neutral]
                    },
                    dataZoom: _.extend({}, Chart.dataZoom),
                    color:_.extend( Chart.color, {}),
                    grid: _.extend({}, Chart.grid, { bottom: '40rem' }),
                    toolbox: _.extend({}, Chart.toolbox, {
                        feature: { saveAsImage: {} }
                    }),
                    xAxis: _.extend({}, Chart.xAxis, {
                        type : 'category',
                        data: [],
                        boundaryGap : false
                    }),
                    yAxis: _.extend({}, Chart.yAxis, {
                        type : 'value',
                        boundaryGap : false
                    }),
                    progressive: 4,
                    textStyle: Chart.textStyle,
                    series : [
                        { name: words.positive, type: 'line', areaStyle: {normal: {}}, stack: 'Total', data: [] },
                        { name: words.negative, type:'line', areaStyle: {normal: {}}, stack: 'Total', data: [] },
                        { name: words.neutral, type:'line', areaStyle: {normal: {}}, stack: 'Total', data: [] }
                    ]
                },

                commentChartLoading: true,
                commentChartOption: {
                    tooltip: _.extend({}, Chart.tooltip, {}),
                    legend: { data: [words.positive, words.negative, words.neutral], bottom: 0 },
                    grid: _.extend({}, Chart.grid, {bottom: '10%'}),
                    toolbox: _.extend({}, Chart.toolbox, {
                        feature: { saveAsImage: {} }
                    }),
                    progressive: 4,
                    textStyle: Chart.textStyle,
                    xAxis: _.extend({}, Chart.xAxis, { type: 'value' }),
                    yAxis: _.extend({}, Chart.yAxis, {
                        type: 'category',
                        data: [common.wechat, common.weibo, common.web, common.client, common.overseas]
                    }),
                    color: _.extend([], Chart.color),
                    series: [
                        { name: words.positive, type: 'bar', stack: '总量', data: [] },
                        { name: words.negative, type: 'bar', stack: '总量', data: [] },
                        { name: words.neutral, type: 'bar', stack: '总量', data: [] }
                    ]
                },

//                commentChartOption1: {
//                    tooltip: _.extend({}, Chart.tooltip, {}),
//                    legend: {
//                        data: ['Comment']
//                    },
//                    grid: _.extend({}, Chart.grid),
//                    toolbox: _.extend({}, Chart.toolbox, {
//                        feature: { saveAsImage: {} }
//                    }),
//                    progressive: 4,
//                    textStyle: Chart.textStyle,
//                    xAxis: _.extend({}, Chart.xAxis, { type: 'value' }),
//                    yAxis: _.extend({}, Chart.yAxis, {
//                        type: 'category',
//                        data: [common.wechat, common.weibo, common.web, common.client, common.overseas]
//                    }),
//                    color: _.extend([], Chart.color),
//                    series: []
//                },

                commentPieOption: {
                    isActive: true,
                    title: _.extend({}, Pie.title, { show: false }),
                    tooltip: _.extend({}, Pie.tooltip),
                    legend: _.extend({}, Pie.legend, {
                        bottom: 0,
                        data: [words.positive, words.negative, words.neutral]
                    }),
                    textStyle: Pie.textStyle,
                    toolbox: Pie.toolbox,
                    color: _.extend([], Chart.color),
                    series: _.extend({}, Pie.series, {
                        radius: ['40%', '85%'],
                        name: words.comment,
                        center: ['50%', '45%'],
                        data:[]
                    })
                }
            }
        },
        methods: {
            getCommentDetail(){
                Api.getCommentDetail({}).then(resp => {
                    //const resp = {data:{code:0,message:"success",data:[{date:"2016-08-01",values:{weibo:{positive:35,neutral:10,negative:6},wechat:{positive:28,neutral:4,negative:6},web:{positive:16,neutral:2,negative:10},client:{positive:15,neutral:9,negative:1},overseas:{positive:10,neutral:7,negative:12}}},{date:"2016-08-02",values:{weibo:{positive:10,neutral:0,negative:4},wechat:{positive:20,neutral:1,negative:21},web:{positive:36,neutral:10,negative:16},client:{positive:6,neutral:12,negative:32},overseas:{positive:4,neutral:24,negative:3}}},{date:"2016-08-03",values:{weibo:{positive:0,neutral:10,negative:16},wechat:{positive:18,neutral:4,negative:8},web:{positive:16,neutral:6,negative:2},client:{positive:15,neutral:4,negative:12},overseas:{positive:21,neutral:30,negative:5}}},{date:"2016-08-04",values:{weibo:{positive:0,neutral:20,negative:8},wechat:{positive:45,neutral:3,negative:15},web:{positive:0,neutral:28,negative:20},client:{positive:5,neutral:7,negative:40},overseas:{positive:10,neutral:2,negative:25}}},{date:"2016-08-05",values:{weibo:{positive:3,neutral:2,negative:40},wechat:{positive:6,neutral:36,negative:8},web:{positive:2,neutral:0,negative:24},client:{positive:27,neutral:36,negative:36},overseas:{positive:18,neutral:2,negative:24}}},{date:"2016-08-06",values:{weibo:{positive:16,neutral:12,negative:27},wechat:{positive:24,neutral:24,negative:15},web:{positive:7,neutral:27,negative:0},client:{positive:21,neutral:5,negative:28},overseas:{positive:24,neutral:5,negative:0}}},{date:"2016-08-07",values:{weibo:{positive:5,neutral:5,negative:40},wechat:{positive:10,neutral:8,negative:18},web:{positive:20,neutral:5,negative:14},client:{positive:5,neutral:18,negative:3},overseas:{positive:28,neutral:0,negative:30}}},{date:"2016-08-08",values:{weibo:{positive:12,neutral:0,negative:27},wechat:{positive:3,neutral:45,negative:16},web:{positive:6,neutral:16,negative:12},client:{positive:36,neutral:5,negative:12},overseas:{positive:4,neutral:32,negative:40}}},{date:"2016-08-09",values:{weibo:{positive:6,neutral:4,negative:24},wechat:{positive:16,neutral:0,negative:20},web:{positive:10,neutral:21,negative:8},client:{positive:16,neutral:40,negative:7},overseas:{positive:16,neutral:1,negative:7}}},{date:"2016-08-10",values:{weibo:{positive:24,neutral:16,negative:27},wechat:{positive:20,neutral:18,negative:9},web:{positive:9,neutral:20,negative:4},client:{positive:0,neutral:30,negative:12},overseas:{positive:16,neutral:0,negative:8}}},{date:"2016-08-11",values:{weibo:{positive:27,neutral:0,negative:25},wechat:{positive:25,neutral:1,negative:45},web:{positive:18,neutral:12,negative:6},client:{positive:21,neutral:12,negative:24},overseas:{positive:45,neutral:32,negative:36}}},{date:"2016-08-12",values:{weibo:{positive:18,neutral:6,negative:8},wechat:{positive:3,neutral:24,negative:2},web:{positive:7,neutral:0,negative:0},client:{positive:6,neutral:15,negative:9},overseas:{positive:14,neutral:6,negative:24}}},{date:"2016-08-13",values:{weibo:{positive:2,neutral:25,negative:30},wechat:{positive:9,neutral:6,negative:9},web:{positive:28,neutral:16,negative:6},client:{positive:12,neutral:7,negative:12},overseas:{positive:15,neutral:4,negative:15}}},{date:"2016-08-14",values:{weibo:{positive:4,neutral:0,negative:6},wechat:{positive:8,neutral:5,negative:20},web:{positive:6,neutral:2,negative:15},client:{positive:4,neutral:7,negative:0},overseas:{positive:1,neutral:10,negative:8}}},{date:"2016-08-15",values:{weibo:{positive:16,neutral:28,negative:2},wechat:{positive:0,neutral:28,negative:36},web:{positive:40,neutral:21,negative:2},client:{positive:16,neutral:9,negative:20},overseas:{positive:25,neutral:5,negative:18}}},{date:"2016-08-16",values:{weibo:{positive:0,neutral:20,negative:16},wechat:{positive:10,neutral:16,negative:9},web:{positive:3,neutral:0,negative:25},client:{positive:3,neutral:5,negative:4},overseas:{positive:6,neutral:6,negative:7}}},{date:"2016-08-17",values:{weibo:{positive:15,neutral:2,negative:0},wechat:{positive:8,neutral:16,negative:5},web:{positive:6,neutral:2,negative:6},client:{positive:28,neutral:12,negative:32},overseas:{positive:0,neutral:0,negative:5}}},{date:"2016-08-18",values:{weibo:{positive:24,neutral:6,negative:9},wechat:{positive:27,neutral:21,negative:12},web:{positive:21,neutral:36,negative:0},client:{positive:12,neutral:10,negative:2},overseas:{positive:5,neutral:7,negative:28}}},{date:"2016-08-19",values:{weibo:{positive:4,neutral:5,negative:35},wechat:{positive:6,neutral:0,negative:15},web:{positive:10,neutral:0,negative:6},client:{positive:3,neutral:6,negative:0},overseas:{positive:15,neutral:20,negative:18}}},{date:"2016-08-20",values:{weibo:{positive:6,neutral:15,negative:4},wechat:{positive:12,neutral:9,negative:6},web:{positive:6,neutral:10,negative:15},client:{positive:16,neutral:4,negative:15},overseas:{positive:18,neutral:18,negative:0}}},{date:"2016-08-21",values:{weibo:{positive:6,neutral:15,negative:8},wechat:{positive:8,neutral:20,negative:40},web:{positive:18,neutral:3,negative:15},client:{positive:18,neutral:24,negative:15},overseas:{positive:12,neutral:3,negative:6}}},{date:"2016-08-22",values:{weibo:{positive:2,neutral:18,negative:45},wechat:{positive:16,neutral:7,negative:5},web:{positive:6,neutral:6,negative:12},client:{positive:30,neutral:12,negative:5},overseas:{positive:8,neutral:6,negative:24}}},{date:"2016-08-23",values:{weibo:{positive:35,neutral:12,negative:12},wechat:{positive:14,neutral:24,negative:0},web:{positive:6,neutral:3,negative:0},client:{positive:4,neutral:40,negative:45},overseas:{positive:14,neutral:40,negative:4}}},{date:"2016-08-24",values:{weibo:{positive:15,neutral:0,negative:4},wechat:{positive:6,neutral:6,negative:18},web:{positive:9,neutral:18,negative:4},client:{positive:1,neutral:7,negative:27},overseas:{positive:7,neutral:6,negative:12}}},{date:"2016-08-25",values:{weibo:{positive:2,neutral:12,negative:4},wechat:{positive:0,neutral:16,negative:18},web:{positive:24,neutral:5,negative:5},client:{positive:0,neutral:12,negative:8},overseas:{positive:0,neutral:14,negative:8}}},{date:"2016-08-26",values:{weibo:{positive:21,neutral:4,negative:5},wechat:{positive:8,neutral:1,negative:4},web:{positive:18,neutral:8,negative:1},client:{positive:27,neutral:18,negative:6},overseas:{positive:28,neutral:8,negative:16}}},{date:"2016-08-27",values:{weibo:{positive:0,neutral:7,negative:12},wechat:{positive:32,neutral:36,negative:0},web:{positive:16,neutral:35,negative:20},client:{positive:27,neutral:45,negative:36},overseas:{positive:16,neutral:5,negative:21}}},{date:"2016-08-28",values:{weibo:{positive:0,neutral:21,negative:2},wechat:{positive:18,neutral:0,negative:4},web:{positive:4,neutral:6,negative:21},client:{positive:12,neutral:16,negative:18},overseas:{positive:0,neutral:8,negative:32}}},{date:"2016-08-29",values:{weibo:{positive:36,neutral:3,negative:6},wechat:{positive:21,neutral:8,negative:4},web:{positive:21,neutral:14,negative:27},client:{positive:12,neutral:14,negative:3},overseas:{positive:4,neutral:10,negative:36}}},{date:"2016-08-30",values:{weibo:{positive:4,neutral:2,negative:27},wechat:{positive:18,neutral:6,negative:4},web:{positive:0,neutral:10,negative:21},client:{positive:25,neutral:18,negative:35},overseas:{positive:2,neutral:0,negative:10}}},{date:"2016-08-31",values:{weibo:{positive:9,neutral:0,negative:16},wechat:{positive:2,neutral:28,negative:8},web:{positive:24,neutral:8,negative:0},client:{positive:4,neutral:12,negative:1},overseas:{positive:30,neutral:9,negative:15}}},{date:"2016-09-01",values:{weibo:{positive:18,neutral:24,negative:28},wechat:{positive:20,neutral:6,negative:18},web:{positive:35,neutral:8,negative:10},client:{positive:1,neutral:10,negative:4},overseas:{positive:27,neutral:45,negative:18}}},{date:"2016-09-02",values:{weibo:{positive:12,neutral:0,negative:7},wechat:{positive:5,neutral:9,negative:27},web:{positive:10,neutral:4,negative:10},client:{positive:5,neutral:0,negative:8},overseas:{positive:35,neutral:15,negative:20}}},{date:"2016-09-03",values:{weibo:{positive:8,neutral:20,negative:12},wechat:{positive:20,neutral:20,negative:12},web:{positive:20,neutral:2,negative:5},client:{positive:0,neutral:9,negative:2},overseas:{positive:40,neutral:6,negative:8}}},{date:"2016-09-04",values:{weibo:{positive:30,neutral:20,negative:14},wechat:{positive:15,neutral:18,negative:20},web:{positive:8,neutral:5,negative:15},client:{positive:14,neutral:12,negative:3},overseas:{positive:35,neutral:12,negative:5}}},{date:"2016-09-05",values:{weibo:{positive:40,neutral:24,negative:16},wechat:{positive:28,neutral:14,negative:24},web:{positive:25,neutral:20,negative:5},client:{positive:40,neutral:9,negative:3},overseas:{positive:40,neutral:20,negative:10}}},{date:"2016-09-06",values:{weibo:{positive:21,neutral:28,negative:5},wechat:{positive:24,neutral:45,negative:12},web:{positive:12,neutral:18,negative:3},client:{positive:40,neutral:12,negative:21},overseas:{positive:12,neutral:36,negative:9}}},{date:"2016-09-07",values:{weibo:{positive:40,neutral:5,negative:7},wechat:{positive:35,neutral:5,negative:4},web:{positive:12,neutral:20,negative:16},client:{positive:0,neutral:20,negative:36},overseas:{positive:5,neutral:4,negative:0}}},{date:"2016-09-08",values:{weibo:{positive:4,neutral:32,negative:20},wechat:{positive:0,neutral:21,negative:9},web:{positive:9,neutral:12,negative:7},client:{positive:12,neutral:4,negative:3},overseas:{positive:3,neutral:2,negative:7}}},{date:"2016-09-09",values:{weibo:{positive:4,neutral:0,negative:30},wechat:{positive:12,neutral:12,negative:14},web:{positive:32,neutral:27,negative:14},client:{positive:10,neutral:20,negative:14},overseas:{positive:8,neutral:45,negative:4}}},{date:"2016-09-10",values:{weibo:{positive:0,neutral:16,negative:12},wechat:{positive:0,neutral:25,negative:45},web:{positive:21,neutral:4,negative:24},client:{positive:0,neutral:8,negative:20},overseas:{positive:27,neutral:0,negative:4}}},{date:"2016-09-11",values:{weibo:{positive:3,neutral:0,negative:8},wechat:{positive:4,neutral:14,negative:24},web:{positive:18,neutral:21,negative:14},client:{positive:12,neutral:4,negative:6},overseas:{positive:3,neutral:45,negative:12}}},{date:"2016-09-12",values:{weibo:{positive:30,neutral:10,negative:35},wechat:{positive:18,neutral:3,negative:12},web:{positive:8,neutral:9,negative:25},client:{positive:9,neutral:15,negative:2},overseas:{positive:0,neutral:12,negative:20}}},{date:"2016-09-13",values:{weibo:{positive:16,neutral:32,negative:20},wechat:{positive:24,neutral:0,negative:5},web:{positive:15,neutral:18,negative:27},client:{positive:21,neutral:21,negative:3},overseas:{positive:24,neutral:4,negative:32}}},{date:"2016-09-14",values:{weibo:{positive:27,neutral:2,negative:0},wechat:{positive:0,neutral:10,negative:10},web:{positive:14,neutral:16,negative:6},client:{positive:0,neutral:28,negative:8},overseas:{positive:24,neutral:4,negative:7}}},{date:"2016-09-15",values:{weibo:{positive:40,neutral:6,negative:9},wechat:{positive:28,neutral:21,negative:15},web:{positive:15,neutral:4,negative:8},client:{positive:8,neutral:6,negative:18},overseas:{positive:8,neutral:27,negative:1}}},{date:"2016-09-16",values:{weibo:{positive:5,neutral:8,negative:32},wechat:{positive:24,neutral:3,negative:9},web:{positive:8,neutral:3,negative:8},client:{positive:21,neutral:35,negative:30},overseas:{positive:6,neutral:18,negative:0}}},{date:"2016-09-17",values:{weibo:{positive:6,neutral:1,negative:0},wechat:{positive:4,neutral:20,negative:32},web:{positive:9,neutral:36,negative:2},client:{positive:2,neutral:0,negative:36},overseas:{positive:0,neutral:6,negative:28}}},{date:"2016-09-18",values:{weibo:{positive:6,neutral:3,negative:5},wechat:{positive:6,neutral:30,negative:12},web:{positive:36,neutral:15,negative:32},client:{positive:32,neutral:20,negative:18},overseas:{positive:1,neutral:10,negative:5}}},{date:"2016-09-19",values:{weibo:{positive:18,neutral:30,negative:18},wechat:{positive:10,neutral:36,negative:1},web:{positive:18,neutral:4,negative:10},client:{positive:3,neutral:25,negative:12},overseas:{positive:14,neutral:2,negative:40}}},{date:"2016-09-20",values:{weibo:{positive:0,neutral:27,negative:12},wechat:{positive:5,neutral:40,negative:35},web:{positive:6,neutral:7,negative:18},client:{positive:12,neutral:10,negative:4},overseas:{positive:32,neutral:4,negative:14}}},{date:"2016-09-21",values:{weibo:{positive:10,neutral:6,negative:18},wechat:{positive:3,neutral:27,negative:3},web:{positive:2,neutral:16,negative:10},client:{positive:27,neutral:12,negative:6},overseas:{positive:0,neutral:24,negative:35}}},{date:"2016-09-22",values:{weibo:{positive:10,neutral:35,negative:1},wechat:{positive:27,neutral:15,negative:14},web:{positive:21,neutral:9,negative:8},client:{positive:3,neutral:6,negative:2},overseas:{positive:15,neutral:45,negative:6}}},{date:"2016-09-23",values:{weibo:{positive:28,neutral:0,negative:3},wechat:{positive:14,neutral:10,negative:3},web:{positive:9,neutral:0,negative:8},client:{positive:27,neutral:36,negative:3},overseas:{positive:5,neutral:14,negative:12}}},{date:"2016-09-24",values:{weibo:{positive:15,neutral:0,negative:4},wechat:{positive:24,neutral:8,negative:0},web:{positive:40,neutral:35,negative:16},client:{positive:15,neutral:45,negative:6},overseas:{positive:35,neutral:24,negative:9}}},{date:"2016-09-25",values:{weibo:{positive:32,neutral:0,negative:6},wechat:{positive:9,neutral:15,negative:16},web:{positive:12,neutral:16,negative:21},client:{positive:10,neutral:32,negative:16},overseas:{positive:16,neutral:28,negative:15}}},{date:"2016-09-26",values:{weibo:{positive:3,neutral:35,negative:12},wechat:{positive:8,neutral:24,negative:45},web:{positive:28,neutral:18,negative:0},client:{positive:32,neutral:12,negative:0},overseas:{positive:12,neutral:36,negative:25}}}]}};
                    console.log('getCommentDetail', resp);
                    if(resp.data.code == 0){
                        const details = resp.data.data;
                        this.x = _.map(details, detail => detail.date);
                        const _this = this;
                        //console.log("xxxx", this.x);
                        let all = {positive: [], negative:[], neutral:[]};
                        _.each(details, (detail, index) => {
                            _.each(detail.values, (value, key) => {
                                this.lineData[key].positive.push(detail.values[key].positive);
                                this.lineData[key].negative.push(detail.values[key].negative);
                                this.lineData[key].neutral.push(detail.values[key].neutral);
                            });
                            all.positive.push(this.lineData.wechat.positive[index] + this.lineData.weibo.positive[index] + this.lineData.client.positive[index] + this.lineData.web.positive[index] + this.lineData.overseas.positive[index]);
                            all.negative.push(_this.lineData.wechat.negative[index] + _this.lineData.weibo.negative[index] + _this.lineData.client.negative[index] + _this.lineData.web.positive[index] + _this.lineData.overseas.positive[index]);
                            all.neutral.push(_this.lineData.wechat.neutral[index] + _this.lineData.weibo.neutral[index] + _this.lineData.client.neutral[index] + _this.lineData.web.positive[index] + _this.lineData.overseas.positive[index]);
                        });
                        this.lineData.all = all;

                        this.commentBarLoading = false;
                        this.commentBarOption.xAxis.data = this.x;
                        this.commentBarOption.series = _.map(this.commentBarOption.series, (value, index) => {
                            value.data = all[this.commentArr[index]]
                            return value;
                        });

                        this.commentChartLoading = false;
                        const datas = _.chain(this.lineData)
                                .filter((value, key) => (key != 'all'))
                                .map(value => {
                                    return _.map(value, val => {
                                        return _.reduce(val, (memo, v) => memo + v, 0);
                                    });
                                }).value();
                        this.commentChartOption.series = _.map(this.commentChartOption.series, (value, index) => {
                            value.data = _.zip.apply(null,datas)[index];
                            return value;
                        });
                        //console.log('datas', datas);
                        console.log('series', this.commentChartOption.series);
                    }
                });
            },
            actions(val, idx){
                const map = ['all', 'wechat', 'weibo', 'client', 'web', 'overseas'];

                _.each(this.lineData[map[idx]], (value, key) => {
                    this.commentBarOption.series[this.commentMap[key]].data = value;
                });

                if(idx == 0){
                    this.isShow = true;
                    return;
                }

                this.isShow = false;
//                this.commentChartOption1.series = [{  //右侧柱状图
//                    type: 'bar',
//                    name: 'Comment',
//                    itemStyle: {
//                        normal: {
//                            color: function(params) {
//                                // build a color map as your need.
//                                var colorList = _.extend({}, Chart.color);
//                                return colorList[params.dataIndex]
//                            }
//                        }
//                    },
//                    data: [712,621,810]
//                }];
                this.commentPieOption.series.data = _.map(this.lineData[map[idx]], (value, key) => {
                    return ({ value: _.reduce(value, (memo, val) => memo + val, 0),name: this.words[key] });
                });

            },
            init(){
                this.getCommentDetail();
            }
        },
        components:{ Tabs, ListPanel },
        route: {
            data(){
                this.init();
            }
        }
    }
</script>
