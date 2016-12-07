<template>
    <ul class="row tabs">
        <li v-for="tab in tabs" class="tab" :class="[tab.link == $route.name ? 'active' : '']" >
            <a v-link="{name: tab.link}">{{tab.name}}</a>
        </li>
    </ul>
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
                    link: 'evaluation'
                },{
                    name: words.tabs[3],
                    link: 'influence'
                },{
                    name: words.tabs[4],
                    link: 'theme'
                }],
                source: words.source,
                sourceActive: 0
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
