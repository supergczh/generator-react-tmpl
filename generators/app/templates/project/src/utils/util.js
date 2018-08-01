/*
 * @作者: jiawei 
 * @创建时间: 2018-06-11 17:42:21 
 * @文件主题: 工具
 *
 */

import { message } from 'antd';
message.config({
    top: 150
});

// 判断接口返回数据是否正确
export const utilReqestProcess = (response, flag) => {
    return new Promise(function (resolve, reject) {
        // 接口状态 200
        if (response.status === 200) {


            if (response.data.code === 400) { // 接口返回状态码 400 ：接口传回错误提示

                if (flag) { // 返回数据到 action 标识成立
                    resolve(response);
                } else { // 返回标识不成立，只弹框提示
                    response.data.message ? message.error(response.data.message) : message.error('数据获取失败');
                }

            } else if (response.data.code === 401) { // 接口返回状态码 401 ：登录过时
                // 在此处做登录过时反应
            } else { // 返回状态码 200 
                resolve(response);
            }
        } else {
            console.log('接口返回错误！');
        }
    })
}

/**
* 生成分页参数
* 
* @param {number} total 数据总条数，默认0 
* @param {number} current 当前页，默认1
* @param {number} pageSize 每页条数，默认25
* @param {function} change 页码以及pageSize 变化的回调，默认console
* @returns 返回分页的配置参数
*/
export const renderPagination = function (
    {
        total = 0,
        current = 1,
        pageSize = 20,
        change = function (current, pageSize) {
            console.log(current, pageSize)
        }
    } = {}
) {
    return {
        total: total,  // 数据总数
        showTotal: (totalSize) => `共 ${totalSize} 条数据`,
        showSizeChanger: true,
        current: current,　// 当前页
        pageSize: pageSize,  // 一页数据条数
        pageSizeOptions: ['10', '20', '50', '100'],
        defaultPageSize: 20,
        // 每页数据条数改变时
        onShowSizeChange(current, pageSize) {
            change(current, pageSize);
        },
        // 页码改变时
        onChange(current, pageSize) {
            change(current, pageSize);
        }
    }
}

/**
 *校验身份证号
 *
 * @export
 * @param {*} no
 * @returns
 */
export function verifyIdCardNo(rule, no, callback) {
    if (!no) { callback && callback('请填写身份证号'); return; }
    // 校验长度
    if (no.length !== 15 && no.length !== 18) {
        callback && callback('身份证号长度错误');
        return false;
    }
    // 校验地区码
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    if (!city[no.substr(0, 2)]) {
        callback && callback('身份证地址编码错误');
        return false;
    }
    // 检验生日
    let birth = '';
    if (no.length === 15) {
        let year = no.substring(6, 8);
        if (year > '14') {
            year = '19' + year;
        } else {
            year = '20' + year;
        }
        let month = no.substring(8, 10);
        let day = no.substring(10, 12);
        birth = year + '-' + month + '-' + day;
    }
    if (no.length === 18) {
        let year = no.substring(6, 10);
        let month = no.substring(10, 12);
        let day = no.substring(12, 14);
        birth = year + '-' + month + '-' + day;
    }
    const reg = /^([1-2]\d{3})[/|-](0?[1-9]|10|11|12)[/|-]([1-2]?[0-9]|0[1-9]|30|31)$/ig;
    if (!(reg.test(birth))) {
        callback && callback('身份证号出生日期错误');
        return false;
    }
    callback && callback();
    return true;
}


/**
 *  提取身份证号中的 出生日期 以及性别
 *
 * @export
 * @param {*} no 校验过后的身份证号码
 * @returns {
 *              birth：出生日期
 *              sex： 性别 0 是女的， 1 是男的
 *          }
 */
export function extractIdCardNoInfo(no) {
    let birth = '';
    let sex = 0;

    if (no.length === 15) {
        let year = no.substring(6, 8);
        if (year > '14') {
            year = '19' + year;
        } else {
            year = '20' + year;
        }
        let month = no.substring(8, 10);
        let day = no.substring(10, 12);
        birth = year + '-' + month + '-' + day;
        sex = no.substring(14, 15) % 2;
    }
    if (no.length === 18) {
        let year = no.substring(6, 10);
        let month = no.substring(10, 12);
        let day = no.substring(12, 14);
        birth = year + '-' + month + '-' + day;
        sex = no.substring(16, 17) % 2;
    }

    return {
        birth: birth,
        sex: sex // 0 是女的 1 是男的
    }
}

/**
 *
 *
 * @export 校验银行卡号
 * @param {*} rule
 * @param {*} bankAccount
 * @param {*} callback
 * @returns
 */
export function verifyBankAccount(rule, bankAccount, callback) {
    const pattern = /^([1-9]{1})(\d{14}|\d{15}|\d{18})$/,
        str = bankAccount.replace(/\s+/g, "");
    if (!pattern.test(str)) {
        callback && callback('请输入正确的银行卡号');
        return false;
    }
    callback && callback();
    return true;
}

// 校验手机号
export function verifyPhone(rule, bankAccount, callback) {
    const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(bankAccount)) {
        callback && callback('请输入正确的手机号');
        return false;
    }
    callback && callback();
    return true;
}

// 校验金额
export function verifyFloat(rule, bankAccount, callback) {
    const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    if (!reg.test(bankAccount)) {
        callback && callback('请输入正确的金额，并保留小数点后两位小数');
        return false;
    }
    callback && callback();
    return true;
}

// 校验正整数
export function verifyInteger(rule, integer, callback) {
    const reg = /^[1-9]\d*$/;
    if (!reg.test(integer)) {
        callback && callback('请输入非0的整数');
        return false;
    }

    callback && callback();
    return true;
}

// getQueryString
export function getQueryString(search, name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;

}

//去左右空格
export function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 对数据深拷贝
export function deepCopy(data) {

    if (Object.prototype.toString.call(data) === '[object Array]') {
        return data.map(((item, i) => {
            if (Object.prototype.toString.call(item) === '[object Array]' || Object.prototype.toString.call(item) === '[object Object]') {
                return deepCopy(item);
            }
            return item;
        }));
    } else if (Object.prototype.toString.call(data) === '[object Object]') {
        let newData = {};
        for (let i in data) {
            if (Object.prototype.toString.call(data[i]) === '[object Array]' || Object.prototype.toString.call(data[i]) === '[object Object]') {
                newData[i] = deepCopy(data[i]);
            } else {
                newData[i] = data[i];
            }
        }

        return newData;
    }
}

// 生成时间戳精确到毫秒
export function timeStarmp() {
    return new Date().getTime();
}