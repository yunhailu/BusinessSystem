<template>
    <div class="setting-add">
        <!--<div class="setting-add-title">{{words.addTitle}}</div>-->
        <div class="setting-add-container">
            <div class="setting-add-container-dec">
                <h4>{{title}}</h4>
                <span>{{words.addDec | composite total remainder}}</span>
            </div>

            <div class="setting-add-container-mode">
                <div class="btn-group">
                    <a class="btn btn-default" :class="[!isAdvanced ? 'btn-primary ' : '']" href="javascript:void(0);" @click="setAdvanced(false);">
                        <i class="fa fa-plane" title="Align Left"></i> {{words.quickBtn}}
                    </a>
                    <!--<a class="btn btn-default" :class="[isAdvanced ? 'btn-primary ' : '']" href="javascript:void(0);" @click="setAdvanced(true);">-->
                        <!--<i class="fa fa-key" title="Align Center"></i> {{words.advancedBtn}}-->
                    <!--</a>-->
                </div>
            </div>

            <div class="setting-add-container-con">
                <form class="form-horizontal">
                    <fieldset>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">{{words.groupTitle}}</label>
                            <div class="radio-inline" v-for="group in groups">
                                <label>
                                    <input type="radio" name="optionsRadios" id="group.id" :value="group.id" v-model="radioVal">{{group.name}}
                                </label>
                            </div>
                        </div>
                        <div class="form-group" v-show="!isAdvanced">
                            <label for="topicText" class="col-sm-2 control-label">{{words.topic}}</label>
                            <div class="col-sm-4">
                                <input type="text" v-model="topicText" class="form-control" id="topicText" :placeholder="words.topic">
                            </div>
                            <div class="col-sm-4 tip">{{words.required}}</div>
                        </div>
                        <div class="form-group" v-show="isAdvanced">
                            <label for="topicArr" class="col-sm-2 control-label">{{words.topicArr}}</label>
                            <div class="col-sm-4">
                                <input type="text" v-model="topicArr" class="form-control" id="topicArr" :placeholder="words.topicArr">
                            </div>
                            <div class="col-sm-4 tip">{{words.topicArrTip}} ( {{words.required}} )</div>
                        </div>
                        <div class="form-group" v-show="isAdvanced">
                            <label for="related" class="col-sm-2 control-label">{{words.related}}</label>
                            <div class="col-sm-4">
                                <input type="text" v-model="related" class="form-control" id="related" :placeholder="words.related">
                            </div>
                            <div class="col-sm-4 tip">{{words.optional}}</div>
                        </div>
                        <!--<div class="form-group">-->
                            <!--<label for="excludeText" class="col-sm-2 control-label">{{words.exclude}}</label>-->
                            <!--<div class="col-sm-4">-->
                                <!--<input type="text" v-model="excludeText" class="form-control" id="excludeText" :placeholder="words.exclude">-->
                            <!--</div>-->
                            <!--<div class="col-sm-4 tip">{{words.optional}}</div>-->
                        <!--</div>-->
                        <div class="form-group">
                            <label for="excludeText" class="col-sm-2 control-label">{{words.exclude}}</label>
                            <div class="col-sm-4">
                                <input type="text" v-model="excludeText" class="form-control" id="excludeText" :placeholder="words.exclude">
                            </div>
                            <div class="col-sm-4 tip">{{words.optional}}</div>
                        </div>
                        <div class="form-group" v-show="errorTip">
                            <div class="col-sm-offset-2 col-sm-10">
                                <div class="error">* {{errorTip}}</div>
                            </div>
                        </div>
                        <div class="form-group" v-show="successTip">
                            <div class="col-sm-offset-2 col-sm-10">
                                <div class="success">{{successTip}}</div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="submit" class="btn btn-primary" @click.stop.prevent="create" >{{words.create}}</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "Form.less";
