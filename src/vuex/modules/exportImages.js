/**
 * Created by yunhailu on 2016/11/17.
 */
import _ from 'underscore';
import { INSERT_EXPORT_IMAGES, REMOVE_EXPORT_IMAGES } from '../mutations-types'

const state = {
    imgs: []
}

const mutations = {
    [INSERT_EXPORT_IMAGES](state, image) {
        const isExist = _.some(state.imgs, item => (image.topic == item.topic && image.topic_id == item.topic_id && image.key == item.key));
        if(isExist){
            state.imgs = _.map(state.imgs, item => {
                if(image.topic == item.topic && image.topic_id == item.topic_id && image.key == item.key){
                    item.value = image.value;
                }
                return item;
            });
            return;
        }
        state.imgs.push(image);
    },
    [REMOVE_EXPORT_IMAGES](state) {
        state.imgs = [];
    }
}

export default {
    state,
    mutations
}