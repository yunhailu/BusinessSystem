<template>

    <!--<div class="lineService">-->
    <!--<a class="qq" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2994454967&site=qq&menu=yes"> <i class="fa fa-qq fa-2x"></i></a>-->
    <!--<a class="weixin" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2994454967&site=qq&menu=yes"> <i class="fa fa-weixin fa-2x"></i></a>-->
    <!--<a class="phone" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2994454967&site=qq&menu=yes"> <i class="fa fa-phone fa-2x"></i></a>-->
    <!--<a class="totop" href="javascript:scroll(0,0)"> <i class="fa fa-angle-up fa-3x"></i></a>-->


<!--</div>-->

    <div class="toolbar ">
        <!--<a href="javascript:;" class="toolbar-item toolbar-item-weixin"><span class="toolbar-layer"></span></a>-->
        <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2994454967&site=qq&menu=yes" class="toolbar-item toolbar-item-feedback"></a>
        <a href="javascript:;" class="toolbar-item toolbar-item-app"><span class="toolbar-layer"></span></a>
        <!--<a href="#dfs1" id="top"  class="toolbar-item toolbar-item-top"></a>-->
    </div>





</template>
<style lang="less" scoped>
    @import "QQservice.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import Local from '../../local/local';

    export default{
        props: ['sourchWord'],
        data(){
            const words = Local().hotEvent;
            const common = Local().common;
            return{
                words,
                common,
                start:'2016-12-05',
                end:'2016-12-11',
                topic:'罗一笑',

            }
        },
        methods: {
            //my functions

            showDetail(){

                console.log('q2w');

                document.body.scrollTop = 0;

            },


        },
        filters: {
            title(title){
                let hot = this.activeHot.name;
                const source = this.source;
                if(hot.length>=18){
                    hot = hot.substring(0,15)+'...';
                };
                return `${title} (${source}:${hot} )`;

            }
        },
        created(){
            //this.getSourchData('陈赫');
           //this.getSourchData('罗一笑');

        },
        components:{  }
    }
</script>