</style>
<script type="text/ecmascript-6">
    import _ from "underscore";
    import Local from "../../../local/local";
    import * as Api from "../../../widgets/Api";
    import { setTopicList } from "../../../vuex/actions";
    import { topicList } from '../../../vuex/getters';

    export default{
        data(){
            const words = Local().setting;
            return{
                words,
                title: "",
                isAdvanced: false,
                total: 0,
                remainder: 0,
                radioVal: "",
                topicArr: "",
                related: "",
                topicText: "",
                excludeText: "",
                errorTip: "",
                successTip: "",
                groups: [{
                    id: 1, value: 1, name: words.groups[0]
                }, {
                    id: 2, value: 2, name: words.groups[1]
                }, {
                    id: 3, value: 3, name: words.groups[2]
                }, {
                    id: 4, value: 4, name: words.groups[3]
                }, {
                    id: 5, value: 5, name: words.groups[4]
                }, {
                    id: 6, value: 6, name: words.groups[5]
                }]
            }
        },
        vuex: {
            actions: { setTopicList },
            getters: { topicList }
        },
        methods: {
            setAdvanced(isAdvanced){
                this.isAdvanced = isAdvanced;
            },
            create(){
                switch(this.$route.name){
                    case "settingAdd":
                        this.createSubmit();
                        break;
                    case "settingEdit":
                        this.updateSubmit();
                        break;
                    default:
                        break;
                }
            },
            updateSubmit(){
                console.log('update submit', this.topicText, this.radioVal, this.$route.params.topic_id);
//                this.topicText = topic.topic_name;
//                this.radioVal = topic.topic_id
            },
            createSubmit(){
                //console.log(this.isAdvanced, this.radioVal, this.topicArr, this.related, this.topicText, this.excludeText);
                if(!this.radioVal || !this.topicText){
                    this.successTip = "";
                    this.errorTip = "请选择正确的分组和填写新主题";
                    return ;
                }
                this.topicAdd().then( resp => {
                    //console.log('topicAdd', resp);
                    if(resp.data.code == 0){
                        this.successTip = "添加成功！";
                        this.errorTip = "";
                        //this.radioVal = "";
                        this.topicText = "";

                        return Api.getTopicList({});
                    }
                }).then(resp => {
                    console.log('topic list',resp);
                    console.log('topicList',this.topicList);
                    if(resp.data.code == 0){
                        let topicList = resp.data.data;
                        _.each(topicList, group => {
                            if(group.group_id == this.radioVal){
                                group.isActive = true;
                            }
                        });
                        this.setTopicList(topicList);
                        this.radioVal = "";
                    }
                });
                //history.go(-1);
            },
//            getTopicList(){
//                return Api.getTopicList();
//            },
            getGroupList(){
                return Api.getGroupList();
            },
            topicAdd(){
                return Api.topicAdd({
                    group_id: this.radioVal,
                    name: this.topicText
                });
            },
            updateInit(){
                const group_id = this.$route.params.group_id;
                const topic_id = this.$route.params.topic_id;
                const group = _.chain(this.topicList)
                        .map(group => _.extend({}, group))
                        .filter(group => (group.group_id == group_id))
                        .first().value();
                const topic = _.chain(group.list)
                        .filter(topic => (topic.topic_id == topic_id))
                        .first().value();
                this.topicText = topic.topic_name;
                this.radioVal = group_id;
                //console.log('topic', this.topicText, this.radioVal);
            },
            init(){
                // 拉取 group 列表
                this.getGroupList().then(resp => {
                    //console.log("group list", resp);
                    if(resp.data.code == 0){
                        this.groups = _.map(resp.data.data.group_list, item => {
                            return {id: item.id, name: this.words.groups[item.id - 1]};
                        });
                    }
                });
                if(this.$route.name == 'settingEdit'){
                    setTimeout(this.updateInit ,1000)
                }

            }
        },
        filters: {
            composite(str, ...rest){
                return _.reduce(rest, (memo, value) => {
                    return memo.replace(/\{\d\}/i, value);
                }, str);
            }
        },
        route: {
            data(){
                this.init();
                switch(this.$route.name){
                    case "settingAdd":
                        this.title = this.words.addDecH;
                        break;
                    case "settingEdit":
                        this.title = this.words.editDecH;
                        break;
                    default:
                        break;
                }
            }
        }
    }
</script>
