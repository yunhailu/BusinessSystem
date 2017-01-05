<template>
    <div class="bgColor">
        <tabs></tabs>
        <ul class="list-panel-tools-order">
            <li class="list-panel-tools-order-item">排序规则:</li>
            <li class="list-panel-tools-order-item" @click="setOrder('time');" :class="[orderActive == 'time' ? 'active' : '']">{{common.timeRanking}}</li>
            <li class="list-panel-tools-order-item" @click="setOrder('browser')" :class="[orderActive == 'browser' ? 'active' : '']">{{common.countRanking}}</li>
            <li class="list-panel-tools-order-item" @click="setOrder('star')" :class="[orderActive == 'star' ? 'active' : '']">{{common.greetRanking}}</li>
            <li class="list-panel-tools-order-item" @click="setOrder('share')" :class="[orderActive == 'share' ? 'active' : '']">{{common.shareRanking}}</li>
        </ul>
        <ul class="list-panel-tools-flag">
            <li class="list-panel-tools-flag-item">情绪监测:</li>
            <li class="list-panel-tools-flag-item" @click="setSentiment('all');" :class="[sentimentActive == 'all' ? 'active' : '']">{{words.all}}</li>
            <li class="list-panel-tools-flag-item" @click="setSentiment('positive')" :class="[sentimentActive == 'positive' ? 'active' : '']">{{words.positive}}</li>
            <li class="list-panel-tools-flag-item" @click="setSentiment('negative')" :class="[sentimentActive == 'negative' ? 'active' : '']">{{words.negative}}</li>
            <li class="list-panel-tools-flag-item" @click="setSentiment('neutral')" :class="[sentimentActive == 'neutral' ? 'active' : '']">{{words.neutral}}</li>
        </ul>
        <ul class="list-panel-tools-filter">
            <li class="list-panel-tools-filter-item">文章数量:</li>
            <li class="list-panel-tools-filter-item" @click="setCount(5);" :class="[filterActive == 5 ? 'active' : '']">前5篇</li>
            <li class="list-panel-tools-filter-item" @click="setCount(20)" :class="[filterActive == 20 ? 'active' : '']">前20篇</li>
            <li class="list-panel-tools-filter-item" @click="setCount(50)" :class="[filterActive == 50 ? 'active' : '']">前50篇</li>
            <li class="list-panel-tools-filter-item" @click="setCount(100)" :class="[filterActive == 100 ? 'active' : '']">前100篇</li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
    @import "SummarySelect.less";
</style>
<script type="text/ecmascript-6">
    import Local from '../../../local/local';
    import Tabs from '../../Summary/Tabs/Tabs.vue';
    import {setSummaryOrder,setSummaryCount,setSummarySentiment} from '../../../vuex/actions';
    export default {
        data(){
            const words = Local().comment;
            const common = Local().common;
            return{
                words,
                common,
                filterActive: 20,
                sentimentActive: 'all',
                orderActive:'time',
            }
        },
        vuex:{
            actions:{setSummaryOrder,setSummaryCount,setSummarySentiment}
        },
        methods:{
            setOrder(type){
                this.orderActive = type;
               this.setSummaryOrder(type);
            },
            setCount(count){
                this.filterActive = count;
                this.setSummaryCount(count);
            },
            setSentiment(flag){
                this.sentimentActive = flag;
                this.setSummarySentiment(flag);
            },
        },
        components:{
            Tabs
        }
    }
</script>