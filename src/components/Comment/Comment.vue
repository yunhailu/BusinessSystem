<template>
    <tabs :actions="actions" :datas="commentNums"></tabs>
    <div class="overflowAuto">
        <div class="charts">
            <div class="chart commentLeftBar"  v-echarts="commentBarOption" :click="clickChartAction" :loading="commentBarLoading" theme="macarons"></div><!--theme="infographic"-->
            <div class="chart commentRightBar" v-echarts="commentPieOption2" :loading="commentPieLoading2" v-show="isShow" theme="macarons"></div>
        </div>
        <list-panel :list="list" :options="options" :select-title="selectTitle" :select-value.sync="sortVal"></list-panel>
    </div>
    <tips :visible.sync="loadingParams.visiable" :tipsparam.sync="loadingParams"></tips>
</template>
<style lang="less" scoped>
    @import "Comment.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import moment from 'moment';
    import { Chart, Pie } from '../../config/config';
    import Local from '../../local/local';
    import * as Api from '../../widgets/Api';
    //import { list } from "../../config/tmpData";
    import ListPanel from '../Common/ListPanel/ListPanel.vue';
    import Tabs from '../Common/Tabs/Tabs.vue';
    import Tips from '../Common/Tips/Tips.vue';
    import {analyticsTimePopUp,analyticsSubTopicId, analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, activeAnalyticsTopic, analyticsRefreshTopic } from '../../vuex/getters';
    import {setAnalyticsTimePopUp,setAnalyticsEnd,setAnalyticsStart} from '../../vuex/actions';

    export default{
        data(){
            const words = Local().comment, common = Local().common;
            return{
                words,
                common,
                nowTime:null,
                loadingParams: {
                    visiable: false,
                    type: 'loading',
                    content: common.waitWords
                },
                selectTitle: Local().common.sortBy,
                list: [],
                options: [{key: 'time', value:common.timeRanking}, {key: 'browser', value:common.countRanking}, {key: 'star', value:common.greetRanking},{key:'share',value:common.shareRanking}],
                sortVal: "",
                x: [],
                isShow: true,
                commentArr: ["positive", "negative", "neutral"],
                commentMap: {"positive": 0, "negative": 1, "neutral": 2},
                lineData: {
                    wechat: {positive: [], negative: [], neutral: []},
                    weibo: {positive: [], negative: [], neutral: []},
                    client: {positive: [], negative: [], neutral: []},
                    web: {positive: [], negative: [], neutral: []},
                    overseas: {positive: [], negative: [], neutral: []},
                    all: {positive: [], negative: [], neutral: []},
                    sengine:{positive: [], negative: [], neutral: []}
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
                    color:['#2FCC71','#E64D3D', '#F1C40F', '#3598DC', '#737373'],
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
                    graphic:Chart.graphic,
                    series : [
                        { name: words.positive, type: 'line',
                            data: [] },
                        { name: words.negative, type:'line',
                            data: [] },
                        { name: words.neutral, type:'line',
                            data: [] }
                    ]
                },

                commentPieLoading2:true,
                commentPieOption2:{
                    tooltip: {
                        show:true,
                        trigger: 'item',
                        formatter:"{b}:({d}%)"
                    },
                    legend: _.extend({}, Pie.legend, {
                        bottom: 0,
                        data: [words.positive, words.negative, words.neutral]
                    }),
                    color:['#2FCC71','#E64D3D', '#F1C40F', '#3598DC', '#737373'],
                    textStyle: Pie.textStyle,
                    toolbox: Pie.toolbox,
                    graphic:Pie.graphic,
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
                },
                commentNums: []
            }
        },
        methods: {
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
                    console.log('start',start,end);
                }
                Api.getCommentList({type, topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    if(resp.data.code == 0){
                    this.loadingParams.visiable = false;
                        this.list = resp.data.data;
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
                if(start.includes(' ') && end.includes(' ')) {
                    start = start.split(' ')[0] + 'T' + start.split(' ')[1];
                    end = end.split(' ')[0] + 'T' + end.split(' ')[1];
                }
                Api.getCommentList({type, topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    if(resp.data.code == 0){
                        this.list = resp.data.data;
                        this.loadingParams.visiable = false;
                    }
                });
            },
            getCommentDetail(){
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
                Api.getCommentDetail({ topic_id, topic, subtopic, source, start, end, time_dimension }).then(resp => {
                    if(resp.data.code == 0){
                        this.commentBarLoading = false;
                        this.commentPieLoading2= false;
                        const details = resp.data.data;
                        this.x=[];
                        this.x = _.map(details, detail => detail.date);
                        const _this = this;
                        this.initData();
                        let all = {positive: [], negative:[], neutral:[]};
                        _.each(details, (detail, index) => {
                            _.each(detail.values, (value, key) => {
                                this.lineData[key].positive.push(detail.values[key].positive);
                                this.lineData[key].negative.push(detail.values[key].negative);
                                this.lineData[key].neutral.push(detail.values[key].neutral);
                            });
                        });
                        console.log('this.all',this.lineData);
                        all.positive =_.map(_.zip(this.lineData.wechat.positive,this.lineData.weibo.positive,this.lineData.client.positive,this.lineData.web.positive,this.lineData.overseas.positive,this.lineData.sengine.positive),item =>{
                            return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                        });
                        all.negative =_.map(_.zip(this.lineData.wechat.negative,this.lineData.weibo.negative,this.lineData.client.negative,this.lineData.web.negative,this.lineData.overseas.negative,this.lineData.sengine.negative),item =>{
                            return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                        });
                        all.neutral =_.map(_.zip(this.lineData.wechat.neutral,this.lineData.weibo.neutral,this.lineData.client.neutral,this.lineData.web.neutral,this.lineData.overseas.neutral,this.lineData.sengine.neutral),item =>{
                            return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                        });
                        this.lineData.all = all;
                    //修改资源数据
                    this.lineData.client.positive = _.map(_.zip(this.lineData.client.positive,this.lineData.web.positive),item=>{
                                                    return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                                                     });
                    this.lineData.client.negative = _.map(_.zip(this.lineData.client.negative,this.lineData.web.negative),item=>{
                                                    return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                                                     });
                    this.lineData.client.neutral = _.map(_.zip(this.lineData.client.neutral,this.lineData.web.neutral),item=>{
                                                    return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                                                     });
                    this.lineData.web = this.lineData.sengine;


                        this.commentBarOption.xAxis.data = this.x;
                        this.commentBarOption.series = _.map(this.commentBarOption.series, (value, index) => {
                            value.data = all[this.commentArr[index]]
                            return value;
                        });

                        this.commentPieOption2.series[0].data =[
                            {value:_.reduce(this.lineData.all.positive,(mome, val) => mome + val, 0), name:this.words.positive},
                            {value:_.reduce(this.lineData.all.negative,(mome, val) => mome + val, 0), name:this.words.negative},
                            {value:_.reduce(this.lineData.all.neutral,(mome, val) => mome + val, 0), name:this.words.neutral}];
                    console.log('chankan',this.lineData);
                        const allNums=_.reduce(this.lineData.all.negative,(mome, val) => mome + val, 0)+_.reduce(this.lineData.all.neutral,(mome, val) => mome + val, 0)
                        +_.reduce(this.lineData.all.positive,(mome, val) => mome + val, 0);

                        const wechatNums=_.reduce(this.lineData.wechat.negative,(mome, val) => mome + val, 0)+_.reduce(this.lineData.wechat.neutral,(mome, val) => mome + val, 0)
                        +_.reduce(this.lineData.wechat.positive,(mome, val) => mome + val, 0);

                        const weiboNums=_.reduce(this.lineData.weibo.negative,(mome, val) => mome + val, 0)+_.reduce(this.lineData.weibo.neutral,(mome, val) => mome + val, 0)
                        +_.reduce(this.lineData.weibo.positive,(mome, val) => mome + val, 0);

                        const clientNums=_.reduce(this.lineData.client.negative,(mome, val) => mome + val, 0)+_.reduce(this.lineData.client.neutral,(mome, val) => mome + val, 0)
                        +_.reduce(this.lineData.client.positive,(mome, val) => mome + val, 0);

                        const webNums=_.reduce(this.lineData.web.negative,(mome, val) => mome + val, 0)+_.reduce(this.lineData.web.neutral,(mome, val) => mome + val, 0)
                        +_.reduce(this.lineData.web.positive,(mome, val) => mome + val, 0);

                        const overseasNums=_.reduce(this.lineData.overseas.negative,(mome, val) => mome + val, 0)+_.reduce(this.lineData.overseas.neutral,(mome, val) => mome + val, 0)
                        +_.reduce(this.lineData.overseas.positive,(mome, val) => mome + val, 0);

                        const sengineNums=_.reduce(this.lineData.sengine.negative,(mome, val) => mome + val, 0)+_.reduce(this.lineData.sengine.neutral,(mome, val) => mome + val, 0)
                        +_.reduce(this.lineData.sengine.positive,(mome, val) => mome + val, 0);
                        this.commentNums =[
                            allNums,
                            wechatNums,
                            weiboNums,
                            clientNums,
                            webNums,
                            overseasNums
                        ];
                    }else if(resp.data.code == 1004){
                        const selTime = this.analyticsTimePopUp;
                        switch (selTime){
                            case 0.33:
                                this.commentBarLoading = false;
                                this.commentPieLoading2= false;
                                this.loadingParams.visiable = false;
                                this.setAnalyticsTimePopUp(1);
                                break;
                            case 1:
                                this.commentBarLoading = false;
                                this.commentPieLoading2= false;
                                this.loadingParams.visiable = false;
                                this.setAnalyticsTimePopUp(7);
                                break;
                            default:
                                this.commentBarOption.series = [
                                    { name: this.words.positive, type: 'line',
                                        data: [] },
                                    { name: this.words.negative, type:'line',
                                        data: [] },
                                    { name: this.words.neutral, type:'line',
                                        data: [] }
                                ];
                                 this.commentPieOption2.series.data=[];
                                this.commentBarLoading = false;
                                this.commentPieLoading2= false;
                                this.loadingParams.visiable = false;
                                break;

                        }
                    }
                });
            },
            actions(val, idx){
                const map = ['all', 'wechat', 'weibo', 'client', 'web', 'overseas','sengine'];

                _.each(this.lineData[map[idx]], (value, key) => {
                    this.commentBarOption.series[this.commentMap[key]].data = value;
                });

                switch (idx){
                    case 0:
                        this.commentPieOption2.series[0].data =[
                            {value:_.reduce(this.lineData.all.positive,(mome, val) => mome + val, 0), name:this.words.positive},
                            {value:_.reduce(this.lineData.all.negative,(mome, val) => mome + val, 0), name:this.words.negative},
                            {value:_.reduce(this.lineData.all.neutral,(mome, val) => mome + val, 0), name:this.words.neutral},]
                        break;
                    case 1:
                        this.commentPieOption2.series[0].data =[
                            {value:_.reduce(this.lineData.wechat.positive,(mome, val) => mome + val, 0), name:this.words.positive},
                            {value:_.reduce(this.lineData.wechat.negative,(mome, val) => mome + val, 0), name:this.words.negative},
                            {value:_.reduce(this.lineData.wechat.neutral,(mome, val) => mome + val, 0), name:this.words.neutral},]
                        break;
                    case 2:
                        this.commentPieOption2.series[0].data =[
                            {value:_.reduce(this.lineData.weibo.positive,(mome, val) => mome + val, 0), name:this.words.positive},
                            {value:_.reduce(this.lineData.weibo.negative,(mome, val) => mome + val, 0), name:this.words.negative},
                            {value:_.reduce(this.lineData.weibo.neutral,(mome, val) => mome + val, 0), name:this.words.neutral},]
                        break;
                    case 3:
                        this.commentPieOption2.series[0].data =[
                            {value:_.reduce(this.lineData.client.positive,(mome, val) => mome + val, 0), name:this.words.positive},
                            {value:_.reduce(this.lineData.client.negative,(mome, val) => mome + val, 0), name:this.words.negative},
                            {value:_.reduce(this.lineData.client.neutral,(mome, val) => mome + val, 0), name:this.words.neutral},]
                        break;
                    case 4:
                        this.commentPieOption2.series[0].data =[
                            {value:_.reduce(this.lineData.web.positive,(mome, val) => mome + val, 0), name:this.words.positive},
                            {value:_.reduce(this.lineData.web.negative,(mome, val) => mome + val, 0), name:this.words.negative},
                            {value:_.reduce(this.lineData.web.neutral,(mome, val) => mome + val, 0), name:this.words.neutral},]
                        break;
                    case 5:
                        this.commentPieOption2.series[0].data =[
                            {value:_.reduce(this.lineData.overseas.positive,(mome, val) => mome + val, 0), name:this.words.positive},
                            {value:_.reduce(this.lineData.overseas.negative,(mome, val) => mome + val, 0), name:this.words.negative},
                            {value:_.reduce(this.lineData.overseas.neutral,(mome, val) => mome + val, 0), name:this.words.neutral},]
                        break;
                    default:
                        break;
                }
            },
            initData(){
                this.lineData = {
                    wechat: {positive: [], negative: [], neutral: []},
                    weibo: {positive: [], negative: [], neutral: []},
                    client: {positive: [], negative: [], neutral: []},
                    web: {positive: [], negative: [], neutral: []},
                    overseas: {positive: [], negative: [], neutral: []},
                    all: {positive: [], negative: [], neutral: []},
                    sengine:{positive: [], negative: [], neutral: []}
                };
            },
            init(){
                this.initData();
                this.getCommentDetail();
                this.getCommentList();
            }
        },
        vuex: {
            getters: {analyticsTimePopUp,analyticsSubTopicId,analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, activeAnalyticsTopic, analyticsRefreshTopic},
            actions:{setAnalyticsTimePopUp,setAnalyticsEnd,setAnalyticsStart}
        },
        ready(){
            this.nowTime = moment();
            if(this.activeAnalyticsTopic && this.activeAnalyticsTopic.topic_id){
                this.init();
            }
        },
        watch: {
            /*nowTime:{
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
            analyticsRefreshTopic:{
                handler(val){
                    if(val !=0){
                        this.init();
                    }
                }
            },
            activeAnalyticsTopic: {
                handler(val){
                    this.commentBarLoading = true;
                    this.commentChartLoading = true;
                    this.init(val);
                }
            },
            analyticsDateChange: {
                handler(val){
                    this.init();
                }
            },
            analyticsSubTopic: {
                handler(val){
                    if(val !=''){
                        this.init();
                    }
                }
            },
            analyticsSubTopicId:{
                handler(val){
                    this.init();
                }
            },
            analyticsSource: {
                handler(val){
                    this.getCommentList();
                }
            },
            sortVal: {
                handler(val, oldVal){
                    if(val != oldVal && oldVal !=''){
                        this.getCommentList(val.key);
                    }
                }
            }
        },
        components:{ Tabs, ListPanel, Tips },
//        route: {
//            data(){
//                this.init();
//            }
//        }
    }
</script>
