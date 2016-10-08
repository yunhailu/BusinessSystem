<template>
    <div class="list-panel">
        <div class="row list-panel-tools">
            <div class="col-md-4">
                <select-el :options="options" :title="selectTitle" :value.sync="selectValue"></select-el>
            </div>
            <!--<div class="col-md-4">-->
            <!--<i class="fa fa-th-large"></i>-->
            <!--<i class="fa fa-th-list"></i>-->
            <!--</div>-->
        </div>
        <ul class="list-panel-list">
            <li class="list-panel-list-item row" v-for="item in list">
                <!--<a :href="item.url" target="_blank">-->
                <a v-link="{name: 'detail', params:{type:'result', id:'12345678'}}" target="_blank">
                    <div class="list-panel-list-item-left col-md-8">
                        <i class="fa fa-paperclip fa-3x"></i>
                        <div class="list-panel-list-item-left-con">
                            <div class="title">{{{item.title}}}</div>
                            <div class="detail">{{{item.content}}}</div>
                            <div class="time">发布于 {{item.pDate}}</div>
                        </div>
                    </div>
                    <div class="list-panel-list-item-right col-md-4">
                        <i class="fa fa-flag fa-2x icon"></i>
                        <div class="item-data">
                            <div class="row">
                                <div class="col-md-3 title">匹配</div>
                                <div class="col-md-9">优步Ubar</div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 title">指标</div>
                                <div class="col-md-3"><i class="fa fa-wechat"></i> 12</div>
                                <div class="col-md-3"><i class="fa fa-weibo"></i> 14</div>
                                <div class="col-md-3"><i class="fa fa-internet-explorer"></i> 14</div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 col-md-offset-3"><i class="fa fa-eye"></i> {{item.viewCount}}</div>
                                <div class="col-md-3"><i class="fa fa-thumbs-up"></i> {{item.likeCount}}</div>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
        <div class="list-panel-pager">
            <page></page>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "ListPanel.less";
</style>
<script>
    import SelectEl from '../Select/Select.vue';
    import Page from '../Page/Page.vue';

    export default{
        props: ["list", "options", "selectTitle", "selectValue"],
        data(){
            return{

            }
        },
        components:{
            SelectEl, Page
        }
    }
</script>
