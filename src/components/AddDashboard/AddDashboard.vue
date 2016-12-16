<template>
    <tips :visible.sync="visiable" :tipsparam.sync="addParams">
        <div class="add-panel">
            <ul id="myTab" class="nav nav-tabs">
                <li :class="[isNew ? 'active' : '']" @click="setNewPanel(1);"><a href="javascript:void(0);" >{{words.addTitle}}</a></li>
                <li :class="[isNew ? '' : 'active']" @click="setNewPanel(0);"><a href="javascript:void(0);">{{words.importTitle}}</a></li>
            </ul>
            <div class="add-panel-new" v-if="isNew">
                <form class="form-horizontal" role="form" v-on:submit.prevent>
                    <div class="form-group">
                        <label for="dashName" class="col-sm-3 control-label">{{words.addLabel}}</label>
                        <div class="col-sm-8">
                            <input v-el="input" @keydown.37.stop @keydown.39.stop @keyup.37.stop @keyup.39.stop type="text" v-model="newName" class="form-control" id="dashName" :placeholder="words.placeholder">
                        </div>
                    </div>
                    <div class="col-sm-offset-3 col-sm-8" v-if="addTip">
                        <label class="tips">{{addTip}}</label>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-8">
                            <button type="button" class="btn btn-primary" @click="addDashboard" v-if="isanalytics">{{words.addBtn}}</button>
                            <button type="button" class="btn btn-primary" @click="addCompareDashboard" v-if="iscompare">{{words.addBtn}}</button>
                            <button type="button" class="btn btn-default" @click="close" >{{words.cancel}}</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="add-panel-import" v-if="!isNew">
                <form class="form-horizontal" role="form" v-on:submit.prevent>
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
                            <button type="button" class="btn btn-primary" @click="importDashborad" v-if="isanalytics">{{words.importBtn}}</button>
                            <button type="button" class="btn btn-primary" @click="importCompareDashborad" v-if="iscompare">{{words.importBtn}}</button>
                            <button type="button" class="btn btn-default" @click="close">{{words.cancel}}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </tips>
</template>
<style lang="less" scoped>
    @import "AddDashboard.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import Tips from '../Common/Tips/Tips.vue';
    import SelectEl from '../Common/Select/Select.vue';
    import Local from '../../local/local';
    import * as Api from '../../widgets/Api';
    import {compareTimeRange, compareSource, compareSubTopic, activeCompareTopic, activeAnalyticsTopic, analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic } from '../../vuex/getters';
    import { setAnalyticsType, setAnalyticsTimeRange, setAnalyticsSource, setAnalyticsSubTopic } from "../../vuex/actions";


    export default{
        props: ['visiable','isanalytics','iscompare'],
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
                        this.isanalytics = false;
                        this.iscompare = false;
                    },
                    failback: () => {
                        this.visiable = false;
                        this.isanalytics = false;
                        this.iscompare = false;
                    }
                }
            }
        },vuex: {
            actions: { setAnalyticsType, setAnalyticsTimeRange, setAnalyticsSource, setAnalyticsSubTopic },
            getters: {compareTimeRange, compareSource, compareSubTopic, activeCompareTopic, activeAnalyticsTopic, analyticsType, analyticsTimeRange, analyticsSource, analyticsSubTopic }
        },
        methods: {
            setNewPanel(flag){
                this.isNew = flag ? true : false;
                if(flag == 0){ this.getDashboardList(); }
            },
            close(){
                this.visiable = false;
                this.isanalytics = false;
                this.iscompare = false;
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
            addCompareDashboard(){
                const name = this.newName,
                        topic_ids=(_.map(this.activeCompareTopic,item=>{
                            return item.topic_id
                        })).join(','),
                        subtopic = this.compareSubTopic,
                        source = this.compareSource,
                        time_interval = this.compareTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0;
                if(!name){
                    this.addTip = this.words.addTips;
                    return;
                }
                let params={name, topic_ids, subtopic, source, time_interval, time_dimension};
                console.log('compareparams',params);
                Api.addDashboard(params).then(resp => {
                    console.log('add', resp.data);
                    this.close();
                    this.newName = "";
                    this.addTip = "";
                });
            },
            addDashboard(){
                const name = this.newName,
                            topic = this.activeAnalyticsTopic.topic_name,
                            topic_id = this.activeAnalyticsTopic.topic_id,
                            subtopic = this.analyticsSubTopic,
                            source = this.analyticsSource,
                            time_interval = this.analyticsTimeRange,
                            time_dimension = time_interval > 7 ? 1 : 0,
                            type='browser';
                console.log(this.analyticsType, this.analyticsTimeRange, this.analyticsSource, this.analyticsSubTopic);
                if(!name){
                    this.addTip = this.words.addTips;
                    return;
                }
                let params = {type, name, topic, topic_id, subtopic, source, time_interval, time_dimension};
                params[this.analyticsType] = 1;

                Api.addDashboard(params).then(resp => {
                    console.log('add', resp.data);
                    this.close();
                    this.newName = "";
                    this.addTip = "";
                });
            },
            importCompareDashborad(){
                const name = this.newName,
                        id = this.selectValue.key,
                        topic_ids=(_.map(this.activeCompareTopic,item=>{
                            return item.topic_id
                        })).join(','),
                        subtopic = this.compareSubTopic,
                        source = this.compareSource,
                        time_interval = this.compareTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0;
                let params={id,name, topic_ids, subtopic, source, time_interval, time_dimension};
                console.log('compareparams',params);
                Api.updateDashboard(params).then(resp => {
                    console.log(resp.data);
                    if(resp.data.code == 0 && resp.data.data.data == 1){
                        this.close();
                    } else {
                        this.importTip = this.words.importTip;
                    }
                });
            },
            importDashborad(){
                console.log(123, this.selectValue);
                const id = this.selectValue.key,
                            topic = this.activeAnalyticsTopic.topic_name,
                            topic_id = this.activeAnalyticsTopic.topic_id,
                            subtopic = this.analyticsSubTopic,
                            source = this.analyticsSource,
                            time_interval = this.analyticsTimeRange,
                        time_dimension = time_interval > 7 ? 1 : 0,
                        type='browser';
                let params = {type,id, topic, topic_id, subtopic, source, time_interval, time_dimension};
                params[this.analyticsType] = 1;
                Api.updateDashboard(params).then(resp => {
                    console.log(resp.data);
                    if(resp.data.code == 0 && resp.data.data.data == 1){
                        this.close();
                    } else {
                        this.importTip = this.words.importTip;
                    }
                });
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
