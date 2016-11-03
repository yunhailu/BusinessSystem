<template>
  <div class="zz-tips-bg" v-if="visible && slide!='down' && tipsparam.cover!=false" @click="cancel" ></div>

  <div class="zz-tips" v-if="visible && tipsparam.type != 'slide'"  >

    <div class="zz-tips-confirm" v-if="tipsparam.type=='confirm'">
        <h3><i class="fa fa-warning"></i> {{tipsparam.title |  defaultValue '提示'}}</h3>
        <div class="tips-content">{{tipsparam.content}}</div>
        <div class="tips-btns" v-if="tipsparam.btn==1">
            <p class="tips-oneBtn" @click="confirm">{{tipsparam.rightBtn | defaultValue '确认'}}</p>
        </div>
        <div class="tips-btns" v-else>
            <p class="tips-leftBtn" @click="cancel">{{tipsparam.leftBtn | defaultValue '取消'}}</p>
            <p class="tips-rightBtn" @click="confirm">{{tipsparam.rightBtn | defaultValue '确认'}}</p>
        </div>
        <i class="tips-close" v-if="tipsparam.showX" @click="closePage"></i>
    </div>

    <div class="zz-tips-toast" v-if="tipsparam.type == 'toast'">
        <p class="failImg" v-show="tipsparam.toastType == 'fail'"></p>
        <p class="successImg" v-show="tipsparam.toastType == 'success'"></p>
        <div class="toastContent">{{tipsparam.content}}</div>
    </div>

    <div class="zz-tips-loading" v-if="tipsparam.type=='loading'">
        <!--<p class="loadingImg"></p>-->
        <i class="fa fa-spinner fa-spin fa-3x"></i>
        <span class="loadingContent">{{tipsparam.content | defaultValue '载入中...'}}</span>
    </div>

    <div class="zz-tips-dialog" v-if="tipsparam.type=='dialog'"><slot></slot></div>
  </div>

  <div class="zz-tips-slide" v-if="visible && tipsparam.type=='slide'" :class="[slide ? 'zz-tips-' + slide : '']" :transition="transitionName">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
    @import "Tips.less";
</style>
<script type="text/ecmascript-6">
    import ScrollHandler from "../../../widgets/scrollHandler";

  export default{
    props:{
      visible:Boolean,
      tipsparam:Object,
      transitionName:{
        type: String,
        default: 'zz-slide'
      },
      slide:{
        type: String,
        default: 'top'
      },
      type:String,
      animate:{
        type: String,
        default: 'true'
      }
    },
    filters:{
        defaultValue(val,key){
          return (!val) ? key : val;
        }
    },
    watch:{
      visible(){
        if(this.visible){
          //document.body.style.position = "fixed";
          document.body.style.width = '100%';

           ScrollHandler.disableScroll();

          if(this.tipsparam.duration){
             const time = this.tipsparam.duration || 2000;
            setTimeout(function(){
              this.visible = false;
            }.bind(this),time);
          }

        }else{
          document.body.style.position = 'static';
          ScrollHandler.enableScroll();
        }
      }
    },
    methods:{
      cancel(){
        this.visible = false;
        this.tipsparam.failback ? this.tipsparam.failback && this.tipsparam.failback() : '';
        ScrollHandler.enableScroll();
      },
      confirm() {
        this.visible = false;
        this.tipsparam.callback && this.tipsparam.callback();
        ScrollHandler.enableScroll();
      },
      closePage(){
        this.visible = false;
      }
    },
    compiled(){
      if(this.slide){
        this.transitionName = (this.animate === 'false') ? '' : 'zz-slide-'+this.slide;
      }
    }
  }
</script>
