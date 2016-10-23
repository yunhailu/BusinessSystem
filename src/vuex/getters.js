/**
 * Topic List
 * */
export const topicList = state => {
	return state.topic.list;
};

export const topicGroupActiveId = state => {
	return state.topic.active_group_id;
};

export const activeTopic = state => {
	return state.topic.active_topic;
};