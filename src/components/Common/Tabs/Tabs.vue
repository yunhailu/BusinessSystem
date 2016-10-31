<template>
    <div class="add-dashboard">
        <div class="add-dashboard-btn" @click="showAdd();">
            <i class="fa fa-plus"></i>
            <span>{{words.addDashboard}}</span>
        </div>
    </div>
    <ul class="row tabs">
        <li v-for="tab in tabs" class="tab" :class="[tab.link == $route.name ? 'active' : '']" >
            <a v-link="{name: tab.link}" @click="changeTab(tab);">{{tab.name}}</a>
        </li>
    </ul>
    <!--<ul class="row items filters">-->
        <!--<li v-for="filter in filters" class="item" :class="[filterActive == $index ? 'active' : '']" @click="filterAction(filter, $index)">-->
            <!--<span class="con">{{filter}}</span>-->
        <!--</li>-->
    <!--</ul>-->
    <ul class="row items source">
        <li v-for="(index, item) in source" class="item" :class="[sourceActive == $index ? 'active' : '']" @click="sourceAction(item, $index)">
            <!--<span class="con">{{item.name}} {{datas[index] | showNum datas}}<i class="fa fa-spinner fa-spin" v-show="!datas.length"></i></span>-->
            <span class="con">{{item.name | showNum datas[index] datas}}<i class="fa fa-spinner fa-spin" v-show="!datas.length"></i></span>
        </li>
    </ul>
    <add-dashboard :visiable.sync="showDashboard"></add-dashboard>
</template>
<style lang="less" scoped>
    @import "Tabs.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import Local from '../../../local/local';
    import AddDashboard from '../../addDashboard/addDashboard.vue'
    import { analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic } from '../../../vuex/getters';
    import { setAnalyticsType, setAnalyticsTimeRange, setAnalyticsSource, setAnalyticsSubTopic } from "../../../vuex/actions";

    export default{
        props: ['active', 'actions', 'sourceactive', 'datas'],
        vuex: {
            actions: { setAnalyticsType, setAnalyticsTimeRange, setAnalyticsSource, setAnalyticsSubTopic },
            getters: { analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic }
        },
        data(){
            const words = Local().analytics;
            return{
                words,
                showDashboard: false,
                tabs: [{
                    name: words.tabs[0],
                    link: 'summary'
                }, {
                    name: words.tabs[1],
                    link: 'sentiment'
                }, {
                    name: words.tabs[2],
                    link: 'comment'
                }, {
                    name: words.tabs[3],
                    link: 'influence'
                },{
                    name: words.tabs[4],
                    link: 'theme'
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
        methods: {
            filterAction(val, idx){
                console.log(val, idx);
                this.filterActive = idx;
            },
            sourceAction(val, idx){
                console.log(val, idx, this.$route);
                this.sourceActive = idx;
                this.actions && this.actions(val, idx);
                const source = ["all", "wechat", "weibo", "client", "web", "oversea"];
                if(this.$route.path.indexOf('analytics') > -1){
                    this.setAnalyticsSource(source[idx]);
                }
            },
            changeTab(tab){
                console.log(tab);
                this.setAnalyticsType(this.$route.name);
            },
            showAdd(){
                this.showDashboard = true;
            }
        },
        ready(){
            if(this.$route.path.indexOf('analytics') > -1){
                this.setAnalyticsType(this.$route.name);
                const source = ["all", "wechat", "weibo", "client", "web", "oversea"];
                this.setAnalyticsSource(source[0]);
                console.log('datas', this.datas);
            }
        },
        filters: {
            showNum(name, num, datas){
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
