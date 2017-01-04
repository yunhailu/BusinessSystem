<template>
    <header-component active="reports"></header-component>

    <div class="reports">

    <div class="reports-wrap">
        <menu-component></menu-component>
        <div class="container wid ">
            <div class="reports-wrap-title">
                <div class="title"><i class="fa fa-lightbulb-o"></i> <span>{{name}}</span></div>
                <br> <span class="wornin"> *点击左边 关键词列表 即可添加相应 关键词 的情绪监测 *</span>
            </div>

            <div class="row modifyReports animated zoomIn " v-show="displayModify">
                <div class="pull-right cclose" @click="bgclose();"><i class="fa fa-close fa-lg actionBtn"></i></div>

                    <div class="form-group">
                        <div class="col-sm-12 col-md-12 col-lg-12">
                            <label><h4 class="pull-left" >{{commitText}}监测 (</h4><h4 class="pull-left">{{groupName}} :{{topicName}} )</h4></label>
                        </div>
                    </div>
                    <!--@click="geteachmood(monitor);"-->
                    <div class="form-group " >
                        <label for="moodName" class="col-sm-3 col-md-3 col-lg-3 control-label text-right "> <h5> 监测情绪 :</h5></label>
                        <div class="col-sm-8 col-md-8 col-lg-8 ">
                            <select v-show="butUp" v-model="moodName"  name="moodSelect" class="form-control" id="moodName" >
                                <option  v-for="moodgroup in moodGroups"  :value="moodgroup.id" >{{moodgroup.name}}</option>
                            </select>
                            <input v-show="!butUp" type="text" readonly v-model="moodName" class="form-control" id="moodName" :value="moodName">
                        </div>
                    </div>
                    <div class="form-group ">
                        <label for="logic" class="col-sm-3 col-md-3 col-lg-3 control-label text-right "> <h5> 逻辑操作 :</h5></label>
                        <div class="col-sm-8 col-md-8 col-lg-8 ">
                            <select v-model="logicName"   name="logicSelect" class="form-control " id="logic" >
                                <option  v-for="logic in logics"  :value="logic.key" >{{logic.key}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="thresholdValue" class="col-sm-3 col-md-3 col-lg-3 control-label text-right"> <h5> 监测阈值 :</h5></label>
                        <div class="col-sm-8 col-md-8 col-lg-8">
                            <input type="text" v-model="thresholdValue" class="form-control" id="thresholdValue" placeholder="请输入一个小于100的整数阈值">
                        </div>
                    </div>
<div v-show="worning">

    <span class="wornin" > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * 您输入的阈值有误，请重新输入！！！ <br><br></span>

</div>




                    <div class="form-group" v-show="butUp">
                        <div class="col-sm-12 col-md-12 col-lg-12 ">
                            <button  class="btn btn-primary col-sm-11 col-md-11 col-lg-11" @click="addMonitor(moodName,logicName,thresholdValue)" >{{commitText}}</button>
                        </div>
                    </div>


                    <div class="form-group" v-show="!butUp">
                        <div class="col-sm-12 col-md-12 col-lg-12 ">
                            <button  class="btn btn-primary col-sm-11 col-md-11 col-lg-11" @click="modifyMonitor(logicName,thresholdValue)" >{{commitText}}</button>
                        </div>
                    </div>

            </div>
            <div class="modifyReportsbg" v-show="displayModify" @click="bgclose();" > </div>


            <div class="reports-wrap-table">
                <table class="table table-hover  table-striped">
                    <thead>
                    <tr>
                        <td><i class="fa fa-bullseye"></i> <span>序号</span></td>
                        <td><i class="fa fa-fire"></i> <span>{{words.reportTitle}}</span></td>
                        <td><i class="fa fa-smile-o"></i> {{words.sentiment}}</td>
                        <td><i class="fa fa-bell-o"></i> <span>{{words.trigger}}(%)</span></td>
                        <td><i class="fa fa-exchange"></i> <span>{{words.lastChange}}</span></td>
                        <!--<td><i class="fa fa-tags"></i> {{words.lastSent}}</td>-->
                        <td><i class="fa fa-edit"></i> {{words.actions}}</td>
                    </tr>
                    </thead>
                    <tbody >
                    <tr v-for="(index, report) in reports" :class="[index % 2 == 0 ? '' : '']">
                        <td>{{index+1}}</td>
                        <td>{{report.topic_name}}</td>
                        <td>{{report.monitor | showmood report.monitor }}</td>
                        <td>{{report.predicate}}{{report.threshold}} </td>
                        <td>{{report.date}}</td>
                        <td>
                            <i class="fa fa-edit  actionBtn" @click="editAction(report);"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <i class="fa fa-close actionBtn " @click="removerMonitor(report,index);"></i>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
            <div class="reports-wrap-paging">
                <page></page>
            </div>
        </div>
    </div>
    </div>
    <footer-component></footer-component>
</template>
<style lang="less" scoped>
    @import "Reports.less";
</style>
<script type="text/ecmascript-6">
    import _ from "underscore";
    import Local from "../../local/local";
    import HeaderComponent from '../Header/Header.vue';
    import Page from '../Common/Page/Page.vue';
    import * as Api from '../../widgets/Api';
    import { getCookie } from '../../widgets/Cookie';
    import FooterComponent from '../OrderFooter/OrderFooter.vue';
    import MenuComponent from './Menu/Menu.vue';
    import { setTopicList } from "../../vuex/actions";
    import { topicList } from '../../vuex/getters';

    export default{
        props: [ 'action'],
        data(){
            const words = Local().reportsWarning;
            return{
                words,
                worning:false,
                butUp:'true',
                isAdvanced:'false',
                displayModify:false,
                name: "监测预警",
                commitText:'增加',
                modifyText:'修改',
                addText:'添加',
                topicName:'蔡英文',
                groupName:'人物',
                moodName:'happy',
                logicName:'>',
                thresholdValue:123,
                reports: [],
                allTopic:'',
                mid:'',
                monitor:'qw',
                moodGroups:[
                    { id:'happy', name: 0},
                    { id:'anger', name: 0},
                    { id:'fear', name: 0},
                    { id:'disgust', name: 0},
                    { id:'sorrow', name: 0}
                ],
                logic:'nihao',
                logics:[
                    { key:'>', name: 0},
                    { key:'<', name: 0},
                    { key:'>=', name: 0},
                    { key:'<=', name: 0},
                    { key:'=', name: 0}
                ]
            }
        },
        ready(){

            this.init();
        },
        vuex: {
            actions: { setTopicList },
            getters: { topicList }
        },
        methods: {
//          //
            //mood-function
            getCategroy(){
                Api.getCategroy().then(resp => {
                    //console.log(resp.data);
                    if(resp.data.code == 0){
                        this.moodGroups = resp.data.data;


                    }
                });},

            bgclose(){
                this.worning=false;
                this.displayModify=false;
                this.$router.go({name: 'reports'});
            },
            getDashboardList(){
                Api.getMonitorList().then(resp => {
                    //console.log(resp.data);
                    if(resp.data.code == 0){


                        this.reports=resp.data.data;
                    }});
            },

            removerMonitor(idx,index){

                console.log('idx',idx);
                const sure=window.confirm("您确定要删除第"+(index+1)+"条"+"“"+idx.topic_name+"”的监测记录，该操作不可恢复！！！");
                if(sure){
                    Api.getMonitorDel({
                        id:idx.id
                    }).then(resp => {
                        this.getDashboardList();
                    });
                }
                else{
                    this.getDashboardList();
                }








            },


            modifyMonitor(b,c){
                console.log(b,c);

                if((c%1==0)&&(c<100&&c!=0)){
                    this.worning=false;
                    Api.getMonitorUp({
                        id:this.mid,
                        predicate:b,
                        threshold:c
                    }).then(resp => {
                        this.getDashboardList();
                        this.bgclose();

                    });

                }else {

                    this.worning=true;

                }



            },

            addMonitor(b,c,d,){
                const a = this.$route.params.topic_id;
                if((d%1==0)&&(d<100&&d!=0)){
                    this.worning=false;
                    Api.getMonitorAdd({
                        topic_id: a,
                        monitor: b,
                        predicate: c,
                        threshold: d
                    }).then(resp => {
                        this.getDashboardList();
                        this.bgclose();

                    });

                }

                else { this.worning=true;}

            }
            ,

            editAction(a){
                this.displayModify=true;
                this.butUp=false;
                this.commitText=this.modifyText;
                this.topicName=a.topic_name;  //change name
                this.groupName="";
                this.logicName=a.predicate;
                this.thresholdValue=a.threshold;
                this.mid=a.id;

                switch(a.monitor){
                    case "happy":
                        this.moodName ='满意';
                        break;
                    case "anger":
                        this.moodName ='愤怒';
                        break;
                    case "sorrow":
                        this.moodName ="失望";
                        break;
                    case "disgust":
                        this.moodName ="反感";
                        break;
                    case "fear":
                        this.moodName ="害怕";
                        break;

                    default:
                        this.moodName ='满意';
                        break;
                }


            },

            modifyInit(){
                this.worning=false;
                this.butUp=true;
                if (this.$route.params.group_id!=null && this.$route.params.topic_id!=null){

                        this.displayModify=true;
                        this.commitText=this.addText;
                        this.moodName='happy';
                        this.logicName=">";
                        this.thresholdValue=0;

                    Api.getTopicList().then(resp => {
                        //console.log(resp.data);
                        if(resp.data.code == 0){
                            const allTopics=resp.data.data;
                            const group_id = this.$route.params.group_id;
                            const topic_id = this.$route.params.topic_id;
                            const group = _.chain(allTopics)
                                .map(group => _.extend({}, group))
                                .filter(group => (group.group_id == group_id))
                                .first().value();
                            const topics = _.chain(group.list)
                                .filter(topics => (topics.topic_id == topic_id))
                                .first().value();

                            this.topicName=topics.topic_name;  //change name
                            this.groupName=group.group_name;  //change name


                        }});

// switch add or modify words

                }else{

                    //this.$router.go({name: 'reports'});
                    console.log('ww','nihao');



                }

            },

            init(){

                this.getCategroy();
                this.modifyInit();
                this.getDashboardList();

            }
        },
        filters: {
            showmood(str){

                switch(str){
                    case "happy":
                        return '满意';
                        break;
                    case "anger":
                        return'愤怒';
                        break;
                    case "sorrow":
                        return"失望";
                        break;
                    case "disgust":
                        return "反感";
                        break;
                    case "fear":
                        return "害怕";
                        break;
                    default:
                        return'满意';
                        break;
                }

            }
        },
        components:{ HeaderComponent, Page,FooterComponent,'menu-component': MenuComponent, },
        route: {
            data(){

                this.modifyInit();
            }
        }
    }
</script>
