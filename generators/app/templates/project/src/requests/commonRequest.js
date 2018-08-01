import { request, requestAll } from '../utils/httpUtil.js';

/**
 * get请求
 *
 * @export
 * @param {*} url
 * @param {*} condition
 * @param {*} callback
 */
export function getForServer(url, condition, callback) {
    request('get', url, condition)
        .then((response) => {
            callback(response);
        }, (err) => {
            console.log(err);
        });
}

/**
 * post请求
 *
 * @export
 * @param {*} url
 * @param {*} condition
 * @param {*} callback
 */
export function postForServer(url, condition, callback) {
    request('post', url, condition)
        .then((response) => {
            callback(response);
        }, (err) => {
            console.log(err);
        });
}

/**
 * put请求
 *
 * @export
 * @param {*} url
 * @param {*} condition
 * @param {*} callback
 */
export function putForServer(url, condition, callback) {
    request('put', url, condition)
        .then((response) => {
            callback(response);
        }, (err) => {
            console.log(err);
        });
}

/**
 * delete请求
 *
 * @export
 * @param {*} url
 * @param {*} condition
 * @param {*} callback
 */
export function deleteForServer(url, condition, callback) {
    request('delete', url, condition)
        .then((response) => {
            callback(response);
        }, (err) => {
            console.log(err);
        });
}

// 

/**
 * 首次请求列表数据
 * 同时请求列表头部数据，和列表数据，做统一返回处理
 * @export
 * @param {*} condition
 * @returns
 */
export function getTableData(condition) {
    return new Promise(function (resolve, reject) {
        requestAll(condition)
            .then((response) => {
                resolve(response);
            }, (err) => {
                console.log(err);
            });
    })
}