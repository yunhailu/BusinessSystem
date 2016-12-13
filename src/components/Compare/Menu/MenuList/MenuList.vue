<template>
    <div class="menu-list">
        <div class="title">
            <i class="fa fa-laptop"></i>
            <span>{{title}}</span>
            <div>
                <i class="fa fa-question-circle-o" aria-hidden="true"></i>
                <div class="tips">
                    <!--<i class="fa fa-times" aria-hidden="true"></i>-->
                    <p>关键词可多选</p>
                </div>
            </div>
            <i class="fa fa-plus plus" @click="addTopicAction"></i>

        </div>
        <ul class="sidebar-menu">
            <li v-for="group in groups" :class="[group.list.length ? 'treeview' : '', group.isActive ? 'active' : '']">
                <a href="javascript:void(0);" @click="toggle(group,$index);" v-show="group.list.length">
                    <i class="fa" :class="group.icon || 'fa-bar-chart' "></i> <span>{{group.group_name}}</span>
                    <i class="fa pull-right" :class="[group.isActive ? 'fa-angle-down' : 'fa-angle-left']"></i>
                </a>
                <ul class="treeview-menu" v-show="group.isActive" transition="expand">
                    <li v-for="topic in group.list" :id="topic.topic_id"  @click="change(topic)" :class="topic | isActive" >
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
    import { topicList, activeCompareTopic, topicGroupActiveId} from '../../../../vuex/getters';
    import { setTopicList, setActiveCompareTopic, setTopicGroupActiveId} from "../../../../vuex/actions";
console.log('aaa');
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
            actions: { setTopicList, setActiveCompareTopic ,setTopicGroupActiveId},
            getters: { topicList, activeCompareTopic ,topicGroupActiveId}
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
                //获取当前list对象
                this.setTopicList(groups);
                this.setTopicGroupActiveId(group.group_id)
            },
            change(topic){
                let src =_.map(this.activeCompareTopic,item=>item);
                let activeGroupId = this.topicGroupActiveId;
                //判断id的list是否有
                let groupActive = _.find(this.groups,item =>item.group_id ==activeGroupId);
                const active = topic;
                if(src.length != 0 && _.find(groupActive.list,item =>item.topic_id ==_.first(src).topic_id) != undefined){
                    if(src.findIndex(value => value==topic)!=-1){
                            src.splice(src.indexOf(topic),1);
                            this.setActiveCompareTopic(src);
                            return ;
                    } else {
                              src.push(active);
                            this.setActiveCompareTopic(src);
                    }
                } else {
                    src = [];
                    src.push(topic);
                    this.setActiveCompareTopic(src);
                }
            },
            addTopicAction(){
                this.$router.go({name: "settingAdd"});
            }
        },
        filters: {
            isActive(topic){
                return _.map(this.activeCompareTopic,item=>item).findIndex(value => value==topic)!=-1 ? 'active' : '';                                                                               //return this.activeArray[topic].topic_id===topic.id ? 'active' : '';
            }
        }
    }
</script>
