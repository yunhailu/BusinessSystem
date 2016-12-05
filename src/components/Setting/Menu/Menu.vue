<template>
    <aside class="left-side sidebar-offcanvas">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar user panel -->
            <div class="user-panel">
                <div class="pull-left image">
                    <!-- class="img-circle"-->
                    <img src="images/avatar.png" alt="User Image" />
                </div>
                <div class="pull-left info">
                    <p>{{common.hi}}, {{nickName}}</p>

                    <!--<a href="javascript:void(0);"><i class="fa fa-circle text-success"></i> 在线</a>-->
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

            <menu-list title="主题" :groups.sync="list" :action="topicAction()"></menu-list>
        </section>
    </aside>
</template>
<style lang="less">
    @import "Menu.less";
</style>
<script type="text/ecmascript-6">
    import _ from "underscore";
    import Local from "../../../local/local";
    import {AnalyticMenu, ChannelMenu} from "../../../config/config";
    import MenuList from "./MenuList/MenuList.vue";
    import * as Api from "../../../widgets/Api";
    import { getCookie } from '../../../widgets/Cookie';
    import { topicList, activeSettingTopic } from '../../../vuex/getters';
    import { setTopicList, setActiveSettingTopic } from "../../../vuex/actions";

    export default{
        props: [],
        data(){
            const common = Local().common;
            return{
                common,
                AnalyticMenu,
                ChannelMenu,
                //nickName: getCookie('business_name')
                nickName: "欢迎！"
            }
        },
        components:{
            'menu-list': MenuList
        },
        vuex: {
            actions: { setTopicList, setActiveSettingTopic },
            getters: { topicList, activeSettingTopic }
        },
        computed: {
            list(){
                let list = [];
                _.each(this.topicList, item => {
                    list.push(_.extend({}, item));
                });
                return list;
            }
        },
        methods: {
            getTopics(){
                console.log('vuex getTopicList:',this.getTopicList);
                if(this.topicList.length){
                    //this.topicList = this.getTopicList;
                    return;
                }
                Api.getTopicList({}).then(resp => {
                    //console.log('getTopicList', resp);
                    if(resp.data.code == 0){
                        let topicList = _.map(resp.data.data, topic => {
                            topic.isActive = false;
                            return topic;
                        });
                        _.first(topicList).isActive = true;
                        this.setTopicList(topicList);
                    }
                });
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
            topicAction(){
                return (item, group_id) => {
                    console.log(item, group_id);
                    this.$router.go({name: 'settingEdit', params: {topic_id: item.topic_id, group_id}});
                };
            },
            init(){
                this.getTopics();
            }
        },
        ready(){
            this.init();
        },
//        route: {
//            data(){
//                this.init();
//            }
//        }
    }
</script>
