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