<template>
    <tabs :actions="actions" :datas="summaryNums"></tabs>
    <!--<span>Result</span>-->
    <div class="result-overflow">
        <list-panel :list="list" :options="options" :select-title="selectTitle" :select-value.sync="sortVal"></list-panel>
    </div>

    <tips :visible.sync="loadingParams.visiable" :tipsparam.sync="loadingParams"></tips>
</template>
<style lang="less" scoped>
    @import "Information.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import moment from 'moment';
    import Local from "../../local/local";
    import * as Api from "../../widgets/Api";
    import { Chart, Pie } from '../../config/config';
    import { list } from "../../config/tmpData";
    import ListPanel from '../Common/ListPanel/ListPanel.vue';
    import Tabs from '../Summary/Tabs/Tabs.vue';
    import Tips from '../Common/Tips/Tips.vue';
    import {summaryTimePopUp, summarySubTopicId, summaryType, summaryTimeRange, summarySource, summarySubTopic, summaryDateChange, summaryStart, summaryEnd, activeSummaryTopic, summaryRefreshTopic } from '../../vuex/getters';
    import {setSummaryTimePopUp,setSummaryEnd,setSummaryStart } from '../../vuex/actions';

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
                    color:['#111844','#2FCC71', '#F1C40F', '#d78b40', '#3598DC','#E64D3D'],
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
                    color:['#2FCC71', '#F1C40F', '#d78b40', '#3598DC','#E64D3D'],
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
                                data: [common.all,common.wechat, common.weibo, common.client, common.web, common.overseas]
                            }),
                            series: [{
                                name:common.all,
                                type:'line',
//                                areaStyle: {normal: {}},
                                data: data[5]
                            },{
                                name:common.wechat,
//                                areaStyle: {normal: {}},
//                                stack: 'Total',
                                type:'line',
                                data:data[0]
                            }, {
                                name:common.weibo,
//                                areaStyle: {normal: {}},
//                                stack: 'Total',
                                type:'line',
                                data: data[1]
                            }, {
                                name:common.client,
                                type:'line',
//                                areaStyle: {normal: {}},
//                                stack: 'Total',
                                data:data[2]
                            }, {
                                name:common.web,
                                type:'line',
//                                areaStyle: {normal: {}},
//                                stack: 'Total',
                                data: data[3]
                            }, {
                                name:common.overseas,
                                type:'line',
//                                areaStyle: {normal: {}},
//                                stack: 'Total',
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
            getters: {summaryTimePopUp, summarySubTopicId,summaryType, summaryTimeRange, summarySource, summarySubTopic, summaryDateChange, summaryStart, summaryEnd, activeSummaryTopic, summaryRefreshTopic},
            actions:{setSummaryTimePopUp,setSummaryEnd,setSummaryStart}
        },
        methods: {
            toggle(){
                this.resultChartOption.isToggle = !this.resultChartOption.isToggle;
                this.resultPieChartOption.isActive = !this.resultPieChartOption.isActive;
            },
            clickChartAction(opts){
                this.loadingParams.visiable = true;
                const topic_id = this.activeSummaryTopic.topic_id,
                        subtopic = this.summarySubTopic,
                        source = this.summarySource,
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
                Api.getCommentList({type, topic_id, subtopic, source, start, end, time_dimension}).then(resp => {
                    //console.log(resp.data);
                    this.loadingParams.visiable = false;
                    if(resp.data.code == 0){
                        this.list = resp.data.data;
                    }
                });
            },
            getSummaryDetail(){
                const topic_id = this.activeSummaryTopic.topic_id,
                        subtopic = this.summarySubTopic,
                        source = this.summarySource,
                        time_interval = this.summaryTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0;
                let end =this.summaryEnd,
                        start = this.summaryStart;
                if(start.includes(' ') && end.includes(' ')){
                    start = start.split(' ')[0]+'T'+start.split(' ')[1];
                    end = end.split(' ')[0]+'T'+end.split(' ')[1];
                    console.log('start',start,end);
                }
                Api.getSummaryDetail({topic_id, subtopic, source, start, end, time_dimension}).then(resp => {
                    if(resp.data.code == 0){
                        this.resultChartLoading = false;
                        this.resultPieChartLoading = false;
                        const details = resp.data.data;
                        this.x =[];
                        this.initData();
                        this.summaryNums=[];
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
                        const plus=_.map(_.zip(this.lineData.wechat,this.lineData.weibo,this.lineData.client,this.lineData.web,this.lineData.overseas),item=>{
                            return _.reduce(item, function(memo, num){ return memo + num; }, 0)
                        });
                        console.log('plus',plus);
                        this.lineData.all = [this.lineData.wechat,this.lineData.weibo,this.lineData.client,this.lineData.web,this.lineData.overseas,plus];
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
                    }
                });
            },
            getCommentList(type = 'time'){
                this.list=[];
                this.loadingParams.visiable = true;
                setTimeout(function () {
                    this.loadingParams.visiable = false;
                }.bind(this),9000)
                const topic_id = this.activeSummaryTopic.topic_id,
                        subtopic = this.summarySubTopic,
                        source = this.summarySource,
                        time_interval = this.summaryTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0;
                let end =this.summaryEnd,
                        start = this.summaryStart;
                if(start.includes(' ') && end.includes(' ')){
                    start = start.split(' ')[0]+'T'+start.split(' ')[1];
                    end = end.split(' ')[0]+'T'+end.split(' ')[1];
                    console.log('start',start,end);
                }
                Api.getCommentList({type, topic_id, subtopic, source, start, end, time_dimension}).then(resp => {
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
             if(this.summaryTimeRange>7){
             const interval = this.summaryTimeRange;
             setTimeout(function () {
             const nowDay = moment().format("YYYY-MM-DD")
             this.setSummaryEnd(nowDay);
             this.setSummaryStart(moment(nowDay).subtract(interval,"day").format("YYYY-MM-DD"));
             this.init();
             this.nowTime = afterTime;
             }.bind(this),space)
             }else {
             setTimeout(function () {
             this.setSummaryEnd(moment(this.summaryEnd).add(1,"hour").format("YYYY-MM-DD HH")),
             this.setSummaryStart(moment(this.summaryStart).add(1,"hour").format("YYYY-MM-DD HH"));
             this.init();
             this.nowTime = afterTime;
             }.bind(this),space)
             }
             }
             },*/
            //这里需要判断资源-------------------
            summaryRefreshTopic:{
                handler(val){
                    if(val !=0){
                        this.init();
                    }
                }
            },
            activeSummaryTopic: {
                handler(val){
                    this.resultChartLoading = true;
                    this.resultPieChartLoading = true;
                    this.init();
                }
            },
            //这里需要判断资源-------------------
            summaryDateChange: {
                handler(val){
                    this.init();
                }
            },
            //这里需要判断资源-------------------
            summarySubTopicId:{
                handler(val){
                    this.init();
                }
            },
            summarySource: {
                handler(val){
                    //this.loadingParams.visiable = true;
                    this.getCommentList();
                }
            },
            summarySubTopic: {
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
            if(this.activeSummaryTopic && this.activeSummaryTopic.topic_id){
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
