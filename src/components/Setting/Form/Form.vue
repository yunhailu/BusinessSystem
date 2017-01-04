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
                                <input type="text" v-model="topicText" class="form-control" id="topicText" :placeholder="words.topicInfo">
                            </div>
                            <div class="col-sm-4 tip color-red">{{words.required}}</div>
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
                        <div class="form-group">

                            <label for="excludeText" class="col-sm-2 control-label">{{words.exclude}}</label>
                            <div class="col-sm-4">
                                <input type="text" v-model="excludeText" class="form-control" id="excludeText" :placeholder="words.exclude">
                            </div>
                            <div class="col-sm-4 tip">{{words.optional}}</div>
                        </div>
                        <div class="form-group" v-show="false">
                            <label for="monitor" class="col-sm-2 control-label">{{words.warningSet}}</label>
                            <div class="col-sm-4">
                            <select v-model="monitor" @click="geteachmood(monitor);"  name="moodSelect" class="form-control moodwSet0" id="monitor" >
                                <option  v-for="moodgroup in moodGroups" :id="moodgroup.id" :value="moodgroup.id" >{{moodgroup.name}}</option>
                            </select>

                                <input v-model="threshold" type="number" class="form-control moodwSet1 " id="threshold" :placeholder=""><span class="percent">(%)</span>


                                <!--<input type="text"  v-model="threshold" class="form-control moodwSet1 "  :placeholder="words.warningValue">-->
                            </div>
                            <div class="col-sm-4 tip">{{words.optional}}</div>
                        </div>

                        <div class="form-group" v-show="errorTip">
                            <div class="col-sm-offset-3 col-sm-10">
                                <div class="error">* {{errorTip}}</div>
                            </div>
                        </div>
                        <div class="form-group" v-show="successTip">
                            <div class="col-sm-offset-3 col-sm-10">
                                <div class="success">{{successTip}}</div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-10">
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
    import { setTopicList,setActiveSummaryTopic } from "../../../vuex/actions";
    import { topicList } from '../../../vuex/getters';
    import { WhiteNameList } from "../../../config/config";
    import Cookie from "js-cookie";
    import { getCookie } from '../../../widgets/Cookie';
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
                threshold:0,
                monitor:"",
                related: "",
                topicText: "",
                excludeText: "",
                errorTip: "",
                successTip: "",
                moodVaule:[
                  { key:'happy', value: 0},
		          { key:'anger', value: 0},
		          { key:'fear', value: 0},
		          { key:'disgust', value: 0},
		          { key:'sorrow', value: 0} 
                ], 
                moodGroups: [],
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
            actions: { setTopicList,setActiveSummaryTopic },
            getters: { topicList }
        },
        methods: {
            trim(str){
                return str.replace(/(^\s*)|(\s*$)/g,'');
            },
            dealSymbol(str){
                return str.replace(/，/ig,',');
            },
            getCategroy(){
                Api.getCategroy().then(resp => {
                    //console.log(resp.data);
                    if(resp.data.code == 0){
                        this.moodGroups = resp.data.data;
                        const newD= _.map(resp.data.data, (item)=> {
                            item.value=110;
                            return item;
                        });
                        this.moodGroups=newD;
                        this.monitor="happy";


                    }
                });

            },
            
            
            geteachmood(mood){
            	
            	for(var i=0; i<this.moodVaule.length; i++)
                {
                   if(this.moodVaule[i].key==mood){
                    this.threshold=this.moodVaule[i].value;
                    				return ;}                    				                    
                    		};
            },
            
            setAdvanced(isAdvanced){
                this.isAdvanced = isAdvanced;
            },
            create(){
                this.errorTip = false;
                this.successTip = false;
                if(parseInt(this.threshold)<0 || parseInt(this.threshold)>100){
                    this.errorTip = true;
                    this.errorTip='只能输入0-100的整数';
                    return false;
                }
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

                if(!this.topicText || (this.threshold!=0&&this.threshold%1!=0)){
                    this.successTip = "";
                    this.errorTip = "请选择正确的阈值(整数)分组和填写新主题";
                    this.successTip = "";
                    return ;
                };
                this.topicUp().then( resp => {
                    if(resp.data.code == 0){
                        this.successTip = "修改成功！";
                        this.errorTip = "";
                        //this.radioVal = "";
                        this.topicText = "";
                        this.excludeText="";
                        return Api.getTopicList({});
                    }
                }).then(resp => {
                    if(resp.data.code == 0){
                        let topicList = resp.data.data;
                        _.each(topicList, group => {
                            if(group.group_id == this.radioVal){
                                group.isActive = true;
                            }
                        });
                        this.setTopicList(topicList);
                        this.radioVal = "";
                        this.threshold="";
                    }
                });
            },
            createSubmit(){

                //console.log(this.isAdvanced, this.radioVal, this.topicArr, this.related, this.topicText, this.excludeText);
                if(!this.radioVal || !this.topicText || (this.threshold!=0&&this.threshold%1!=0)){
                    this.errorTip = "请填写必填选项和话题分组";
                    this.successTip = "";
                    return ;
                };
                let regx = new RegExp('demo((2[6-9])|([3-9][0-9]))','g');
                const user = getCookie('business_name');
                if(regx.test(user)){
                    if(_.indexOf(WhiteNameList,this.trim(this.topicText)) != -1){
                        this.errorTip = "您没有权限查看该主题";
                        return ;
                    }else{
                        console.log('没找到')
                    }
                }
                const newTopicName= this.dealSymbol(this.trim(this.topicText));
                //console.log(this.threshold);
                this.topicAdd().then( resp => {
                    if(resp.data.code == 0){
                        this.successTip = "添加成功！";
                        this.errorTip = "";
                        //this.radioVal = "";
                        this.topicText = "";
                        this.excludeText="";

                    console.log(newTopicName);
                        return Api.getTopicList({})
                    }
                }).then(resp => {
                    console.log('topic list',resp);
                    console.log('topicList',this.topicList);
                    if(resp.data.code == 0){
                        let topicList = resp.data.data;
                        _.each(topicList, group => {
                            if(group.group_id == this.radioVal){
                                group.isActive = true;
                            };
                        });
                        let newObj=null;
                        _.each(topicList,group=>{
                            if(_.find(group.list,list=>{return list.topic_name==newTopicName})){
                                newObj = _.find(group.list,list=>{return list.topic_name==newTopicName})
                                return;
                            }
                            })
                        this.setTopicList(topicList);
                        this.radioVal = "";
                        this.threshold="";
                        this.setActiveSummaryTopic(newObj);
                        const name='summarylist';
                        this.$router.go({name});
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
                    name: this.dealSymbol(this.trim(this.topicText)),
                    monitor:this.monitor,
                    threshold:this.threshold,
                    except:this.excludeText
                });
            },
            topicUp(){
                return Api.topicUp({
                    id:this.$route.params.topic_id,
                    group_id:this.radioVal,
                    name: this.dealSymbol(this.trim(this.topicText)),
                    monitor:this.monitor,
                    threshold:this.threshold,
                    except:this.excludeText
                });
            },
            updateInit(){
                const group_id = this.$route.params.group_id;
                const topic_id = this.$route.params.topic_id;
                //const monitor = "anger";
                const monitorss =[];
                const threshold = 100;
                const group = _.chain(this.topicList)
                        .map(group => _.extend({}, group))
                        .filter(group => (group.group_id == group_id))
                        .first().value();
                const topic = _.chain(group.list)
                        .filter(topic => (topic.topic_id == topic_id))
                        .first().value();
                console.log('group.list:',group.list);
                this.topicText = topic.topic_name;
                this.excludeText=topic.except;

                 this.radioVal = group_id;

            },


            init(){

                //拉取情绪的列表。。
                this.getCategroy();

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
