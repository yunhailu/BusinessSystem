<template>
    <ul class="row tabs">
        <li v-for="tab in tabs" class="tab" :class="[tab.link == $route.name ? 'active' : '']" >
            <a v-link="{name: tab.link}">{{tab.name}}</a>
        </li>
    </ul>
    <!--<ul class="row items filters">-->
        <!--<li v-for="filter in filters" class="item" :class="[filterActive == $index ? 'active' : '']" @click="filterAction(filter, $index)">-->
            <!--<span class="con">{{filter}}</span>-->
        <!--</li>-->
    <!--</ul>-->
    <ul class="row items source">
        <li v-for="item in source" class="item" :class="[sourceActive == $index ? 'active' : '']" @click="sourceAction(item, $index)">
            <span class="con">{{item}}</span>
        </li>
    </ul>
</template>
<style lang="less" scoped>
    @import "Tabs.less";
</style>
<script>
//    import HeaderComponent from './components/header.vue'
//    import OtherComponent from './components/other.vue'
    import Local from '../../../local/local';

    export default{
        props: ['active'],
        data(){
            const words = Local().analytics;
            return{
                tabs: [{
                    name: words.tabs[0],
                    link: 'result'
                },{
                    name: words.tabs[1],
                    link: 'sentiment'
                },{
                    name: words.tabs[2],
                    link: 'influence'
                },{
                    name: words.tabs[3],
                    link: 'theme'
                }],
//                filters: words.filters,
//                filterActive: 0,
                source: words.source,
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
                console.log(val, idx);
                this.sourceActive = idx;
            }
        },
        components:{

        }
    }
</script>
