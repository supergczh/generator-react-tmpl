/*
  1.reducer：一个普通的函数，用来修改store的状态。
  传入两个参数 state、action。
  state为当前的状态（可通过store.getState()获得）;
  action为当前触发的行为（通过store.dispatch(action)调用触发）。
  reducer(state, action) 返回的值，就是store最新的state值。
  2.reducer就是一个纯函数，接收旧的state和action，返回新的state
  3.真正开发项目的时候State会涉及很多功能，在一个Reducer处理所有逻辑会非常混乱.
  所以需要拆分成多个小Reducer，每个Reducer只处理它管理的那部分State数据。然后在由一个主rootReducers来专门管理这些小Reducer。
  4.Redux提供了一个方法combineReducers专门来管理这些小Reducer。
  语法：const rootReducer = combineReducers({todos1,todos2})
 */
import { combineReducers } from 'redux';//Redux 提供了 combineReducers() 工具类整合reducer
import commonReducer from './commonReducer.js';

const rootReducer = combineReducers({
    commonReducer: commonReducer
})

export default rootReducer;





