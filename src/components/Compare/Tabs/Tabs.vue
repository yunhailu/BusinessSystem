<template>
    <!--<ul class="row tabs">-->
        <!--<li v-for="tab in tabs" class="tab" :class="[tab.link == $route.name ? 'active' : '']" >-->
            <!--<a v-link="{name: tab.link}">{{tab.name}}</a>-->
        <!--</li>-->
    <!--</ul>-->
    <ul class="row items source">
        <li v-for="item in source" class="item" :class="[sourceActive == $index ? 'active' : '']" @click="sourceAction(item, $index)">
            <!--<span class="con">{{item.name | showNum compareSourceCount[index] compareSourceCount}}<i class="fa fa-spinner fa-spin" v-show="!compareSourceCount.length"></i></span>-->
            <span class="con">{{item}}</span>
            <!--<span class="con">{{item | showNum datas[index] datas}}<i class="fa fa-spinner fa-spin" v-show="!datas.length"></i></span>-->
        </li>
    </ul>
</template>
<style lang="less" scoped>
    @import "Tabs.less";
</style>
<script>
    import _ from 'underscore';
    import Local from '../../../local/local';
    import {compareActiveTopic, compareSource, compareSourceCount } from '../../../vuex/getters';
    import {setCompareActiveTopic, setCompareSource, setCompareSourceCount } from "../../../vuex/actions";

    export default{
        props: ['active'],
        vuex:{
            getters:{compareActiveTopic, compareSource, compareSourceCount},
            actions:{setCompareActiveTopic, setCompareSource, setCompareSourceCount}
        },
        data(){
            const words = Local().compare;
            return{
                datas:["all", "wechat", "weibo", "client", "web", "overseas"],
                tabs: [{
                    name: words.tabs[0],
                    link: ''
                },{
                    name: words.tabs[1],
                    link: ''
                },{
                    name: words.tabs[2],
                    link: ''
                },{
                    name: words.tabs[3],
                    link: ''
                }],
                source: words.source,
                sourceActive: 0,
                /*source: [
                    { name: words.source[0] },
                    { name: words.source[1] },
                    { name: words.source[2] },
                    { name: words.source[3] },
                    { name: words.source[4] },
                    { name: words.source[5] }
                ],*/
            }
        },
        methods: {
            sourceAction(val, idx){
                console.log(val, idx);
                this.sourceActive = idx;
                this.setCompareSource(val);
            }
        },
        /*filters:{
            showNum(name, num, datas){
                console.log('datas',datas);
                if(!datas.length) return name;
                if(num && num > -1) return `${name}(${datas[num]})`;
                return `${name}`;
            }
        },*/
        /*watch:{
            compareSourceCount:{
                deep:true,
                handler(val,oldVal){
                    console.log('这是修改后的',this.compareSourceCount);
                    this.datas = this.compareSourceCount;
                }
            }
        },*/
       /* ready(){
            this.datas =this.compareSourceCount;
            console.log('这个是tabs数据',this.datas);
        },*/
        /* compareSourceCount:{
                deep:true,
                handler:(val,oldVal) => {
                    const compareSourceCount = this.compareSourceCount;
                    console.log('这个是tabs数据',compareSourceCount)
                }
            }
        },*/
        components:{

        }
    }
</script>
