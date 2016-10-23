<template>
    <tips :visible.sync="visiable" :tipsparam.sync="addParams">
        <div class="add-panel">
            <ul id="myTab" class="nav nav-tabs">
                <li :class="[isNew ? 'active' : '']" @click="setNewPanel(1);"><a href="javascript:void(0);" >{{words.addTitle}}</a></li>
                <li :class="[isNew ? '' : 'active']" @click="setNewPanel(0);"><a href="javascript:void(0);">{{words.importTitle}}</a></li>
            </ul>
            <div class="add-panel-new" v-if="isNew">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="dashName" class="col-sm-3 control-label">{{words.addLabel}}</label>
                        <div class="col-sm-8">
                            <input type="text" v-model="newName" class="form-control" id="dashName" :placeholder="words.placeholder">
                        </div>
                    </div>
                    <div class="col-sm-offset-3 col-sm-8" v-if="addTip">
                        <label class="tips">{{addTip}}</label>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-8">
                            <button type="submit" class="btn btn-primary" @click="getDashboardAdd">{{words.addBtn}}</button>
                            <button type="submit" class="btn btn-default" @click="close">{{words.cancel}}</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="add-panel-import" v-if="!isNew">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="selectName" class="col-sm-3 control-label">{{words.importLabel}}</label>
                        <div class="col-sm-8 selectEl">
                            <select-el :options="selectOptions" :title="selectTitle" :value.sync="selectValue"></select-el>
                        </div>
                    </div>
                    <div class="col-sm-offset-3 col-sm-8" v-if="importTip">
                        <label class="tip">{{importTip}}</label>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-8">
                            <button type="submit" class="btn btn-primary">{{words.importBtn}}</button>
                            <button type="submit" class="btn btn-default" @click="close">{{words.cancel}}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </tips>
</template>
<style lang="less" scoped>
    @import "addDashboard.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import Tips from '../Common/Tips/Tips.vue';
    import SelectEl from '../Common/Select/Select.vue';
    import Local from '../../local/local';
    import * as Api from '../../widgets/Api';
    import { activeAnalyticsTopic, analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic } from '../../vuex/getters';
    import { setAnalyticsType, setAnalyticsTimeRange, setAnalyticsSource, setAnalyticsSubTopic } from "../../vuex/actions";

    export default{
        props: ['visiable'],
        data(){
            const words = Local().addDashboard;
            return{
                words,
                isNew: true,
                selectOptions: [],  //{key: 'time', value: '按时间排序'}
                selectTitle: "",
                selectValue: 0,
                newName: "",
                addTip: "",
                importTip: "",
                addParams: {
                    type: "dialog",
                    //content: common.deleteTip,
                    callback: () => {
                        console.log(this.deleteTopic);
                        this.visiable = false;
                    },
                    failback: () => { this.visiable = false; }
                }
            }
        },vuex: {
            actions: { setAnalyticsType, setAnalyticsTimeRange, setAnalyticsSource, setAnalyticsSubTopic },
            getters: { activeAnalyticsTopic, analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic }
        },
        methods: {
            setNewPanel(flag){
                this.isNew = flag ? true : false;
                if(flag == 0){ this.getDashboardList(); }
            },
            close(){
                this.visiable = false;
            },
            getDashboardList(){
                Api.getDashboardList({}).then(resp => {
                    console.log('getDashboardList', resp.data);
                    if(resp.data.code == 0){
                        const list = resp.data.data;
                        this.selectOptions = _.map(list, item => ({key: item.id, value: item.name}));
                    }
                });
            },
            getDashboardAdd(){
                const name = this.newName,
                        topic = this.activeAnalyticsTopic.topic_name,
                        topic_id = this.activeAnalyticsTopic.topic_id;
                console.log(this.analyticsType, this.analyticsTimeRange, this.analyticsSource, this.analyticsSubTopic);
                if(!name){
                    this.addTip = this.words.addTips;
                    return;
                }
//                Api.getDashboardAdd({name, topic, topic_id}).then(resp => {
//                    console.log('add', resp.data);
//                    this.newName = "";
//                    this.addTip = "";
//                });
            }
        },
        created(){
            this.getDashboardList();
        },
        components:{
            Tips, SelectEl
        }
    }
</script>
