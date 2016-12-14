<template>
    <tabs :actions="actions" :datas="sentimentNums"></tabs>
    <!--<span>Sentiment</span>-->
    <div class="sentiment-overflow">
        <div class="charts">
            <div class="chart timeBar" :click="clickChartAction" v-echarts="sentimentBarOption" :loading="sentimentBarLoading" ></div><!--theme="infographic"-->
            <!--<div class="chart percentBar" v-echarts="sentimentChartOption" :loading="sentimentChartLoading" ></div>-->
            <div class="chart percentBar" v-echarts="sentimentPieOption" :loading="sentimentPieLoading"></div>
        </div>
        <!--<div class="charts"></div>-->

        <list-panel :list="list" :options="options" :select-title="selectTitle" :select-value.sync="sortVal"></list-panel>
    </div>

    <tips :visible.sync="loadingParams.visiable" :tipsparam.sync="loadingParams"></tips>
</template>
<style lang="less" scoped>
    @import "Sentiment.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import moment from 'moment';
    //import { list } from "../../config/tmpData";
    import ListPanel from '../Common/ListPanel/ListPanel.vue';
    import Tabs from '../Common/Tabs/Tabs.vue';
    import Tips from '../Common/Tips/Tips.vue';
    import Local from "../../local/local";
    import {Chart, Pie} from '../../config/config';
    import * as Api from '../../widgets/Api';
    import {analyticsTimePopUp,analyticsSubTopicId, analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, activeAnalyticsTopic, analyticsRefreshTopic } from '../../vuex/getters';
    import {setAnalyticsTimePopUp,setAnalyticsEnd,setAnalyticsStart} from '../../vuex/actions';


    export default{
        data(){
            const common = Local().common;
            const sentiment = Local().sentiment;
            return{
                common,
                nowTime:null,
                sentiment,
                loadingParams: {
                    visiable: false,
                    type: 'loading',
                    content: common.waitWords
                },
                options: [{key: 'time', value:common.timeRanking}, {key: 'browser', value:common.countRanking}, {key: 'star', value:common.greetRanking},{key:'share',value:common.shareRanking}],
                //list: list.time,
                list: [],
                sortVal: "",
                x: [],
                sentimentArr: ["happy", "anger", "sorrow", "disgust", "fear"],
                sentimentMap: {happy: 0, anger: 1, sorrow: 2, disgust: 3, fear: 4},
                lineData: {
                    all: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    wechat: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    weibo: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    client: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    web: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    overseas: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    sengine:{
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    }
                },

                sentimentBarLoading: true,
                sentimentBarOption:{
                    isToggle: true,
                    title: _.extend({}, Chart.title, { show: false}),
                    tooltip: _.extend({}, Chart.tooltip, {
                        axisPointer : {
                            type : 'line'
                        }
                    }),
                    legend: {
                        data:[sentiment.happy,sentiment.anger,sentiment.sorrow,sentiment.disgust,sentiment.fear]
                    },
                    dataZoom: _.extend({}, Chart.dataZoom),
                   // color:_.extend( Chart.color, {}),
                    grid: _.extend({}, Chart.grid, {
                        bottom: '40rem',
                    }),
                    toolbox: _.extend({}, Chart.toolbox),
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
                    color:['#2FCC71','#E64D3D', '#F1C40F', '#3598DC', '#737373'],
                    graphic:Chart.graphic,
                    series : [{
                        name:sentiment.happy,
                        type:'line',
                        data: []
                    }, {
                        name:sentiment.anger,
                        type:'line',
                        data: []
                    }, {
                        name:sentiment.sorrow,
                        type:'line',
                        data: []
                    }, {
                        name:sentiment.disgust,
                        type:'line',
                        data: []
                    }, {
                        name:sentiment.fear,
                        type:'line',
                        data: []
                    }]
                },
               sentimentPieLoading:false,
                sentimentPieOption:{
                    tooltip: {
                        show:true,
                        trigger: 'item',
                        formatter:"{b}:({d}%)"
                    },
                    legend: _.extend({}, Pie.legend, {
                    bottom: 0,
                    data: [sentiment.happy,sentiment.anger,sentiment.sorrow,sentiment.disgust,sentiment.fear]
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
                sentimentNums: []
            }
        },
        vuex: {
            getters: {analyticsTimePopUp,analyticsSubTopicId, analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, activeAnalyticsTopic, analyticsRefreshTopic },
            actions:{setAnalyticsTimePopUp,setAnalyticsEnd,setAnalyticsStart}
        },
        methods: {
            actions(val, idx){
                let source = "";
                switch(idx){
                    case 0:
                        source = 'all';
                        break;
                    case 1:
                        source = 'wechat';
                        break;
                    case 2:
                        source = 'weibo';
                        break;
                    case 3:
                        source = 'client';
                        break;
                    case 4:
                        source = 'web';
                        break;
                    case 5:
                        source = 'overseas';
                        break;
                    case 6:
                        source = 'sengine';
                        break;
                    default:
                        break;
                }
                if(source =='sengine'){
                    return ;
                }
                //this.sentimentPieOption.series[0].name = source;
                this.sentimentPieOption.series[0].data =[
                    {value:_.reduce(this.lineData[source].happy,(mome, val) => mome + val, 0), name:this.sentiment.happy},
                    {value:_.reduce(this.lineData[source].anger,(mome, val) => mome + val, 0), name:this.sentiment.anger},
                    {value:_.reduce(this.lineData[source].sorrow,(mome, val) => mome + val, 0), name:this.sentiment.sorrow},
                    {value:_.reduce(this.lineData[source].disgust,(mome, val) => mome + val, 0), name:this.sentiment.disgust},
                    {value:_.reduce(this.lineData[source].fear,(mome, val) => mome + val, 0), name:this.sentiment.fear}
                ];
                _.each(this.lineData[source], (value, key) => {
                    this.sentimentBarOption.series[this.sentimentMap[key]].data = value;
                });
                this.getCommentList();

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
                            console.log(typeof opts.name.split(":")[0],opts.name.split(":")[0])
                            end = opts.name.split(":")[0]
                            end = end.split(" ")[0]+'T'+end.split(" ")[1];
                            start = moment(opts.name.split(":")[0],"YYYY-MM-DD HH").subtract(8, 'hour').format("YYYY-MM-DD HH")
                            start=start.split(" ")[0]+'T'+start.split(" ")[1];
                            console.log('start',start,end);
                        }
                Api.getCommentList({type, topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    //console.log(resp.data);
                    this.loadingParams.visiable = false;
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
                        time_dimension = time_interval > 7 ? 1 : 0;
                //获取时间 设置8H对应的时间格式
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
            getSentimentDetail(){
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
                }
                Api.getSentimentDetail({ topic_id, topic, subtopic, source, start, end, time_dimension }).then(resp => {
                    if(resp.data.code == 0){
                        const details = resp.data.data;
                        this.x=[];
                        this.x = _.map(details, detail => detail.date);
                        const _this = this;
                        this.initData();
                        let all = {happy: [], anger:[], sorrow:[], disgust:[], fear:[]};
                        _.each(details, (detail, index) => {
                            _.each(detail.values, (value, key) => {
                                this.lineData[key].happy.push(detail.values[key].happy);
                                this.lineData[key].anger.push(detail.values[key].anger);
                                this.lineData[key].sorrow.push(detail.values[key].sorrow);
                                this.lineData[key].disgust.push(detail.values[key].disgust);
                                this.lineData[key].fear.push(detail.values[key].fear)

                            });
                            all.happy.push(_this.lineData.wechat.happy[index] + _this.lineData.weibo.happy[index] + _this.lineData.client.happy[index] + _this.lineData.web.happy[index] + _this.lineData.overseas.happy[index]+_this.lineData.sengine.happy[index]);
                            all.anger.push(this.lineData.wechat.anger[index] + this.lineData.weibo.anger[index] + this.lineData.client.anger[index] + this.lineData.web.anger[index] + this.lineData.overseas.anger[index] + this.lineData.sengine.anger[index]);
                            all.sorrow.push(this.lineData.wechat.sorrow[index] + this.lineData.weibo.sorrow[index] + this.lineData.client.sorrow[index] + this.lineData.web.sorrow[index] + this.lineData.overseas.sorrow[index] + this.lineData.sengine.sorrow[index]);
                            all.disgust.push(this.lineData.wechat.disgust[index] + this.lineData.weibo.disgust[index] + this.lineData.client.disgust[index] + this.lineData.web.disgust[index] + this.lineData.overseas.disgust[index]+ this.lineData.sengine.disgust[index]);
                            all.fear.push(this.lineData.wechat.fear[index] + this.lineData.weibo.fear[index] + this.lineData.client.fear[index] + this.lineData.web.fear[index] + this.lineData.overseas.fear[index]+ this.lineData.sengine.fear[index]);
                        });
                        this.lineData.all = all;

                    //修改资源来源数量
                        _.map(_.zip(_.values(this.lineData.web),_.values(this.lineData.client)),(item,index)=>{
                            (this.lineData.client)[(_.keys(this.lineData.web))[index]] =_.map(_.unzip(item),value=>{return _.reduce(value,function(memo,num){return memo +num;},0)})
                        })
                    this.lineData.web = this.lineData.sengine;
                        console.log(this.lineData);
                        this.sentimentBarLoading = false;
                        //this.sentimentChartLoading = false;
                        this.sentimentPieLoading = false;
                        this.sentimentBarOption.xAxis.data = this.x;
                        this.actions("", 0);

                        _.each(_.pairs(this.lineData),(value,index) =>{
                            console.log(this.lineData[index]);
                            console.log(_.pairs(value));
                            this.sentimentNums[index]=_.reduce( _.reduce(_.map(_.pairs(value[1]),arr=>{
                                        return arr[1]
                                    }),function(a,b){return a.concat(b);},[])
                                    ,function (memo,num) {
                                return memo+num;
                            },0)
                        });
                        this.sentimentNums.pop();
                        console.log(this.sentimentNums)
                       /* const allNums=_.reduce(this.lineData.all.happy,(mome, val) => mome + val, 0)+_.reduce(this.lineData.all.anger,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.all.sorrow,(mome, val) => mome + val, 0)+_.reduce(this.lineData.all.disgust,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.all.fear,(mome, val) => mome + val, 0);
                        const wechatNums=_.reduce(this.lineData.wechat.happy,(mome, val) => mome + val, 0)+_.reduce(this.lineData.wechat.anger,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.wechat.sorrow,(mome, val) => mome + val, 0)+_.reduce(this.lineData.wechat.disgust,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.wechat.fear,(mome, val) => mome + val, 0);
                        const weiboNums=_.reduce(this.lineData.weibo.happy,(mome, val) => mome + val, 0)+_.reduce(this.lineData.weibo.anger,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.weibo.sorrow,(mome, val) => mome + val, 0)+_.reduce(this.lineData.weibo.disgust,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.weibo.fear,(mome, val) => mome + val, 0);
                        const clientNums=_.reduce(this.lineData.client.happy,(mome, val) => mome + val, 0)+_.reduce(this.lineData.client.anger,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.client.sorrow,(mome, val) => mome + val, 0)+_.reduce(this.lineData.client.disgust,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.client.fear,(mome, val) => mome + val, 0);
                        const webNums=_.reduce(this.lineData.web.happy,(mome, val) => mome + val, 0)+_.reduce(this.lineData.web.anger,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.web.sorrow,(mome, val) => mome + val, 0)+_.reduce(this.lineData.web.disgust,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.web.fear,(mome, val) => mome + val, 0);
                        const overseasNums=_.reduce(this.lineData.overseas.happy,(mome, val) => mome + val, 0)+_.reduce(this.lineData.overseas.anger,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.overseas.sorrow,(mome, val) => mome + val, 0)+_.reduce(this.lineData.overseas.disgust,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.overseas.fear,(mome, val) => mome + val, 0);
                        const sengineNums=_.reduce(this.lineData.sengine.happy,(mome, val) => mome + val, 0)+_.reduce(this.lineData.sengine.anger,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.sengine.sorrow,(mome, val) => mome + val, 0)+_.reduce(this.lineData.sengine.disgust,(mome, val) => mome + val, 0)
                                +_.reduce(this.lineData.sengine.fear,(mome, val) => mome + val, 0);
                        this.sentimentNums =[
                            allNums,
                            wechatNums,
                            weiboNums,
                            clientNums,
                            webNums,
                            overseasNums
                        ];
                        console.log(this.sentimentNums)*/
                    }else if(resp.data.code == 1004){
                        const selTime = this.analyticsTimePopUp;
                        switch (selTime){
                            case 0.33:
                                this.sentimentBarLoading = false;
                                this.sentimentPieLoading = false;
                                this.loadingParams.visiable = false;
                                this.setAnalyticsTimePopUp(1);
                                break;
                            case 1:
                                this.sentimentBarLoading = false;
                                this.sentimentPieLoading = false;
                                this.loadingParams.visiable = false;
                                this.setAnalyticsTimePopUp(7);
                                break;
                            default:
                               this.sentimentBarOption.series=[{
                                                                name:this.sentiment.happy,
                                                                type:'line',
                                                                data: []
                                                            }, {
                                                                name:this.sentiment.anger,
                                                                type:'line',
                                                                data: []
                                                            }, {
                                                                name:this.sentiment.sorrow,
                                                                type:'line',
                                                                data: []
                                                            }, {
                                                                name:this.sentiment.disgust,
                                                                type:'line',
                                                                data: []
                                                            }, {
                                                                name:this.sentiment.fear,
                                                                type:'line',
                                                                data: []
                                                            }]
                                this.sentimentPieOption.series.data=[];
                                this.sentimentBarLoading = false;
                                this.sentimentPieLoading = false;
                                this.loadingParams.visiable = false;
                                break;

                        }
                    }
                });
            },
            initData(){
                this.lineData = {
                    all: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    wechat: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    weibo: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    client: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    web: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    overseas: {
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    },
                    sengine:{
                        happy: [], anger: [], sorrow: [], disgust: [], fear: []
                    }
                };
            },
            init(){
                this.initData();
                this.getSentimentDetail();
                this.getCommentList();
            }
        },
        ready(){
            this.nowTime = moment();
            if(this.activeAnalyticsTopic && this.activeAnalyticsTopic.topic_id){
                this.init();
            }
        },
        watch: {
            //作为判断点击当前list更新页面
           /* nowTime:{
                handler(val,oldVal){
                    const afterTime = moment().add(1, "hour").format("YYYY-MM-DD HH");
                    const space = moment(afterTime).diff(moment(val));
                    if (this.analyticsTimeRange > 7) {
                        const interval = this.analyticsTimeRange;
                        setTimeout(function () {
                            const nowDay = moment().format("YYYY-MM-DD")
                            this.setAnalyticsEnd(nowDay);
                            this.setAnalyticsStart(moment(nowDay).subtract(interval, "day").format("YYYY-MM-DD"));
                            this.init();
                            this.nowTime = afterTime;
                        }.bind(this), space)
                    } else {
                        setTimeout(function () {
                            this.setAnalyticsEnd(moment(this.analyticsEnd).add(1, "hour").format("YYYY-MM-DD HH")),
                                    this.setAnalyticsStart(moment(this.analyticsStart).add(1, "hour").format("YYYY-MM-DD HH"));
                            this.init();
                            this.nowTime = afterTime;
                        }.bind(this), space)
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
                    this.sentimentBarLoading = true;
                    //this.sentimentChartLoading = true;
                    this.sentimentPieLoading = true;
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
//                    if(val != oldVal && oldVal !=""){
                    if(val != oldVal){
//                        this.getCommentList(val.key);
                        this.getCommentList(val);
                        console.log('val',val);
                    }
                }
            },
            analyticsSubTopicId:{
                handler(val){
                    if(this.analyticsSubTopicId != 0){
                        this.init();
                    }
                }
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
