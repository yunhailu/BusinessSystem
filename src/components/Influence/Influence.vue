<template>
    <tabs :datas="influancerNums"></tabs>
    <!--<span>Influence</span>-->
    <div class="popular">
        <ul class="popular-list">
            <li class="popular-list-item" v-for="item in popularList">
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
                <tr id="item.id" v-for="(index, item) in influancerTable" @click="showPopList(item);" :class="[index % 2 == 0 ? '' : '']">
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
        <div v-if="influancerTable.length" class="paging">
            <page></page>
        </div>
        <div v-if="!influancerTable.length" class="noTableTips">{{noTableTips}}</div>
    </div>
    <pop-list :item="selectItem" :pops="popList" :visiable.sync="popVisiable"></pop-list>
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
    import { analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsStart, analyticsEnd, activeAnalyticsTopic } from '../../vuex/getters';

    export default{
        data(){
            const words = Local().influence;
            return{
                words,
                popularList: [],
                influancerTable: [],
                influancerNums: [0,0,0,0,0,0],
                noTableTips: words.noTableTips,
                popList: [],
                selectItem: {},
                popVisiable: false
            }
        },
        vuex: {
            getters: {analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsStart, analyticsEnd, activeAnalyticsTopic}
        },
        watch: {
            activeAnalyticsTopic: {
                handler(val){
                    //this.commentBarLoading = true;
                    //this.commentChartLoading = true;
                    this.init(val);
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

                const resp = this.getArticles();
                if(resp.data.code == 0){
                    this.popList = resp.data.data;
                    this.selectItem = item;
                }

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
                    //const resp = {data: {code: 0, data: [{ "id": "12345678", "link": "http://www.baidu.com", "title": "Most active author", "source": "Online News", "value": "shi jian", "post": 64 },{ "id": "12345678", "link": "http://www.baidu.com", "title": "Most active author", "source": "Online News", "value": "shi jian", "post": 64 },{ "id": "12345678", "link": "http://www.baidu.com", "title": "Most active author", "source": "Online News", "value": "shi jian", "post": 64 },{ "id": "12345678", "link": "http://www.baidu.com", "title": "Most active author", "source": "Online News", "value": "shi jian", "post": 64 }]}};
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
                    //const resp = {data: {code:0, data: [{id: "1234", influencer: "台湾", posts: 6, like: 123, resend: 32, sentiment: {happy: 5, anger: 15, sorrow: 10, disgust: 0, fear: 5}, rate: {key: "up", value: "24%"}},{"id": "1234", "influencer": "台湾1", "posts": 6, "like": 123, "resend": 32, "sentiment": {happy: 3, anger: 5, sorrow: 10, disgust: 3, fear: 5}, "rate": {"key": "up", "value": "24%"}}] }};
                    if(resp.data.code ==0){
                        const influanceInfos = resp.data.data;
                        this.influancerTable = _.map(influanceInfos, info => {
                            return info;
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
            Tabs, PopList,
            'page': Page
        },
//        route: {
//            data(){
//                this.init();
//            }
//        }
    }
</script>
