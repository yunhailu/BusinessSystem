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
                    <li v-for="topic in group.list" :id="topic.topic_id" @click="editTopicAction(topic);">
                        <a href="javascript:void(0);">
                            <i class="fa fa-angle-double-right"></i> {{topic.topic_name}}
                            <i class="fa fa-remove delete" @click.stop.prevent="deleteTopicAction(topic,group.group_id);"></i>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
        <!--<ul class="sidebar-menu">-->
            <!--<li v-for="menu in menus" :class="[menu.children.length ? 'treeview' : '', menu.isActive ? 'active' : '']">-->
                <!--<a :href="menu.children.length ? 'javascript:void(0);' : '#!/main/'+menu.router" @click="toggle(menu);">-->
                    <!--<i class="fa" :class="menu.icon || 'fa-bar-chart' "></i> <span>{{menu.name}}</span>-->
                    <!--<i class="fa pull-right" :class="[menu.isActive ? 'fa-angle-down' : 'fa-angle-left']" v-if="menu.children.length"></i>-->
                <!--</a>-->
                <!--<ul class="treeview-menu" v-if="menu.children.length" v-show="menu.isActive" transition="expand">-->
                    <!--<li v-for="item in menu.children">-->
                        <!--<a v-link="{name: menu.router, params:{item: item.router}}">-->
                            <!--<i class="fa fa-angle-double-right"></i> {{item.name}}-->
                            <!--<i class="fa fa-remove delete" @click.stop.prevent="deleteTopicAction(item);"></i>-->
                        <!--</a>-->
                    <!--</li>-->
                <!--</ul>-->
            <!--</li>-->
        <!--</ul>-->
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

    export default{
        props: ['title', 'menus', 'groups'],
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
                        console.log(this.deleteTopic);
                        Api.topicDelete({id: this.deleteTopic.topic_id}).then(resp => {
                            console.log('topicDelete', resp);
                            // resp.data.data.success  1: 成功, 0: 失败
                            if(resp.data.code == 0 && resp.data.data.success){
//                                const _this = this;
//                                this.groups = _.map(this.groups, group => {
//                                    if(_this.deleteTopic.group_id == group.group_id){
//                                        return _.filter(group.list, topic => {
//                                            console.log('72',topic.topic_id, _this.deleteTopic.topic_id);
//                                            return topic.topic_id != _this.deleteTopic.topic_id;
//                                        });
//                                    } else {
//                                        return group;
//                                    }
//                                });
                                /*
                                * TODO: 删除不刷新左侧列表的问题
                                * */
//                                Api.getTopicList().then(resp => {
//                                    if(resp.data.code){
//                                        this.groups = resp.data.data;
//                                    }
//                                });
                            }
                        });
                    },
                    failback: () => { this.deleteTopic = {}; }
                }
            }
        },
        components:{ Tips },
        methods: {
            toggle(group){
                console.log(group);
                _.each(this.groups, item => {
                    if(group.group_id != item.group_id){
                        item.isActive = false;
                    } else {
                        item.isActive = !item.isActive;
                    }
                });
                //menu.isActive = !menu.isActive;
            },
            addTopicAction(){
                this.$router.go({name: "settingAdd"});
            },
            editTopicAction(item){
                console.log('edit', item);
            },
            deleteTopicAction(item, group_id){
                console.log('group_id', group_id);
                this.deleteTopic = item;
                this.deleteTopic.group_id = group_id;
                this.showDeleteComfirm = true;
            }
        }
    }
</script>
