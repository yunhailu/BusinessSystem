<template>
    <div class="panel-title">
        <span class="panel-title-text">{{title}}</span>
        <div class="panel-title-delete" @click="deleteItem();"><i class="fa fa-minus"></i></div>
    </div>
    <div class="charts">
        <div class="chart commentLeftBar" theme="macarons">
            <echarts :options="commentBarOption" initOptions="commentBarOption" :img.sync="master" theme="macarons"></echarts>
        </div>
        <div class="chart commentRightBar"  v-show="isShow">
            <echarts :options="commentPieOption2" initOptions="commentPieOption2" :img.sync="sub" theme="macarons"></echarts>
        </div>
        <div class="chart commentRightBar" v-show="!isShow" >
            <echarts :options="commentPieOption" initOptions="commentPieOption"  theme="macarons"></echarts>
        </div>
    </div>
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
    import ListPanel from '../../Common/ListPanel/ListPanel.vue';
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
                        key: "comment_master",
                        value
                    });
                }
            },
            sub:{
                handler(value){
                    this.insertExportImages({
                        topic: this.data.topic,
                        topic_id: this.data.topic_id,
                        key: "comment_slave",
                        value
                    });
                }
            }
        },
        data(){
            const words = Local().comment, common = Local().common;
            return{
                words,
                common,
                selectTitle: Local().common.sortBy,
                options: [{key: 'time', value:common.timeRanking}, {key: 'browser', value:common.countRanking}, {key: 'star', value:common.greetRanking}],
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
                    overseas: {positive: [], negative: [], neutral: []},
                    sengine: {positive: [], negative: [], neutral: []}
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
                    animation:false,
                    dataZoom: _.extend({}, Chart.dataZoom),
                    color:_.extend( Chart.color, {}),
                    grid: _.extend({}, Chart.grid, { bottom: '40rem' }),
                    toolbox:Chart.toolbox,
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
                        { name: words.positive,
                            type: 'line',
                            data: []
                        },
                        { name: words.negative,
                            type:'line',
                            data: []
                        },
                        { name: words.neutral,
                            type:'line',
                            data: []
                        }
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
                    graphic:Pie.graphic,
                    series: _.extend({}, Pie.series, {
                        radius: ['20%', '50%'],
                        name: words.comment,
                        center: ['50%', '45%'],
                        data:[]
                    })
                },
                commentPieOption: {
                    isActive: true,
                    title: _.extend({}, Pie.title, { show: false }),
                    tooltip: _.extend({}, Pie.tooltip),
                    legend: _.extend({}, Pie.legend, {
                        bottom: 0,
                        data: [words.positive, words.negative, words.neutral]
                    }),
                    animation:false,
                    textStyle: Pie.textStyle,
                    toolbox: Pie.toolbox,
                    color: _.extend([], Chart.color),
                    graphic:Chart.graphic,
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
                        topic = this.data.topic;
                let start,end;
                if(time_interval!=0){
                    start = moment().subtract(time_interval, 'days').format('YYYY-MM-DD'),
                            end = moment().format('YYYY-MM-DD');
                }else{
                    start = moment().subtract(8, 'hour').format('YYYY-MM-DD HH'),
                            end = moment().format('YYYY-MM-DD HH');
                    start = start.split(' ')[0]+'T'+start.split(' ')[1];
                    end = end.split(' ')[0]+'T'+end.split(' ')[1];
                    console.log('start',start,end);
                }

                Api.getCommentDetail({ subtopic, topic_id, source, time_dimension, start, end, topic }).then(resp => {
                    if(resp.data.code == 0){
                        const details = resp.data.data;
                        this.x = _.map(details, detail => detail.date);
                        const _this = this;
                        let all = {positive: [], negative:[], neutral:[]};
                        _.each(details, (detail, index) => {
                            _.each(detail.values, (value, key) => {
                                this.lineData[key].positive.push(detail.values[key].positive);
                                this.lineData[key].negative.push(detail.values[key].negative);
                                this.lineData[key].neutral.push(detail.values[key].neutral);
                            });
                        });
                        all.positive =_.map(_.zip(this.lineData.wechat.positive,this.lineData.weibo.positive,this.lineData.client.positive,this.lineData.web.positive,this.lineData.overseas.positive),item =>{
                                    return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                        });
                        all.negative =_.map(_.zip(this.lineData.wechat.negative,this.lineData.weibo.negative,this.lineData.client.negative,this.lineData.web.negative,this.lineData.overseas.negative),item =>{
                                    return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                        });
                        all.neutral =_.map(_.zip(this.lineData.wechat.neutral,this.lineData.weibo.neutral,this.lineData.client.neutral,this.lineData.web.neutral,this.lineData.overseas.neutral),item =>{
                                    return _.reduce(item, function(memo, num){ return memo + num; }, 0);
                        });
                        this.lineData.all = all;

                        this.commentBarLoading = false;
                        this.commentBarOption.xAxis.data = this.x;
                        this.commentBarOption.series = _.map(this.commentBarOption.series, (value, index) => {
                            value.data = all[this.commentArr[index]]
                            return value;
                        });

                        this.commentPieLoading2= false;
                        this.commentPieOption2.series[0].data =[
                            {value:_.reduce(this.lineData.all.positive,(mome, val) => mome + val, 0), name:this.words.positive},
                            {value:_.reduce(this.lineData.all.negative,(mome, val) => mome + val, 0), name:this.words.negative},
                            {value:_.reduce(this.lineData.all.neutral,(mome, val) => mome + val, 0), name:this.words.neutral},]
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
                const map = ['all', 'wechat', 'weibo', 'client', 'web', 'overseas'];

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
                    sengine: {positive: [], negative: [], neutral: []}
                };
            },
            deleteItem(){
                const detail = this.data;
                this.remove(detail, 'comment');
            },
            init(){
                this.initData();
                this.getCommentDetail();
            }
        },
        components:{ Tabs, ListPanel, Echarts },
        ready(){
            this.init();
        }
    }
</script>
