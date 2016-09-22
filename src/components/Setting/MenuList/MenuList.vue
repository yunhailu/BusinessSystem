<template>
    <div class="menu-list">
        <div class="title">
            <i class="fa fa-2x fa-laptop"></i>
            <span>{{title}}</span>
        </div>
        <ul class="sidebar-menu">
            <li v-for="menu in menus" :class="[menu.children.length ? 'treeview' : '', menu.isActive ? 'active' : '']">
                <a :href="menu.children.length ? 'javascript:void(0);' : '#!/main/'+menu.router" @click="toggle(menu);">
                    <i class="fa" :class="menu.icon || 'fa-bar-chart' "></i> <span>{{menu.name}}</span>
                    <i class="fa pull-right" :class="[menu.isActive ? 'fa-angle-down' : 'fa-angle-left']" v-if="menu.children.length"></i>
                </a>
                <ul class="treeview-menu" v-if="menu.children.length" v-show="menu.isActive" transition="expand">
                    <li v-for="item in menu.children">
                        <a v-link="{name: menu.router, params:{item: item.router}}"><i class="fa fa-angle-double-right"></i> {{item.name}}</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
    @import "MenuList.less";
</style>
<script type="text/ecmascript-6">
    import _ from "underscore";

    export default{
        props: ['title', 'menus'],
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{

        },
        methods: {
            toggle(menu){
                console.log(menu, this.menus);
                _.each(this.menus, menuItem => {
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
