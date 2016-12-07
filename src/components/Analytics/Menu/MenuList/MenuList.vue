<template>
    <div class="menu-list">
        <div class="title">
            <i class="fa fa-laptop"></i>
            <span>{{title}}</span>
            <i class="fa fa-plus plus" @click="addTopicAction"></i>
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
    import { topicList, activeAnalyticsTopic, analyticsRefreshTopic, analyticsResetSearch } from '../../../../vuex/getters';
    import { setTopicList, setActiveAnalyticsTopic, setAnalyticsRefreshTopic, setAnalyticsResetSearch } from "../../../../vuex/actions";

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
            actions: { setTopicList, setActiveAnalyticsTopic, setAnalyticsRefreshTopic, setAnalyticsResetSearch },
            getters: { topicList, activeAnalyticsTopic, analyticsRefreshTopic, analyticsResetSearch }
        },
        methods: {
            toggle(group){
                //console.log(group);
                const groups = _.map(this.groups, item => {
                    if(group.group_id != item.group_id){
                        item.isActive = false;
                    } else {
                        item.isActive = !item.isActive;
                    }
                    return item;
                });
                //console.log('groups',groups);
                this.setTopicList(groups);
            },
            selectTopic(topic){
                console.log('new',topic.topic_id);
                console.log('old',(this.activeAnalyticsTopic).topic_id);
                if((this.activeAnalyticsTopic).topic_id==topic.topic_id){
                    this.setAnalyticsRefreshTopic(this.analyticsRefreshTopic+1)
                    console.log('相同',this.analyticsRefreshTopic);
                }else{
                    if(this.analyticsResetSearch == false);{
                        console.log('判断不为空');
                        console.log('修改时间',(new Date()).getTime())
                        this.setAnalyticsResetSearch(true);
                    }
                    setTimeout(function () {
                        console.log('延迟')
                        console.log('重置search完成')
                        const active = topic;
                        console.log('执行topic刷新')
                        this.setActiveAnalyticsTopic(active);
                        this.setAnalyticsRefreshTopic(0);
                        console.log('不同',this.analyticsRefreshTopic);
                    }.bind(this),50);
                }
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
