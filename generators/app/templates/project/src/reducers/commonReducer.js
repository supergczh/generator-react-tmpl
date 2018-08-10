import { handleActions } from 'redux-actions';
import {
    SENDING_STATUS,
    IS_UPDATE
} from '../constants/ActionTypes';

const initialState = {
    sendingStatus: false,
    isUpdate: 0
};

export default handleActions({
    [SENDING_STATUS](state, action) {
        return { ...state, sendingStatus: action.payload }
    },
    [IS_UPDATE](state, action) {
        return { ...state, isUpdate: action.payload }
    }
}, initialState);
