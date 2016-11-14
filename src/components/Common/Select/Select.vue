<template>
    <div id="selectEl" class="select">
        <span class="title">{{title}}</span>

        <div class='select-btn' @click="showMenu">
            <i class="fa fa-envelope-o fa-sort-amount-desc"></i>
            <span class="select-btn-text">{{showStr}}</span>
            <!--<i class="fa fa-sort"></i>-->
        </div>

        <ul class='dropdown-menu' v-show="isShowMenu">
            <li v-for="option in options">
                <a href='javascript:void(0);' @click="selectItem(option);">{{option.value}}</a>
            </li>
        </ul>
    </div>

</template>
<style lang="less" scoped>
    @import "Select.less";
</style>
<script type="text/ecmascript-6">
    import Local from "../../../local/local";
    import { addEvent, removeEvent, isFatherDom } from "../../../widgets/Util";

    export default{
        props: ["title", "value", "options"],
        data(){
            const words = Local().common;
            return{
                words: words.select,
                activeItem: "",
                isShowMenu: false,
                showStr:'',
                strLength:0
            }
        },
        created(){
            this.value = this.options[0];
            //--->
            this.showStr = this.value.value;
        },
        watch:{
            showStr:{
                //deep:true,
                handler(val,oldVal){
                    //this.strLength = this.strlen(this.value.value);
                    this.strLength = this.strlen(this.showStr);
                    console.log('查看这个value的长度值',this.strLength);
                    if(this.strLength>22){
                        for(var i=0;i<this.showStr.length;i++){
                            if(this.strlen(this.showStr.substring(0,i))<=25 && this.strlen(this.showStr.substring(0,i+1))>25){
                                console.log(this.showStr.substring(0,i));
                                this.showStr = this.showStr.substring(0,i)+'...';
                                return ;
                            }
                            //console.log()
                        }
                    }
                }
            }
        },
        methods: {
            strlen(str){
                let len = 0;
                for(var i=0;i<str.length;i++){
                    var c = str.charCodeAt(i);
                    if((c>=0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){
                        len++;
                    }else{
                            len+=2;
                    }
                }
                return len;
            },
            showMenu(){
                this.isShowMenu = true;
                const $body = document.getElementsByTagName('body')[0];
                addEvent($body, 'click', this.cancelOptions);
            },
            hideMenu(){
                this.isShowMenu = false;
                const $body = document.getElementsByTagName('body')[0];
                removeEvent($body, 'click', this.cancelOptions);
            },
            cancelOptions(e){
                const $target = e.target;
                const $select = document.getElementById('selectEl');
                if(isFatherDom($select, $target)) return;
                this.isShowMenu = false;
            },
            selectItem(option){
                this.hideMenu();
                this.btnText = option.value;
                this.value = option;
                //==>
                this.showStr = this.value.value;
                console.log(this.showStr);
                console.log(option);
            }
        },
        components:{

        }
    }
</script>
