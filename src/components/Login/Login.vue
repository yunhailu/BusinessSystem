<template>
    <div class="container">
        <div class="login-page">
            <form class="form-horizontal">
                <fieldset>
                    <legend>
                        <img class="logo-icon" src="images/logo.jpg" />
                        <span>沃德商业智能系统平台</span>
                    </legend>
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-2 control-label">用户名</label>
                        <div class="col-sm-4">
                            <input type="text" v-model="userName" class="form-control" id="inputEmail3" placeholder="UserName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
                        <div class="col-sm-4">
                            <input type="password" v-model="password" class="form-control" id="inputPassword3" placeholder="Password">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox"> Remember me
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group" v-show="errorTip">
                        <div class="col-sm-offset-2 col-sm-10 errorTip">
                            <label>{{errorTip}}</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <button type="submit" class="btn btn-primary" @click="login">登录系统</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
</template>
<style lang="less">
    @import "Login.less";
</style>
<script type="text/ecmascript-6">

    import Cookie from "js-cookie";
    import {redirect} from "../../widgets/Auth";
    import * as Api from "../../widgets/Api";

    export default {
        name: 'login',
        data(){
            return{
                errorTip: '',
                userName: '',
                password: ''
            };
        },
        methods: {
            login(){
//                if(!this.userName && !this.password){
//                    alert('用户名密码不能为空！');
//                    return ;
//                }
//                if(this.userName != 'admin' || this.password != 'admin'){
//                    alert('用户名密码不正确！');
//                    return ;
//                }
//                Cookie.set('business_uid', 'admin');
//                location.hash = '#!/home';


                Api.login({
                    username: this.userName,
                    password: this.password
                }).then(resp => {
                    //console.log('Login', resp);
                    const data = resp.data;
                    if(data.code == 0){
                        Cookie.set('business_uid', data.data.user_id);
                        Cookie.set('business_name', data.data.user_name);
                        location.hash = '#!/home';
                    } else {
                        this.errorTip = data.message;
                    }
                });
            }
        },
        route:{
            activate(transition){
                redirect();
                transition.next();
            }
        }
    };

</script>