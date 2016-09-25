<template>
    <aside class="left-side sidebar-offcanvas">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar user panel -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="images/avatar.png" class="img-circle" alt="User Image" />
                </div>
                <div class="pull-left info">
                    <p>Hello, Jane</p>

                    <a href="javascript:void(0);"><i class="fa fa-circle text-success"></i> Online</a>
                </div>
            </div>

            <!--<form action="#" method="get" class="sidebar-form">-->
                <!--<div class="input-group">-->
                    <!--<input type="text" name="q" class="form-control" placeholder="Search..."/>-->
                        <!--<span class="input-group-btn">-->
                            <!--<button type='submit' name='seach' id='search-btn' class="btn btn-flat"><i class="fa fa-search"></i></button>-->
                        <!--</span>-->
                <!--</div>-->
            <!--</form>-->

            <menu-list title="主题" :groups.sync="topicList"></menu-list>
            <!--<menu-list title="主题1" :menus="AnalyticMenu"></menu-list>-->
            <!--<menu-list title="数据源" :menus="ChannelMenu"></menu-list>-->
        </section>
    </aside>
</template>
<style lang="less">
    @import "Menu.less";
</style>
<script type="text/ecmascript-6">
    import _ from "underscore";
    import {AnalyticMenu, ChannelMenu} from "../../../config/config";
    import MenuList from "./MenuList/MenuList.vue";
    import * as Api from "../../../widgets/Api";

    export default{
        props: [],
        data(){
            return{
                AnalyticMenu,
                ChannelMenu,
                topicList: []
            }
        },
        components:{
            'menu-list': MenuList
        },
        methods: {
            getTopicList(){
                return Api.getTopicList();
            },
            toggle(menu){
                console.log(menu, this.MainMenu);
                _.each(this.MainMenu, menuItem => {
                    if(menuItem.router != menu.router){
                        menuItem.isActive = false;
                    } else {
                        menuItem.isActive = !menuItem.isActive;
                    }
                });
                //menu.isActive = !menu.isActive;
            },
            init(){
                this.getTopicList().then(resp => {
                    //console.log('getTopicList', resp);
                    if(resp.data.code == 0){
                        this.topicList = _.map(resp.data.data, topic => {
                            topic.isActive = false;
                            return topic;
                        });
                        //console.log('getTopicList', this.topicList);
                    }
                });
            }
        },
        ready(){
            this.init();
        },
        route: {
            data(){
                this.init();
            }
        }
    }
</script>
