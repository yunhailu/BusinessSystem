<template>
    <aside class="left-side sidebar-offcanvas">
        <section class="sidebar">
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="images/avatar.png" alt="User Image" />
                </div>
                <div class="pull-left info">
                    <p>{{common.hi}}, {{nickName}}</p>

                    <!--<a href="javascript:void(0);"><i class="fa fa-circle text-success"></i> 在线</a>-->
                </div>
            </div>
            <menu-list title="主题" :groups.sync="list" :action = "topicAction()"></menu-list>
        </section>
    </aside>
</template>
<style lang="less">
    @import "Menu.less";
</style>
<script type="text/ecmascript-6">
    import _ from "underscore";
    import {CompareMenu} from "../../../config/config";
    import MenuList from "./MenuList/MenuList.vue";
    import { getCookie } from '../../../widgets/Cookie';
    import Local from "../../../local/local";
    import * as Api from "../../../widgets/Api";
    import { topicList, activeCompareTopic, topicGroupActiveId} from '../../../vuex/getters';
    import { setTopicList, setActiveCompareTopic, setTopicGroupActiveId} from "../../../vuex/actions";

    export default{
        data(){
            const common = Local().common;
            return{
                common,
                CompareMenu,
                nickName: getCookie('business_name')
            }
        },
        components:{
            'menu-list': MenuList
        },
        vuex:{
           actions:{setTopicList ,setActiveCompareTopic ,setTopicGroupActiveId},
           getters:{topicList ,activeCompareTopic , topicGroupActiveId}
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
            getTopics(){
                console.log('vuex getTopicList:',this.getTopicList);
                if(this.topicList.length){
                    this.initActiveTopic();
                    return;
                }
                Api.getTopicList({}).then(resp => {
                    console.log('getTopicList', resp);
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
                            console.log('第一次查看',this.topicList);
                            this.initActiveTopic();
                        }else{
                            this.$router.go({ name: 'settingAdd' });
                            return ;
                        }
                    }
                });
            },
            initActiveTopic(){
                let active = _.extend([], this.activeCompareTopic);
                if(_.isEmpty(active)){
                    const group = _.first(this.topicList);
                    active.push(_.first(group.list));
                    this.setActiveCompareTopic([]);
                    this.setActiveCompareTopic(active);
                    this.setTopicGroupActiveId(group.group_id);
                }
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
        }
    }
</script>
