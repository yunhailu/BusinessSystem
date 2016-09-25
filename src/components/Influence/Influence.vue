<template>
    <tabs ></tabs>
    <span>Influence</span>
    <div class="popular">
        <ul class="popular-list">
            <li class="popular-list-item" v-for="item in popularList">
                <i class="fa" :class="[item.icon ? 'fa-'+item.icon : 'fa-cog']"></i>
                <span class="popular-list-item-title">{{item.title}}</span>
                <div class="popular-list-item-con">
                    <div>{{item.type}}</div>
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
            <tbody>
                <tr v-for="(index, item) in influancerTable" :class="[index % 2 == 0 ? '' : '']">
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
    </div>
    <div class="paging">
        <page></page>
    </div>
</template>
<style lang="less" scoped>
    @import "Influence.less";
</style>
<script>
    import _ from 'underscore';
    import Tabs from '../Common/Tabs/Tabs.vue';
    import {Chart, Pie} from '../../config/config';
    import Page from '../Common/Page/Page.vue';

    export default{
        data(){
            return{
                popularList: [{
                    icon: "user",
                    title: "Most active author",
                    link: "http://www.baidu.com",
                    post: "114",
                    type: "New Online"
                },{
                    icon: "user-plus",
                    title: "Most influence author",
                    link: "http://www.baidu.com",
                    post: "101",
                    type: "New Online"
                },{
                    icon: "edge",
                    title: "Most active site",
                    link: "http://www.baidu.com",
                    post: "84",
                    type: "New Online"
                },{
                    icon: "chrome",
                    title: "Most influence site",
                    link: "http://www.baidu.com",
                    post: "75",
                    type: "New Online"
                }],
                influancerTable: [{
                    influencer: "fa biao yu",
                    posts: 140,
                    sentiment: {
                        happy: 3, anger: 5, sorrow: 10, disgust: 3, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "IE = Edge",
                    posts: 14,
                    sentiment: {
                        happy: 5, anger: 5, sorrow: 2, disgust: 13, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "mei ri qian dao",
                    posts: 10,
                    sentiment: {
                        happy: 3, anger: 5, sorrow: 10, disgust: 3, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "shi jian",
                    posts: 103,
                    sentiment: {
                        happy: 7, anger: 2, sorrow: 12, disgust: 5, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "fa biao yu",
                    posts: 64,
                    sentiment: {
                        happy: 5, anger: 15, sorrow: 10, disgust: 0, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                }, {
                    influencer: "fa biao yu",
                    posts: 140,
                    sentiment: {
                        happy: 3, anger: 5, sorrow: 10, disgust: 3, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "IE = Edge",
                    posts: 14,
                    sentiment: {
                        happy: 5, anger: 5, sorrow: 2, disgust: 13, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "mei ri qian dao",
                    posts: 10,
                    sentiment: {
                        happy: 3, anger: 5, sorrow: 10, disgust: 3, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "shi jian",
                    posts: 103,
                    sentiment: {
                        happy: 7, anger: 2, sorrow: 12, disgust: 5, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "fa biao yu",
                    posts: 64,
                    sentiment: {
                        happy: 5, anger: 15, sorrow: 10, disgust: 0, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "fa biao yu",
                    posts: 140,
                    sentiment: {
                        happy: 3, anger: 5, sorrow: 10, disgust: 3, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "IE = Edge",
                    posts: 14,
                    sentiment: {
                        happy: 5, anger: 5, sorrow: 2, disgust: 13, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "mei ri qian dao",
                    posts: 10,
                    sentiment: {
                        happy: 3, anger: 5, sorrow: 10, disgust: 3, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "shi jian",
                    posts: 103,
                    sentiment: {
                        happy: 7, anger: 2, sorrow: 12, disgust: 5, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "fa biao yu",
                    posts: 64,
                    sentiment: {
                        happy: 5, anger: 15, sorrow: 10, disgust: 0, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "fa biao yu",
                    posts: 140,
                    sentiment: {
                        happy: 3, anger: 5, sorrow: 10, disgust: 3, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "IE = Edge",
                    posts: 14,
                    sentiment: {
                        happy: 5, anger: 5, sorrow: 2, disgust: 13, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "mei ri qian dao",
                    posts: 10,
                    sentiment: {
                        happy: 3, anger: 5, sorrow: 10, disgust: 3, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "shi jian",
                    posts: 103,
                    sentiment: {
                        happy: 7, anger: 2, sorrow: 12, disgust: 5, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                },{
                    influencer: "fa biao yu",
                    posts: 64,
                    sentiment: {
                        happy: 5, anger: 15, sorrow: 10, disgust: 0, fear: 5
                    },
                    reach: 0,
                    reachMention: 0,
                    engagment: 0,
                    engagmentMention: 0
                }]
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
        }
    }
</script>
