/*
 * @作者: jiawei 
 * @创建时间: 2018-06-12 18:28:43 
 * @文件主题: 渲染form元素 相关
 *
 */
import React from 'react';
import { Input, Select, Cascader, DatePicker, Switch } from 'antd';
import { verifyIdCardNo, verifyPhone, verifyBankAccount, verifyFloat, verifyInteger } from './util';
import locale from 'antd/lib/date-picker/locale/zh_CN';
const Option = Select.Option;
const { TextArea } = Input;

/**
 * form 表单校验
 * @param {*} validate 
 * @param {*} errmsg 
 */
export const renderFromItem = function (i, disabled, config) {
    switch (i.type) {
        case 'cascading':
            return (
                <Cascader
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    changeOnSelect
                    fieldNames={{ name: i.name }}
                    placeholder={i.placeholder ? i.placeholder : i.label}
                    options={i.data || []}
                    disabled={disabled ? disabled : (i.readonly ? i.readonly : false)}
                />
            )
        case 'select':
            let options = '';

            if (i.data && i.data.length > 0) {
                options = i.data.map(function (subitem, index) {
                    return (
                        <Option value={subitem.value} key={i + '' + index}>{subitem.label}</Option>
                    )
                })
            }

            return (
                <Select
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    disabled={disabled ? disabled : (i.readonly ? i.readonly : false)}
                    placeholder={i.placeholder ? i.placeholder : i.label}
                    onChange={(config && config.change) || ((e) => { })}
                >
                    {options}
                </Select>
            )

        case 'select_combobox':
            let comboboxOptions = '';

            if (i.data && i.data.length > 0) {
                comboboxOptions = i.data.map(function (subitem, index) {
                    return (
                        <Option value={subitem.label} key={subitem.value}>{subitem.label}</Option>
                    )
                })
            }

            return (
                <Select
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    mode='combobox'
                    disabled={disabled ? disabled : (i.readonly ? i.readonly : false)}
                    placeholder={i.placeholder ? i.placeholder : i.label}
                    onChange={(config && config.change) || ((e) => { })}
                >
                    {comboboxOptions}
                </Select>
            )
        case 'date':
            return (
                <DatePicker
                    showTime={config ? config.showTime : false}
                    format={config ? config.format : 'YYYY-MM-DD'}
                    getCalendarContainer={triggerNode => triggerNode.parentNode}
                    locale={locale}
                    disabled={disabled ? disabled : (i.readonly ? i.readonly : false)}
                    placeholder={i.placeholder ? i.placeholder : i.label}
                    style={{ width: '100%' }}
                />
            )
        case 'text':
            return (
                <Input
                    disabled={disabled ? disabled : (i.readonly ? i.readonly : false)}
                    placeholder={i.placeholder ? i.placeholder : i.label}
                    onChange={(config && config.change) || ((e) => { })}
                    onBlur={(config && config.blur) || ((e) => { })}
                />
            )
        case 'password':
            return (
                <Input
                    type="password"
                    disabled={disabled ? disabled : (i.readonly ? i.readonly : false)}
                    placeholder={i.placeholder ? i.placeholder : i.label}
                />
            )
        case 'imgage':
            return (
                <Input
                    disabled={disabled ? disabled : (i.readonly ? i.readonly : false)}
                    placeholder={i.placeholder ? i.placeholder : i.label}
                />
            )
        case 'textarea':
            return (
                <TextArea
                    disabled={disabled ? disabled : (i.readonly ? i.readonly : false)}
                    placeholder={i.placeholder ? i.placeholder : i.label}
                />
            )
        case 'switch':
            return (
                <Switch defaultChecked={i.value ? i.value : false} />
            )
        default:
            return ''
    }
}

/**
 * 生成校验条件
 * @param {*} validate 
 * @param {*} errmsg 
 */

export const validate = function (validate, errmsg, label) {

    let rules = [];
    for (let i in validate) {
        if (i !== 'type') {
            if (i === 'require') {
                rules.push({ required: validate['require'] === 'true' ? true : false, message: errmsg ? (errmsg['require'] ? errmsg['require'] : `请输入${label}`) : `请输入${label}` });
            } else if (i === 'max') {
                rules.push({ max: validate['max'], message: errmsg ? errmsg['max'] : `最多输入${validate['max']}个字` });
            } else {
                let itemValidate = {};
                itemValidate[i] = validate[i];
                itemValidate['message'] = errmsg[i];
                rules.push(itemValidate);
            }
        }

        if (validate['type'] === 'phone') {  // 校验手机号
            rules.push({ validator: verifyPhone });

        } else if (validate['type'] === 'identity') { // 校验身份证号
            rules.push({ validator: verifyIdCardNo });

        } else if (validate['type'] === 'bank_account') {  // 校验银行卡号
            rules.push({ validator: verifyBankAccount });
        } else if (validate['type'] === 'email') {  // 邮箱
            rules.push({ type: 'email', message: '请输入正确的邮箱地址' });
        } else if (validate['type'] === 'float') {  // 邮箱
            rules.push({ validator: verifyFloat });
        } else if (validate['type'] === 'integer') {  // 整数 
            rules.push({ validator: verifyInteger });
        }
    }
    return rules;
}