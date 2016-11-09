<template>
    <tabs :datas="influancerNums"></tabs>
    <!--<span>Influence</span>-->
    <div class="popular">
        <ul class="popular-list">
            <li class="popular-list-item" v-for="item in popularList" @click="showNewList(item)">
                <i class="fa" :class="[item.icon ? 'fa-'+item.icon : 'fa-cog']"></i>
                <span class="popular-list-item-title">{{item.title}}</span>
                <div class="popular-list-item-con">
                    <div class="popular-list-item-con-source">{{item.source}} - {{item.value}}</div>
                    <div class="popular-list-item-con-link">
                        <a :href="item.link"  target="_blank">{{item.link}}</a>
                    </div>
                    <div>{{item.post | addLabel "Post"}}</div>
                </div>
            </li>
        </ul>
    </div>
    <div class="influenceTable">
        <table class="table table-hover  table-striped">
            <thead>
                <tr>
                    <td><i class="fa fa-user"></i> <span>{{words.influencer}}</span></td>
                    <td><i class="fa fa-comments"></i> <span>{{words.numberOfPosts}}</span></td>
                    <td><i class="fa fa-bar-chart"></i> <span>{{words.sentiment}}</span></td>
                    <td><i class="fa fa-thumbs-up"></i> {{words.like}}</td>
                    <td><i class="fa fa-share-alt"></i> {{words.resend}}</td>
                    <td><i class="fa fa-comment"></i> {{words.comments}}</td>
                    <td><i class="fa fa-share"></i> {{words.rate}}</td>
                </tr>
            </thead>
            <tbody v-if="influancerTable.length">
                <tr id="item.id" v-for="(index, item) in influancerTable" :class="[index % 2 == 0 ? '' : '']" @click="showPopList(item)" >
                    <td>{{item.influencer}}</td>
                    <td>{{item.post}}</td>
                    <td class="barTd"><div class="sentimentBar" v-echarts="item.sentiment | barFormat"></div></td>
                    <td>{{item.likeCount}}</td>
                    <td>{{item.shareCount}}</td>
                    <td>{{item.comments}}</td>
                    <td class="rate"><i class="fa" :class="[item.rate.key == 'up' ? 'fa-arrow-up' : 'fa-arrow-down']"></i> {{item.rate | rateFormat}}</td>
                </tr>
            </tbody>
        </table>
        <!--<div v-if="influancerTable.length" class="paging">-->
            <!--<page></page>-->
        <!--</div>-->
        <div v-if="!influancerTable.length" class="noTableTips">{{noTableTips}}</div>
    </div>
    <pop-list :item="selectItem" :pops="popList" :visiable.sync="popVisiable"></pop-list>
    <tips :visible.sync="loadingParams.visiable" :tipsparam.sync="loadingParams"></tips>
