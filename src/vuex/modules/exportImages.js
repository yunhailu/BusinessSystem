/**
 * Created by yunhailu on 2016/11/17.
 */
import _ from 'underscore';
import { INSERT_EXPORT_IMAGES, REMOVE_EXPORT_IMAGES } from '../mutations-types'

const state = {
    imgs: []
}

const str2arr = str => {
    let i = 0, len = str.length, step = 1000, arr = [];
    for(i = 0; i < Math.ceil(len / step); i++){
        arr.push(str.substr(i * step, 1000));
    }
    return arr;
};

const mutations = {
    [INSERT_EXPORT_IMAGES](state, image) {
        const isExist = _.some(state.imgs, item => (image.topic == item.topic && image.topic_id == item.topic_id && image.key == item.key));
        if(isExist){
            state.imgs = _.filter(state.imgs, item => {
                return !(item.topic === image.topic && item.topic_id === image.topic_id && item.key === image.key);
            });
        }
        image.value = str2arr(image.value);
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