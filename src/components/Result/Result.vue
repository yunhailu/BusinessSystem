<template>
    <span>Result</span>
    <div class="charts">
        <div class="arrow animated rubberBand" @click="toggle">
            <i class="fa fa-angle-left fa-3x" transition="rotate" :class="[resultPieChartOption.isActive ? 'fa-rotate-180' : '']"></i>
        </div>
        <!--<div class="chart" v-echarts="resultChartOption" :loading="resultChartLoading" :class="[isChartScale ? 'active' : '']" :resize="isChartScale"></div>-->
        <!--<div class="pie" v-echarts="resultPieChartOption" :loading="resultPieChartLoading" :class="[isActivePie ? 'active' : '']"  :resize="isActivePie" ></div>-->

        <div class="chart" v-echarts="resultChartOption" :loading="resultChartLoading" :class="[resultChartOption.isToggle ? 'active' : '']" ></div>
        <div class="pie" v-echarts="resultPieChartOption" :loading="resultPieChartLoading" :class="[resultPieChartOption.isActive ? 'active' : '']" translate="show-pie" ></div>
    </div>
    <div class="result-panel">
        <ul class="result-panel-list">
            <li class="result-panel-list-item row" v-for="item in list">
                <a :href="item.url" target="_blank">
                    <div class="result-panel-list-item-left col-md-8">
                        <i class="fa fa-paperclip fa-3x"></i>
                        <div class="result-panel-list-item-left-con">
                            <div class="title">{{item.title}}</div>
                            <div class="detail">{{item.content}}</div>
                            <div class="time">published on {{item.pDate}}</div>
                        </div>
                    </div>
                    <div class="result-panel-list-item-right col-md-4">
                        <i class="fa fa-flag fa-2x icon"></i>
                        <div class="item-data">
                            <div class="row">
                                <div class="col-md-3 title">MATCHES</div>
                                <div class="col-md-9">Carrival Group</div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 title">METRICS</div>
                                <div class="col-md-3"><i class="fa fa-wechat"></i> 12</div>
                                <div class="col-md-3"><i class="fa fa-weibo"></i> 14</div>
                                <div class="col-md-3"><i class="fa fa-internet-explorer"></i> 14</div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 col-md-offset-3"><i class="fa fa-eye"></i> {{item.viewCount}}</div>
                                <div class="col-md-3"><i class="fa fa-thumbs-up"></i> {{item.likeCount}}</div>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
    @import "Result.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import {Chart, Pie} from '../../config/config';

    export default{
        data(){
            const data = {
                happy: [1,4,0,6,1,1,0,0,0,1,0,1,4,0,4,3,0,0,4,1,9,4,0,1,0,0,1,1,1,1,3,1,1,4,0,3,4,3,1,1,1,0,0,0,1,6,1,1,1,3,1,4,3,4,1,0,0,1,3,0,0,1,1,1,1,0,1,0,3,0,0,12,8,3,4,6,0,4,0,3,1,1,0,1,1,1,1,4,1,4,0,9,8,4,1,0,0,1,3,1,4,1,1,1,3,1,1,3,16,0,0,0,4,3,1,0,0,1,0,1,3],
                anger: [1,4,6,21,4,1,6,4,1,0,0,0,0,3,6,4,3,1,9,3,11,0,1,0,11,4,0,1,0,0,27,3,6,3,4,0,11,4,3,1,0,1,1,8,3,1,6,0,1,12,4,16,1,3,12,1,8,3,3,1,3,1,0,4,1,0,0,1,6,3,14,4,4,6,0,9,1,4,9,0,1,0,1,8,0,1,0,3,1,33,6,21,4,4,1,4,1,0,1,0,3,3,0,1,3,3,8,1,4,1,6,3,3,0,16,1,1,1,0,0,1],
                sorrow: [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0],
                disgust: [0,0,0,3,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,3,0,3,1,0,0,0,0,0,0,0,0,1,0,0,0,1,3,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,1,1,0,0,3,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,1,1,0,0,0,3,1,0,1,0,0,0,0,0,0,0,0,1,1,0,0],
                fear: [0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,3,0,1,0,0,0,0,0,0,1,1,0,0,0,0,1,0,1,0,0,1,4,0,0,0,0,0,0,0,0,0,0,0,1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0]
            };
            return{
                chartInstance: null,
                resultChartLoading: false,
                resultChartOption: {
                    isToggle: true,
                    title: _.extend(Chart.title, { show: false}),
                    tooltip: Chart.tooltip,
                    legend: {
                        data:['Happy','Anger','Sorrow','Disgust','Fear']
                    },
                    grid: Chart.grid,
                    toolbox: Chart.toolbox,
                    xAxis: _.extend(Chart.xAxis, {
                        type : 'category',  //category
                        data : ["2016-08-21:12","2016-08-21:14","2016-08-21:15","2016-08-21:16","2016-08-21:17","2016-08-21:18","2016-08-21:20","2016-08-21:21","2016-08-22:00","2016-08-22:03","2016-08-22:05","2016-08-22:06","2016-08-22:08","2016-08-22:09","2016-08-22:10","2016-08-22:11","2016-08-22:12","2016-08-22:13","2016-08-22:14","2016-08-22:15","2016-08-22:16","2016-08-22:17","2016-08-22:18","2016-08-22:19","2016-08-22:20","2016-08-22:21","2016-08-22:22","2016-08-23:00","2016-08-23:03","2016-08-23:06","2016-08-23:08","2016-08-23:09","2016-08-23:10","2016-08-23:11","2016-08-23:12","2016-08-23:13","2016-08-23:14","2016-08-23:15","2016-08-23:16","2016-08-23:17","2016-08-23:18","2016-08-23:19","2016-08-23:20","2016-08-23:22","2016-08-23:23","2016-08-24:00","2016-08-24:01","2016-08-24:06","2016-08-24:07","2016-08-24:08","2016-08-24:09","2016-08-24:10","2016-08-24:11","2016-08-24:12","2016-08-24:14","2016-08-24:15","2016-08-24:16","2016-08-24:17","2016-08-24:18","2016-08-24:20","2016-08-24:21","2016-08-24:22","2016-08-25:00","2016-08-25:02","2016-08-25:03","2016-08-25:05","2016-08-25:06","2016-08-25:07","2016-08-25:08","2016-08-25:09","2016-08-25:10","2016-08-25:11","2016-08-25:12","2016-08-25:14","2016-08-25:15","2016-08-25:16","2016-08-25:17","2016-08-25:18","2016-08-25:19","2016-08-25:20","2016-08-25:21","2016-08-25:22","2016-08-25:23","2016-08-26:00","2016-08-26:01","2016-08-26:06","2016-08-26:07","2016-08-26:08","2016-08-26:09","2016-08-26:10","2016-08-26:11","2016-08-26:12","2016-08-26:13","2016-08-26:14","2016-08-26:15","2016-08-26:16","2016-08-26:17","2016-08-26:18","2016-08-26:22","2016-08-26:23","2016-08-27:00","2016-08-27:01","2016-08-27:02","2016-08-27:06","2016-08-27:08","2016-08-27:09","2016-08-27:10","2016-08-27:11","2016-08-27:12","2016-08-27:13","2016-08-27:14","2016-08-27:15","2016-08-27:16","2016-08-27:17","2016-08-27:18","2016-08-27:19","2016-08-27:20","2016-08-28:00","2016-08-28:01","2016-08-28:06","2016-08-28:08"],
                        boundaryGap : false
                    }),
                    yAxis: _.extend(Chart.yAxis, {
                        type : 'value',
                        boundaryGap : false
                    }),
                    progressive: 4,
                    textStyle: Chart.textStyle,
                    series : [{
                        name:'Happy',
                        type:'bar',
                        areaStyle: {normal: {}},
                        stack: 'Total',
                        data: data.happy
                    }, {
                        name:'Anger',
                        type:'bar',
                        areaStyle: {normal: {}},
                        stack: 'Total',
                        data: data.anger
                    }, {
                        name:'Sorrow',
                        type:'bar',
                        areaStyle: {normal: {}},
                        stack: 'Total',
                        data: data.sorrow
                    }, {
                        name:'Disgust',
                        type:'bar',
                        areaStyle: {normal: {}},
                        stack: 'Total',
                        data: data.disgust
                    }, {
                        name:'Fear',
                        type:'bar',
                        areaStyle: {normal: {}},
                        stack: 'Total',
                        data: data.fear
                    }]
                },
                resultPieChartLoading: false,
                resultPieChartOption: {
                    isActive: true,
                    title: _.extend(Pie.title, { show: false}),
                    tooltip: _.extend(Pie.tooltip, { }),
                    legend: _.extend(Pie.legend, {
                        //orient: 'vertical',
                        //x: 'bottom',
                        bottom: 0,
                        data:['Happy','Anger','Sorrow','Disgust','Fear']
                    }),
                    textStyle: Pie.textStyle,
                    toolbox: Pie.toolbox,
                    series: _.extend(Pie.series, {
                        name: 'Seniment',
                        center: ['50%', '45%'],
                        data:[
                            {value: _.reduce(data.happy, (mome, num) => mome + num, 0), name:'Happy'},
                            {value:_.reduce(data.anger, (mome, num) => mome + num, 0), name:'Anger'},
                            {value:_.reduce(data.sorrow, (mome, num) => mome + num, 0), name:'Sorrow'},
                            {value:_.reduce(data.disgust, (mome, num) => mome + num, 0), name:'Disgust'},
                            {value:_.reduce(data.fear, (mome, num) => mome + num, 0), name:'Fear'}
                        ]
                    })
                },
                isChartScale: true,
                isActivePie: true,
                list: [
                    {
                        "content": "\r\n                        \r\n\r\n                        \r\n                        近日，彭博社援引知情人士的消息称，Uber 今年上半年至少亏损 12.7 亿美元。报道称，Uber 上周五与投资者召开了电话会议，此次电话会议由 Uber 首席财务官高塔姆·古普塔 (Gautam Gupta) 主持召开，主要讨论了 Uber 公司财务状况。据悉，二季度 Uber 营业收入为 11 亿美元，较一季度的 9.6 亿美元上涨了 18%。去年一季度，Uber 的营收为 2.87 亿美元，二季度营收 3.76 亿美元。尽管营收持续增加，但 利润始终无法提升。今年一季度，Uber 税息折旧及摊销前亏损为 5.2 亿美元；二季度情况变得更为糟糕，亏损上升至超过 7.5 亿美元。这意味着今年上半年，Uber 至少录得 12.7 亿美元亏损。这一亏损态势与 2015 年上半年类似：当时 Uber 损失了接近 10 亿美元。Uber 巨额亏损有多方面的原因，其中包括给司机和乘客的补贴，与滴滴出行的激烈竞争。据 Business Insider 称，在与滴滴持久的争夺战中，Uber 一年的亏损额就达到了 10 亿美元。本月初，滴滴正式宣布收购 Uber 中国。这意味着今后 Uber 的财务报表中，将不包括这些亏损。在美国本土，Uber 也有强大的竞争对手——Lyft。这两家公司都提供低廉价格服务，并且给乘客和司机补贴。Lyft 业务只在美国本土，在 2015 年出现 3.5 亿美元亏损。今年 4 月，Uber 称其在美国和加拿大实现盈利，平均每次出行有 0.19 美元的利润。然而这不过昙花一现，在二季度，Uber 在美国区又出现亏损，损失达到 1 亿美元。Uber 发言人拒绝就上述消息发表评论。之前有消息称 Uber 中国和滴滴合并的一大重要原因就是烧钱太疯狂，以致投资人都看不下去，现在看来并非空穴来风。- - - - END - - - -&nbsp; 推荐阅读 &nbsp;点击图片阅读\r\n                    ",
                        "viewCount": 15,
                        "from": {
                            "name": ""
                        },
                        "title": "近日,彭博社援引知情人士的消息称,<!--red_beg-->Uber<!--red_end--> 今年上半年至少亏损 12.7 亿美元.报道称,<!--red_beg-->Uber<!--red_end--> 上周五与投资者召开了电话会议,此次电...",
                        "url": "http://mp.weixin.qq.com/s?__biz=MjM5NTAyNjE4MA==&mid=2649612100&idx=3&sn=67ebff804e7a95b609e79c97efcd850c&scene=0",
                        "pDate": "2016-08-27 18:06:00",
                        "imageURLs": [
                            "http://mmbiz.qpic.cn/mmbiz_jpg/nmVQQlxOIsKTWbROMPHr8dqKYibEQ3cvp7Yd5aTucFcibRZArK4oNUZDKdAV1CVThEQ3tZr4r0iahCibvbagsvtdgQ/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz_jpg/nmVQQlxOIsKTWbROMPHr8dqKYibEQ3cvpemoEDicqGEquNnAib2jJcPqz24aictjZhicxKY2XnTtuR7hfBTA4R7821Q/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz_jpg/nmVQQlxOIsKKgZU7vaAdxMxpZo4yeZiajzTmCvQrkpt3LU5hY4QMrEiaSAwdPZdYEiaMKQUlW2M8dCtZmMRhp2vSw/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz_jpg/nmVQQlxOIsJlKUq7atiaqbcn0kWdLsZGJz2UFTPTTMvannmOmibP99muOssR19ibT76PmuESfPloAdibvSS5G5EMFQ/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/nmVQQlxOIsInc4vlbb5DShF7PGR2wGl9MIlPtTIxhvTXicfJlJGb9YFVSqMABAvCSBFOqEyXfsgFyicuMFQ2DhAg/0?wx_fmt=png"
                        ],
                        "id": "22b4dda636f0242468df1308aa77e1d1",
                        "likeCount": 0
                    },
                    {
                        "content": "\r\n                        \r\n\r\n                        \r\n                        金指投——专注于成长型企业股权投融资金指投线上投资学院，将用最靠谱的态度教会大家如何真正掌握股权投资。金指投在为靠谱的项目找到靠谱的钱的同时，真正打造一个懂资本的资本圈层。以下是金日投条资讯：头条资讯1、阿里影业上半年净亏损4.7亿元，俞永福将出任阿里影业非执行董事2016年上半年阿里影业实现营收2.573亿元人民币，较去年同期增长1022%，其中内容制作收入占2152.3万元，宣传发行占2.1亿元，娱乐电子商务占196万元，国际业务占2182.3万元，毛利7730万元，净亏损4.657亿元。阿里影业发布公告称，自2016年8月27日起，阿里巴巴集团合伙人俞永福将出任阿里影业非执行董事。俞永福2014年6月加入阿里巴巴集团出任UC优视总裁，并于2015年3月起兼任高德软件总裁。自2015年5月起，俞永福担任阿里巴巴集团移动互联网事业群总裁，同时担任阿里妈妈总裁。2015年12月，俞永福当选为阿里巴巴集团合伙人。2、补贴太猛，据传Uber上半年至少亏了12.7亿美元据路透社报道，彭博社援引知情人士消息称，全球最大的打车服务提供商Uber在今年上半年的税前亏损达到至少12.7亿美元（约84.6亿人民币）。其中，向司机发放补贴是造成亏损的最主要原因。Uber主要投资者高盛和亚马逊CEO杰夫·贝佐斯(Jeff Bezos)目前均未对上述消息置评。据知情人士透露，Uber在今年第一季度的亏损为5.20亿美元（约34.6亿人民币），第二季度该数字增加到7.50亿美元（约47.9亿人民币）。Uber目前的市值大约为690亿美元（约4594.6亿人民币），该估值较2015年缩水至少20亿美元（约133.2亿人民币）。3、杨元庆谈联想十年规划，专注创新不会造车在亚布力论坛夏季高峰会的的“轮值主席时间”上，联想集团董事长兼CEO杨元庆围绕PC、移动业务和企业级业务谈及联想未来十年战略。他表示，现阶段联想注重创新与全球化布局，但是对于热门概念并不想涉足，因为同时铺设太多行业有风险。4、百度悄悄撤掉比特币和其他虚拟货币广告彭博社昨日报道称，百度已悄无声息地移除了比特币和其他虚拟货币广告。业内人士称，由于这些数字货币广告可能涉及庞氏骗局或诈骗案，百度不得不终止相关广告。之前，百度因为莆田系医疗广告和博彩网站广告而饱受指责。投融资1、搜狐视频启动VR战略 打造VR自媒体平台搜狐视频公布了VR战略，未来将投入一亿现金和超过十亿的资源，打造VR视频自媒体平台。搜狐视频产品技术中心总经理、56网总经理马义表示，搜狐视频VR合作平台提供内容运营、广告对接、资源对接、营销分成等几大功能，重点扶植与激励出品人。VR全景视频的出品人，将会在资金和资源上得到优先待遇，获得在拍摄技术、品牌传播、内容宣传推广、贴片广告分成、联合出品节目等方面的支持。2、云服务公司Rackspace被&nbsp;Apollo&nbsp;公司收购知名的云服务公司Rackspace表示，私人股权公司Apollo Global Management将对该公司进行私有化收购，以每股32美金的价格，总价为43亿美金，其中包括4300万美元的净现金，交易预计将在2016年第四季度完成。Rackspace成立于1998年，于2012年上市，是全球几大云计算中心之一。3、印度支付宝MobiKwik获Net 1 4000万美金战略投资&nbsp;&nbsp;这家公司已于2005年在纳斯达克上市，专注于为无银行账户人群提供支付解决方案，现今估值4.8亿美金。Net 1位于南非，同时也在约翰内斯堡上市。根据交易条款，它也会将“虚拟卡技术”整合进MobiKwik来，以帮助10万商业用户达成更多的业务交易。该虚拟卡技术以手机为ID认证媒介，跟支付宝很相似。今日快讯● &nbsp;英特尔和苹果已经在谈判代工iPhone处理器● &nbsp;个人信息非法交易调查：1万条报价2800元还“保证质量”● &nbsp;苹果在华又被曝出血汗工厂：工人一个月最多加班109小时● &nbsp;股价暴跌太可怕，美国多家律所宣布对宜人贷展开调查● &nbsp;智能过滤手机蓝光App『护眼宝』获150万天使轮融资● &nbsp;互联网黄金投资平台“黄金钱包”获苏州市投资有限公司C轮投资● &nbsp;主打搞笑有趣内容的分享网站“微在”获1000万Pre-A轮投资END新三板精选路演项目华新能源新三板“创新层”的项目领先的余热、余压发电技术年净利润2亿，50%的业绩增长优势已有3000万的领投基金我发誓这个项目你都没见过！了解更多项目详情请致电雷总：15991458564或扫码添加微信随时咨询为您做更专业的项目解读\r\n                    ",
                        "viewCount": 7,
                        "from": {
                            "name": ""
                        },
                        "title": "2、补贴太猛,据传<!--red_beg-->Uber<!--red_end-->上半年至少亏了12.7亿美元据路透社报道,彭博社援引知情人士消息称,全球最大的打车服务提供商<!--red_beg-->Uber<!--red_end-->在今...",
                        "url": "http://mp.weixin.qq.com/s?__biz=MzI4NTMzMzI5NA==&mid=2247484167&idx=1&sn=83fb1bc3cca4f9fde34ed0bed6bb7df1&scene=0",
                        "pDate": "2016-08-27 18:03:05",
                        "imageURLs": [
                            "http://mmbiz.qpic.cn/mmbiz/3iaMSfILjaRcqUTa7QyzBorNBBwKKrYvwzqHeJsx7lgCLOTia6Q9AlXicEfiaAsNdPCR2MRiczRibRQa0uYSUmuDWfzg/640?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz_jpg/3iaMSfILjaRcNu9ichicyYw6bd5FVs5nqL3B5evfp5wInqZKelhichFU7lRWZ8DBKPtQDFhOgZWCVaustkORYhn6bA/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz_jpg/3iaMSfILjaRcNu9ichicyYw6bd5FVs5nqL37GClvhm6e0gicRxz7U6iaUTUSLLutyur7UFlzJ3yYSokdEbRUBe7icNcg/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/cZV2hRpuAPjEIibB1UYw1VMPzscNxReKZVxEh23qB9KgPqFq3uoyBy3M93PcFOunrvjkYVrtfvXMworbBuWAZ4A/0?",
                            "http://mmbiz.qpic.cn/mmbiz_jpg/3iaMSfILjaRc0tSorDYC6rcaWD9InvSwt5xazuKZrO0T1e3DgXLeXalUaZrX0o8ibrz60HN54RvB6ltrqHEkLicvA/0?wx_fmt=jpeg"
                        ],
                        "id": "2506e50becb3013cec722658099d6a49",
                        "likeCount": 1
                    },
                    {
                        "content": "\r\n                        \r\n\r\n                        \r\n                        　　在全球多個國家均成功登陸的Uber手機叫車程式，自去年10月在本澳初試啼聲後，即引起本澳電召汽車服務的大革命，更對本澳的士行業構成嚴重威脅;不過，它的嶄新服務理念，卻明顯難以得到本澳政府部門的「青睞」，經歷快十個月光景，更到了生死存亡之秋。　\n　據立法議員區錦新日前在社交網站Facebook上載Uber本月22日給他的信件，Uber在信中稱，自去年10月底登陸澳門以來，警方已對超過300位澳門Uber司機開出合共超過1,000萬元(澳門幣，下同)罰款，警方毫無法律依據拘留乘客，甚至屢次到訪司機住處騷擾，公司無法繼續在澳門營運，打算服務至下月9日為止。原文閱讀請戳↓十月罰千萬 &nbsp;Uber下月黯然撤澳\r\n                    ",
                        "viewCount": 194,
                        "from": {
                            "name": ""
                        },
                        "title": "在全球多個國家均成功登陸的<!--red_beg-->Uber<!--red_end-->手機叫車程式,自去年10月在本澳初試啼聲後,即引起本澳電召汽車服務的大革命,更對本澳的士行...",
                        "url": "http://mp.weixin.qq.com/s?__biz=MzA3NTg2MjAxMw==&mid=2650404341&idx=1&sn=f21b7350eabe319383129be3f23427ed&scene=0",
                        "pDate": "2016-08-27 17:56:30",
                        "imageURLs": [
                            "http://mmbiz.qpic.cn/mmbiz_gif/QdcF3DoEwNV7BCDE1ibibz49zUWxvkpMhiaxyv12bozMQW3qhoib0cMU5wgRqgKJ5V7FYSqnZfo2BXibhX79jkiahjIg/0?wx_fmt=gif",
                            "http://mmbiz.qpic.cn/mmbiz_jpg/QdcF3DoEwNV7BCDE1ibibz49zUWxvkpMhia0icmgEuicvpeQwasd4yrfjISfb2o41Kq9Eic409IwvUbFEicpUGdeuGGUQ/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz_png/QdcF3DoEwNV7BCDE1ibibz49zUWxvkpMhia72ljkk3aP8pw2Z1qcqY1ict6M57UGrKKBspBwnsKuyibRZlVQ9lVM5qw/0?wx_fmt=png"
                        ],
                        "id": "06acd246de94d26e5ab827cb439f3a97",
                        "likeCount": 1
                    },
                    {
                        "content": "\r\n                        \r\n\r\n                        \r\n                         &nbsp; &nbsp;2002年1月29日发行，后波普、爵士放克。\r\n                    ",
                        "viewCount": 1,
                        "from": {
                            "name": ""
                        },
                        "title": "2002年1月29日发行,后波普、爵士放克.",
                        "url": "http://mp.weixin.qq.com/s?__biz=MzAwNjYxMzMxOQ==&mid=2473814392&idx=7&sn=1e048634d925aa0fa14032d9b172c91a&scene=0",
                        "pDate": "2016-08-27 12:24:11",
                        "imageURLs": [
                            "http://mmbiz.qpic.cn/mmbiz_jpg/xpsyUae6TrTLSPibWBYPicMIHS7eBD4m7hpqIKcKaicxJnAo8MYFDS4ULr41PjKIUywlTx6Rj9acibeUaUAf1ocPDw/0?wx_fmt=jpeg"
                        ],
                        "id": "4f8f9f08485e619c0637101aaa238ab3",
                        "likeCount": 0
                    },
                    {
                        "content": "\r\n                        \r\n\r\n                        \r\n                         【科技讯】8月26日消息，Uber作为一个发展非常完善的业务，大家不假思索得都会认为Uber肯定赚翻了。但据外媒最新消息，Uber今年上半年的亏损至少达到12.7亿美元，很明显，今年全年的Uber亏损的金额肯定会远远超于这个数字。在Uber与投资者的电话会议上，Uber首席财务官对公司财务状况进行了报告，今年第一季度Uber亏损5.2亿美金，第二季度亏损更是达到了7.5亿美金，也就是说Uber在今年上半年总共亏损了至少12.7亿美元。纽约大学商学院教授Aswath表示整个人都惊呆了，“很难见到一家科技公司亏损这么多，烧钱这么快！”之前最烧钱的公司亚马逊全年也就亏损14亿美金，而Uber在半年就已经远远超过这个数字，预计明年会亏损更多。&nbsp; 说来说去Uber的钱都挥霍到哪里了?专家解释说亏损主要是在全球范围内，Uber对公司的补贴。Uber希望通过这一举措帮助其在全球范围内进行更大的扩张以及进行市场份额的争夺，为此去年就挥霍掉了20亿美金。&nbsp;连续的亏损也是Uber撤出中国的主要原因，之前Uber与滴滴长期的竞争也使双方元气大伤，人们不禁开始对Uber的未来感到担心，但是业内人士却表示，这只是Uber亏损的最高点，在8月后，人们不会再看到Uber的财政报告中有针对于中国市场的大规模亏损，甚至有望看到收益。&nbsp; &nbsp; 根据Uber和滴滴达成的收购协议，滴滴会给予5.89%的股权，相当于17.5%的经济利益，以及向Uber现金投资10亿美金。在烧钱之后，Uber能否恢复元气开始捞钱，也只能等Uber下半年来解答了，但是Uber对于上述消息并未作出回应。摩多限时免费资源下载：回复后台{1}免费领取【中信、阿里、腾讯等几十家公司机构倾情巨献】2000多份专业报告，还有5120Ｇ免费资源哦！　　　　 &nbsp; &nbsp; &nbsp; 　　 &nbsp; 摩多智造　　　　　　　　 &nbsp; &nbsp; &nbsp; 全球领先3Ｄ智造平台\r\n                    ",
                        "viewCount": 2,
                        "from": {
                            "name": ""
                        },
                        "title": "【科技讯】8月26日消息,<!--red_beg-->Uber<!--red_end-->作为一个发展非常完善的业务,大家不假思索得都会认为<!--red_beg-->Uber<!--red_end-->肯定赚翻了.但据外媒最新消息,<!--red_beg-->Uber<!--red_end-->今...",
                        "url": "http://mp.weixin.qq.com/s?__biz=MzI1MzQyMTk1Mw==&mid=2247483653&idx=1&sn=e19ce07570c97dfd57b47faf525b75ce&scene=0",
                        "pDate": "2016-08-27 08:05:02",
                        "imageURLs": [
                            "http://mmbiz.qpic.cn/mmbiz/p6Vlqvia1UiczKYzR5BFpbgdTZibauic3QAl9YPzziclA5oL4CFvYbKeUoClXvibGgdhmlZHqjZPa0xghibJ448xCdvZg/0?wx_fmt=gif",
                            "http://mmbiz.qpic.cn/mmbiz_jpg/TI6sOKNyhwWjr5gtwNliajdiaFTSfkN6E5lFHYicM1P4Wac5ibDPBmU4WGyRuHiad4o7mhWf5XNO6sGlfjJuNxppXaw/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz_jpg/TI6sOKNyhwWjr5gtwNliajdiaFTSfkN6E5nhIYzLyVpibFmiaeGghWEsBrohTJAPv94HlCxdlmEFuBTgFN6iaxwGMXg/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz_jpg/TI6sOKNyhwWjr5gtwNliajdiaFTSfkN6E5DmN7RVx8UibGJ7KoW0x57q7cQja2icfF4Yhz5ta5Hfb8UCgPFTZegBIA/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz_jpg/TI6sOKNyhwWjr5gtwNliajdiaFTSfkN6E5jtSiad9kLqdmOA8KEaPVDTz3micVia5UicSmibcJ5JWbLCkoZIz7QRpuLicw/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz_jpg/TI6sOKNyhwWjr5gtwNliajdiaFTSfkN6E5nibMPQ8uutKibzZ0RicxKh6Q47Bt9NEQebgnmbxUZOJXNT4kJthrN3w5Q/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz_jpg/TI6sOKNyhwWjr5gtwNliajdiaFTSfkN6E5kUyzvHnraYlx6uia4YYmyWMFDdnaPRUyYlf2k1co2vUWb8QCrTiclfjQ/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/yqVAqoZvDibFmQoNR6iaxQxSgCeqT5RVqMJPskOZwibpscACpabsMIWwo3JTOyarP4H3zpeCJ9kaEZNicNEmleja1Q/640?wx_fmt=png",
                            "http://mmbiz.qpic.cn/mmbiz/iaGswicCbWm6ibZNRFa5gwkXz2ER9YzWRLpfvT5gxkf7FgUvSNFwvyzKWZs9UmqDemibY7KLYkt07L9ZmgWI7WnVIw/0?wx_fmt=gif",
                            "http://mmbiz.qpic.cn/mmbiz_jpg/TI6sOKNyhwWNXtmNCicC0DOnowWFOgDDWIvruK0l1Oia0icG0XIZx4Nbemjyiaj2r9uqEuENbR5cMrYWWrV1mCXNicQ/640?wx_fmt=jpeg"
                        ],
                        "id": "44212e946dfd5188f9591a0fd2ba8c21",
                        "likeCount": 1
                    },
                    {
                        "content": "\r\n                        \r\n\r\n                        \r\n                        去年深 JS 的时候，大家在感叹我们会场建筑优雅的同时，也在吐槽我们深 JS 会场交通的闭塞。我们组织者自己也深有同感，所以今年我们很高兴的告诉大家，今年的宁JS•JSConf 中国 2016 我们有幸能够和 Uber 中国达成合作，Uber 中国作为我们今年的特别出行赞助商将给大家提供一系列优惠码。优惠码使用：老用户使用 ningjs 优惠码可抵消 5 元打车费用新用户使用 jsconfcn 邀请码注册可获得 3 张 10元的优惠券所有优惠码的有效期从 9月3日 00:00 开始至 9月4日 23:59 结束所有优惠码仅限南京地区使用更多大会信息，可以访问我们的&nbsp;[官方网站](http://2016.jsconf.cn)。如果你希望支持中国JavaScript开发者社区，如果你有任何疑问欢迎给我们留言或发信&nbsp;support@jsconf.cn。关注我们的微信公众号来接收本次大会的最新消息。&nbsp;\r\n                    ",
                        "viewCount": 313,
                        "from": {
                            "name": ""
                        },
                        "title": "我们组织者自己也深有同感,所以今年我们很高兴的告诉大家,今年的宁JS&bull;JSConf 中国 2016 我们有幸能够和 <!--red_beg-->Uber<!--red_end--> 中国达成合作,...",
                        "url": "http://mp.weixin.qq.com/s?__biz=MzAwODMwMDAwNg==&mid=2649327865&idx=1&sn=aab192b4e6576262d0bd747446f5ebf0&scene=0",
                        "pDate": "2016-08-26 11:31:29",
                        "imageURLs": [
                            "http://mmbiz.qpic.cn/mmbiz_png/ZwKU0haYunUFAfPqP6n1V8e5t7ibgYicH0aCXE7SAlNa1FiawU6IfALrgUK99oFVqG1vNOXUfyyMsaemeqic32Uxgg/0?wx_fmt=png",
                            "http://mmbiz.qpic.cn/mmbiz/ZwKU0haYunW7uM4ogHdpXzW4aibnN9c1eCG5VogTdwky1EI1uzdcbzrZgpddROyjw8s9hSLExkxNw9J5N94ib83g/640?wx_fmt=jpeg"
                        ],
                        "id": "c81b768ee2abe5c881d9bbf105bc4ebf",
                        "likeCount": 5
                    },
                    {
                        "content": "\r\n                        \r\n\r\n                        \r\n                        &nbsp;作为一名过来人写下标题时内心是澎湃的因为胡辣汤简直太好喝......&nbsp;当然，重点不是胡辣汤而是有胡辣汤的这座城市以及和我们一起喝下胡辣汤的人&nbsp;其实，优步待遇没有多豪华就是零食水果饮料随便拿一周也就胖三斤吧&nbsp;其实，优步团队没有多好玩就是个个颜美逗比欢乐多盼望上班，下班靠赶&nbsp;其实，优步工作没有多伟大，就是从0到1开拓了一个新的城市再从1到100改善了城市交通和环境&nbsp;如果你想和我们一起喝胡辣汤就来吧，千万别客气！请将简历投递到&nbsp;intern.uberzz@gmail.com邮件主题命名格式：岗位 + 姓名 + 学校 + 年级 + 每周N天 + 可实习M个月扫描下方二维码，或微信搜索“胡辣汤U”即可关注！UBER简介UBER优步，是全球领先的创新科技企业，于2010年成立于美国硅谷，目前在全球6大州、68个国家和地区的近400座城市推出服务。2014年，Uber正式落地中国市场，目前已覆盖中国39个城市（包括了近期四川省内新开的15个城市）。Uber智能手机App基于专有的领先技术平台开发，将乘客与司机即时、就近、精确、无缝连接——为乘客提供多样化的出行选择和高品质的服务，为合作司机带来更多就业和工作机会。用户指尖轻点即可开启由专属司机带来的安全可靠、方便快捷、优雅从容的新一段旅程。穿越城市，无远弗届。\r\n                    ",
                        "viewCount": 12,
                        "from": {
                            "name": ""
                        },
                        "title": "<!--red_beg-->UBER<!--red_end-->简介<!--red_beg-->UBER<!--red_end-->优步,是全球领先的创新科技企业,于2010年成立于美国硅谷,目前在全球6大州、68个国家和地区的近400座城市推...",
                        "url": "http://mp.weixin.qq.com/s?__biz=MzA3MTU3MzA1NQ==&mid=2651539386&idx=2&sn=04b18344f4883d63720616b04b8e2507&scene=0",
                        "pDate": "2016-08-25 22:50:49",
                        "imageURLs": [
                            "http://mmbiz.qpic.cn/mmbiz/JqL5PgdqgUr3xgV9u5DTiaax9cQWI64Zqp70GdtMlYm42Mib2SrBHRiaQ2Gq1yVyRDrhduHy7UWEIwS04UHuoCXyA/640?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/KvIwjYibqmBHDpHl8ibib0lMBzvdn1c76uGOJ6Vcib7jzYXw7vcKVP6UmnIicfZkBKRxO1EdV4DGdUB9JpYMRia6f4iaA/0?",
                            "http://mmbiz.qpic.cn/mmbiz/KvIwjYibqmBHDpHl8ibib0lMBzvdn1c76uGPae2phDGvNZ9ghcKelmNvXGIlXx48GrEibfe7018pIvVdE90Hnib01ww/0?",
                            "http://mmbiz.qpic.cn/mmbiz/KvIwjYibqmBHDpHl8ibib0lMBzvdn1c76uGERVVufJzpko9qLnDsxuxBaFsJYfFsqDy1k0CdKtr0RLovGU1VkSN2w/640?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/KvIwjYibqmBHDpHl8ibib0lMBzvdn1c76uGoMJGVJ1UV7YPmqEibNH2yHtb1VmNw5tAG0PyLGs3zmHaIkxIztggx5g/640?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/KvIwjYibqmBHDpHl8ibib0lMBzvdn1c76uGYI3HeLwr9hAyXpVY1moumg4u0Kyk22horsv9EzX7icUlLLvcPPc3EGQ/640?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/KvIwjYibqmBHDpHl8ibib0lMBzvdn1c76uGqddkRGcV7hyeKdDrJGUd3PbDqSFD0jSMG5z9rMWvHPT5sf0QAhxofA/0?",
                            "http://mmbiz.qpic.cn/mmbiz/KvIwjYibqmBHDpHl8ibib0lMBzvdn1c76uGf5WfHxrcFDibGLtX3Eh1xVvC3gSa9kYRuF0m9zQTevficwziceH7sdLQw/0?",
                            "http://mmbiz.qpic.cn/mmbiz/KvIwjYibqmBHDpHl8ibib0lMBzvdn1c76uG4qOlPGAsO9mib7gDicLdONB98MRibFEMEgp5uTQ5j0Yl2VCHbalbl5Lkw/0?",
                            "http://mmbiz.qpic.cn/mmbiz/KvIwjYibqmBHDpHl8ibib0lMBzvdn1c76uGBmq3R5h7icKjOicRaAVr021ayLGkV2U6BhHNjuMoDCt6PkJJrE9YJQNg/640?wx_fmt=jpeg"
                        ],
                        "id": "2b42307cb4fd94ed35765f0759f53899",
                        "likeCount": 1
                    },
                    {
                        "content": "\r\n                        \r\n\r\n                        \r\n                        &nbsp;Uber是共享经济下的产物，它之所以成功，就是因为它解决了打车领域信息不对称，通过建立联系乘客与车辆的平台，整合私家车主，通过系统匹配信息，解决资源闲置的问题，从而提高资源利用率，降低了交易成本，从中获得回报。那么如果Uber模式运用到医疗界，通过整合利用各大医院和诊所的医生资源，让患者自主就近选择适合自己病情的医生就医，以新的“Uber医生”的模式就医，会有怎样的前景呢？这次我们有幸请到了仁济医院消化科陈胜良主任，个人创业Uber中医互联网移动陈磊总经理来谈谈他们对Uber医生模式是否适合医疗界的看法。嘉宾介绍陈胜良&nbsp;陈胜良，医学博士，理学博士，美国密西根大学博士后。主任医师，博士研究生导师。科副主任，仁济医院南院执行主任陈磊&nbsp;陈磊，中医Uber移动互联产品创业者&nbsp;万怡在美国整体医改的大背景下，借用Uber模式来提供新型基础医疗服务的商业化公司已开始逐步出现。针对中国目前的“看病难”的问题，我们能否也借鉴Uber模式看医？医疗领域的特殊性能否适应Uber模式？如果适应，在推行Uber模式看医的过程中会遇到哪些问题和风险？我们能否也借鉴Uber模式看医？相比于美国的医疗体制及运行状况，在中国Uber方式的医疗运营模式将更有推广的必要性和更高的效率。&nbsp; ——陈胜良原因有以下几个：中国没有美国那样健全的分级医疗体系和急救体系，Uber方式可以弥补体制不足，实现医疗网络覆盖点与面的渗透性补充。中国人口基数大，健康和疾病常识或不及美国民众，Uber方式，借助信息化技术，分诊更准确、更便捷、更高效。弥补中国百姓可能存在的疾病科普知识的不足，是其快速、高效确定和被纳入疾病精准专科的医疗部门或就医程序。中国人均医疗资源不及美国，Uber医疗服务方式，或使现有资料利用率提高。借助于Uber体系，基于专科（甚至专病）医生团队更容易实现团队内的教育和管理，实现不同地域医生处置疾病的专业技术同质化。也有利于医疗行为的规范化以及遵纪合法性。其他行业互联网及移动终端支持的Uber方式业务运营（如网店等）的发展历程显示，中国民众对Uber运营模式的喜爱、跟宠值得信赖，再加上多点执业、医药分开、移动支付等方方面面的法律和规则的允许，Uber方式医疗在中国的前景看好。我们有信心做出大胆的预测，或许在不远的将来，Uber就医方式将极大程度地取代现行门诊挂号和诊室就医模式，实现医疗运行体系的根本变革。我赞成在中国开展医生Uber模式，对于解决目前看病难看病贵的问题会有突破。——陈磊看病难的问题解决，有一个基础路径，就是“分级诊疗和多点执业”，看病贵的问题更加复杂些，但看病难如果解决了，看病贵也会容易解决。Uber模式是一种“众包模式”，实现了错配资源的修正配置，尤其是个性化需要和个性化供给方面的错配修正，并把以前错配造成的交易成本节省下来，成为新的利润。我们社会上目前的看病问题，其实未必必须由uber模式来解决，解决问题的方法肯定有多种，但目前看来，Uber模式不失为一种相对好的方法，我们甚至还没有看到一种可以超过它的其他方法。Uber可以把错配的资源修正过来，而且医患需要是非常个性化的，这种特点正好符合Uber的特长。因此原理上讲，我认为可以借鉴uber模式解决我们的医疗问题。当然不是简单复制汽车Uber，这里面需要一些因地制宜的改良。医疗领域专业性强，不是开车那么简单，但核心没有变：个性化、需求分散、集中解决成本高、信息不对称，众包解决，整个系统实现了自组织，这高度符合Uber模式的特征，所以是可行的。医疗领域的特殊性能否适应Uber模式？&nbsp;医疗行业领域的特殊性，提示可能不同的业务, 但基本面是肯定的，就是Uber方式能够在医疗业务领域有很好的作为。——陈胜良对于依赖药物治疗疾病，Uber方式几乎能够解决所有的问题。需要医疗设施、住院、手术等医疗行为，借助Uber方式，可以更高效地分诊，更高效地帮助患者进入医疗团队的服务程序。某种意义上说，后种情况，Uber方式的优势也是巨大的。如果适应，在推行Uber模式看医的过程中会遇到哪些问题和风险？&nbsp;&nbsp;目前可见的，Uber医疗运行体制的问题和风险或有以下几点：&nbsp;——陈胜良医疗行为相关的法律法规层面，政策的不确定性；医疗队伍的资质准入相关的责权；医疗团队建设的责权利；医疗保险制度的契合程度；医疗事故、差错的处置；相关保险业的契合程度，等等。万怡有人说中医比西医更加适合Uber模式，因为中医不存在分级诊疗的基础矛盾，医生对设备和工具也没有过度依赖，医生资源就会相对充足，中医在慢病管理方面有天然优势，对于这一说法您赞同吗？中西比西医更加适合Uber模式，对于这一说法您赞同吗？中医比西医更适合Uber模式。 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ——陈磊首先不能做西医Uber。美国的医疗体系经过这么多年的演进，从大医院体系到医生集团体系，分分合合都有了充足的经验积累，现在衍生出来的Uber模式，是在美国的医疗体系土壤下生发的，一方面他们的基础体检和设备都比较齐全，另一方面，医生资源相对充沛，所以他们玩儿Uber模式似乎更加容易。但中国的西医医疗环境则大不一样，我们的分级诊疗、多点执业，倡导了很多年，没有办法实行，人们还是集中到大医院看病，医生也“安土重迁”，有一个重要原因是基层医院的设备设施有很大差距，而西医是不能离开诊疗设备的，所以任何想要做自由执业的医生，自身无法承担医疗设备的供给，也就导致他们无法离开大医院；同时，医生对某个医院的设备熟悉程度是有路径依赖的，而离开某个医院，会对他工作的效果效率产生较大影响，因此这个因素会影响他们开展“多点执业”。仅就这一点粗略来看，西医Uber就不可行，病人必须依赖医院可靠的设施设备，医生也必须依靠医院大量的设备来保障自己的医术。这是西医乃至西方文化的必然影响，好的工具在西方科技以及西医技术中举足轻重，而好的工具在中国是稀缺的，集中在大医院的。那么慢病管理是否可以通过西医Uber解决呢？我认为也不可行，主要还是慢病管理也依赖工具的缘故，另一方面，慢病管理涉及到患者长期和整体的调理，持久地用一个固定医生会比Uber“接单”医生效率高。我倾向于做中医Uber。原因是：中医不是工具论，不存在分级诊疗的基础矛盾，因为无论水平高低，中医医生没有对设备和工具的过度依赖，望闻问切足矣，所以中医医生的单兵作战能力强，这样医生资源就会相对充足，有医患配对的基础；&nbsp;对于高频多发的病种，中医有成熟便捷的治疗手段，即使对于相对复杂的病，中医也有循序探知的能力，不至于束手无策，这样，中医医生就具备了多点执业的条件，盈利有保证；中医在慢病管理方面有天然优势，这样有足够的需求释放到uber平台上来。所以，如果Uber模式能够成功，我也认为会在中医领域成功，而不会发生在西医领域。但是我们千万不能用汽车Uber的体验模式生搬硬套到医生Uber上去强求体验，要记住Uber说的是一种众包机制。&nbsp;&nbsp;不赞同！这个问题的实质是就是我上面提到的不同医疗行为，Uber方式解决问题的程度不同&nbsp;——陈胜良只依赖药物处置的疾病，Uber几乎能够解决所有的问题，与中医和西医无关。由于中医的医疗行为更难区域同质化，中医才有Uber方式产生纠纷的风险更高一些，责任认定更难一些，监管更加不得力一些。实际上Uber医疗质量的把控，最容易高效的原则是实现医生团队为主题的的自我管理。在目标实现的意义上讲，中医系统比西医系统更难做到。万怡现在已有国内医疗机构在向移动医疗，互联网医疗发展，像春雨医生开始发展线下诊所，利用他们现有的医生、用户资源和春雨医生品牌，迅速搭建线上线下系统，丁香园也在布局线下诊所，似乎终点就是Uber模式，对这一现象您怎么看？您觉得这个发展前景怎么样？国内医疗机构在向移动医疗，互联网医疗发展，对于这一现象你怎么看？你觉得这个发展前景怎么样？不要小看互联网，它解决的是信息机制的问题。 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ——陈磊首先，国内医疗机构的移动化和移动互联的精神还是有比较大的区别的，前者是把互联网当作一个宣传渠道，或者是医患信息沟通的渠道，当然可以算作一种移动互联，如今卖苹果的也上网了，但这并不说明农业实现了现代化，互联网的工具化和产业互联网化是两个命题，前者是通道，后者是一种机制。很多老法师跟我谈到中医Uber时非常不屑，认为中医就是靠真功夫，怎么可以靠互联网，我说没错，中医本身必须靠真功夫，靠匠心做到日本中医那样的水平，但也不要小看互联网，它解决的是信息机制的问题，在中国永远不缺好技术、好人才，但我们没有好机制，所以人们有好技术也不用，好人才也移民了，所以我认为Uber模式以及它代表的互联网精神，主要解决的还是一个选择机制的问题，是机制和制度上的创新，尤其值得我们中国人留意。春雨、丁香等开始发展线下，因为他们发现线上模式开始落不了地了，老早本来寄希望于节省排队时间，或打破医药垄断，让整个市场更加市场化，没想到越走越窄，不能总是赔钱赚吆喝啊，于是发展线下，他们长大了，成熟了，长成了曾经最不喜欢的样子。也许这就是先行者必须付出的代价。但是也不是坏事，他们在探索最恰当的互联网医疗的存在形态，纯线上不行，就从线上贯通线下，但其实一想，他们的终点就是Uber模式，把线上掌握的所有医疗资源，通过线下诊所落实到最终的患者身上。他们走了一个大圈子，成为Uber的样子，但如果照现在的路子走下去，他们还是活不下来，会沦为另一种医院，因为西医在目前的中国，不存在互联网化的物质基础。原因如前。&nbsp;&nbsp;要秉持以医生团队为主题的思路和原则，才能使Uber医疗运作方式健康发展&nbsp;——陈胜良目前经营互联网医疗的形式和企业很多，运营状况参差不齐。事实上其中的多数都不理想。您提到的“春雨医生”也运营状况堪忧。运营效果不佳的主要原因有几个：1）拓展医疗需求的市场不利；2）不占有医生和医疗服务资源；3）运行模式没有实现真正的Uber方式4）投资没有后劲。解决这些问题的关键是掌握优秀的医生资源和医疗服务资源。其中最重要的优秀医生资源。总体上讲，优秀的医生资源在体制内。医生离开体制，业务量会下降，医疗水平和影响力也相应下降，对医疗市场（患者）的影响力下降。不能吸引医疗资源，医疗业务下降，不能持续吸引投资，不可避免地走向萎缩。在我看来，Uber医疗运作方式要想健康发展，需要秉持以下的思路和原则：以医生团队为主题。以体制内的医生为主题，以专科（甚至专病）为脉络，选择和扶持权威专家，利用行业内的影响，建立并逐步健全区域性的服务团队，首先采用业余时间（避免与所在体制管理制度相冲突），将体制内（逐步扩展到体制外）医疗市场需求引导到Uber平台上。医生专业团队壮大后，就好比Uber的车队，不进入医生团队的医生无法服务到优质的患者，不进入类似Uber平台的患者（好比用车的客人），找不到对口的医生。医生团队借助类似Uber的技术平台实现团队医疗服务质量的同质化。形成规模以后，可以连带药品经销企业，医疗机构的加盟或连锁，逐步实现医疗运营模式的转变。“Uber医生”方兴未艾，未来一切皆有可能时下移动医疗风生水起，大健康产业经评估有着万亿级的市场容量。大多数移动医疗企业也都在尝试从线上转向线下，国家在政策上已经允许医生多点执业，各大医院也在推进分级诊疗，目的是为了解决老百姓“看病难”的问题。可医疗行业毕竟有它的特殊性，它不同于打车行业，医生资源的稀缺&nbsp;，医患关系的紧张都是目前医疗界的不可言喻的痛点。Uber模式是否适合医疗界，无疑还有很多我们需要去考虑和研究的问题，但最终我们都希望能解决老百姓的“看病难，看病贵”的难题，从而实现医疗体系高效运转，最终实现更高效的社会健康效益。投 票 &nbsp; &nbsp;Uber 模式是否适合医疗界，你怎么看？\r\n                    ",
                        "viewCount": 632,
                        "from": {
                            "name": ""
                        },
                        "title": "<!--red_beg-->Uber<!--red_end-->是共享经济下的产物,它之所以成功,就是因为它解决了打车领域信息不对称,通过建立联系乘客与车辆的平台,整合私家车主,...",
                        "url": "http://mp.weixin.qq.com/s?__biz=MzA3ODA1NDEzNg==&mid=2961485173&idx=1&sn=472716c500bff753f471e4ec8cddb336&scene=0",
                        "pDate": "2016-08-24 19:11:02",
                        "imageURLs": [
                            "http://mmbiz.qpic.cn/mmbiz/Wkg1HQQxH7n4TQgAc2CHWEbvVtdrVyWKjYdfSzK3VBkibACOtQj6DMDnRFsiag7KwxxN1Acpr9ZkUnQP3Ffyz9mQ/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/Wkg1HQQxH7n4TQgAc2CHWEbvVtdrVyWKkrsAoYHCJqy4Ngzq5kBqLk3Btf09ulpmp7Xen2GRNu1tiayWWt4qiaGg/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/Wkg1HQQxH7kptRwsqASOpwCIQQ2g7ibJ0DgY1VibsXbiaMKClGesFYemoTvWRA8GhnLcGVonxtGP8UCLQoM1OEiaEg/0?wx_fmt=png",
                            "http://mmbiz.qpic.cn/mmbiz/Wkg1HQQxH7kptRwsqASOpwCIQQ2g7ibJ0mzySt7kSnaFa4wqSaEic7x8OQTaepPYBPyjGq0aIvNAZdoIEcrAX4AA/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/Wkg1HQQxH7kptRwsqASOpwCIQQ2g7ibJ0Ze7j5g1L0j8KVCjXSBOeVKwlSjPiby8qocKwGicHeyfrmdnCOQ1VzarQ/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/Wkg1HQQxH7kptRwsqASOpwCIQQ2g7ibJ0mzySt7kSnaFa4wqSaEic7x8OQTaepPYBPyjGq0aIvNAZdoIEcrAX4AA/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/Wkg1HQQxH7kptRwsqASOpwCIQQ2g7ibJ0mzySt7kSnaFa4wqSaEic7x8OQTaepPYBPyjGq0aIvNAZdoIEcrAX4AA/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/Wkg1HQQxH7kptRwsqASOpwCIQQ2g7ibJ0DgY1VibsXbiaMKClGesFYemoTvWRA8GhnLcGVonxtGP8UCLQoM1OEiaEg/0?wx_fmt=png",
                            "http://mmbiz.qpic.cn/mmbiz/Wkg1HQQxH7kptRwsqASOpwCIQQ2g7ibJ0Ze7j5g1L0j8KVCjXSBOeVKwlSjPiby8qocKwGicHeyfrmdnCOQ1VzarQ/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/Wkg1HQQxH7kptRwsqASOpwCIQQ2g7ibJ0mzySt7kSnaFa4wqSaEic7x8OQTaepPYBPyjGq0aIvNAZdoIEcrAX4AA/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/Wkg1HQQxH7kptRwsqASOpwCIQQ2g7ibJ0DgY1VibsXbiaMKClGesFYemoTvWRA8GhnLcGVonxtGP8UCLQoM1OEiaEg/0?wx_fmt=png",
                            "http://mmbiz.qpic.cn/mmbiz/Wkg1HQQxH7kptRwsqASOpwCIQQ2g7ibJ0Ze7j5g1L0j8KVCjXSBOeVKwlSjPiby8qocKwGicHeyfrmdnCOQ1VzarQ/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/Wkg1HQQxH7kptRwsqASOpwCIQQ2g7ibJ0mzySt7kSnaFa4wqSaEic7x8OQTaepPYBPyjGq0aIvNAZdoIEcrAX4AA/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/Wkg1HQQxH7nhNtVNOHpmeIAibcZ7BxaujU4KU1UOhHKf4oqdNqjp3Da7siaaffdr2RkzYomGONkyfEI7w8U9j2bg/640?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/Wkg1HQQxH7n4PLZ4vsYhKfk6KmT1iaS45ibqib5dmgqRN0DeVr8QeR6Myyc3JqEaBxHZdOiamzK0JUwOsGu3iaXKddQ/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz_jpg/Wkg1HQQxH7lyGWwBZbcucG55iaazqibrPRwKLbroXrcK9jW7HKu735OSeQdGyNIIm7fZqMRq17T1sGzAA9MaEg5A/0?wx_fmt=jpeg"
                        ],
                        "id": "165a57d7fa9b0ea76d5a552544e475f0",
                        "likeCount": 5
                    },
                    {
                        "content": "\r\n                        \r\n\r\n                        \r\n                        中国队会拿多少金牌？这一届的奥运裁判黑不黑？运动员拿好成绩需要靠兴奋剂么？中国三大球项目能够有所突破么？……其实，这些，我们都，不care！看奥运看的是美，好吗！于是我们自己先美！美！美！起来~~据说和奥运奖牌一样稀有，UBER与小奥汀联合设计发布的限量版奥运指甲贴，你拥有了么？看看已经上手的人们是怎么晒（de）图（se）的吧~淡淡的蓝指甲与厚厚的红嘴唇更搭喔铿锵玫瑰，为女足加油！正在备战高考，对理科题库表示“热爱”的妹子，祝福你~广州的盆友，特写美美哒~祝你们俩，你们俩，你们俩，还有你们仨，幸福地生活在一起~一步、两步、三步，祝你们自己和自己玩得开心奥运指甲贴以洪荒之力出现在各个“奥运观赛场地”盈盈笑意~芊芊玉指~无论奥运赛场，还是优步旅程，我们一起拼到最后！特别鸣谢：小奥汀设计如此美丽的指甲贴！查看公众号置顶U你同行，掌握第一手政策福利\r\n                    ",
                        "viewCount": 714,
                        "from": {
                            "name": ""
                        },
                        "title": "起来~~据说和奥运奖牌一样稀有,<!--red_beg-->UBER<!--red_end-->与小奥汀联合设计发布的限量版奥运指甲贴,你拥有了么?看看已经上手的人们是怎么晒(de...",
                        "url": "http://mp.weixin.qq.com/s?__biz=MzI5MjEwMTY4Mg==&mid=2650403809&idx=1&sn=9e22e9176d46d29cc10ce3a0b3a2bfee&scene=0",
                        "pDate": "2016-08-24 17:35:20",
                        "imageURLs": [
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9INfXC3rBEFXC6YGs6TKdpcTgia4ibutuy9LnQskhAgy1XwKkcaNMWlWtw/640?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9IePKavGkKFlWNqiamwsk09rY89rgUucZfzf5jzYkOSZVNCwg2ib121BYg/640?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9IPnowf2jF2Rt6yNYwsdiasV0JymQIG9AuQBFOyxicjwZRxe9NRMCy3Ayg/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9I4zLeMZAgkG2HS5RSrdPxyTcIFibbVVoWrvtF7jkjIQFiccCvf5uvjPBQ/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9I8ADkQGoSqyPSJr652mhj180B0FErM2uQkTcKLksB8zzZPsfnXMoibJw/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9IESnOLQRLoMO7TcM0jJG0qKltMaic03eabyfdv5xxQAhtticp37hoTrxA/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9IEEXYdJ4I7icII2rKRpSOibJdqjng9GFc02j16vGufQg10GdwyLoZ82OA/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9IntVYRfbUCOoYtZXjP00nPd0Q7bIbkQMJLJA0SafLRlCvY0onibELgGw/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9IMlD8fiaZb02LTzFPI5m2gS3zG0E4EsENyaFeBQhgOt1vBxOk6ia7S3icw/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9InibBbUENK5FcQsrr68gAq41jg4F6M67Jtfwea0MGuwmVtan5ibKcfjBg/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9I06y62aEqmYMyicEaZzX80z1GHD49rv2U1D4ayWKHM6ibzaGOCcQsEIOA/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9IIYcTFyUg2DeYc0LYMjeLpuLO1JB6via1O5CFOobLqESofiaWWr8wUXog/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9IJffNE7445LOstIk3u5131SGabF6dAib35JJ3QTGYVogrB4ibEkFevOOg/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9IEhOiaBLDwetTJmy8BXltPrnHcYM017Zd7aJDxYVYZBZQPeDl2AhNweA/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9IYOkibDphZUfEm1La9eVDsFGJoxk9GjKseAaFlQ4ZxSknJ85BzNOuyhw/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9I3Da6qAg5TGWqXBsBoMWyD8zlLHxhBOe7YQNIK8R89A5Mia44wnu2AcA/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9IdWoIPdehhepMia69qSbzBY1LJWvLZvPSLWicDlDICgLYMt8TCmia7L0rA/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9ITw2qZUPjzWFrXTstZibbITDXvVSAam5HwsaJ0wpWicL2Wh7m1ZxY0hkg/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9I3dGUJtcBPXdmuyMZ6LRB7Ee5nyogyRBZm2b63zcZXk7e8FDz4bQw7Q/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9Iib2hdTB31AhEZpKK9LTLibu5uROJEBAnWSrwvbzCud2arfqpaxGmFIew/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9I1W2yTOzDowdicoVSb1hAkOFWibhDLfrV3xBSWFDprYav1cNAeQnXGNDg/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9IUr5Gx2Q38zJ4am660JNOxG8VZJsEqhvlVeOR5f1iaPcEQNU5tR5ygKw/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9IIZkdytXiaQ6Ls5nFQrUG5EC4jTjesXtvKPg2KF1AvTXB1wk0Vju0hfg/0?",
                            "http://mmbiz.qpic.cn/mmbiz/UM52u0QzslFiaEVcEpjKyicSck5F7KRw9IXsqJNxzor1MbI1kziaVPztMgMS9c2thIM7BBcBibN8MSdFCWy9RXric2A/0?",
                            "http://mmbiz.qpic.cn/mmbiz/WuryInWTnSzd1lsohGib4vvSGXL6SiaOBHHSRwU5NdCXJY6ic806vyZjlSibPHoPN7ajMtia2U41MAqjKW5tfTTrRRw/0?wx_fmt=gif"
                        ],
                        "id": "8ff9ab16a287e72b8263e863372f7f49",
                        "likeCount": 0
                    },
                    {
                        "content": "\r\n                        \r\n\r\n                        \r\n                        点击上方蓝字，即刻关注IDC咨询&nbsp;&nbsp;In her recent post, Kitty Fok , Managing Director of IDC China, shares a broader view on Uber's recent decision to sell its China business to its Chinese rival Didi.&nbsp;Kitty's key points include:The argument that the Uber-Didi deal simply shows that the China market is stacked against Western tech companies misses a broader point.Beyond alarming headlines like “How Uber Crashed,” a rather different reality emerges. Didi offered more and much better features based on their deeper knowledge of the Chinese market compared to Uber, who despite spending over a billion dollars to prop up its position in the country, was left far behind.&nbsp;The upshot of the Uber-Didi deal is that Uber now has a $7 billion dollar stake share in Didi’s dynamically growing business - not a bad result given its estimated $2 billion Uber investment in China. Its costly price war with Didi is over, and Uber is now well positioned both to acquire a much more sophisticated understanding of the China market and to devote resources to expanding in other parts of the world.&nbsp;The moral of this story is not, as some headlines screamed, “Uber Forced Out of China,” but rather that everything in China is more complicated and less ‘black and white’ as it often appears to be the case. One can argue that under the circumstances, Uber’s decision to sell is better understood not as a defeat but a strategic retreat - a smart move that will allow it to maintain a presence and develop a better understanding of China, while simultaneously freeing itself to expand in other countries.China is still going to want- and need- the involvement of international tech companies. Western firms who understand this, and can make in-depth localization, will find there are still major opportunities in China.&nbsp;Click “Read More\" for Kitty’s full post on this topic and engage with her by sharing your insights, comments and questions. &nbsp;You can also follow Kitty Fok at:- LinkedIn: https://www.linkedin.com/in/kittyfok&nbsp;- Twitter: &nbsp; @kittyfokIf quoting from this article, please use Kitty Fok’s full name and title.Stay tuned for more insights on the China market from Kitty Fok!- END –&nbsp;For inquiry, please contact:Jessica QiaoSr. Marketing Manager, IDC ChinaPhone: (+86-10) 5889 1766Email: jqiao@idc.com\r\n                    ",
                        "viewCount": 485,
                        "from": {
                            "name": ""
                        },
                        "title": "In her recent post, Kitty Fok , Managing Director of IDC China, shares a broader view on <!--red_beg-->Uber<!--red_end-->'s recent decision to sell its China ...",
                        "url": "http://mp.weixin.qq.com/s?__biz=MzA5MTc1NzQzOQ==&mid=2651740716&idx=1&sn=23e3c23c4ebb65c5b8a9466b6653d8aa&scene=0",
                        "pDate": "2016-08-24 15:59:10",
                        "imageURLs": [
                            "http://mmbiz.qpic.cn/mmbiz_jpg/QNFGDRVFYicq03Ps9KfEM72OPpFH8vXzsekLnYeBhhl03okpg6LQIRUiaUr6Nsoicy1VGHLJmFj9RFXB9EXl3wQxg/0?wx_fmt=jpeg",
                            "http://mmbiz.qpic.cn/mmbiz/QNFGDRVFYicoHZzI4ETkSLmvfWNFDl5ydkZONCtICibng5pZXE5v7J3fYia2wmkma7lWLVfW1RdG9eH7pQ8znFJWw/640?wx_fmt=jpeg"
                        ],
                        "id": "680662ca7673db00925110e9df60d517",
                        "likeCount": 2
                    }
                ]
            }
        },
        created(){
            //console.log(this);
        },
        methods: {
            toggle(){
//                this.isChartScale = !this.isChartScale;
//                this.isActivePie = !this.isActivePie;
                this.resultChartOption.isToggle = !this.resultChartOption.isToggle;
                this.resultPieChartOption.isActive = !this.resultPieChartOption.isActive;
            }
        },
        components:{

        }
    }
</script>
