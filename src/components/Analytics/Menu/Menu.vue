<template>
    <aside class="left-side sidebar-offcanvas">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar user panel -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="images/avatar.png" class="img-circle" alt="User Image" />
                </div>
                <div class="pull-left info">
                    <p>Hello, Jane</p>

                    <a href="javascript:void(0);"><i class="fa fa-circle text-success"></i> Online</a>
                </div>
            </div>

            <form action="#" method="get" class="sidebar-form">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="Search..."/>
                        <span class="input-group-btn">
                            <button type='submit' name='seach' id='search-btn' class="btn btn-flat"><i class="fa fa-search"></i></button>
                        </span>
                </div>
            </form>

            <ul class="sidebar-menu">
                <li v-for="menu in MainMenu" :class="[menu.children.length ? 'treeview' : '', menu.isActive ? 'active' : '']">
                    <a :href="menu.children.length ? 'javascript:void(0);' : '#!/main/'+menu.router" @click="toggle(menu);">
                        <i class="fa" :class="menu.icon"></i> <span>{{menu.name}}</span>
                        <i class="fa pull-right" :class="[menu.isActive ? 'fa-angle-down' : 'fa-angle-left']" v-if="menu.children.length"></i>
                    </a>
                    <ul class="treeview-menu" v-if="menu.children.length" v-show="menu.isActive" transition="expand">
                        <li v-for="item in menu.children">
                            <a v-link="{name: menu.router, params:{item: item.router}}"><i class="fa fa-angle-double-right"></i> {{item.name}}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
    </aside>
</template>
<style lang="less">
    @import "Menu.less";
</style>
<script type="text/ecmascript-6">
    import _ from "underscore";
    import {MainMenu} from "../../../config/config";

    export default{
        data(){
            return{
                MainMenu,
                msg:'Hello Menu'
            }
        },
        components:{

        },
        methods: {
            toggle(menu){
                console.log(menu, this.MainMenu);
                _.each(this.MainMenu, menuItem => {
                    if(menuItem.router != menu.router){
                    menuItem.isActive = false;
                } else {
                    menuItem.isActive = !menuItem.isActive;
                }
            });
                //menu.isActive = !menu.isActive;
            }
        }
    }
</script>
