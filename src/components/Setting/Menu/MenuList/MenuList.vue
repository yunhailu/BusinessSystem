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
                    <li v-for="topic in group.list" :id="topic.topic_id" @click="editTopicAction(topic,group.group_id);" :class="topic | isActive" >
                        <a href="javascript:void(0);">
                            <i class="fa fa-angle-double-right"></i> {{topic.topic_name}}
                            <i class="fa fa-remove delete" @click.stop.prevent="comfirmDeleteTopic(topic,group.group_id);"></i>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <tips :visible.sync="showDeleteComfirm" :tipsparam.sync="loadingTipParam"></tips>
</template>
<style lang="less" scoped>
    @import "MenuList.less";
</style>
<script type="text/ecmascript-6">
    import _ from "underscore";
    import Local from "../../../../local/local";
    import Tips from "../../../Common/Tips/Tips.vue"
    import * as Api from "../../../../widgets/Api";
    import { topicList, activeSettingTopic } from '../../../../vuex/getters';
    import { setTopicList, setActiveSettingTopic } from "../../../../vuex/actions";

    export default{
        props: ['title', 'menus', 'groups', 'action'],
        data(){
            const common = Local().common;
            return{
                common,
                deleteTopic: {},
                showDeleteComfirm: false,
                loadingTipParam: {
                    type: "confirm",
                    content: common.deleteTip,
                    callback: () => {
                        this.successDelete();
                    },
                    failback: () => { this.deleteTopic = {}; }
                }
            }
        },
        components:{ Tips },
        vuex: {
            actions: { setTopicList, setActiveSettingTopic },
            getters: { topicList, activeSettingTopic }
        },
        methods: {
            toggle(group){

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
                console.log(this.setTopicList(groups));
                //menu.isActive = !menu.isActive;
            },
            addTopicAction(){
                this.$router.go({name: "settingAdd"});
            },
            editTopicAction(item,group_id){


                this.action(item, group_id);
               // console.log(action(item, group_id));

                this.selectTopic(item);
                //console.log(selectTopic(item));
            },


            selectTopic(topic){
                this.setActiveSettingTopic(topic)
            },
            comfirmDeleteTopic(item, group_id){
                console.log('group_id', group_id);
                this.deleteTopic = item;
                this.deleteTopic.group_id = group_id;
                this.showDeleteComfirm = true;
            },
            successDelete(){
                //console.log(this.deleteTopic);
                const _this = this;
                Api.topicDelete({id: _this.deleteTopic.topic_id}).then(resp => {
                    //console.log('topicDelete', resp.data);
                    // resp.data.data.success  1: 成功, 0: 失败
                    if(resp.data.code == 0 && resp.data.data.success){
                        const list = _.map(_this.topicList, item => {
                            const group = _.extend({}, item);
                            if(group.group_id == _this.deleteTopic.group_id){
                                console.log('group',group);
                                group.list = _.filter(group.list, topic => (topic.topic_id != _this.deleteTopic.topic_id));
                            }
                            return group;
                        });
                        _this.setTopicList(list);
                    }
                });
            }
        },
        filters: {
            isActive(topic){
                return _.isEqual(this.activeSettingTopic, topic) ? 'active' : '';
            }
        }
    }
</script>
