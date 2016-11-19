####路由结构
----

#####前端哈希路由对照表

名称              |             路由                    |           参数                   |       备注            
------------------ | ------------------------------------- | ---------------------------------- | ---------------------
 login             |   /#!/login                         |      null                            |         登录页              
 home              |   /#!/home                          |      null                            |         主界面 Home 页            
 analytics         |   /#!/analytics                     |      null                            |         主界面 Analytics 页（默认信息汇总）            
 summary           |   /#!/analytics/summary             |      null                            |         主界面 Analytics 页的信息汇总标签            
 sentiment         |   /#!/analytics/sentiment           |      null                            |         主界面 Analytics 页的情绪分析标签            
 influence         |   /#!/analytics/influence           |      null                            |         主界面 Analytics 页的影响力分析标签            
 theme             |   /#!/analytics/theme               |      null                            |         主界面 Analytics 页的主题分析标签            
 detail            |   /#!/:type/detail/:id              |      'type': 分析类型, 'id': 详情id  |         主界面 Analytics 页中各个分析里的详情页            
 compare           |   /#!/compare                       |      null                            |         主界面 Compare 页            
 dashboard         |   /#!/dashboard                     |      null                            |         主界面 Dashboard 页            
 dashboardDetail   |   /#!/dashboard/:id                 |      'id': 快捷报告id                |         主界面 Dashboard 的详情页            
 reports           |   /#!/reports                       |      null                            |         主界面 Reports 页            
 setting           |   /#!/setting                       |      null                            |         主界面 Setting 的默认页            
 settingAdd        |   /#!/setting/add                   |      null                            |         主界面 Setting 添加 Topic 页            
 settingEdit       |   /#!/setting/edit/:topic_id        |      topic_id: 主题id, group_id: 分组id |      主界面 Setting 修改 Topic 页            
 profile           |   /#!/profile                       |      null                            |         个人中心 & 添加新用户            
 test              |   /#!/test                          |      null                            |         test 页，放一些测试组件
 mediadiaplay      |   /#!/mediadiaplay                   |      null                            |        媒体展示的页面   