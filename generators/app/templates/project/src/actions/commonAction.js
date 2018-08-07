
import {
    SENDING_STATUS,
    IS_UPDATE
} from '../constants/ActionTypes.js';

import { utilReqestProcess } from '../utils/util.js';

import {
    getForServer,
    getTableData
} from '../requests/commonRequest.js';

// loading 状态
export function sendingStatus(newData) {
    return { type: SENDING_STATUS, newData }
}

// 二级数据更新标志
export function isUpdate(newData) {
    return { type: IS_UPDATE, newData }
}

/**
 * get请求
 * 
 * @export
 * @param {string} url 
 * @param {object} condition 
 * @param {action function} setDataAction 
 * @returns 
 */
export function getDataForServer(url, condition, setDataAction) {
    return (dispatch) => {
        dispatch(sendingStatus(true));

        getForServer(url, condition, (response) => {
            utilReqestProcess(response)
                .then((response) => {
                    dispatch(setDataAction(response.data));
                });

            dispatch(sendingStatus(false));
        });
    }
}

/**
 * 首次请求列表数据
 *
 * @export
 * @param {object} condition
 * @returns
 */
export function firstGetTableData(condition) {
    return dispatch => {
        dispatch(sendingStatus(true));
        getTableData(condition)
            .then((response) => {

                utilReqestProcess(response['headData'])
                    .then((response) => {
                        dispatch(condition['setHeadAction'](response['data']));
                    });

                utilReqestProcess(response['bodyData'])
                    .then((response) => {
                        dispatch(condition['setBodyAction'](response['data']));
                    })

                dispatch(sendingStatus(false));
            })
    }
}