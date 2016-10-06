<template>
	<header-component active="analytics"></header-component>
	<div class="detail">
		<div class="container">
			<div class="detail-card detail-content">
				<div class="detail-card-title">{{words.content}}</div>
				<div class="detail-content-sub">
					<span>{{words.source}}: wechat</span>
					<span>{{words.publish}}: 2016-04-05 19:32</span>
					<span><a href="http://weibo.com" target="_blank">{{words.view}}</a></span>
				</div>
				<div class="detail-content-con">现在看和以前看完全两种感受。看着看着就流泪了 //@轻断食han://@一辈子的Kimi粉: #乔任梁# @乔任梁@徐璐LULU Kimi版《小苹果》，怎么听👂都不腻[害羞]###kimi http://t.cn/RcKEvVi</div>
			</div>

			<div class="detail-card detail-info">
				<div class="detail-card-title">{{words.userInfo}}</div>
				<img src="../../../images/avatar.png" class="detail-info-avatar"  />
				<div class="detail-info-detail">
					<div class="detail-info-detail-item">第一财经日报</div>
					<div class="detail-info-detail-item">男 | <a href="http://weibo.com" target="_blank">去主页看看</a></div>
					<div class="detail-info-detail-item">北京 朝阳</div>
					<div class="detail-info-detail-intro">{{words.desc}} 不在沉默着中爆发，就在沉默中灭亡...</div>
				</div>
			</div>

			<div class="detail-card detail-chart">
				<div class="detail-card-title">{{words.shareChart}}</div>

			</div>

			<div class="detail-card detail-article">
				<div class="detail-card-title">{{words.article}}</div>
				<ul class="detail-article-list">
					<li class="detail-article-list-item" v-for="article in acticles">
						<a :href="article.link" target="_blank"><i class="fa fa-bookmark"></i> {{article.text}}</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	@import "Detail.less";
</style>
<script type="text/ecmascript-6">
	import _ from 'underscore';
	import Local from '../../local/local';
	import HeaderComponent from '../Header/Header.vue';

	export default {
		data(){
			const words = Local().detail;
			return {
				words,
				acticles: [
					{link: "http://weibo.com", text: "诺贝尔化学奖揭晓 深度解读：分子马达与纳米火箭"},
					{link: "http://weibo.com", text: "辽宁遭抹平“最美野长城”被铁丝网围起 游客锐减"},
					{link: "http://weibo.com", text: "4名大学生爬野长城 雨天路滑迷失方向被困7小时"},
					{link: "http://weibo.com", text: "山东：几千游客滞留长岛 一日游变两日游"},
					{link: "http://weibo.com", text: "男子3次被判死缓终获无罪 申请赔偿1937万余元"}
				]
			}
		},
		methods: {
			init(){}
		},
		components:{
			'header-component': HeaderComponent
		},
		route: {
			data(){
				this.init();
			}
		}
	}
</script>