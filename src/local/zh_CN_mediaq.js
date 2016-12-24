/**
 * Created by yunhailu on 2016/12/3.
 */
import _ from 'underscore';
import { zh_CN } from './zh_CN';

export const zh_CN_mediaq = _.extend({}, zh_CN, {
    apply:{
        apply:"申请试用",
        toLogin:"已有账号，请点此登陆",
        username:"姓名",
        telephone:"手机号",
        company:"公司名称",
        verification:"验证码",
        getSms:"获取验证码",
        require:"需求描述",
        submit:"提 交",
        service:"客服 : ***-********"
    },
    login:{
        login:"登录",
        toApply:"没有账号?点我申请",
        username:"用户名",
        password:"请输入密码",
        remember:"记住密码",
        getBack:"找回密码",
        submit:"登 录",
        forConsume:"为了更好的消费",
        forWode:"两情相悦，人心可测",
        forParams1:"沃德品牌气象站是公司利用情绪大数据模型开发的“品牌价值互联网监测评价系统”。企业品牌价值的核心在于用户满意度，公司通过对全互联网情绪数据的分析，精确和实时计算知名产品、知名品牌、知名企业的用户满意度和交易量，从而为企业决策提供最精准的参考意见。",
        forCcsiTitle:"中国消费者情绪指数",
        forCcsiTitleE:"CCSI    China Consumer Sentiment Index",
        forWodeTitle:" 网络舆情实时监测与智能分析大数据平台",
        forMediaQTitle:"",
        instructionForUse:"使用说明",
        forLogin:"登录",
        forFirstPage:"首页",
        applyForUse:"申请试用",
        showBrand:"品牌表现",
        hotEvent:"热点事件"
    },
    footer:{
        coppy:"京ICP备14046778号-5 联系电话：010-61934324 版权所有:沃民高新科技（北京）股份有限公司 ",
        phone:"联系电话：010-88315479 ",
        cooperation:"沃民高新科技（北京）股份有限公司、工信部电子科技情报所网络舆情研究中心，媒商实验室联合开发"
    },
    header: {
        title: "沃德媒商气象站",
        home: "热点事件",
        analytics: "数据分析",
        dashboard: "报告生成",
        compare: "比较分析",
        reports: "预警监测",
        setting: "搜索设置",
        forUse:"使用指南",
        quit: "退出"
    },
    home: {
        analytics: "数据分析",
        analyticsDec: "搜索和分析您的数据流",
        dashboard: "报告生成",
        dashboardDec: "用你的 KPI 数据构建客户快捷报告",
        compare: "数据对比",
        compareDec: "数据的各个维度的比较",
        reports: "报告导出",
        reportsDec: "创建、发送和汇总客户报告",
        setting: "监测设置",
        settingDec: "设置您所需要的监测信息"
    },
    hotEvent: {
        hotsRiver: "实时热点态势",
        sentiment: "情绪比例",
        hotsRanking: "实时热点排行",
        todayHotsRanking: "今日热点排行",
        wordsRanking: "热词排行",
        allNetHotsRiver:"实时热点态势"
    },
    analytics: {
        tabs: ["关注分析","印象分析", "意见领袖", "评价分析", "情绪分析"],
        filters: ["全部", "情绪指数", "地域分布", "性别分布", "语言分布"],
        source: ["全部", "微信", "微博", "客户端", "网页", "海外"],
        addDashboard: "添加快捷报告",
        monitor:"监测词",
        tips:"如需开通，请联系客服：010-61934324"
    },
    sentiment:{
        happy: "满意",
        anger: "愤怒",
        sorrow: "失望",
        disgust: "反感",
        fear: "害怕"
    },
    comment: {
        comment: "评价指数",
        positive: "积极",
        negative: "消极",
        neutral: "中性",
        all: "全部"
    },
    influence: {
        noTableTips: "数据处理中",
        influencer: "影响者",
        numberOfPosts: "发布量",
        sentiment: "情绪指数",
        like: "点赞数",
        resend: "转发数",
        comments: "评论数",
        rate: "影响力指数",
        close: "关闭"
    },
    theme: {
        topics: "话题排行",
        ranking:"排名变化(8小时环比)"
    },
    detail: {
        article: "层级转发关系",
        userInfo: "用户信息",
        content: "正文",
        source: "来源",
        shareChart: "传播路径",
        timeline: "转发时间曲线",
        publish: "发布时间",
        view: "查看原文",
        desc: "描述："
    },
    compare: {
        tabs: ["关注度分析", "情绪分析","评价分析", "影响力分析", "子话题分析"],
        filters: ["全部", "情绪指数", "地域分布", "性别分布", "语言分布"],
        source: ["全部", "微信", "微博", "客户端", "网页", "海外"],
        tips:"如需开通，请联系客服：010-61934324",
        addDashboard: "添加快捷报告",
        noMsgTips:"暂无数据"
    },
    addDashboard:{
        addTitle: "添加新的报表",
        addLabel: "新增名称",
        addBtn: "确认新增",
        addTips: "请输入正确的报表名称！",
        placeholder: "报表名称",
        importTitle: "导入已有的报表",
        importLabel: "选择已存在名称",
        importBtn: "确认导入",
        importTip: "导入不正确",
        cancel: "取消"
    },
    dashboard: {
        dashboard: "快捷报告",
        dashboardDec: "用你的 KPI 数据构建客户快捷报告",
        result: "关注度分析",
        sentiment: "情绪分析",
        comment: "评价分析",
        influence: "影响力分析",
        theme: "子话题分析",
        save: "打印或保存"
    },
    setting: {
        title: "设置你的项目",
        titleDec: "我们能为您的项目做些什么？",
        introTitle: "主题",
        intro: "主题包含您希望从搜索查询的搜索关键字。主题由分组组织而成，每个主题可以包含多个搜索查询。",
        addTitle: "添加主题",
        addDecH: "新建监测方案",
        editDecH: "修改监测方案",
        addDec: "您已经创建了 {0} 个监测主题方案，还能再创建 {1} 个！",
        required: "必填",
        optional: "选填",
        groupTitle: "话题分组",
        topic: "主题词",
        topicInfo: "多主题词请用逗号分隔",
        topicArr: "主题词组",
        topicArrTip: "主题词组用空格隔开，是或的关系",
        related: "关联词",
        quickBtn: "快速模式",
        advancedBtn: "高级模式",
        exclude: "排除词",
        warningSet:"预警设置",
        moodGroups:["满意","愤怒", "失望", "反感","害怕"],
        groups: ["人物", "机构", "产品", "项目", "事件", "其他"],
        create: "提交",
    },
    reportsWarning: {
        reportTitle: "预警标题",
        sentiment:"情绪",
        lastChange: "最新更改",
        trigger: "阈值",
        lastSent: "最后发送",
        actions: "动作"
    },
    profile: {
        mineTitle: "我的信息",
        userMsg: "用户信息",
        agreeApply:"申请审核",
        userName: "用户名",
        newUserName: "新用户名",
        gender: "性别",
        male: "男",
        female: "女",
        tel: "手机号码",
        email: "电子邮箱",
        password: "密码",
        oldPassword: "旧密码",
        rePassword: "确认密码",
        createBtn: "提交创建",
        modifyBtn: "提交修改",
        resetBtn: "重置",
        passDiff: "两次密码不一致",
        addSuccess: "添加成功",
        nodifySuccess: "修改成功",
        passwordCondition: "密码需要大于6位，且需要包含数字和字母",
        phoneCondition: "手机号码不正确",
        emailCondition: "邮箱不正确"
    },
    common: {
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        buttons:['确定', '取消'],
        sortBy: "排序",
        select: "-- 请选择 --",
        prevPage: "上一页",
        nextPage: "下一页",
        deleteTip: "确定要删除么？",
        all:"所有",
        wechat: "微信",
        weibo: "微博",
        client: "客户端",
        web: "网页",
        overseas: "海外",
        source:"沃德媒商气象站",
        happy: "满意",
        anger: "愤怒",
        sorrow: "失望",
        disgust: "反感",
        fear: "害怕",
        nullTip: "数据为空",
        loadingTip: "等待加载...",
        waitWords:"请稍侯......",
        hi:"您好",
        timeRanking:"时间排序",
        countRanking:"浏览数排序",
        greetRanking:"点赞数排序",
        shareRanking:"转发数排序",
        publish:"发布于",
        sourceFrom:"来源",
        dataFrom:"数据分析平台",
        match:"监测词",
        target:"指标",
        sub_source:"来自",
        phone:"010-61934324"
    },
    upload: {
        upload: "上传",
        success: "上传成功",
        fail: "上传失败",
        onlyOne: "请只选择一张图片",
        noPic: "您选择的不是图片"
    }
});
