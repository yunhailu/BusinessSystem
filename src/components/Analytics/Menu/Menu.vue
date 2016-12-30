<template>
    <aside class="left-side sidebar-offcanvas">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar user panel -->
            <div class="user-panel">
                <div class="pull-left image">
                    <!--去掉圆形边框class="img-circle"-->
                    <img src="images/avatar.png"  alt="User Image" />
                </div>
                <div class="pull-left info">
                    <p>{{common.hi}}, {{nickName}}</p>
                    <!--<a href="javascript:void(0);"><i class="fa fa-circle text-success"></i> 在线</a>-->
                </div>
            </div>
            <menu-list title="主题" :groups.sync="list" :action="topicAction()"></menu-list>
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
    import Local from "../../../local/local";
    import { getCookie } from '../../../widgets/Cookie';
    import { topicList, activeAnalyticsTopic,analyticsAddTopic,headerName } from '../../../vuex/getters';
    import { setTopicList, setActiveAnalyticsTopic,setAnalyticsAddTopic } from "../../../vuex/actions";

    export default{
        props: [],
        data(){
            const common = Local().common;
            return{
                common,
                AnalyticMenu,
                ChannelMenu,
                //topicList: [],
                nickName: getCookie('business_name')
            }
        },
        components:{
            'menu-list': MenuList
        },
        vuex: {
            actions: { setTopicList, setActiveAnalyticsTopic ,setAnalyticsAddTopic },
            getters: { topicList, activeAnalyticsTopic, analyticsAddTopic,headerName }
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
                if(this.topicList.length){
                    this.initActiveTopic();
                    return;
                }
                Api.getTopicList({}).then(resp => {
                    if(resp.data.code == 0){
                        /*if(!resp.data.data.length){
                         this.$router.go({ name: 'settingAdd' });
                         return ;
                        }*/
                        let topicList = _.map(resp.data.data, topic => {
                            topic.isActive = false;
                            return topic;
                        });
                        if(topicList.length){
                            _.first(topicList).isActive = true;
                            this.setTopicList(topicList);
                            this.initActiveTopic();
                        }else{
                            this.$router.go({ name: 'settingAdd' });
                            return ;
                        }

                    }
                });
            },
            initActiveTopic(){
                let active = _.extend({}, this.activeAnalyticsTopic);
                if(_.isEmpty(active)){
                    const group = _.first(this.topicList);
                    active = _.first(group.list);
                    this.setActiveAnalyticsTopic(active);
                }
            },
            toggle(menu){
                _.each(this.MainMenu, menuItem => {
                    if(menuItem.router != menu.router){
                        menuItem.isActive = false;
                    } else {
                        menuItem.isActive = !menuItem.isActive;
                    }
                });
            },
            topicAction(){
                return (item, group_id) => {
                    console.log('topicAction',item, group_id);
                    //this.$router.go({name: 'settingEdit', params: {topic_id: item.topic_id, group_id}});
                };
            },
            init(){
                this.getTopics();
            }
        },
        ready(){
            this.init();
        },
        watch:{
            analyticsAddTopic:{
                handler(val){
                    this.getTopics();
                    this.setActiveAnalyticsTopic(val);
                }
            }
        },

        /*route: {
            data(){
                this.init();
            }
        }*/
    }
</script>
