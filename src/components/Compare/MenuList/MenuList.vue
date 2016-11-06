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
    import { topicList, activeCompareTopic } from '../../../../vuex/getters';
    import { setTopicList, setActiveCompareTopic } from "../../../../vuex/actions";
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
            actions: { setTopicList, setActiveCompareTopic },
            getters: { topicList, activeCompareTopic }
        },
        methods: {
            toggle(group){
                const groups = _.map(this.groups, item => {
                    if(group.group_id != item.group_id){
                        item.isActive = false;
                        this.setActiveCompareTopic(null);
                        this.initActiveTopic(group);
                    } else {
                        item.isActive = !item.isActive;
                    }
                    return item;
                });
                console.log('groups2',groups);
                this.setTopicList(groups);
                console.log(_.map(this.activeCompareTopic,item=>item));
                //this.initActiveTopic();
            },

            change(topic){
                let src =_.map(this.activeCompareTopic,item=>item);
                console.log('点击前的',src);//[]
                const active = topic;
                console.log('点击的id',topic.topic_id);
                console.log(src.findIndex(value => value==topic.topic_id));//undefined
                if(src.findIndex(value => value==topic.topic_id)!=-1){
                console.log('del');
                    src.splice(src.indexOf(active.topic_id),1);
                console.log('删除后的',src);
                    this.setActiveCompareTopic(src);
                    return ;
                }else {
                 console.log('add');
                      src.push(active.topic_id);
                console.log('添加后的',src);
                    this.setActiveCompareTopic(src);
                }

            },

            initActiveTopic(group){
            console.log(group);
            console.log('topicList2',this.topicList);
                let active =_.map(this.activeCompareTopic,item=>item);
                console.log('aaa',active);//[]
                if(active.length =='0'){
                console.log('is into if');
                    //const active = _.first(group.list);
                    console.log('group',group);
                    active.push((_.first(group.list)).topic_id);
                    console.log('after init',active);
                    this.setActiveCompareTopic(active);
                    console.log(this.activeCompareTopic);
                }
            },
            addTopicAction(){
                this.$router.go({name: "settingAdd"});
            }
        },
        filters: {
            isActive(topic){
                //return _.isEqual(this.activeCompareTopic, topic) ? 'active' : '';
                return _.map(this.activeCompareTopic,item=>item).findIndex(value => value==topic.topic_id)!=-1 ? 'active' : '';                                                                               //return this.activeArray[topic].topic_id===topic.id ? 'active' : '';
            }
        }
    }
</script>
