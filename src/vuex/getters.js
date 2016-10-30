/**
 * Topic List
 * */
export const topicList = state => {
	return state.topic.list;
};

export const topicGroupActiveId = state => {
	return state.topic.active_group_id;
};

export const activeAnalyticsTopic = state => {
	return state.topic.active_analytics_topic;
};

export const activeCompareTopic = state => {
	return state.topic.active_compare_topic;
};

export const activeSettingTopic = state => {
	return state.topic.active_setting_topic;
};


/**
 * Analytics
 * */
export const analyticsType = state => {
	return state.analytics.type;
};

export const analyticsTimeRange = state => {
	return state.analytics.timeRange;
};

export const analyticsSource = state => {
	return state.analytics.source;
};

export const analyticsSubTopic = state => {
	return state.analytics.subtopic;
};

export const analyticsStart = state => {
	return state.analytics.start;
};

export const analyticsEnd = state => {
	return state.analytics.end;
};
