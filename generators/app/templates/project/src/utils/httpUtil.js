import axios from 'axios';
import { IP } from '../constants/config.js';
import { timeStarmp } from './util';

// 创建实例时设置配置的默认值
const instance = axios.create({
    baseURL: IP
});

/**
 * 公用请求
 *
 * @export
 * @param {string} type 请求方式
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @returns
 */
export function request(type, url, params) {

    params.timeStarmp = timeStarmp();

    let config = { url: url, method: type, params: params };
    if (type === 'post' || type === 'put') {
        config = { url: url, method: type, data: params };
    }

    return new Promise(function (resolve, reject) {
        instance.request(config)
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    })
}

// 同时请求列表 表头数据 列表数据
export function requestAll(condition) {
    return new Promise(function (resolve, reject) {
        axios.all([
            instance.get(condition['tableHeadUrl'],
                { params: condition['tableHeadParams'] }),
            instance.get(condition['tableBodyUrl'],
                { params: condition['tableBodyParams'] })
        ])
            .then(axios.spread(function (headData, bodyData) {
                resolve({ headData: headData, bodyData: bodyData });
            }))
            .catch((err) => {
                reject(err);
            });
    })
}