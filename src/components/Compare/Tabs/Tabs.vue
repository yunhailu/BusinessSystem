<template>

    <ul class="row items source">
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
    import {compareActiveTopic, compareSource, compareSourceCount, compareType } from '../../../vuex/getters';
    import {setAnalyticsType,setCompareActiveTopic, setCompareSource, setCompareSourceCount, setCompareType } from "../../../vuex/actions";

    export default{
        props: ['active', 'datas'],
        vuex:{
            getters:{compareActiveTopic, compareSource, compareSourceCount, compareType},
            actions:{setAnalyticsType,setCompareActiveTopic, setCompareSource,setCompareSourceCount,setCompareType}
        },
        data(){
            const words = Local().analytics;
            return{
                words,
                sourceActive: 0,
                source: [
                    { name: words.source[0] },
                    { name: words.source[1] },
                    { name: words.source[2] },
                    { name: words.source[3] },
                    { name: words.source[4] },
                    { name: words.source[5] }
                ],
            }
        },
        methods: {
            sourceAction(val, idx){
                console.log(val, idx);
                this.sourceActive = idx;
                const source = ["all", "wechat", "weibo", "client", "web", "overseas"];
                this.setCompareSource(source[idx]);
            }
        },
        filters:{
            showNum(name, num, datas){
                console.log('datas',datas);
                if(!datas.length) return name;
                if(num && num > -1) return `${name}(${num})`;
                return `${name}`;
            }
        },
        ready(){
                this.setCompareType(this.$route.name);
                const source = ["all", "wechat", "weibo", "client", "web", "overseas"];
                this.setCompareSource(source[0]);
        },
        components:{
            AddDashboard
        },
        route:{
        }
    }
</script>
