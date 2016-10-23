### 一、主页
##### 1.实时热点事件（前5名）
- hot/realtime
- 入参：
```
{
    code: 0,
    data: [{
        id: "1234123",
        name: "里约奥运会",
        data: [{
            date: "0:00",   //时间
            value: 2   //关注值，没有就为0
        },{
            date: "1:00",
            value: 0
        }]
    },{
        id: "12341212",
        name: "南海问题",
        data: [{
            date: "0:00",
            value: 2
        }]
    }]
}
```

##### 2.今日热点排行
- hot/today
- 入参：
```
{
	code: 0,
	data: [{
		id: "1232",
		name: "柳叶刀"
	},{
		id: "1222",
		name: "里约奥运会"
	}]
}
```

##### 3.获取热点事件详情
- hot/getDetail
- 入参：id
```
{
	code: 0,
	data: {
		sentiment: [{
			key: "happy",
			value: 50
		},{
			key: "sorrow",
			value: 20
		},{
			key: "anger",
			value: 12
		},{
			key: "disgust",
			value: 5
		},{
			key: "fear",
			value: 32
		}],
		words: [{
			id: "2123",
			value: 523,
			name: "阿拉希"
		},{
			id: "9821",
			value: 843,
			name: "网易新闻"
		}]
	}
}
```


### 二、数据分析
##### 1.信息汇总
-  summary/detail
```
{
    code: 0,
    data: [{
        "date": "2014.6.8",
        "values": [{"dSource": "weibo", "value": 5},
            {"dSource": "weixin", "value": 10}]
        },
        {
        "date": "2014.6.8",
        "values": [{"dSource": "weibo", "value": 5},
            {"dSource": "weixin", "value": 10}]
        },
    ]
}
```

##### 2.获取事件详细列表
-  summary/commentList
````
{
	code: 0,
	data：[{
		"content": "\r\n                        \r\n\r\n                        \r\n                        近日，彭博社援引知情人士的消息称，Uber 今年上半年至少亏损 12.7 亿美元。报道称，Uber 上周五与投资者召开了电话会议，此次电话会议由 Uber 首席财务官高塔姆·古普塔 (Gautam Gupta) 主持召开，主要讨论了 Uber 公司财务状况。据悉，二季度 Uber 营业收入为 11 亿美元，较一季度的 9.6 亿美元上涨了 18%。去年一季度，Uber 的营收为 2.87 亿美元，二季度营收 3.76 亿美元。尽管营收持续增加，但 利润始终无法提升。今年一季度，Uber 税息折旧及摊销前亏损为 5.2 亿美元；二季度情况变得更为糟糕，亏损上升至超过 7.5 亿美元。这意味着今年上半年，Uber 至少录得 12.7 亿美元亏损。这一亏损态势与 2015 年上半年类似：当时 Uber 损失了接近 10 亿美元。Uber 巨额亏损有多方面的原因，其中包括给司机和乘客的补贴，与滴滴出行的激烈竞争。据 Business Insider 称，在与滴滴持久的争夺战中，Uber 一年的亏损额就达到了 10 亿美元。本月初，滴滴正式宣布收购 Uber 中国。这意味着今后 Uber 的财务报表中，将不包括这些亏损。在美国本土，Uber 也有强大的竞争对手——Lyft。这两家公司都提供低廉价格服务，并且给乘客和司机补贴。Lyft 业务只在美国本土，在 2015 年出现 3.5 亿美元亏损。今年 4 月，Uber 称其在美国和加拿大实现盈利，平均每次出行有 0.19 美元的利润。然而这不过昙花一现，在二季度，Uber 在美国区又出现亏损，损失达到 1 亿美元。Uber 发言人拒绝就上述消息发表评论。之前有消息称 Uber 中国和滴滴合并的一大重要原因就是烧钱太疯狂，以致投资人都看不下去，现在看来并非空穴来风。- - - - END - - - -&nbsp; 推荐阅读 &nbsp;点击图片阅读\r\n                    ",
		"from": "微信",
		"title": "近日,彭博社援引知情人士的消息称,<!--red_beg-->Uber<!--red_end--> 今年上半年至少亏损 12.7 亿美元.报道称,<!--red_beg-->Uber<!--red_end--> 上周五与投资者召开了电话会议,此次电...",
		"url": "http://mp.weixin.qq.com/s?__biz=MjM5NTAyNjE4MA==&mid=2649612100&idx=3&sn=67ebff804e7a95b609e79c97efcd850c&scene=0",
		"pDate": "2016-08-27 18:06:00",
		"id": "22b4dda636f0242468df1308aa77e1d1",
		"sentiment": "positive || negative || neutral",  //待确认
        "likeCount": 12,        //点赞数
        "fansCount": 5,        //粉丝数
        "viewCount": 10,        //阅读数
        "shareCount": 20,        //转发数
        "commentsCount": 14,        //评论数
        "followCount": 32        //关注数
	}]
}
````

