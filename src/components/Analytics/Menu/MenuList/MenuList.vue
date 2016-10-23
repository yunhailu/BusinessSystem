<template>
    <div class="menu-list">
        <div class="title">
            <i class="fa fa-2x fa-laptop"></i>
            <span>{{title}}</span>
            <i class="fa fa-plus fa-2x plus" @click="addTopicAction"></i>
        </div>
        <ul class="sidebar-menu">
            <li v-for="group in groups" :class="[group.list.length ? 'treeview' : '', group.isActive ? 'active' : '']">
                <a href="javascript:void(0);" @click="toggle(group);" v-show="group.list.length">
                    <i class="fa" :class="group.icon || 'fa-bar-chart' "></i> <span>{{group.group_name}}</span>
                    <i class="fa pull-right" :class="[group.isActive ? 'fa-angle-down' : 'fa-angle-left']"></i>
                </a>
                <ul class="treeview-menu" v-show="group.isActive" transition="expand">
                    <li v-for="topic in group.list" :id="topic.topic_id" @click="selectTopic(topic);" :class="topic | isActive" >
                        <a href="javascript:void(0);">
                            <i class="fa fa-angle-double-right"></i> {{topic.topic_name}}
                            <!--<i class="fa fa-remove delete" @click.stop.prevent="deleteTopicAction(topic,group.group_id);"></i>-->
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
    @import "MenuList.less";
</style>
<script type="text/ecmascript-6">
    import _ from "underscore";
    import Local from "../../../../local/local";
    import Tips from "../../../Common/Tips/Tips.vue"
    import * as Api from "../../../../widgets/Api";
    import { topicList, activeAnalyticsTopic } from '../../../../vuex/getters';
    import { setTopicList, setActiveAnalyticsTopic } from "../../../../vuex/actions";

    export default{
        props: ['title', 'menus', 'groups', 'action'],
        data(){
            const common = Local().common;
            return{
                common
            }
        },
        components:{ Tips },
        vuex: {
            actions: { setTopicList, setActiveAnalyticsTopic },
            getters: { topicList, activeAnalyticsTopic }
        },
        methods: {
            toggle(group){
                console.log(group);
                const groups = _.map(this.groups, item => {
                    if(group.group_id != item.group_id){
                        item.isActive = false;
                    } else {
                        item.isActive = !item.isActive;
                    }
                    return item;
                });
                console.log('groups',groups);
                this.setTopicList(groups);
            },
            selectTopic(topic){
                console.log(topic);
                const active = topic;
                this.setActiveAnalyticsTopic(active)
            },
            addTopicAction(){
                this.$router.go({name: "settingAdd"});
            }
        },
        filters: {
            isActive(topic){
                return _.isEqual(this.activeAnalyticsTopic, topic) ? 'active' : '';
            }
        }
    }
</script>
