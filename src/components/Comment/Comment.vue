<template>
    <tabs :actions="actions" :datas="commentNums"></tabs>
    <!--<div>Evaluation</div>-->
    <div class="charts">
        <div class="chart commentLeftBar" v-echarts="commentBarOption" :click="clickChartAction" :loading="commentBarLoading" theme="macarons"></div><!--theme="infographic"-->
        <!--<div class="chart commentRightBar" v-echarts="commentChartOption" :loading="commentChartLoading" v-show="isShow" theme="macarons"></div>-->
        <div class="chart commentRightBar" v-echarts="commentPieOption2" :loading="commentPieLoading2" v-show="isShow" theme="macarons"></div>
        <div class="chart commentRightBar" v-echarts="commentPieOption" :loading="commentChartLoading" v-show="!isShow" theme="macarons"></div>
    </div>
    <list-panel :list="list" :options="options" :select-title="selectTitle" :select-value.sync="sortVal"></list-panel>
    <tips :visible.sync="loadingParams.visiable" :tipsparam.sync="loadingParams"></tips>
</template>
<style lang="less" scoped>
    @import "Comment.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import { Chart, Pie } from '../../config/config';
    import Local from '../../local/local';
    import * as Api from '../../widgets/Api';
    //import { list } from "../../config/tmpData";
    import ListPanel from '../Common/ListPanel/ListPanel.vue';
    import Tabs from '../Common/Tabs/Tabs.vue';
    import Tips from '../Common/Tips/Tips.vue';
    import { analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, activeAnalyticsTopic, analyticsRefreshTopic } from '../../vuex/getters';

    export default{
        data(){
            const words = Local().comment, common = Local().common;
            return{
                words,
                common,
                loadingParams: {
                    visiable: false,
                    type: 'loading',
                    content: "请稍侯......"
                },
                selectTitle: Local().common.sortBy,
                //list: list.time,
                list: [],
                options: [{key: 'time', value: '按时间排序'}, {key: 'browser', value: '浏览数排序'}, {key: 'star', value: '点赞数排序'}],
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
                    series : [
                        { name: words.positive, type: 'line',
                            //areaStyle: {normal: {}},
                            //stack: 'Total',
                            data: [] },
                        { name: words.negative, type:'line',
                            //areaStyle: {normal: {}},
                            //stack: 'Total',
                            data: [] },
                        { name: words.neutral, type:'line',
                            //areaStyle: {normal: {}},
                            //stack: 'Total',
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
               /* commentChartLoading: true,
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
                    color:['#2FCC71','#E64D3D', '#F1C40F', '#3598DC', '#737373'],
                    series: [
                        { name: words.positive, type: 'bar', stack: '总量', data: [] },
                        { name: words.negative, type: 'bar', stack: '总量', data: [] },
                        { name: words.neutral, type: 'bar', stack: '总量', data: [] }
                    ]
                },*/

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
                    color: ['#2FCC71','#E64D3D', '#F1C40F', '#3598DC', '#737373'],
                    series: _.extend({}, Pie.series, {
                        radius: ['20%', '50%'],
                        name: words.comment,
                        center: ['50%', '45%'],
                        data:[]
                    })
                },

                commentNums: []
            }
        },
        methods: {
            clickChartAction(opts){
                console.log('clickChartAction opts', opts);
                //this.loadingParams.visiable = true;
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
                    //this.loadingParams.visiable = false;
                    if(resp.data.code == 0){
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
                        time_dimension = time_interval > 7 ? 1 : 0,
                        end = this.analyticsEnd,
                        start = this.analyticsStart;
                Api.getCommentList({type, topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    //console.log(resp.data);

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
                    time_dimension = time_interval > 7 ? 1 : 0,
                    end = this.analyticsEnd,
                    start = this.analyticsStart;
                Api.getCommentDetail({ topic_id, topic, subtopic, source, start, end, time_dimension }).then(resp => {
                    //console.log('getCommentDetail', resp.data);
                    //this.loadingParams.visiable = false;
                    if(resp.data.code == 0){
                        //this.loadingParams.visiable = false;
                        const details = resp.data.data;
                        this.x = _.map(details, detail => detail.date);
                        const _this = this;
                        //console.log("xxxx", this.x);
                        console.log('dddd',details);
                        let all = {positive: [], negative:[], neutral:[]};
                        _.each(details, (detail, index) => {
                            _.each(detail.values, (value, key) => {
                                this.lineData[key].positive.push(detail.values[key].positive);
                                this.lineData[key].negative.push(detail.values[key].negative);
                                this.lineData[key].neutral.push(detail.values[key].neutral);
                            });
                           // all.positive.push(this.lineData.wechat.positive[index] + this.lineData.weibo.positive[index] + this.lineData.client.positive[index] + this.lineData.web.positive[index] + this.lineData.overseas.positive[index]);
                            //all.negative.push(_this.lineData.wechat.negative[index] + _this.lineData.weibo.negative[index] + _this.lineData.client.negative[index] + _this.lineData.web.positive[index] + _this.lineData.overseas.positive[index]);
                            //all.neutral.push(_this.lineData.wechat.neutral[index] + _this.lineData.weibo.neutral[index] + _this.lineData.client.neutral[index] + _this.lineData.web.positive[index] + _this.lineData.overseas.positive[index]);
                        });
                        console.log('this.all',this.lineData);
                        all.positive =_.map(_.zip(this.lineData.wechat.positive,this.lineData.weibo.positive,this.lineData.client.positive,this.lineData.web.positive,this.lineData.overseas.positive),item =>{
                            return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                        });
                        all.negative =_.map(_.zip(this.lineData.wechat.negative,this.lineData.weibo.negative,this.lineData.client.negative,this.lineData.web.negative,this.lineData.overseas.negative),item =>{
                            return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                        });
                        all.neutral =_.map(_.zip(this.lineData.wechat.neutral,this.lineData.weibo.neutral,this.lineData.client.neutral,this.lineData.web.neutral,this.lineData.overseas.neutral),item =>{
                            return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                        });
                        console.log('all',all);
                        this.lineData.all = all;

                        this.commentBarLoading = false;
                        this.commentBarOption.xAxis.data = this.x;
                        this.commentBarOption.series = _.map(this.commentBarOption.series, (value, index) => {
                            value.data = all[this.commentArr[index]]
                            return value;
                        });

                        /*this.commentChartLoading = false;
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
                        });*/
                        this.commentPieLoading2= false;
                        this.commentPieOption2.series[0].data =[
                            {value:_.reduce(this.lineData.all.positive,(mome, val) => mome + val, 0), name:this.words.positive},
                            {value:_.reduce(this.lineData.all.negative,(mome, val) => mome + val, 0), name:this.words.negative},
                            {value:_.reduce(this.lineData.all.neutral,(mome, val) => mome + val, 0), name:this.words.neutral},]
                        //console.log('datas', datas);
                        //console.log('series', this.commentChartOption.series);

                        console.log('this.lindeData',this.lineData);
                        /*this.commentNums = [
                            _.chain(this.lineData.all).map(item => _.reduce(item, (memo, val) => (memo + val), 0)).reduce((memo, val) => (memo, val), 0).value(),
                            _.chain(this.lineData.wechat).map(item => _.reduce(item, (memo, val) => (memo + val), 0)).reduce((memo, val) => (memo, val), 0).value(),
                            _.chain(this.lineData.weibo).map(item => _.reduce(item, (memo, val) => (memo + val), 0)).reduce((memo, val) => (memo, val), 0).value(),
                            _.chain(this.lineData.client).map(item => _.reduce(item, (memo, val) => (memo + val), 0)).reduce((memo, val) => (memo, val), 0).value(),
                            _.chain(this.lineData.web).map(item => _.reduce(item, (memo, val) => (memo + val), 0)).reduce((memo, val) => (memo, val), 0).value(),
                            _.chain(this.lineData.overseas).map(item => _.reduce(item, (memo, val) => (memo + val), 0)).reduce((memo, val) => (memo, val), 0).value()
                        ];*/
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

                        console.log(allNums,
                                wechatNums,
                                weiboNums,
                                clientNums,
                                webNums,
                                overseasNums);
                        this.commentNums =[
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
                /*if(idx == 0){
                    this.isShow = true;
                    this.commentPieOption2.series[0].data =[
                        {value:_.reduce(this.lineData.all.positive,(mome, val) => mome + val, 0), name:this.words.positive},
                        {value:_.reduce(this.lineData.all.negative,(mome, val) => mome + val, 0), name:this.words.negative},
                        {value:_.reduce(this.lineData.all.neutral,(mome, val) => mome + val, 0), name:this.words.neutral},]
                    return;
                }*/

               /* this.isShow = false;
                this.commentPieOption.series.data = _.map(this.lineData[map[idx]], (value, key) => {
                    return ({ value: _.reduce(value, (memo, val) => memo + val, 0),name: this.words[key] });
                });*/
                //this.getCommentList();

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
            getters: {analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, activeAnalyticsTopic, analyticsRefreshTopic}
        },
        ready(){
            if(this.activeAnalyticsTopic && this.activeAnalyticsTopic.topic_id){
                this.init();
            }
        },
        watch: {
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
                    //this.loadingParams.visiable = true;
                    this.init();
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
            analyticsSource: {
                handler(val){
                    //this.loadingParams.visiable = true;
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
        components:{ Tabs, ListPanel, Tips },
//        route: {
//            data(){
//                this.init();
//            }
//        }
    }
</script>
