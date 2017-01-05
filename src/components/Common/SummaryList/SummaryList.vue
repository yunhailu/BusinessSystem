<template>
    <div class="list-panel">
    <ul class="list-panel-list" v-if="tableList.length">
        <li class="list-panel-list-item row" v-for="item in tableList">
            <!--<a :href="item.url" target="_blank">-->
            <a  @click="showDetail(item);" href="javascript:void(0);">
                <div class="list-panel-list-item-left list-left">
                    <i class="fa fa-flag icon" :class="item.sentiment | sentiment"></i>
                    <i class="fa fa-paperclip fa-2x fa-left"></i>
                    <div class="list-panel-list-item-left-con left-con">
                        <div class="keyWord">
                            <div class="title-bottom">
                                <span>{{common.match}}:</span> <span class="time-bottom">{{topicName}}</span>
                            </div>
                            <div class="title">{{{item.title| title}}}</div>
                        </div>
                        <div class="detail">{{{item.content}}}</div>
                        <div class="time">{{common.publish}} {{item.pDate}}</div>
                        <div class="source">{{common.sourceFrom}} {{item.from}} </div>
                        <div class="sub-source">{{common.sub_source}} {{item.sub_source}}</div>

                        <div class="title-bottom">
                            <div class="time-bottom">
                                <div class="item" v-if="item.likeCount" ><i class="fa fa-thumbs-up"></i> <span>{{item.likeCount}}</span></div>
                                <div class="item" v-if="item.fansCount"><i class="fa fa-user"></i> <span>{{item.fansCount}}</span></div>
                                <div class="item" v-if="item.viewCount"><i class="fa fa-eye"></i> <span>{{item.viewCount}}</span></div>
                                <div class="item" v-if="item.shareCount"><i class="fa fa-share"></i> <span>{{item.shareCount}}</span></div>
                                <div class="item" v-if="item.commentsCount"><i class="fa fa-commenting"></i> <span>{{item.commentsCount}}</span></div>
                                <div class="item" v-if="item.followCount"><i class="fa fa-plus"></i> <span>{{item.followCount}}</span></div>
                            </div>
                        </div>
                        <div class="waterPage">{{common.dataFrom}}：{{common.source}}</div>

                    </div>
                </div>
            </a>
        </li>
    </ul>
    </div>
    <div class="tipBg" v-if="showSmallTipsOne">
        <div class="smallTips">
            <h3><i class="fa fa-warning"></i> 提示</h3>
            <div class="tips-content">由于法律监管原因，无法访问外网数据，如果需要查阅，请联系客服</div>
            <div class="tips-btns">
                <p class="tips-leftBtn" @click="confirmOne()">确认</p>
            </div>
        </div>
    </div>
    <tips :visible.sync="loadingParams.visiable" :tipsparam.sync="loadingParams"></tips>
    <div class="tipBg" v-if="showSmallTipsTwo">
        <div class="smallTips">
            <h3><i class="fa fa-warning"></i> 提示</h3>
            <div class="tips-content">一小时后出最新统计结果,系统正在计算中，请稍候...</div>
            <div class="tips-btns">
                <p class="tips-leftBtn" @click="confirmTwo()">确认</p>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "SummaryList.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import Local from '../../../local/local';
    import SelectEl from '../Select/Select.vue';
    import * as Api from '../../../widgets/Api'
    import Page from '../Page/Page.vue';
    import Tips from '../Tips/Tips.vue';
    import { WhiteWebSites } from '../../../config/config';
    import {monitorSumWord,summaryOrder,summaryCount,summarySentiment,summaryTimePopUp, summarySubTopicId, summaryType, summaryTimeRange, summarySource, summarySubTopic, summaryDateChange, summaryStart, summaryEnd, activeSummaryTopic, summaryRefreshTopic} from '../../../vuex/getters';
    import {setSummaryTimePopUp,setSummarySourceData} from '../../../vuex/actions';

    export default{
        data(){
            const words = Local().comment;
            const common = Local().common;
            return{
                words,
                common,
                loadingParams: {
                    visiable: false,
                    type: 'loading',
                    content: common.waitWords
                },
                lineData: {
                    all: [],
                    wechat: [],
                    weibo: [],
                    client: [],
                    web: [],
                    overseas: [],
                    sengine:[]
                },
                sourceActive: 0,
                selectTitle: common.sortBy,
                list: [],
                options: [{key: 'time', value:common.timeRanking}, {key: 'browser', value:common.countRanking}, {key: 'star', value:common.greetRanking},{key:'share',value:common.shareRanking}],
                sortVal: "",
                showSmallTipsOne : false,
                showSmallTipsTwo : false,
                listTip: common.nullTip,
                tableList: [],
                filterActive: 20,
                sentimentActive: 'all',
                orderActive:'time',
                topicName:'',
                summaryNums: []
            }
        },
        vuex: {
            getters: {monitorSumWord,summaryOrder,summaryCount,summarySentiment,summaryTimePopUp, summarySubTopicId, summaryType, summaryTimeRange, summarySource, summarySubTopic, summaryDateChange, summaryStart, summaryEnd, activeSummaryTopic, summaryRefreshTopic },
            actions: {setSummaryTimePopUp,setSummarySourceData}
        },
        methods: {
            confirmOne(){
                this.showSmallTipsOne=false;
            },
            confirmTwo(){
                this.showSmallTips=false;
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
                        this.setSummarySourceData(this.summaryNums);
                    } else if(resp.data.code ==1004){
                        this.loadingParams.visiable = false;
                    }
                    /* else if(resp.data.code ==1004){
                     if(time_interval==0){
                     this.resultChartLoading = false;
                     this.resultPieChartLoading= false;
                     this.loadingParams.visiable = false;
                     this.setSummaryTimePopUp(1);
                     }else if(time_interval==0.33){
                     this.resultChartLoading = false;
                     this.resultPieChartLoading= false;
                     this.loadingParams.visiable = false;
                     this.setSummaryTimePopUp(1);
                     }else if(time_interval==1){
                     this.resultChartLoading = false;
                     this.resultPieChartLoading= false;
                     this.loadingParams.visiable = false;
                     this.setSummaryTimePopUp(7);
                     }else {
                     this.resultChartOption.series=[];
                     this.resultPieChartOption.series=[];
                     this.resultChartLoading = false;
                     this.resultPieChartLoading = false;
                     this.loadingParams.visiable = false;
                     this.showSmallTips=true;
                     }
                     }*/
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
                        this.topicName=this.monitorSumWord =='' ? this.activeSummaryTopic.topic_name : this.monitorSumWord;
                    }else if(resp.data.code ==1004){
                        if(time_interval==0){
                            this.setSummaryTimePopUp(1);
                        }else if(time_interval==0.33){
                            this.setSummaryTimePopUp(1);
                        }else if(time_interval==1){
                            this.setSummaryTimePopUp(7);
                        }else if(time_interval==7){
                            this.showSmallTips=true;
                        }
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
                this.getSummaryDetail();
                this.getCommentList();
            },
            //filter
            filterItem(count, flag){
                if(flag == 'all'){
                    this.tableList = _.filter(this.list, (item, index) => (index < count));
                    return ;
                }
                this.tableList = _.filter(this.list, (item, index) => (index < count && item.sentiment == flag));
            },
            showDetail(item){
                console.log('showDetail', item);
                console.log('route', this.$route);
                const type = this.$route.name, id = item.id;
                if(_.indexOf(WhiteWebSites,item.sub_source)!=-1){
                    //海外网站，做处理逻辑
                    this.showSmallTips = true;
                    return ;
                }
                if(id){
                    window.open(window.location.origin+"/"+this.$route.name+"/detail/"+id)
                } else {
                    window.open(item.url);
                }
            }
        },
        filters: {
            sentiment(flag){
                let f;
                switch(flag){
                    case "positive":
                        f = "flag-green";
                        break;
                    case "negative":
                        f = "flag-red";
                        break;
                    case "neutral":
                        f = "flag-yellow";
                        break;
                    default:
                        f = "flag-green";
                        break;
                }
                return f;
            },
            title(title){
                //let title = title;
                if(title.length>=40){
                    title = title.substring(0,40)+'...';
                };
                return title;
            }
        },
//        computed: {
//            list(){
//                return this.list;
//            }
//        },
        watch: {
            list(val){
                this.tableList = val;
                this.filterItem(20, this.summarySentiment);
            },
            summaryCount:{
                handler(val){
                    this.filterItem(val, this.summarySentiment);
                }
            },
            summarySentiment:{
                handler(val){
                    this.filterItem(this.summaryCount, val);
                }
            },
            summaryOrder:{
                handler(val,oldVal){
                    if(val != oldVal && val !=""){
//                    if(val != oldVal){
                        // 展示不同的列表信息
//                        this.getCommentList(val.key);
                        this.getCommentList(val);
                        console.log('val',val);
                    }
                }
            },
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
            }
        },
        ready(){
            if(this.activeSummaryTopic && this.activeSummaryTopic.topic_id){
                this.init();
            }
        },
        components:{
          Tips
        }
    }
</script>