<template>
    <div class="row tools">
        <div class="row-left" v-if="trim(search) == ''">{{analytics.monitor}}:{{showName}}</div>
        <div class="row-left" v-if="trim(search) !=''">{{analytics.monitor}}:{{showName}}+{{search}}</div>
            <div class="search">
                <input class="search-input" placeholder="子话题搜索" v-model="search" @keyup.enter="searchAction" />
                <span class="search-btn" @click="searchAction"><i class="fa fa-search"></i></span>
            </div>
        </div>
</template>
<style lang="less" scoped>
    @import "AnalyticsDate.less";
</style>
<script  type="text/ecmascript-6">
    import moment from 'moment';
    import Cookie from "js-cookie";
    import { getCookie } from '../../../widgets/Cookie';
    import SmallTip from '../../Common/SmallTip/SmallTip.vue';
    import HeaderComponent from '../../Header/Header.vue';
    import Calendar from '../../Common/Calendar/Calendar.vue';
    import Local from "../../../local/local";
    import {analyticsTimePopUp,analyticsSubTopicId, activeAnalyticsTopic,analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic, analyticsDateChange, analyticsStart, analyticsEnd, analyticsResetSearch } from '../../../vuex/getters';
    import {setMonitorWord,setAnalyticsTimePopUp,setAnalyticsSubTopicId,setActiveAnalyticsTopic,setAnalyticsType, setAnalyticsTimeRange, setAnalyticsSource, setAnalyticsSubTopic, setAnalyticsDateChange, setAnalyticsStart, setAnalyticsEnd, setAnalyticsResetSearch  } from "../../../vuex/actions";

    export default{
        data(){
            const analytics = Local().analytics;
            return{
                analytics,
                search: '',
                showName:'',
                tabActive: 'result'
            }
        },
        vuex: {
            actions: {
                setAnalyticsSubTopicId,
                setActiveAnalyticsTopic,
                setAnalyticsType,
                setAnalyticsTimeRange,
                setAnalyticsSource,
                setAnalyticsSubTopic,
                setAnalyticsDateChange,
                setAnalyticsStart,
                setAnalyticsEnd,
                setAnalyticsResetSearch,
                setAnalyticsTimePopUp,
                setMonitorWord
            },
            getters: {
                analyticsSubTopicId,
                activeAnalyticsTopic,
                analyticsType,
                analyticsTimeRange,
                analyticsSource,
                analyticsSubTopic,
                analyticsDateChange,
                analyticsStart,
                analyticsEnd,
                analyticsResetSearch,
                analyticsTimePopUp
            }
        },
        components:{
            'header-component': HeaderComponent,
            'calendar': Calendar,
            'smalltip':SmallTip
        },
        methods: {
            searchAction(){
                if(this.analyticsSubTopic == this.search){
                    this.setAnalyticsSubTopicId(this.analyticsSubTopicId + 1);
                    console.log(this.analyticsSubTopicId);
                }else{
                    console.log(this.search);
                    this.setAnalyticsSubTopic(this.search);
                    this.setAnalyticsSubTopicId(0);
                }
            },
            trim(str){
                return str.replace(/(^\s*)|(\s*$)/g,'');
            }
        },
        watch: {
            activeAnalyticsTopic:{
                handler(val){
                    this.setMonitorWord(this.activeAnalyticsTopic.topic_name);
                }
            },
            search:{
                handler(val){
                    if(val !=''){
                        this.setMonitorWord(this.activeAnalyticsTopic.topic_name+'+'+val);
                    }else{
                        this.setMonitorWord(this.activeAnalyticsTopic.topic_name);
                    }
                }
            },
            analyticsResetSearch:{
                handler(val){
                    if(val == true){
                        this.search = '';
                        this.setAnalyticsResetSearch(false);
                        this.setAnalyticsSubTopic(this.search);
                    }
                }
            }
        },
        ready(){
            this.showName=this.activeAnalyticsTopic.topic_name;
        },
        route: {
            data(){
                this.tabActive = this.$route.name;
                console.log(this.tabActive);
            }
        }
    }
</script>