<template>
    <ul class="row items source">
        <li class="item">数据来源:</li>
        <li v-for="(index, item) in source" class="item" :class="[sourceActive == $index ? 'active' : '']" @click="sourceAction(item, $index)">
            <!--<span class="con">{{item.name}} {{datas[index] | showNum datas}}<i class="fa fa-spinner fa-spin" v-show="!datas.length"></i></span>-->
            <span class="con">{{item.name | showNum datas[index] datas}}<i class="fa fa-spinner fa-spin" v-show="!datas.length"></i></span>
        </li>
    </ul>
</template>
<style lang="less" scoped>
    @import "Tabs.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import Local from '../../../local/local';
    import AddDashboard from '../../AddDashboard/AddDashboard.vue'
    import {analyticsSourceData,activeAnalyticsTopic,analyticsResetSearch,analyticsSubTopicId,analyticsRefreshTopic,analyticsDateChange, analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic } from '../../../vuex/getters';
    import {setAnalyticsSourceData, setAnalyticsType, setAnalyticsTimeRange, setAnalyticsSource, setAnalyticsSubTopic } from "../../../vuex/actions";

    export default{
        props: ['active', 'actions', 'sourceactive'],
        vuex: {
            actions: {setAnalyticsSourceData,setAnalyticsType, setAnalyticsTimeRange, setAnalyticsSource, setAnalyticsSubTopic },
            getters: {analyticsSourceData,activeAnalyticsTopic,analyticsSubTopicId,analyticsResetSearch,analyticsRefreshTopic,analyticsDateChange, analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic }
        },

        data(){
            const words = Local().analytics;
            return{
                words,
                showDashboard: false,
                isAnalytics:false,
                tabs: [
                  /*      {
                    name: words.tabs[0],
                    //link: 'comment'
                    link: 'information'
                },*/
                    {
                    name: words.tabs[0],
                    //link: 'comment'
                    link: 'summary'
                },{
                    name: words.tabs[1],
                    //link: 'summary'
                    link:'theme'
                }, {
                    name: words.tabs[2],
                    //link: 'sentiment'
                    link:'influence'
                }, {
                    name: words.tabs[3],
                    //link: 'influence'
                    link: 'comment'
                },{
                    name: words.tabs[4],
                    //link: 'theme'
                    link: 'sentiment'
                },{
                    name: words.tabs[5],
                    //link: 'theme'
                    link: 'comparision'
                    }],
//                filters: words.filters,
//                filterActive: 0,
                //source: words.source,
                source: [
                    { name: words.source[0] },
                    { name: words.source[1] },
                    { name: words.source[2] },
                    { name: words.source[3] },
                    { name: words.source[4] },
                    { name: words.source[5] }
                ],
                sourceActive: 0,
                datas:[]
//                filters: [{
//                    name: words.filters[0],
//                    value: 1
//                }]
            }
        },
        watch:{
            analyticsSourceData:{
               handler(val){
                   this.datas = val;
               }
            },
            analyticsType:{
                handler(val){
                    this.sourceActive=0;
                    this.setAnalyticsSource('all');
                }
            },
            activeAnalyticsTopic:{
                handler(val){
                    this.sourceActive=0;
                    this.setAnalyticsSource('all');
                }
            },
            analyticsSubTopicId:{
                handler(val){
                    if(val!=0){
                        this.sourceActive=0;
                        this.setAnalyticsSource('all');
                    }
                }
            },
            analyticsSubTopic:{
                handler(val){
                    this.sourceActive=0;
                    this.setAnalyticsSource('all');
                }
            },
            analyticsRefreshTopic:{
                handler(val){
                    if(val!=0){
                        this.sourceActive=0;
                        this.setAnalyticsSource('all');
                    }
                }
            },
            analyticsDateChange:{
                handler(val){
                    this.sourceActive=0;
                    this.setAnalyticsSource('all');
                }
            },

        },
        methods: {
            filterAction(val, idx){
                console.log(val, idx);
                this.filterActive = idx;
            },
            sourceAction(val, idx){
                console.log(val, idx, this.$route);
                this.sourceActive = idx;
                //this.actions && this.actions(val, idx);
                const source = ["all", "wechat", "weibo", "client", "web", "overseas","sengine"];
                if(this.$route.path.indexOf('analytics') > -1){
                    this.setAnalyticsSource(source[idx]);
                }
            },
            changeTab(tab){
                console.log(tab);
                this.setAnalyticsType(this.$route.name);
                if(tab.link=='comparision'){
                   // this.$router.go({name:tab.link});
                }
            },
            showAdd(){
                this.showDashboard = true;
                this.isAnalytics=true;
            }
        },
        ready(){
            if(this.$route.path.indexOf('analytics') > -1){
                this.setAnalyticsType(this.$route.name);
                const source = ["all", "wechat", "weibo", "client", "web", "oversea","sengine"];
                this.setAnalyticsSource(source[0]);
                console.log('datas', this.datas);
            }
        },
        filters: {
            showNum(name, num, datas){
                console.log('datas',datas);
                if(!datas.length) return name;
                if(num && num > -1) return `${name}(${num})`;
                return `${name}`;
            },
            formatNum(num){
                let value;
                switch (true){
                    case num > 10000:
                        value = `${(num / 10000).toFixed(1)}w+`;
                        break;
                    case num > 10000:
                        value = `${(num / 10000).toFixed(1)}w+`;
                        break;
                    case num > 1000:
                        value = `${(num / 1000).toFixed(1)}k+`;
                        break;
                    default:
                        value = num;
                        break;
                }
                return value;
            }
        },
        components:{ AddDashboard },
//        route: {
//            data(){
//
//            }
//        }
    }
</script>
