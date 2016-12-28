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
//登陆
export const loginState = state => {
	return state.topic.login_state;
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

export const analyticsDateChange = state => {
	return state.analytics.dateChange;
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

export const analyticsRefreshTopic = state => {
	return state.analytics.refreshTopic;
};

export const analyticsResetSearch = state => {
	return state.analytics.resetSearch;
};

export const analyticsSubTopicId = state => {
	return state.analytics.subtopicId;
};

export const analyticsTimePopUp = state => {
	return state.analytics.timePopUp;
};

export const analyticsAddTopic = state => {
	return state.analytics.addTopic;
};
/**
 * Compare
 * */
export const compareType = state => {
	return state.compare.compare_type;
};

export const compareTimeRange = state => {
	return state.compare.compare_time_Range;
};

export const compareSource = state => {
	return state.compare.compare_source;
};

export const compareSubTopic = state => {
	return state.compare.compare_subtopic;
};

export const compareStart = state => {
	return state.compare.compare_start;
};

export const compareEnd = state => {
	return state.compare.compare_end;
};

export const compareTimeRangeString = state => {
	return state.compare.compare_time_Range_String;
};

export const compareSourceCount = state => {
	return state.compare.compare_source_Count;
};

export const compareDataChange = state => {
	return state.compare.compare_data_change;
};

/**
 * Export Images
 * */
export const exportImages = state => {
	return state.exportImages.imgs;
};

export const headerName=state=>{
	return state.topic.header_name;
}

