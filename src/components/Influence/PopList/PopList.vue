<template>

    <tips :visible.sync="visiable" :tipsparam.sync="popListParams" >

        <div class="pull-right" @click="closeTip();"><i class="fa fa-close fa-lg"></i></div>
        <br><br>
        <div class="pop-list" @mouseover="myover();" >
            <div class="pop-list-wrap">
                <div class="pop-list-wrap-items">
                    <div class="pop-list-wrap-items-item" v-for="pop in pops" @click="showDetail(pop);">
                        <div class="icon"><i class="fa fa-map-marker"></i> </div>
                        <div class="con">
                            <div class="title">{{pop.title}}</div>
                            <div class="context">{{pop.context}}</div>
                            <span class="date"> 时间: {{pop.date}}</span>
                            <span class="date"> 来源: {{pop.from}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </tips>
    <div class="tipBg" v-if="showSmallTips">
        <div class="smallTips">
            <h3><i class="fa fa-warning"></i> 提示</h3>
            <div class="tips-content">由于法律监管原因，无法访问外网数据，如果需要查阅，请联系客服</div>
            <div class="tips-btns">
                <p class="tips-leftBtn" @click="confirm()">确认</p>
            </div>
        </div>
    </div>

</template>
<style lang="less" scoped>
    @import "PopList.less";
</style>
<script  type="text/ecmascript-6">
    import _ from "underscore";
    import Tips from "../../Common/Tips/Tips.vue";
    import Local from "../../../local/local";
    import ScrollHandler from "../../../widgets/scrollHandler";

    export default{
        props: ['item', 'pops', 'visiable'],
        data(){
            const words = Local().influence;
            return{
                words,
                showSmallTips:false,
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
            confirm(){
                this.showSmallTips=false;
            },
            showDetail(pop){
                if(pop.source=='overseas'){
                    this.showSmallTips = true;
                    return ;
                }
               // this.$router.go({ name: 'detail', params: { type: 'influence', id: pop.id } });
                if(pop.id!=null){ window.open(window.location.origin+"/"+this.$route.name+"/detail/"+pop.id);}
                else{ window.open(pop.url); }
               // window.open(window.location.origin+"/#!/"+this.$route.name+"/detail/"+id)
            },
            closeTip(){
                this.visiable = false;
                this.pops = [];
            },
            myover(){

                ScrollHandler.enableScroll();
            }

        },
        components:{ Tips }
    }
</script>
