/**
 * Created by yunhailu on 2016/8/9.
 */


// 主菜单
export const MainMenu = [{
    router: 'summary',
    name: '概况',
    icon: 'fa-dashboard',
    isActive: true,
    children: []
},{
    router: 'source',
    name: '数据源',
    icon: 'fa-bar-chart-o',
    isActive: false,
    children: [
        {router: 'weibo', name: '微博'},
        {router: 'wechat', name: '微信公众号'},
        {router: 'platfrom', name: '社区'}
    ]
}, {
    router: 'display',
    name: '数据展示',
    icon: 'fa-laptop',
    isActive: false,
    children: [
        {router: 'topic', name: '主题外延'},
        {router: 'atlas', name: '关键词图谱'},
        {router: 'waveform', name: '发布波形图'},
        {router: 'ranking', name: '传播力排行'}
    ]
}, {
    router: 'analysis',
    name: '用户分析',
    icon: 'fa-edit',
    isActive: false,
    children: [
        {router: 'area', name: '地域分布'},
        {router: 'forward', name: '转发'}
    ]
}];