<template>
    <!--<ul class="row items source">
        <li v-for="item in source" class="item" :class="[sourceActive == $index ? 'active' : '']" @click="sourceAction(item, $index)">
            <span class="con">{{item}}</span>
        </li>
    </ul>-->
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
    import {compareActiveTopic, compareSource, compareSourceCount, compareType } from '../../../vuex/getters';
    import {setCompareActiveTopic, setCompareSource, setCompareSourceCount, setCompareType } from "../../../vuex/actions";

    export default{
        props: ['active', 'datas'],
        vuex:{
            getters:{compareActiveTopic, compareSource, compareSourceCount, compareType},
            actions:{setCompareActiveTopic, setCompareSource, setCompareSourceCount, setCompareType}
        },
        data(){
            const words = Local().compare;
            return{
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
                this.setCompareSource(val);
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
                const source = ["all", "wechat", "weibo", "client", "web", "oversea"];
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

        }
    }
</script>
