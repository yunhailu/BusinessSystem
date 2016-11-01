<template>
    <!--<tabs :actions="actions" ></tabs>-->
    <!--<div>Evaluation</div>-->
    <div class="panel-title">
        <span class="panel-title-text">{{title}}</span>
        <div class="panel-title-delete" @click="deleteItem();"><i class="fa fa-minus"></i></div>
    </div>
    <div class="charts">
        <div class="chart commentLeftBar" v-echarts="commentBarOption" :loading="commentBarLoading" theme="macarons"></div><!--theme="infographic"-->
        <div class="chart commentRightBar" v-echarts="commentChartOption" :loading="commentChartLoading" v-show="isShow" theme="macarons"></div>
        <div class="chart commentRightBar" v-echarts="commentPieOption" :loading="commentChartLoading" v-show="!isShow" theme="macarons"></div>
    </div>
    <!--<list-panel :list="list" :options="options" :select-title="selectTitle" :select-value.sync="sortVal"></list-panel>-->
</template>
<style lang="less" scoped>
    @import "Comment.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import moment from 'moment';
    import { Chart, Pie } from '../../../config/config';
    import Local from '../../../local/local';
    import * as Api from '../../../widgets/Api';
    //import { list } from "../../../config/tmpData";
    import ListPanel from '../../Common/ListPanel/ListPanel.vue';
    import Tabs from '../../Common/Tabs/Tabs.vue';

    export default{
        props: ['title', 'data', 'remove'],
        data(){
            const words = Local().comment, common = Local().common;
            return{
                words,
                common,
                selectTitle: Local().common.sortBy,
                //list: list.time,
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
                const subtopic = this.data.subtopic,
                        topic_id = this.data.topic_id,
                        source = this.data.source,
                        time_interval = this.data.time_interval,
                        //time_dimension = this.data.time_dimension,
                        time_dimension = time_interval > 7 ? 1 : 0,
                        start = moment().subtract(time_interval, 'days').format('YYYY-MM-DD'),
                        end = moment().format('YYYY-MM-DD'),
                        topic = this.data.topic;
                Api.getCommentDetail({ subtopic, topic_id, source, time_dimension, start, end, topic }).then(resp => {
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
            deleteItem(){
                const detail = this.data;
                this.remove(detail, 'comment');
            },
            init(){
                this.getCommentDetail();
            }
        },
        components:{ Tabs, ListPanel },
        ready(){
            this.init();
        }
    }
</script>
