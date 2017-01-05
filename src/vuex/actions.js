import * as types from './mutations-types';


/**
 * Topic List
 * */
export const setTopicList = (store, list) => {
	store.dispatch(types.UPDATE_TOPIC_LIST, list);
};

export const setTopicGroupActiveId = (store, group_id) => {
	store.dispatch(types.UPDATE_TOPIC_ACTIVE_GROUP_ID, group_id);
};

export const setActiveAnalyticsTopic = (store, topic) => {
	store.dispatch(types.UPDATE_ACTIVE_ANALYTICS_TOPIC, topic);
};

export const setActiveSummaryTopic = (store, topic) => {
	store.dispatch(types.UPDATE_ACTIVE_SUMMARY_TOPIC, topic);
};

export const setActiveCompareTopic = (store, topic) => {
	store.dispatch(types.UPDATE_ACTIVE_COMPARE_TOPIC, topic);
};

export const setActiveSettingTopic = (store, topic) => {
	store.dispatch(types.UPDATE_ACTIVE_SETTING_TOPIC, topic);
};

export const setMonitorWord = (store, word) => {
	store.dispatch(types.UPDATE_ACTIVE_MONITOR_WORD, word);
};
export const setMonitorSumWord = (store, sumWord) => {
	store.dispatch(types.UPDATE_ACTIVE_SUM_MONITOR_WORD, sumWord);
};
/**
 * Summary
 * */
export const setSummaryType = (store, type) => {
	store.dispatch(types.UPDATE_SUM_TYPE, type);
};

export const setSummaryTimeRange = (store, timeRange) => {
	store.dispatch(types.UPDATE_SUM_TIME_RANGE, timeRange);
};

export const setSummaryDateChange = (store, value) => {
	store.dispatch(types.UPDATE_SUM_DATE_CHANGE, value);
};

export const setSummarySource = (store, source) => {
	store.dispatch(types.UPDATE_SUM_SOURCE, source);
};

export const setSummarySubTopic = (store, subtopic) => {
	store.dispatch(types.UPDATE_SUM_SUBTOPIC, subtopic);
};

export const setSummaryStart = (store, start) => {
	store.dispatch(types.UPDATE_SUM_START, start);
};

export const setSummaryEnd = (store, end) => {
	store.dispatch(types.UPDATE_SUM_END, end);
};

export const setSummaryRefreshTopic = (store, refreshTopic) => {
	store.dispatch(types.UPDATE_SUM_REFRESH_TOPIC, refreshTopic);
};

export const setSummaryResetSearch = (store, resetSearch) => {
	store.dispatch(types.UPDATE_SUM_RESET_SEARCH, resetSearch);
};

export const setSummarySubTopicId = (store, subtopicId) => {
	store.dispatch(types.UPDATE_SUM_SUBTOPIC_ID, subtopicId);
};

export const setSummaryTimePopUp = (store, newtime) => {
	store.dispatch(types.UPDATE_SUM_TIME_POP_UP, newtime);
};

export const setSummaryOrder = (store, order) => {
	store.dispatch(types.UPDATE_SUM_ORDER, order);
};

export const setSummaryCount = (store, count) => {
	store.dispatch(types.UPDATE_SUM_COUNT, count);
};

export const setSummarySentiment = (store, sentiment) => {
	store.dispatch(types.UPDATE_SUM_SENTIMENT, sentiment);
};

export const setSummarySourceData = (store, data) => {
	store.dispatch(types.UPDATE_SUM_SOURCEDATA, data);
};


/**
 * Analytics
 * */
export const setAnalyticsType = (store, type) => {
	store.dispatch(types.UPDATE_TYPE, type);
};

export const setAnalyticsTimeRange = (store, timeRange) => {
	store.dispatch(types.UPDATE_TIME_RANGE, timeRange);
};

export const setAnalyticsDateChange = (store, value) => {
	store.dispatch(types.UPDATE_DATE_CHANGE, value);
};

export const setAnalyticsSource = (store, source) => {
	store.dispatch(types.UPDATE_SOURCE, source);
};

export const setAnalyticsSubTopic = (store, subtopic) => {
	store.dispatch(types.UPDATE_SUBTOPIC, subtopic);
};

export const setAnalyticsStart = (store, start) => {
	store.dispatch(types.UPDATE_START, start);
};

export const setAnalyticsEnd = (store, end) => {
	store.dispatch(types.UPDATE_END, end);
};

export const setAnalyticsRefreshTopic = (store, refreshTopic) => {
	store.dispatch(types.UPDATE_REFRESH_TOPIC, refreshTopic);
};

export const setAnalyticsResetSearch = (store, resetSearch) => {
	store.dispatch(types.UPDATE_RESET_SEARCH, resetSearch);
};

export const setAnalyticsSubTopicId = (store, subtopicId) => {
	store.dispatch(types.UPDATE_SUBTOPIC_ID, subtopicId);
};

export const setAnalyticsTimePopUp = (store, newtime) => {
	store.dispatch(types.UPDATE_TIME_POP_UP, newtime);
};

export const setAnalyticsAddTopic = (store, topic) => {
	store.dispatch(types.UPDATE_ADD_TOPIC, topic);
};
export const setAnalyticsSourceData = (store, data) => {
	store.dispatch(types.UPDATE_CHANGE_SOURCE_DATA, data);
};
/**
 * Compare
 * */
export const setCompareType = (store, type) => {
	store.dispatch(types.UPDATE_COMPARE_TYPE, type);
};

export const setCompareTimeRange = (store, timeRange) => {
	store.dispatch(types.UPDATE_COMPARE_TIME_RANGE, timeRange);
};

export const setCompareSource = (store, source) => {
	store.dispatch(types.UPDATE_COMPARE_SOURCE, source);
};

export const setCompareSubTopic = (store, subtopic) => {
	store.dispatch(types.UPDATE_COMPARE_SUBTOPIC, subtopic);
};
export const setCompareStart = (store, start) => {
	store.dispatch(types.UPDATE_COMPARE_START, start);
};

export const setCompareEnd = (store, end) => {
	store.dispatch(types.UPDATE_COMPARE_END, end);
};

export const setCompareTimeRangeString = (store, timeRangeString) => {
	store.dispatch(types.UPDATE_COMPARE_TIME_RANGE_STRING, timeRangeString);
};

export const setCompareSourceCount = (store, sourceCount) => {
	store.dispatch(types.UPDATE_COMPARE_SOURCE_COUNT, sourceCount);
};

export const setCompareDataChange = (store, datachange) => {
	store.dispatch(types.UPDATE_COMPARE_DATA_CHANGE, datachange);
};

/**
 * Export Images
 * */
export const insertExportImages = (store, image) => {
	store.dispatch(types.INSERT_EXPORT_IMAGES, image);
};

export const removeExportImages = (store) => {
	store.dispatch(types.REMOVE_EXPORT_IMAGES);
};
/**
 * @param store
 * @param state
 */
export const setLoginState = (store,state) => {
	store.dispatch(types.LOGIN_STATE,state);
};

export const setHeaderName = (store,state) =>{
	store.dispatch(types.HEADER_NAME,state);
}
