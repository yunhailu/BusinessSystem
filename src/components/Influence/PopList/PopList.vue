<template>
    <tips :visible.sync="visiable" :tipsparam.sync="popListParams">
        <div class="pop-list">
            <div class="pop-list-wrap">
                <div class="pop-list-wrap-items">
                    <div class="pop-list-wrap-items-item" v-for="pop in pops" @click="showDetail(pop);">
                        <div class="icon"><i class="fa fa-map-marker"></i> </div>
                        <div class="con">
                            <div class="title">{{pop.title}}</div>
                            <div class="context">{{pop.context}}</div>
                            <span class="date">{{pop.date}}</span>
                            <span class="influencer">{{item.influencer}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn btn-default closeBtn" @click="closeTip();">{{words.close}}</div>
    </tips>
</template>
<style lang="less" scoped>
    @import "PopList.less";
</style>
<script  type="text/ecmascript-6">
    import _ from "underscore";
    import Tips from "../../Common/Tips/Tips.vue";
    import Local from "../../../local/local";

    export default{
        props: ['item', 'pops', 'visiable'],
        data(){
            const words = Local().influence;
            return{
                words,
                popListParams: {
                    type: "dialog",
                    callback: () => {
                        this.visiable = false;
                    },
                    failback: () => { this.visiable = false; }
                }
            }
        },
        methods: {
            showDetail(pop){
               // this.$router.go({ name: 'detail', params: { type: 'influence', id: pop.id } });
                window.open(pop.url);
            },
            closeTip(){
                this.visiable = false;
            }
        },
        components:{ Tips }
    }
</script>
