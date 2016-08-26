<template>
    <div class="row tabs">
        <ul class="">
            <li v-for="tab in tabs" class="tab" :class="[tab.link == $route.name ? 'active' : '']" >
                <a v-link="{name: tab.link}">{{tab.name}}</a>
            </li>
        </ul>
    </div>
</template>
<style lang="less">
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
                filters: words.filters
            }
        },
        components:{

        }
    }
</script>
