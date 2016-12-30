<template>
    <div class="add-dashboard">
        <div class="add-dashboard-btn" @click="showAdd();">
            <i class="fa fa-plus"></i>
            <span>{{words.addDashboard}}</span>
        </div>
    </div>
    <ul class="row tabs">
        <li v-for="tab in tabs" class="tab" :class="[tab.link == $route.name ? 'active' : '']" >
            <a  v-link="{name: tab.link}" @click="changeTab(tab);">{{tab.name}}</a>
        </li>
    </ul>
    <analytics-datechange></analytics-datechange>
    <tabs></tabs>
    <div v-if="showDashboard && $route.name != 'comparision'">
        <add-dashboard :visiable.sync="showDashboard" :isanalytics.sync="isAnalytics"></add-dashboard>
    </div>
    <div v-if="showDashboard && $route.name=='comparision'">
        <add-dashboard :visiable.sync="showDashboard" :iscompare.sync="isCompare"></add-dashboard>
    </div>
</template>

<style lang="less" scoped>
    @import "AnalyticsRoute.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import Local from '../../../local/local';
    import AddDashboard from '../../AddDashboard/AddDashboard.vue';
    import AnalyticsDateChange from '../AnalyticsDateChange/AnalyticsDateChange.vue';
    import Tabs from '../Tabs/Tabs.vue';
    import {activeAnalyticsTopic,analyticsResetSearch,analyticsSubTopicId,analyticsRefreshTopic,analyticsDateChange, analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic } from '../../../vuex/getters';
    import { setAnalyticsType, setAnalyticsTimeRange, setAnalyticsSource, setAnalyticsSubTopic } from "../../../vuex/actions";

    export default{
        props: [],
        vuex: {
            actions: { setAnalyticsType, setAnalyticsTimeRange, setAnalyticsSource, setAnalyticsSubTopic },
            getters: {activeAnalyticsTopic,analyticsSubTopicId,analyticsResetSearch,analyticsRefreshTopic,analyticsDateChange, analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic }
        },

        data(){
            const words = Local().analytics;
            return{
                words,
                showDashboard: false,
                isAnalytics:true,
                isCompare:true,
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
                sourceActive: 0
//                filters: [{
//                    name: words.filters[0],
//                    value: 1
//                }]
            }
        },
        watch:{
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
                this.actions && this.actions(val, idx);
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
                //this.isAnalytics=true;
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
        components:{ AddDashboard,Tabs,
        'analytics-datechange':AnalyticsDateChange},
//        route: {
//            data(){
//
//            }
//        }
    }
</script>