##### 3.获取情绪详情
-  sentiment/detail
```
{
    code: 0,
        data: [{
                "date":"2016-08-01",
                "values":{
                    "weibo":{"happy":21,"anger":12,"sorrow":12,"disgust":45,"fear":40},
                    "wechat":{"happy":8,"anger":6,"sorrow":1,"disgust":0,"fear":0},
                    "web":{"happy":25,"anger":1,"sorrow":2,"disgust":24,"fear":4},
                    "client":{"happy":5,"anger":1,"sorrow":1,"disgust":8,"fear":7},
                    "overseas":{"happy":0,"anger":10,"sorrow":24,"disgust":9,"fear":45}
                }
            },
            {
                "date":"2016-08-02",
                "values":{
                    "weibo":{"happy":20,"anger":4,"sorrow":18,"disgust":32,"fear":12},
                    "wechat":{"happy":2,"anger":32,"sorrow":4,"disgust":8,"fear":6},
                    "web":{"happy":10,"anger":20,"sorrow":2,"disgust":6,"fear":10},
                    "client":{"happy":5,"anger":16,"sorrow":0,"disgust":6,"fear":30},
                    "overseas":{"happy":12,"anger":36,"sorrow":14,"disgust":35,"fear":20}
                }
            }
        ]
}
```

##### 4.获取影响力列表信息
-  influence/list
```
//待确认
{
	code: 0,
	data: [{
	    "id": "1234",
		"influencer": "台湾",
		"post": 6,
		"like": 123,
		"resend": 32,
		"sentiment": {
			happy: 3, anger: 5, sorrow: 10, disgust: 3, fear: 5
		},
        "comments": 203,
		"rate": {	
			"key": "up",
			"value": "24%"
		}
	}]
}
```

##### 5.获取最受欢迎的影响力
-  influence/popularList		
```
//待确认
{
	code: 0,
	data: [{ 
        "id": "12345678", 
        "link": "http://www.baidu.com", 
        "title": "Most active author", 
        "source": "Online News", 
        "value": "shi jian", 
        "post": 64
	}]
}
```

##### 6.获取主题分析的字符云
-  theme/wordcloud
```
{
	code: 0,
	data: [{
		"name":"visualMap",
		"value":148
	}]
}
```

##### 7.获取主题关键词比率排行（前5位）
-  theme/trendlist		
```
//待确认
{
	code: 0,
	data: {
		"up": [{	//5个
			"key": "自己",
			"value": "121%"
		}],
		"down": [{
			"key": "自己",
			"value": "121%"
		}]
	}
}
```

##### 8.获取主题详情数据（line图）
-  theme/detail
```
{
    code: 0,
    data: [{
        "date": "2016-08-21:12"
        "values": [{
            "name": "韩寒",
            "value": 0
        },{
            "name": "网易新闻",
            "value": 14
        },{
            "name": "美国选举",
            "value": 3
        },{
            "name": "新浪微博",
            "value": 1
        },{
            "name": "柳叶刀",
            "value": 8
        }]
    }]
}
```

##### 9.获取数据源文章数、点赞数、转发数、评论数
- 入参：source
- theme/getTopData
```
{
	code: 0,
	data: [{
		id: "123321",
		name: "南海问题",
		data:[{
			date:"2016-10-03",
			article: 347,
			comment: 201,
			resend: 53,
			like: 234
		}]
	}]
}
```

##### 10.获取主题排行（前20）
- theme/best
```
{
	code: 0,
	data: [{
		id: 495, 
		name: "韩寒", 
		value: 69294
	}]
}
```

### 三、数据对比
-  compare/sentiment(是3)

### 四、监测设置
##### 1.获取话题列表
- topic/list
```
{
	code: 0,
	data: [{
		group_id: 2, 
		group_name: "机构", 
		list: [{
			topic_id: 30, 
			topic_name: "优步"
		}]
	}]
}
```

##### 2.添加话题
- topic/add
- 入参：name, group_id
```
{
	code: 0,
	data: {
		topic_id:33
	},
	message: "success"
}
```


##### 3.删除话题
- topic/delete
- 入参 id
```
{
	code: 0,
	data: {
		success: 1
	},
	message: "success"
}
```

### 五、Dashboard报表
##### 1.获取 dashboard 列表
- dashboard/list
- 入参: user_id(如果cookie里包含，地址栏可不传)
```
{
    code: 0,
    message: "success",
    data: [{
        id: 1,
        name: "alipicture_7d",
        data: [{
            topic: "ali",
            subtopic: "",
            source: "web",
            time_interval: 7,
            time_dimension: 1,
            summary: 1,
            sentiment: 0,
            comment: 0,
            influence: 0,
            theme: 0
        }]
    }]
}
```

- dashboard/add
- 入参 
必选参数:name,topic，
可选参数:subtopic,source,time_interval,time_dimension(1:天, 0:小时)
任选参数:summary,sentiment,comment,influence,theme
- 示例:$host/dashboard/add?name=alipicture_3d&topic=ali&source=web&summary=1
```
{
	code: 0,
	data: {
		dashboard_id: 24
	},
	message: "success"
}
```


#####  更新快捷报告
- dashboard/update
- 入参 
必选参数:id,topic，
可选参数:subtopic,source,time_interval,time_dimension
任选参数:summary,sentiment,comment,influence,theme
- 示例:$host/dashboard/update?id=24&topic=taobao&source=weixin&sentiment=1
```
{
	code: 0,
	data: {
		data: 1
	},
	message: "success"
}
```


#####  删除快捷报告(整体)
- dashboard/delete
- 入参 
必选参数:id
- 示例:$host/dashboard/delete?id=24
```
{
	code: 0,
	data: {
		data: 1
	},
	message: "success"
}
```

