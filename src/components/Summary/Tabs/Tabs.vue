<template>
    <summary-date></summary-date>
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
    import SummaryDate from '../../Common/SummaryDate/SummaryDate.vue'
    import AddDashboard from '../../AddDashboard/AddDashboard.vue'
    import {activeSummaryTopic,summaryResetSearch,summarySubTopicId,summaryRefreshTopic,summaryDateChange, summaryType, summaryTimeRange, summarySource, summarySubTopic } from '../../../vuex/getters';
    import { setSummaryType, setSummaryTimeRange, setSummarySource, setSummarySubTopic } from "../../../vuex/actions";

    export default{
        props: ['active', 'actions', 'sourceactive', 'datas'],
        vuex: {
            actions: { setSummaryType, setSummaryTimeRange, setSummarySource, setSummarySubTopic },
            getters: {activeSummaryTopic,summarySubTopicId,summaryResetSearch,summaryRefreshTopic,summaryDateChange, summaryType, summaryTimeRange, summarySource, summarySubTopic }
        },

        data(){
            const words = Local().analytics;
            return{
                words,
                showDashboard: false,
                isSummary:false,
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
            activeSummaryTopic:{
                handler(val){
                    this.sourceActive=0;
                    this.setSummarySource('all');
                }
            },
            summarySubTopicId:{
                handler(val){
                    if(val!=0){
                        this.sourceActive=0;
                        this.setSummarySource('all');
                    }
                }
            },
            summarySubTopic:{
                handler(val){
                    this.sourceActive=0;
                    this.setSummarySource('all');
                }
            },
            summaryRefreshTopic:{
                handler(val){
                    if(val!=0){
                        this.sourceActive=0;
                        this.setSummarySource('all');
                    }
                }
            },
            summaryDateChange:{
                handler(val){
                    this.sourceActive=0;
                    this.setSummarySource('all');
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
                if(this.$route.path.indexOf('summary') > -1){
                    this.setSummarySource(source[idx]);
                }
            },
            changeTab(tab){
                console.log(tab);
                this.setSummaryType(this.$route.name);
            },
            showAdd(){
                this.showDashboard = true;
                this.isSummary=true;
            }
        },
        ready(){
            if(this.$route.path.indexOf('summary') > -1){
                this.setSummaryType(this.$route.name);
                const source = ["all", "wechat", "weibo", "client", "web", "oversea","sengine"];
                this.setSummarySource(source[0]);
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
        components:{ AddDashboard ,SummaryDate},
//        route: {
//            data(){
//
//            }
//        }
    }
</script>
