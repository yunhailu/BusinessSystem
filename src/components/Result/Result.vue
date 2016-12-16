<template>
    <tabs :actions="actions" :datas="summaryNums"></tabs>
    <!--<span>Result</span>-->
    <div class="result-overflow">
        <div class="charts">
            <!--<div class="arrow animated rubberBand" @click="toggle">-->
            <!--<i class="fa fa-angle-left fa-3x" transition="rotate" :class="[resultPieChartOption.isActive ? 'fa-rotate-180' : '']"></i>-->
            <!--</div>-->
            <div class="chart" v-echarts="resultChartOption" :click="clickChartAction" :loading="resultChartLoading" :class="[resultChartOption.isToggle ? 'active' : '']" :resize="resultChartOption.isToggle" theme="macarons"></div>
            <div class="pie" v-echarts="resultPieChartOption" :loading="resultPieChartLoading" :class="[resultPieChartOption.isActive ? 'active' : '']" translate="show-pie"  theme="macarons"></div>
        </div>
        <list-panel :list="list" :options="options" :select-title="selectTitle" :select-value.sync="sortVal"></list-panel>
    </div>

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
    import {analyticsTimePopUp, analyticsSubTopicId, analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, activeAnalyticsTopic, analyticsRefreshTopic } from '../../vuex/getters';
    import {setAnalyticsTimePopUp,setAnalyticsEnd,setAnalyticsStart } from '../../vuex/actions';

    export default{
        data(){
            const common = Local().common;
            return{
                common,
                nowTime:null,
                loadingParams: {
                    visiable: false,
                    type: 'loading',
                    content: common.waitWords
                },
                sourceActive: 0,
                //list: list.time,
                list: [],
                options: [{key: 'time', value:common.timeRanking}, {key: 'browser', value:common.countRanking}, {key: 'star', value:common.greetRanking},{key:'share',value:common.shareRanking}],
                sortVal: "",
                x: [],
                lineData: {
                    all: [],
                    wechat: [],
                    weibo: [],
                    client: [],
                    web: [],
                    overseas: [],
                    sengine:[]
                },
                words: Local().analytics,
                selectTitle: Local().common.sortBy,
                chartInstance: null,
                resultChartLoading: true,
                resultChartOption: {
                    isToggle: true,
                    title: _.extend({}, Chart.title, { show: false}),
                    tooltip: Chart.tooltip,
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
                    graphic:Chart.graphic,
                    series:[]
                },
                resultPieChartLoading: true,
                resultPieChartOption: {
                    isActive: true,
                    title: _.extend({}, Pie.title, { show: false}),
                    tooltip: _.extend({}, Pie.tooltip),
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
                    console.log('x',x);
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
                        case 6:
                            data = lineData.sengine;
                        default:
                            data = lineData.all;
                            break;
                    }
                    console.log('data',data);
                    if(idx == 0){
                        this.resultChartOption = _.extend({}, this.resultChartOption, {
                            xAxis: _.extend({}, this.resultChartOption.xAxis, {
                                type : 'category',  //category
                                data: x,
                                boundaryGap : false
                            }),
                            legend: _.extend({}, Pie.legend, {
                                top: 0,
                                data: [common.wechat, common.weibo, common.client, common.web, common.overseas]
                            }),
                            series: [ {
                                name:common.wechat,
                                areaStyle: {normal: {}},
                                stack: 'Total',
                                type:'line',
                                data:data[0]
                            }, {
                                name:common.weibo,
                                areaStyle: {normal: {}},
                                stack: 'Total',
                                type:'line',
                                data: data[1]
                            }, {
                                name:common.client,
                                type:'line',
                                areaStyle: {normal: {}},
                                stack: 'Total',
                                data:data[2]
                            }, {
                                name:common.web,
                                type:'line',
                                areaStyle: {normal: {}},
                                stack: 'Total',
                                data: data[3]
                            }, {
                                name:common.overseas,
                                type:'line',
                                areaStyle: {normal: {}},
                                stack: 'Total',
                                data: data[4]
                            }]
                        });
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
                                        {value: _.reduce(lineData.wechat, (mome, val) => mome + val, 0), name: "微信"},
                                        {value: _.reduce(lineData.weibo, (mome, val) => mome + val, 0), name:"微博"},
                                        {value: _.reduce(lineData.client, (mome, val) => mome + val, 0), name:"客户端"},
                                        {value: _.reduce(lineData.web, (mome, val) => mome + val, 0), name:"网页"},
                                        {value: _.reduce(lineData.overseas, (mome, val) => mome + val, 0), name:"海外"}
                                        ]
                                }
                            ]
                        });
                        this.resultChartOption.isToggle = true;
                        this.resultPieChartOption.isActive = true;
                    } else {
                        this.resultChartOption.isToggle = false;
                        this.resultPieChartOption.isActive = false;
                        //非all
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
                    }
                }.bind(this),

                isChartScale: true,
                isActivePie: true,

                summaryNums: []
            }
        },
        vuex: {
            getters: {analyticsTimePopUp, analyticsSubTopicId,analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, activeAnalyticsTopic, analyticsRefreshTopic},
            actions:{setAnalyticsTimePopUp,setAnalyticsEnd,setAnalyticsStart}
        },
        methods: {
            toggle(){
                this.resultChartOption.isToggle = !this.resultChartOption.isToggle;
                this.resultPieChartOption.isActive = !this.resultPieChartOption.isActive;
            },
            clickChartAction(opts){
                this.loadingParams.visiable = true;
                const topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_dimension = 0,
                        type = "time";
                let start =opts.name.split(":")[0],
                        end = opts.name.split(":")[0];
                if(opts.name.split(" ")[1]){
                    end = opts.name.split(":")[0]
                    end = end.split(" ")[0]+'T'+end.split(" ")[1];
                    start = moment(opts.name.split(":")[0],"YYYY-MM-DD HH").subtract(8, 'hour').format("YYYY-MM-DD HH")
                    start=start.split(" ")[0]+'T'+start.split(" ")[1];
                }
                Api.getCommentList({type, topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    //console.log(resp.data);
                    this.loadingParams.visiable = false;
                    if(resp.data.code == 0){
                        this.list = resp.data.data;
                    }
                });
            },
            getSummaryDetail(){
                const topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0;
                let end =this.analyticsEnd,
                        start = this.analyticsStart;
                if(start.includes(' ') && end.includes(' ')){
                    start = start.split(' ')[0]+'T'+start.split(' ')[1];
                    end = end.split(' ')[0]+'T'+end.split(' ')[1];
                    console.log('start',start,end);
                }
                Api.getSummaryDetail({topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    if(resp.data.code == 0){
                        this.resultChartLoading = false;
                        this.resultPieChartLoading = false;
                        const details = resp.data.data;
                        this.x =[];
                        this.initData();
                        this.x = _.map(details, detail => detail.date);
                        _.each(details, detail => {
                            this.lineData.wechat.push(detail.values.wechat);
                            this.lineData.weibo.push(detail.values.weibo);
                            this.lineData.client.push(detail.values.client);
                            this.lineData.web.push(detail.values.web);
                            this.lineData.overseas.push(detail.values.overseas);
                            this.lineData.sengine.push(detail.values.sengine);
                        });
                        console.log('this.linedata',this.lineData);
                    //修改资源来源于数量显示
                        this.lineData.client = _.map(_.zip(this.lineData.client,this.lineData.web),item=>{
                                    return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                        });
                        this.lineData.web = this.lineData.sengine;
                        console.log('client+web',this.lineData.client);
                        this.lineData.all = [this.lineData.wechat,this.lineData.weibo,this.lineData.client,this.lineData.web,this.lineData.overseas];
                        this.actions("全部", 0);
                        const wechatNums =  _.reduce(this.lineData.wechat, (memo, value) => (memo + value), 0);
                        const weiboNums =  _.reduce(this.lineData.weibo, (memo, value) => (memo + value), 0);
                        const clientNums =  _.reduce(this.lineData.client, (memo, value) => (memo + value), 0);
                        const webNums =  _.reduce(this.lineData.web, (memo, value) => (memo + value), 0);
                        const overseasNums =  _.reduce(this.lineData.overseas, (memo, value) => (memo + value), 0);
                        this.summaryNums = [
                            wechatNums+ weiboNums+clientNums+webNums+overseasNums,
                            wechatNums,
                            weiboNums,
                            clientNums,
                            webNums,
                            overseasNums
                        ];
                    } else if(resp.data.code == 1004){
                        const selTime = this.analyticsTimePopUp;
                        switch (selTime){
                            case 0.33:
                                this.resultChartLoading = false;
                                this.resultPieChartLoading = false;
                                this.loadingParams.visiable = false;
                                this.setAnalyticsTimePopUp(1);
                                break;
                            case 1:
                                this.resultChartLoading = false;
                                this.resultPieChartLoading = false;
                                this.loadingParams.visiable = false;
                                this.setAnalyticsTimePopUp(7);
                                break;
                            default:
                                this.resultChartOption.series=[];
                                    this.resultPieChartOption.series=[];
                                this.resultChartLoading = false;
                                this.resultPieChartLoading = false;
                                this.loadingParams.visiable = false;
                                //alert('暂无数据');
                                break;

                        }
                    }
                });
            },
            getCommentList(type = 'time'){
                this.list=[];
                this.loadingParams.visiable = true;
                setTimeout(function () {
                    this.loadingParams.visiable = false;
                }.bind(this),9000)
                const topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0;
                let end =this.analyticsEnd,
                        start = this.analyticsStart;
                if(start.includes(' ') && end.includes(' ')){
                    start = start.split(' ')[0]+'T'+start.split(' ')[1];
                    end = end.split(' ')[0]+'T'+end.split(' ')[1];
                    console.log('start',start,end);
                }
                Api.getCommentList({type, topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    if(resp.data.code == 0){
                        this.loadingParams.visiable = false;
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
                    overseas: [],
                    sengine:[]
                };
            },

            init(topic){
                this.initData();
                this.getSummaryDetail();
                this.getCommentList();
            }
        },
        watch: {
       /* nowTime:{
            handler(val,oldVal){
                const afterTime = moment().add(1,"hour").format("YYYY-MM-DD HH");
                const space = moment(afterTime).diff(moment(val));
                if(this.analyticsTimeRange>7){
                    const interval = this.analyticsTimeRange;
                    setTimeout(function () {
                        const nowDay = moment().format("YYYY-MM-DD")
                        this.setAnalyticsEnd(nowDay);
                        this.setAnalyticsStart(moment(nowDay).subtract(interval,"day").format("YYYY-MM-DD"));
                        this.init();
                        this.nowTime = afterTime;
                    }.bind(this),space)
                }else {
                    setTimeout(function () {
                        this.setAnalyticsEnd(moment(this.analyticsEnd).add(1,"hour").format("YYYY-MM-DD HH")),
                                this.setAnalyticsStart(moment(this.analyticsStart).add(1,"hour").format("YYYY-MM-DD HH"));
                        this.init();
                        this.nowTime = afterTime;
                    }.bind(this),space)
                }
            }
        },*/
            //这里需要判断资源-------------------
            analyticsRefreshTopic:{
                handler(val){
                    if(val !=0){
                        this.init();
                    }
                }
            },
            activeAnalyticsTopic: {
                handler(val){
                    this.resultChartLoading = true;
                    this.resultPieChartLoading = true;
                    this.init();
                }
            },
            //这里需要判断资源-------------------
            analyticsDateChange: {
                handler(val){
                    this.init();
                }
            },
            //这里需要判断资源-------------------
            analyticsSubTopicId:{
                handler(val){
                    this.init();
                }
            },
            analyticsSource: {
                handler(val){
                    //this.loadingParams.visiable = true;
                    this.getCommentList();
                }
            },
            analyticsSubTopic: {
                handler(val){
                    //this.loadingParams.visiable = true;
                    if(val !=''){
                        this.init();
                    }
                }
            },
            sortVal: {
                handler(val, oldVal){
                    if(val != oldVal && val !=""){
//                    if(val != oldVal){
                        // 展示不同的列表信息
//                        this.getCommentList(val.key);
                        this.getCommentList(val);
                        console.log('val',val);
                    }
                }
            }
        },
        ready(){
            this.nowTime = moment();
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
