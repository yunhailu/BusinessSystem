<template>
    <tabs ></tabs>
    <span>Influence</span>
    <div class="popular">
        <ul class="popular-list">
            <li class="popular-list-item" v-for="item in popularList">
                <i class="fa" :class="[item.icon ? 'fa-'+item.icon : 'fa-cog']"></i>
                <span class="popular-list-item-title">{{item.title}}</span>
                <div class="popular-list-item-con">
                    <div>{{item.source}}</div>
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
                    <td><i class="fa fa-line-chart"></i> <span>Influencers</span></td>
                    <td><i class="fa fa-comments"></i> <span>Number of Posts</span></td>
                    <td><i class="fa fa-bar-chart"></i> <span>Sentiment</span></td>
                    <td>Reach</td>
                    <td>Reach per mention</td>
                    <td>Engagment</td>
                    <td>Engagment per mention</td>
                </tr>
            </thead>
            <tbody v-if="influancerTable.length">
                <tr id="item.id" v-for="(index, item) in influancerTable" :class="[index % 2 == 0 ? '' : '']">
                    <td>{{item.influencer}}</td>
                    <td>{{item.posts}}</td>
                    <td class="barTd"><div class="sentimentBar" v-echarts="item.sentiment | barFormat"></div></td>
                    <td>{{item.reach}}</td>
                    <td>{{item.reachMention}}</td>
                    <td>{{item.engagment}}</td>
                    <td>{{item.engagmentMention}}</td>
                </tr>
            </tbody>
        </table>
        <div v-if="influancerTable.length" class="paging">
            <page></page>
        </div>
        <div v-if="!influancerTable.length" class="noTableTips">{{noTableTips}}</div>
    </div>

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

    export default{
        data(){
            const words = Local().influence;
            return{
                popularList: [],
                influancerTable: [],
                noTableTips: words.noTableTips
            }
        },
        methods: {
            getPopularList(){
                const icons = ["user", "user-plus", "edge", "chrome"];
                Api.getPopularList({}).then(resp => {
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
                //Api.getInfluenceList({}).then(resp => {

                    const resp = {data: {code:0, data: [{
                        id: "1234",
                        influencer: "台湾",
                        posts: 6,
                        like: 123,
                        resend: 32,
                        sentiment: {
                            happy: 5, anger: 15, sorrow: 10, disgust: 0, fear: 5
                        },
                        rate: {
                            key: "up",
                            value: "24%"
                        }
                    },{
                        "id": "1234",
                        "influencer": "台湾1",
                        "posts": 6,
                        "like": 123,
                        "resend": 32,
                        "sentiment": {
                            happy: 3, anger: 5, sorrow: 10, disgust: 3, fear: 5
                        },
                        "rate": {
                            "key": "up",
                            "value": "24%"
                        }
                    }] }};
                    if(resp.data.code ==0){
                        const influanceInfos = resp.data.data;
                        this.influancerTable = _.map(influanceInfos, info => {
                            return info;
                        });
                    }
                //});
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
            Tabs,
            'page': Page
        },
        route: {
            data(){
                this.init();
            }
        }
    }
</script>
