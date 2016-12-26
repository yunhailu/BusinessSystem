<template>
    <div class="add-dashboard">
        <div class="add-dashboard-btn" @click="showAdd();">
            <i class="fa fa-plus"></i>
            <span>{{words.addDashboard}}</span>
        </div>
    </div>
    <ul class="row tabs">
        <li v-for="tab in tabs" class="tab" :class="[tab.link == $route.name ? 'active' : '']" >
            <a  v-link="{name: tab.link}">{{tab.name}}</a>
        </li>
    </ul>
    <ul class="row items source">
        <li v-for="(index, item) in source" class="item" :class="[sourceActive == $index ? 'active' : '']" @click="sourceAction(item, $index)">
            <!--<span class="con">{{item.name}} {{datas[index] | showNum datas}}<i class="fa fa-spinner fa-spin" v-show="!datas.length"></i></span>-->
            <span class="con">{{item.name | showNum datas[index] datas}}<i class="fa fa-spinner fa-spin" v-show="!datas.length"></i></span>
        </li>
    </ul>
    <div v-if="showDashboard">
        <add-dashboard :visiable.sync="showDashboard" :iscompare.sync="isCompare"></add-dashboard>
    </div>
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
            actions:{setAnalyticsType,setCompareActiveTopic, setCompareSource, setCompareSourceCount, setCompareType}
        },
        data(){
            const words = Local().analytics;
            return{
                words,
                showDashboard:false,
                isCompare:false,
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
                //source: words.source,
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
            },
            changeTab(tab){
                console.log(tab);
                this.setAnalyticsType(this.$route.name);
                if(tab.link!='comparision'){
                    //this.$router.go({name:tab.link});
                }

            },
            showAdd(){
                this.showDashboard = true;
                this.isCompare = true;
            }
        },
        filters:{
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
        /*watch:{
            compareSourceCount:{
                deep:true,
                handler(val,oldVal){
                    console.log('这是修改后的',this.compareSourceCount);
                    this.datas = this.compareSourceCount;
                }
            }
        },*/
        ready(){
            if(this.$route.path.indexOf('compare') > -1){
                console.log('datas', this.datas);
                this.setCompareType(this.$route.name);
                const source = ["all", "wechat", "weibo", "client", "web", "overseas"];
                this.setCompareSource(source[0]);

            }
        },
        /* compareSourceCount:{
                deep:true,
                handler:(val,oldVal) => {
                    const compareSourceCount = this.compareSourceCount;
                    console.log('这个是tabs数据',compareSourceCount)
                }
            }
        },*/
        components:{
            AddDashboard
        },
        route:{

        }
    }
</script>
