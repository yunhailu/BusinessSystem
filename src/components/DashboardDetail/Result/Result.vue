<template>
    <div class="panel-title">
        <span class="panel-title-text">{{title}}</span>
        <div class="panel-title-delete" @click="deleteItem();"><i class="fa fa-minus"></i></div>
    </div>
    <div class="charts">
        <div class="chart" :class="[data.source=='all' ? 'active' : '']" :resize="resultChartOption.isToggle" theme="macarons">
            <echarts :options="resultChartOption" :initOptions="resultChartOption" :img.sync="master" theme="macarons"></echarts>
        </div>
        <div class="pie" :class="[data.source=='all' ? 'active' : '']" translate="show-pie"  theme="macarons">
            <echarts :options="resultPieChartOption" :initOptions="resultPieChartOption" :img.sync="sub" theme="macarons"></echarts>
        </div>
    </div>
    <list-panel :list="list" :topic-name="topic_name" :options="options" :select-title="selectTitle" :select-value.sync="sortVal" :tools="isShowTools"></list-panel>
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
    import ListPanel from '../ListPanel/ListPanel.vue';
    import Tabs from '../../Common/Tabs/Tabs.vue';
    import Echarts from '../../Common/Echarts/Echarts.vue';
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
                        key: "summary_master",
                        value
                    });
                }
            },
            sub:{
                handler(value){
                    this.insertExportImages({
                        topic: this.data.topic,
                        topic_id: this.data.topic_id,
                        key: "summary_slave",
                        value
                    });
                }
            }
        },
        data(){
            const common = Local().common;
            return{
                common,
                isShowTools: false,
                sourceActive: 0,
                list: [],
                options: [{key: 'time', value:common.timeRanking}, {key: 'browser', value:common.countRanking}, {key: 'star', value:common.greetRanking}],
                sortVal: "",
                x: [],
                topic_name:'',
                lineData: {
                    all: [],
                    wechat: [],
                    weibo: [],
                    client: [],
                    web: [],
                    overseas: []
                },
                words: Local().analytics,
                selectTitle: common.sortBy,
                chartInstance: null,
                resultChartLoading: true,
                resultChartOption: {
                    isToggle: true,
                    title: _.extend({}, Chart.title, { show: false}),
                    tooltip: Chart.tooltip,
                    animation:false,
                    grid: Chart.grid,
                    toolbox: Chart.toolbox,
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
                    graphic:Chart.graphic,
                    series : []
                },
                resultPieChartLoading: true,
                resultPieChartOption: {
                    isActive: true,
                    title: _.extend({}, Pie.title, { show: false}),
                    tooltip: _.extend({}, Pie.tooltip),
                    animation:false,
                    legend: _.extend({}, Pie.legend, {
                        bottom: 0,
                        data: [common.wechat, common.weibo, common.client, common.web, common.overseas]
                    }),
                    textStyle: Pie.textStyle,
                    toolbox: Pie.toolbox,
                    graphic:Pie.graphic,
                    series:[]
                },
                actions: function(val, idx){
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
                            data: data
                        }]
                    });
                    if(idx == 0){
                        this.resultPieChartOption = _.extend({}, this.resultPieChartOption, {
                            series:[
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
                                    data:[
                                        {value: _.reduce(lineData.wechat, (mome, val) => mome + val, 0), name:common.wechat},
                                        {value: _.reduce(lineData.weibo, (mome, val) => mome + val, 0), name:common.weibo},
                                        {value: _.reduce(lineData.client, (mome, val) => mome + val, 0), name:common.client},
                                        {value: _.reduce(lineData.web, (mome, val) => mome + val, 0), name:common.web},
                                        {value: _.reduce(lineData.overseas, (mome, val) => mome + val, 0), name:common.overseas}
                                    ]
                                }
                            ]
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
                this.resultChartOption.isToggle = !this.resultChartOption.isToggle;
                this.resultPieChartOption.isActive = !this.resultPieChartOption.isActive;
            },
            getSummaryDetail(){
                const subtopic = this.data.subtopic,
                        topic_id = this.data.topic_id,
                        source = this.data.source,
                        time_interval = this.data.time_interval,
                        time_dimension = time_interval > 7 ? 1 : 0;
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
                Api.getSummaryDetail({ subtopic, topic_id, source, time_dimension, start, end}).then(resp => {
                    if(resp.data.code == 0){
                        const details = resp.data.data;
                        this.x = _.map(details, detail => detail.date);
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
                    time_dimension = time_interval > 7 ? 1 : 0,
                    start = moment().subtract(time_interval, 'days').format('YYYY-MM-DD'),
                    end = moment().format('YYYY-MM-DD'),
                    topic = this.data.topic;
                Api.getCommentList({ type, subtopic, topic_id, source, time_dimension, start, end, topic }).then(resp => {
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
        components:{
            Tabs, ListPanel, Echarts
        },
        ready(){
            this.topic_name=this.data.topic;
            this.init();
        },

    }
</script>
