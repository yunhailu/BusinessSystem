<template>
    <div id="selectEl" class="select">
        <span class="title">{{title}}</span>

        <div class='select-btn' @click="showMenu">
            <i class="fa fa-envelope-o fa-sort-amount-desc"></i>
            <span class="select-btn-text">{{value.value}}</span>
            <i class="fa fa-sort"></i>
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
                isShowMenu: false
            }
        },
        created(){
            this.value = this.options[0];
        },
        methods: {
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
                console.log(option);
            }
        },
        components:{

        }
    }
</script>