</template>
<style lang="less" scoped>
    @import "Influence.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import {Chart, Pie} from '../../config/config';
    import Local from '../../local/local';
    import * as Api from '../../widgets/Api';
    import Tabs from '../Common/Tabs/Tabs.vue';
    import Page from '../Common/Page/Page.vue';
    import PopList from './PopList/PopList.vue';
    import Tips from '../Common/Tips/Tips.vue';
    import { analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, activeAnalyticsTopic } from '../../vuex/getters';

    export default{
        data(){
            const words = Local().influence;
            return{
                words,
                loadingParams: {
                    visiable: false,
                    type: 'loading',
                    content: "请稍后......"
                },
                popularList: [],
                influancerList: [],
                influancerTable: [],
                influancerNums: [0,0,0,0,0,0],
                noTableTips: words.noTableTips,
                popList: [],
                selectItem: {},
                popVisiable: false
            }
        },
        vuex: {
            getters: {analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, activeAnalyticsTopic}
        },
        watch: {
            activeAnalyticsTopic: {
                handler(val){
                    //this.commentBarLoading = true;
                    //this.commentChartLoading = true;
                    this.init(val);
                }
            },
            analyticsSubTopic: {
                handler(val){
                    this.loadingParams.visiable = true;
                    this.init();
                }
            },
            analyticsDateChange: {
                handler(val){
                    this.loadingParams.visiable = true;
                    this.init();
                }
            },
            analyticsSource: {
                handler(val){
                    console.log('analyticsSource', val);
                    if(val == 'all'){
                        this.influancerTable = _.filter(this.influancerList, (info, index) => {
                            return (index < 20);
                        });
                        return ;
                    }
                    this.influancerTable = _.filter(this.influancerList, (info, index) => {
                        return (info.source == val && index < 20);
                    });
                }
            }
        },
        ready(){
            if(this.activeAnalyticsTopic && this.activeAnalyticsTopic.topic_id){
                this.init();
            }
        },
        methods: {
            showPopList(item){
                console.log(item);
                this.popVisiable = true;

                const topic_id = this.activeAnalyticsTopic.topic_id;
                const author = item.influencer;
                const size = this.$route.params.size;

                this.getArticles({topic_id,author,size});

            },
            getArticles(params){
                Api.getCommentList(params).then(resp => {
                    //console.log("getCommentList", resp.data);
                    if (resp.data.code == 0) {
                        const newDates = _.map(resp.data.data, (item)=> {

                            item.context = item.content;
                            item.date =item.pDate;
                            return item;
                        });

                        this.popList = newDates;
                        this.selectItem = item;


                    }
                });
            },
            showNewList(item){
                //console.log('11111111111111111111111111111111111');

                const topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0,
                        end = this.analyticsEnd,
                        start = this.analyticsStart;
                Api.getInfluenceList({topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    this.loadingParams.visiable = false;
                    if(resp.data.code ==0){

                       // console.log(item.icon);
                        const influanceInfo = resp.data.data;

                        if(item.icon=='user'){
                            var influanceInfos =_.sortBy(influanceInfo, function(item){
                                return -item.post;
                            });
                        }
                        else if (item.icon=='user-plus'){

                            var influanceInfos =_.sortBy(influanceInfo, function(item){
                                return -item.comments;

                            });
                        }
                        else if (item.icon=='edge'){
                            var influanceInfos =_.sortBy(influanceInfo, function(item){
                                return -item.shareCount;

                            });
                        }
                        else if (item.icon=='chrome'){
                            var influanceInfos =_.sortBy(influanceInfo, function(item){

                                return -item.rate.value.replace('%',0);

                            });
                        }
                        else{
                            var influanceInfos =_.sortBy(influanceInfo, function(item){
                            return -item.post;
                        });}

                      //  console.log(icood);

                       // this.influancerList = _.map(influanceInfos, info => info);
                        this.influancerTable = _.filter(influanceInfos, (info, index) => {
                            return (index < 20);
                        });
                    }
                });

            },

            getArticles(){
                return {
                    data:{
                        "code": 0,
                        "data": [{
                            "id": "123",
                            "title": "今日头条",
                            "context": "今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条",
                            "date": "2016-10-20"
                        },{
                            "id": "123",
                            "title": "今日头条",
                            "context": "今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条",
                            "date": "2016-10-20"
                        },{
                            "id": "123",
                            "title": "今日头条",
                            "context": "今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条",
                            "date": "2016-10-20"
                        },{
                            "id": "123",
                            "title": "今日头条",
                            "context": "今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条今日头条",
                            "date": "2016-10-20"
                        }]
                    }
                }
            },
            getPopularList(){
                const icons = ["user", "user-plus", "edge", "chrome"];
                const topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0,
                        end = this.analyticsEnd,
                        start = this.analyticsStart;
                Api.getPopularList({topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    this.loadingParams.visiable = false;
                    if(resp.data.code ==0){
                        const popularList = resp.data.data;
                        this.popularList = _.map(popularList, (item, index) => {
                            item.icon = icons[index];
                            return item;
                        });
                    }
                });
            },
            getInfluenceList(){
                const topic_id = this.activeAnalyticsTopic.topic_id,
                        topic = this.activeAnalyticsTopic.topic_name,
                        subtopic = this.analyticsSubTopic,
                        source = this.analyticsSource,
                        time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0,
                        end = this.analyticsEnd,
                        start = this.analyticsStart;
                Api.getInfluenceList({topic_id, topic, subtopic, source, start, end, time_dimension}).then(resp => {
                    this.loadingParams.visiable = false;
                    if(resp.data.code ==0){
                        const influanceInfos = resp.data.data;
                        console.log(resp.data.data);

                        this.influancerList = _.map(influanceInfos, info => info);
                        this.influancerTable = _.filter(this.influancerList, (info, index) => {
                            return (index < 20);
                        });
                    }
                });
            },
            init(){
                this.getPopularList();
                this.getInfluenceList();

            }
        },
        filters: {
            addLabel(value, label){
                return label + ": " + value;
            },
            rateFormat(rate){
                if(!rate) return "";
                return rate.value;
            },
            barFormat(val){
                const option = {
                    tooltip: _.extend({}, Chart.tooltip, {}),
                    grid: _.extend({}, Chart.grid),
                    progressive: 4,
                    textStyle: Chart.textStyle,
                    xAxis: _.extend({}, Chart.xAxis, {
                        type: 'value',
                        show: false
                    }),
                    yAxis: _.extend({}, Chart.yAxis, {
                        type: 'category',
                        data: ['sentiment'],
                        show: false
                    }),
                    color: _.extend([], Chart.color),
                    series: [
                        {
                            name: 'Happy',
                            type: 'bar',
                            stack: 'sentiment',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [val.happy]
                        },
                        {
                            name: 'Anger',
                            type: 'bar',
                            stack: 'sentiment',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [val.anger]
                        },
                        {
                            name: 'Sorrow',
                            type: 'bar',
                            stack: 'sentiment',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [val.sorrow]
                        },
                        {
                            name: 'Disgust',
                            type: 'bar',
                            stack: 'sentiment',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [val.disgust]
                        },
                        {
                            name: 'Fear',
                            type: 'bar',
                            stack: 'sentiment',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [val.fear]
                        }
                    ]
                };
                //console.log(option);
                return option;
            }
        },
        components:{
            Tabs, PopList, Tips,
            'page': Page
        },
       // route: {
       //     data(){
       //         this.init();
       //     }
       // }
    }
</script>
