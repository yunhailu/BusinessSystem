<template>
    <!--<ul class="row tabs">-->
        <!--<li v-for="tab in tabs" class="tab" :class="[tab.link == $route.name ? 'active' : '']" >-->
            <!--<a v-link="{name: tab.link}">{{tab.name}}</a>-->
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
    import Local from '../../../local/local';

    export default{
        props: ['active'],
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
                source: words.source,
                sourceActive: 0
            }
        },
        methods: {
            sourceAction(val, idx){
                console.log(val, idx);
                this.sourceActive = idx;
            }
        },
        components:{

        }
    }
</script>
