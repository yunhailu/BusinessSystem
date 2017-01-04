<template>
    <header-component></header-component>
    <div class="container">
        <div class="profile">
            <div class="refresh" v-if="isMine == 'isAgreeMsg'"><i @click="getCheckList" class="fa fa-refresh fa-2x" aria-hidden="true"></i></div>
            <ul id="myTab" class="nav nav-tabs">
                <li :class="[isMine == 'isMain' ? 'active' : '']" @click="setMine('isMain');"><a href="javascript:void(0);" >{{words.mineTitle}}</a></li>
                <li v-if="isAdmin" :class="[isMine == 'isUserMsg' ? 'active' : '']" @click="setMine('isUserMsg');"><a href="javascript:void(0);">{{words.userMsg}}</a></li>
                <li v-if="isAdmin" :class="[isMine == 'isAgreeMsg' ? 'active' : '']" @click="setMine('isAgreeMsg');"><a href="javascript:void(0);">{{words.agreeApply}}</a></li>
            </ul>
            <div class="profile-add" v-if="isMine == 'isMain'">
                <ul class="mineMsgNodify">
                        <li @click = "showMine('showMsg')" :class="[profile =='showMsg' ? 'active': '']"><a
                                href="#">个人信息</a></li>
                        <li @click = "showMine('notifyPsd')" :class="[profile =='notifyPsd' ? 'active': '']"><a
                                href="#">修改密码</a></li>
                        <li @click = "showMine('notifyOth')" :class="[profile =='notifyOth' ? 'active': '']"><a
                                href="#">修改其他信息</a></li>
                    </ul>
                <div class="containerBox">
                    <div v-if="profile == 'notifyOth'" id="uploadBtnWrap" class="profile-add-avatar">
                        <div class="profile-add-avatar-wrap">
                            <img :src="user_avatar" class="profile-add-avatar-wrap-image" />
                        </div>
                        <div class="profile-add-avatar-btn">
                            <div type="button" id="uploadBtn" class="btn btn-default" >{{file.btn}}</div>
                            <div class="profile-add-avatar-btn-success tip" v-show="file.isSuccess">
                                <i class="fa fa-check"></i><span> {{file.success}}</span>
                            </div>
                            <div class="profile-add-avatar-btn-error tip" v-show="file.isFailed">
                                <i class="fa fa-warning"></i><span> {{file.failed}}</span>
                            </div>
                            <!--<input type="file" id="uploadBtn1"  />-->
                        </div>
                        <div class="profile-add-avatar-right">
                            <div class="profile-add-avatar-right-item">{{file.name}}</div>
                            <div class="profile-add-avatar-right-item">{{file.size | formatSize}}</div>
                        </div>
                    </div>
                    <div v-if="profile == 'showMsg'" class="profile-add-avatar">
                        <div class="profile-add-avatar-wrap noBorder">
                            <img :src="userInfo.avatar" class="profile-add-avatar-wrap-image" />
                        </div>
                    </div>
                    <form v-if="profile =='showMsg'"  class="form-horizontal mineMsg" role="form">
                        <div class="form-group">
                            <label for="currentPassword" class="col-sm-3 control-label">用户名:</label>
                            <div class="col-sm-5">
                               {{userInfo.username}}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="currentPassword" class="col-sm-3 control-label">公司:</label>
                            <div class="col-sm-5">
                                {{userInfo.company}}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="currentPassword" class="col-sm-3 control-label">邮箱:</label>
                            <div class="col-sm-5">
                                {{userInfo.email}}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="currentPassword" class="col-sm-3 control-label">手机号:</label>
                            <div class="col-sm-5">
                                {{userInfo.phone}}
                            </div>
                        </div>
                    </form>
                    <form v-if="profile =='notifyPsd'" class="form-horizontal" role="form" v-on:submit.prevent.stop="modifyPsdSubmit();">
                        <div class="form-group">
                            <label for="currentPassword" class="col-sm-3 control-label">当前密码</label>
                            <div class="col-sm-5">
                                <input type="password" v-model="mine.current_password" class="form-control" id="currentPassword" placeholder="当前密码">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="addPassword2" class="col-sm-3 control-label">{{words.password}}</label>
                            <div class="col-sm-5">
                                <input type="password" v-model="mine.password" class="form-control" id="addPassword2" :placeholder="words.password">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="AddRePassword2" class="col-sm-3 control-label">{{words.rePassword}}</label>
                            <div class="col-sm-5">
                                <input type="password" v-model="mine.rePassword" class="form-control" id="AddRePassword2" :placeholder="words.rePassword">
                            </div>
                        </div>
                        <div class="col-sm-offset-3 col-sm-8" v-if="addTip">
                            <label class="tips">{{tip}}</label>
                        </div>
                        <div class="col-sm-offset-3 col-sm-8" v-if="addSuccessTip">
                            <label class="successTips">{{successTip}}</label>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-8">
                                <button type="submit" class="btn btn-primary">{{words.modifyBtn}}</button>
                                <button type="button" class="btn btn-default" @click="resetMine();">{{words.resetBtn}}</button>
                            </div>
                        </div>
                    </form>
                    <form v-if="profile == 'notifyOth'" class="form-horizontal" role="form" v-on:submit.prevent.stop="modifySubmit();">
                        <div class="form-group">
                            <label for="newUserName" class="col-sm-3 control-label">{{words.userName}}</label>
                            <div class="col-sm-5">
                                <input type="text" :value="userInfo.username" v-model="mine.username" class="form-control" id="newUserName" :placeholder="words.userName">
                            </div>
                        </div>
                        <!--<div class="form-group">-->
                        <!--<label for="addPassword" class="col-sm-3 control-label">{{words.gender}}</label>-->
                        <!--<div class="col-sm-5">-->
                        <!--<div class="radio-inline">-->
                        <!--<label>-->
                        <!--<input type="radio" v-model="mine.gender" name="blankRadio" id="maleRadio" value="1"> {{words.male}}-->
                        <!--</label>-->
                        <!--</div>-->
                        <!--<div class="radio-inline">-->
                        <!--<label>-->
                        <!--<input type="radio" v-model="mine.gender" name="blankRadio" id="femaleRadio" value="0"> {{words.female}}-->
                        <!--</label>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--</div>-->

                       <!-- <div class="form-group">
                            <label for="AddRePassword" class="col-sm-3 control-label">{{words.rePassword}}</label>
                            <div class="col-sm-5">
                                <input type="password" v-model="mine.rePassword" class="form-control" id="AddRePassword" :placeholder="words.rePassword">
                            </div>
                        </div>-->
                        <div class="form-group">
                            <label for="addTel" class="col-sm-3 control-label">{{words.tel}}</label>
                            <div class="col-sm-5">
                                <input type="text" :value="userInfo.phone" v-model="mine.phone" class="form-control" id="addTel" :placeholder="words.tel">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="addEmail" class="col-sm-3 control-label">{{words.email}}</label>
                            <div class="col-sm-5">
                                <input type="text" :value="userInfo.email" v-model="mine.email" class="form-control" id="addEmail" :placeholder="words.email">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="addPassword" class="col-sm-3 control-label">{{words.password}}</label>
                            <div class="col-sm-5">
                                <input type="password" :value="userInfo.password"   v-model="mine.password" class="form-control" id="addPassword" :placeholder="words.password">
                            </div>
                        </div>
                        <div class="col-sm-offset-3 col-sm-8" v-if="addTip">
                            <label class="tips">{{tip}}</label>
                        </div>
                        <div class="col-sm-offset-3 col-sm-8" v-if="addSuccessTip">
                            <label class="successTips">{{successTip}}</label>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-8">
                                <button type="submit" class="btn btn-primary">{{words.modifyBtn}}</button>
                                <button type="button" class="btn btn-default" @click="resetMine();">{{words.resetBtn}}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="profile-add" v-if="isMine == 'isUserMsg'">
                    <table class="table table-hover  table-striped">
                        <thead>
                        <tr>
                            <td><span>id</span></td>
                            <td><span>用户名</span></td>
                            <td><span>公司名称</span></td>
                            <td><span>邮箱地址</span></td>
                            <td><span>电话号码</span></td>
                            <td><span>开通状态</span></td>
                            <td><span>开通时间</span></td>
                            <td><span>到期时间</span></td>
                            <td><span>是否开通</span></td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="tableList"  >
                            <td>1</td>
                            <td>admin</td>
                            <td>wordemotion</td>
                            <td>123@qq.com</td>
                            <td>12345667544</td>
                            <td><span v-if="true">已开通</span><span v-if="false">未开通</span></td>
                            <td>--</td>
                            <td>--</td>
                            <td><i v-if="true" class="fa fa-check-square-o fa-2x cgreen" aria-hidden="true"></i><i v-if="false" class="fa fa-square-o fa-2x cred" aria-hidden="true"></i></td>
                        </tr>
                        </tbody>
                    </table>
            </div>
            <div class="profile-add" v-if="isMine == 'isAgreeMsg'">
                <table class="table table-hover  table-striped">
                    <thead>
                    <tr>
                        <td><span>用户名</span></td>
                        <td><span>公司名称</span></td>
                        <td><span>邮箱地址</span></td>
                        <td><span>电话号码</span></td>
                        <td><span>申请时间</span></td>
                        <td><span>审核</span></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="tableList" v-for="item in checkList" >
                        <td>{{item.username}}</td>
                        <td>{{item.company}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.regtime}}</td>
                        <td><i @click="addNewUser(item.id,item.username)" class="fa fa-square-o fa-2x cred" aria-hidden="true"></i></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="tipBg" v-if="showSmallTips">
        <div class="smallTips">
            <h3><i class="fa fa-warning"></i> 提示</h3>
            <div class="tips-content">确定通过{{current_name}}审核?</div>
            <div class="tips-btns">
                <p class="tips-leftBtn" @click="confirm(id)">确认</p>
                <p class="tips-rightBtn" @click="cancel">取消</p>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "Profile.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import HeaderComponent from '../Header/Header.vue';
    import Local from '../../local/local';
    import Cookie from 'js-cookie';
    import { getCookie } from '../../widgets/Cookie';
    import { formatSize } from '../../widgets/Util';
    import * as Api from '../../widgets/Api';
    import * as Upload from '../../widgets/Upload';
    import {setHeaderName} from '../../vuex/actions';

    export default{
        data(){
            const words = Local().profile;
            const upload = Local().upload;
            return{
                words,
                isMine: "isMain",
                //isAdmin: 0,
                isGetToken: false,
                profile:"showMsg",
                current_id:'',
                current_name:'',
                user_avatar: 'http://of4d1rz63.bkt.clouddn.com/logo.png',
                checkList:[],
                userInfo:{
                    username:'',
                    company:'',
                    avatar:'',
                    email:'',
                    phone:''
                },
                file: {
                    btn: upload.upload,
                    success: upload.success,
                    failed: upload.fail,
                    isSuccess: false,
                    isFailed: false,
                    onlyOne: upload.onlyOne,
                    noPic: upload.noPic,
                    key: "",
                    size: "",
                    name: ""
                },
                mine: {
                    username: "",
                    //gender: 1,
                    password: "",
                    rePassword: "",
                    current_password:"",
                    phone: "",
                    email: "",
                    key: "",
                    avatar: ""

                },
                tip: "",
                successTip:"abc",
                addTip:false,
                addSuccessTip:false,
                showSmallTips:false
            }
        },
        vuex:{
            actions:{setHeaderName}
        },
        computed: {
            isAdmin(){
                return getCookie('business_admin') == 1 ? true : false;
            }
        },
        methods: {
            showMine(str){
                this.profile = str;
                this.resetMine();
                this.tip='';
                this.successTip='';
                this.addTip = false;
                this.addSuccessTip = false;
            },
            /*setMine(flag){
                this.isMine = flag;
                if(!flag && !this.isGetToken){
                    this.isGetToken = true;
                    this.upload();
                }
            },*/
            setMine(str){
                this.isMine = str;
            },
            modifyPsdSubmit(){
                this.tip='';
                this.successTip='';
                this.addTip = false;
                this.addSuccessTip = false;
                if(this.mine.password != this.mine.rePassword){
                    this.tip = this.words.passDiff;
                    this.addTip = true;
                    return ;
                }
                if(! /^[0-9A-Za-z]{6,}$/.test(this.mine.password)){
                    this.tip = this.words.passwordCondition;
                    this.addTip = true;
                    return ;
                }
                const params = {
                    username:this.userInfo.username,
                    current_password:this.mine.current_password,
                    new_password:this.mine.password,
                    email:this.userInfo.email,
                    phone:this.userInfo.phone,
                    avatar:""
                }
                Api.nodifyUser( params ).then(resp => {
                    if(resp.data.code == 0 && resp.data.data.success == 1){
                       this.successTip = '密码修改成功';
                        console.log(this.mine);
                        this.addSuccessTip = true;
                        setTimeout(function () {
                            this.successTip='';
                            this.addSuccessTip = false;
                        }.bind(this),1000);
                        this.getUserInfo();
                    }
                    if(resp.data.code == 101){
                        this.tip = resp.data.message;
                    }
                    this.resetMine();
                });
            },
            modifySubmit(){
                this.tip='';
                this.successTip='';
                this.addTip = false;
                this.addSuccessTip = false;
                console.log('modifySubmit', this.mine);
               /* if(this.mine.password != this.mine.rePassword){
                    this.mine.tip = this.words.passDiff;
                    this.addTip = true;
                    return ;
                }*/
                if((this.mine.username).length>10 ||(this.mine.username).length<2){
                    this.tip="用户名需输入2-10位字符";
                    this.addTip = true;
                    return ;
                }
                var nameReg = /^[a-zA-Z0-9_]$/;
                var chineseReg = new RegExp("[\u4e00-\u9fa5]");
                for(var i=0;i<(this.mine.username).length;i++){
                    const c = (this.mine.username).charAt(i);
                    if(!(chineseReg.test(c) || nameReg.test(c))){
                        this.tip = '用户名只能包含中文，字母，数字，下划线';
                        this.addTip = true;
                        return ;
                    }
                }
                if(! /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.mine.phone)){
                    this.tip = this.words.phoneCondition;
                    this.addTip = true;
                    return ;
                }
                if(! /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.mine.email)){
                    this.tip = this.words.emailCondition;
                    this.addTip = true;
                    return ;
                }
                const params = {
                    username:this.mine.username,
                    current_password:this.mine.password,
                    new_password:'',
                    email:this.mine.email,
                    phone:this.mine.phone,
                    avatar:""
                }
                if(! /^[0-9A-Za-z]{6,}$/.test(this.mine.password)){
                    this.tip = this.words.passwordCondition;
                    this.addTip = true;
                    return ;
                }
               /* const params = _.pick(this.mine, 'username', 'password', 'phone', 'key', 'email');
                console.log('params' , params);*/
                Api.nodifyUser( params ).then(resp => {
                    if(resp.data.code == 0 && resp.data.data.success == 1){
                        this.successTip = '用户信息修改成功';
                        this.addSuccessTip = true;
                        setTimeout(function () {
                            this.successTip='';
                            this.addSuccessTip = false;
                            this.showMine('showMsg');
                            Cookie.set('business_name',params.username);
                            window.location.reload();
                        }.bind(this),1000)
                        //this.getUserInfo();
                    }
                    if(resp.data.code == 100){
                            this.tip=resp.data.message;
                            this.addTip = true;
                            return ;
                    }
                    this.resetMine();
                });
            },
            resetMine(){
                this.mine = {
                    username: "",
                    gender: 1,
                    password: "",
                    rePassword: "",
                    current_password:"",
                    phone: "",
                    email: "",
                };
            },
            getUserInfo(){
                Api.getUserInfo({}).then(resp=>{
                    if(resp.data.code==0){
                        const detail = resp.data.data;
                        this.userInfo.username = detail.username;
                        this.userInfo.company = detail.company;
                        this.userInfo.avatar = detail.avatar;
                        this.userInfo.email = detail.email;
                        this.userInfo.phone = detail.phone;

                        console.log(this.userInfo);
                    }
                })
            },
            getCheckList(){
                Api.checkApplyList({}).then(resp=>{
                    if(resp.data.code==0){
                        this.checkList = resp.data.data.data;
                        console.log('checklist',this.checkList);
                    }
                })
            },
            addNewUser(id,name){
                this.showSmallTips = true;
                this.current_name=name;
                this.current_id=id;
            },
            confirm(){
                this.showSmallTips = false;
                const id=this.current_id
                Api.checkApplyId({id}).then(resp=>{
                    if(resp.data.code ==0){
                        this.checkList.splice(_.find(this.checkList,item=>{item.id = id}),1);
                        this.current_id='';
                        this.current_name='';
                    }
                })
            },
            cancel(){
                this.showSmallTips = false;
                this.current_id='';
                this.current_name='';
            },
            upload(){
                Api.uploadToken({}).then(resp => {
                    console.log(resp.data.data.token);
                    if(resp.data.code == 0){
                        const uptoken = resp.data.data.token || "";
                        const _this = this;
                        Upload.up(uptoken, {
                            init: {
                                FilesAdded(up, files){
                                    console.log('FilesAdded', up, files);
                                    if(files.length != 1){
                                        _this.file.isSuccess = false;
                                        _this.file.isFailed = true;
                                        _this.file.failed = _this.file.onlyOne;
                                        return false;
                                    }
                                    const file = files[0];
                                    if(file.type.indexOf('image') < 0){
                                        _this.file.isSuccess = false;
                                        _this.file.isFailed = true;
                                        _this.file.failed = _this.file.noPic;
                                        return false;
                                    }
                                    _this.file.name = file.name;
                                    _this.file.size = file.size;

                                },
                                FileUploaded(up, file, info){
                                    const domain = up.getOption('domain');
                                    const res = JSON.parse(info);
                                    const sourceLink = domain + res.key; //获取上传成功后的文件的Url
                                    console.log(sourceLink);
                                    _this.user_avatar = sourceLink;
                                    _this.file.key = res.key;
                                    _this.mine.key = res.key;
                                    _this.file.isSuccess = true;
                                    _this.file.isFailed = false;
                                },
                                UploadProgress(up, file){
                                    console.log('UploadProgress', up, file);
                                }
                            }
                        });
                    }
                });

            },
            init(){

                //this.isAdmin = getCookie('business_admin');
                //this.upload();
            }
        },
        ready(){
            this.getUserInfo();
            this.getCheckList();
        },
        filters: { formatSize },
        created(){
            //this.init();
        },
        components:{ HeaderComponent},
        route: {
            data(){
                //this.init();
            }
        }
    }
</script>
