<template>
    <header class="header">
        <div class="logo">Business System</div>
        <nav class="navbar navbar-static-top" role="navigation">
            <div class="navbar-right">
                <ul class="nav navbar-nav">
                    <li class="dropdown user user-menu">
                        <a href="javascript:void(0);" class="dropdown-toggle" >
                            <i class="glyphicon glyphicon-user"></i>
                            <span>Jane Doe <i class="caret"></i></span>
                        </a>
                    </li>
                    <li class="dropdown quit" @click="quit">
                        <a href="javascript:void(0);">退出</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>
<style lang="less">
    @import "Header.less";
</style>
<script>
    import Cookie from "js-cookie";

    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        methods: {
            quit(){
                Cookie.remove('business_uid');
                this.$router.go({name: "login"});
            }
        }
    }
</script>
