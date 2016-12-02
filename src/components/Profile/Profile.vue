<template>
    <header-component></header-component>
    <div class="container">
        <div class="profile">
            <ul id="myTab" class="nav nav-tabs">
                <li :class="[isMine ? 'active' : '']" @click="setMine(true);"><a href="javascript:void(0);" >{{words.mineTitle}}</a></li>
                <li v-if="isAdmin" :class="[isMine ? '' : 'active']" @click="setMine(false);"><a href="javascript:void(0);">{{words.addTitle}}</a></li>
            </ul>
            <div class="profile-mine" v-if="isMine">
                <form class="form-horizontal" role="form" v-on:submit.stop.prevent="modifySubmit();">
                    <div class="form-group">
                        <label for="userName" class="col-sm-3 control-label">{{words.userName}}</label>
                        <div class="col-sm-5">
                            <input type="text" v-model="mine.userName" class="form-control" id="userName" :placeholder="words.userName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password" class="col-sm-3 control-label">{{words.password}}</label>
                        <div class="col-sm-5">
                            <input type="password" v-model="mine.password" class="form-control" id="password" :placeholder="words.password">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="rePassword" class="col-sm-3 control-label">{{words.rePassword}}</label>
                        <div class="col-sm-5">
                            <input type="password" v-model="mine.rePassword" class="form-control" id="rePassword" :placeholder="words.rePassword">
                        </div>
                    </div>
                    <div class="col-sm-offset-3 col-sm-8" v-if="addTip">
                        <label class="tips">{{mine.tip}}</label>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-8">
                            <button type="submit" class="btn btn-primary">{{words.modifyBtn}}</button>
                            <button type="button" class="btn btn-default" @click="resetMine();">{{words.resetBtn}}</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="profile-add" v-if="!isMine">
                <div id="uploadBtnWrap" class="profile-add-avatar">
                    <div class="profile-add-avatar-wrap">
                        <img :src="user_avatar" class="profile-add-avatar-wrap-image" />
                    </div>
                    <div class="profile-add-avatar-btn">
                        <div type="button" id="uploadBtn" class="btn btn-default" >Upload</div>
                        <!--<input type="file" id="uploadBtn1"  />-->
                    </div>
                </div>
                <form class="form-horizontal" role="form" v-on:submit.prevent.stop="createSubmit();">
                    <div class="form-group">
                        <label for="newUserName" class="col-sm-3 control-label">{{words.userName}}</label>
                        <div class="col-sm-5">
                            <input type="text" v-model="addUser.userName" class="form-control" id="newUserName" :placeholder="words.userName">
                        </div>
                    </div>
                    <!--<div class="form-group">-->
                        <!--<label for="addPassword" class="col-sm-3 control-label">{{words.gender}}</label>-->
                        <!--<div class="col-sm-5">-->
                            <!--<div class="radio-inline">-->
                                <!--<label>-->
                                    <!--<input type="radio" v-model="addUser.gender" name="blankRadio" id="maleRadio" value="1"> {{words.male}}-->
                                <!--</label>-->
                            <!--</div>-->
                            <!--<div class="radio-inline">-->
                                <!--<label>-->
                                    <!--<input type="radio" v-model="addUser.gender" name="blankRadio" id="femaleRadio" value="0"> {{words.female}}-->
                                <!--</label>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <div class="form-group">
                        <label for="addPassword" class="col-sm-3 control-label">{{words.password}}</label>
                        <div class="col-sm-5">
                            <input type="password" v-model="addUser.password" class="form-control" id="addPassword" :placeholder="words.password">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="AddRePassword" class="col-sm-3 control-label">{{words.rePassword}}</label>
                        <div class="col-sm-5">
                            <input type="password" v-model="addUser.rePassword" class="form-control" id="AddRePassword" :placeholder="words.rePassword">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="addTel" class="col-sm-3 control-label">{{words.tel}}</label>
                        <div class="col-sm-5">
                            <input type="text" v-model="addUser.tel" class="form-control" id="addTel" :placeholder="words.tel">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="addEmail" class="col-sm-3 control-label">{{words.email}}</label>
                        <div class="col-sm-5">
                            <input type="text" v-model="addUser.email" class="form-control" id="addEmail" :placeholder="words.email">
                        </div>
                    </div>
                    <div class="col-sm-offset-3 col-sm-8" v-if="addTip">
                        <label class="tips">{{addUser.tip}}</label>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-8">
                            <button type="submit" class="btn btn-primary" >{{words.createBtn}}</button>
                            <button type="button" class="btn btn-default" @click="resetAdd();">{{words.resetBtn}}</button>
                        </div>
                    </div>
                </form>
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
    import Q from 'qiniu-js/dist/qiniu';
    import { getCookie } from '../../widgets/Cookie';
    import * as Api from '../../widgets/Api';
    import Local from '../../local/local';

    export default{
        data(){
            const words = Local().profile;
            return{
                words,
                isMine: true,
                isAdmin: 0,
                isGetToken: false,
                user_avatar: '',
                mine:{
                    userName: "",
                    password: "",
                    rePassword: "",
                    tip: ""
                },
                addUser: {
                    userName: "",
                    gender: 1,
                    password: "",
                    rePassword: "",
                    tel: "",
                    email: "",
                    tip: ""
                }
            }
        },
        computed: {
            isAdmin(){
                return getCookie('business_admin');
            }
        },
        methods: {
            setMine(flag){
                this.isMine = flag;
                if(!flag && !this.isGetToken){
                    this.isGetToken = true;
                    this.upload();
                }
            },
            modifySubmit(){
                console.log('modifySubmit', this.mine);
            },
            createSubmit(){
                console.log('createSubmit', this.addUser);
            },
            resetMine(){
                this.mine = {
                    userName: "",
                    password: "",
                    rePassword: "",
                    tip: ""
                };
            },
            resetAdd(){
                this.addUser = {
                    userName: "",
                    gender: 1,
                    password: "",
                    rePassword: "",
                    tel: "",
                    email: "",
                    tip: ""
                }
            },
            upload(){
                Api.uploadToken({}).then(resp => {
                    console.log(resp.data.data.token);
                    if(resp.data.code == 0){
                        const uptoken = resp.data.data.token || "";
                        const _this = this;
                        const uploader = Qiniu.uploader({
                            runtimes: 'html5,flash,html4',    //上传模式,依次退化
                            browse_button: 'uploadBtn',       //上传选择的点选按钮，**必需**
                            //uptoken_url: 'http://118.244.212.122:8008/upload/token?callback=_jsonpv78th89spplw7xmw9sv1dzpvi',            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                            uptoken : uptoken, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                            //unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
                            //save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
                            //domain: 'http://qiniu-plupload.qiniudn.com/',   //bucket 域名，下载资源时用到，**必需**
                            domain: 'http://of4d1rz63.bkt.clouddn.com/',   //bucket 域名，下载资源时用到，**必需**
                            get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
                            container: 'uploadBtnWrap',           //上传区域DOM ID，默认是browser_button的父元素，
                            max_file_size: '100mb',           //最大文件体积限制
                            flash_swf_url: require('./widgets/Moxie.swf'),  //引入flash,相对路径
                            max_retries: 3,                   //上传失败最大重试次数
                            dragdrop: true,                   //开启可拖曳上传
                            drop_element: 'uploadBtnWrap',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                            chunk_size: '4mb',                //分块上传时，每片的体积
                            auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                            init: {
                                'FilesAdded': function(up, files) {
                                    plupload.each(files, function(file) {
                                        // 文件添加进队列后,处理相关的事情
                                    });
                                    console.log('FilesAdded',up, files);
                                },
                                'BeforeUpload': function(up, file) {
                                    // 每个文件上传前,处理相关的事情
                                    console.log('BeforeUpload',up, file);
                                },
                                'UploadProgress': function(up, file) {
                                    // 每个文件上传时,处理相关的事情
                                    console.log('UploadProgress',up, file);
                                },
                                'FileUploaded': function(up, file, info) {
                                    console.log('FileUploaded',up, file, info);
                                    console.log('FileUploaded getSource:', file.getSource());

                                    // 每个文件上传成功后,处理相关的事情
                                    // 其中 info 是文件上传成功后，服务端返回的json，形式如
                                    // {
                                    //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                                    //    "key": "gogopher.jpg"
                                    //  }
                                    // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

                                     var domain = up.getOption('domain');
                                     var res = JSON.parse(info);
                                     var sourceLink = domain + res.key; //获取上传成功后的文件的Url
                                    console.log(sourceLink);
                                    _this.user_avatar = sourceLink;
                                },
                                'Error': function(up, err, errTip) {
                                    //上传出错时,处理相关的事情
                                    console.log('Error',up, err, errTip);
                                },
                                'UploadComplete': function() {
                                    //队列文件处理完毕后,处理相关的事情
                                },
                                'Key': function(up, file) {
                                    // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                                    // 该配置必须要在 unique_names: false , save_key: false 时才生效

                                    console.log('Key',up, file);
                                    var key = "";
                                    // do something with key here
                                    return key
                                }
                            }
                        });
                        uploader.bind('FileUploaded', function() {
                            console.log('hello man,a file is uploaded');
                        });
                    }
                });

            },
            init(){
                //this.isAdmin = getCookie('business_admin');
                //this.upload();
            }
        },
        created(){
            //this.init();
        },
        components:{ HeaderComponent },
        route: {
            data(){
                //this.init();
            }
        }
    }
</script>
