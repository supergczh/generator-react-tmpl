/*
 * @ 作者: Mr.D 
 * @ 创建时间: 2018-01-31 09:36:21 
 * @ 文件主题: 通过shouldComponentUpdate优化性能 需要依赖 immutable
 * 
 */
import React from 'react';
import { is, fromJS } from 'immutable';

class BaseComponent extends React.Component {

    shouldComponentUpdate (nextProps, nextState) {
        const thisProps = this.props || {};
        const thisState = this.state || {};
        nextState = nextState || {};
        nextProps = nextProps || {};
        if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
            Object.keys(thisState).length !== Object.keys(nextState).length) {
            return true;
        }

        for (const key in nextProps) {
            if (!is(fromJS(thisProps[key]), fromJS(nextProps[key]))) {
                return true;
            }
        }

        for (const key in nextState) {
            if (!is(fromJS(thisState[key]), fromJS(nextState[key]))) {
                return true;
            }
        }
        return false;
    }
}

export default BaseComponent;