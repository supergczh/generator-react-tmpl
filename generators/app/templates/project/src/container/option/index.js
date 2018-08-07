import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { getDataForServer } from '../../actions/commonAction.js';
import { setPicListData } from '../../actions/optionAction.js';
import './index.css';

class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picListData: []
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.props.dispatch(getDataForServer(
            `https://www.apiopen.top/meituApi`,
            { page: 1 },
            setPicListData
        ));
    }

    componentWillReceiveProps(prevProps) {

        if (prevProps.picListData !== this.props.picListData) {
            if (prevProps.picListData.data) {
                this.setState({
                    picListData: prevProps.picListData.data
                });
            }
        }
    }

    render() {
        return (
            <div className="home">
                <Spin
                    spinning={this.props.sendingStatus}
                    size="large"
                    tip="加载中..."
                >
                    <div className="home_content">
                        <h2
                            style={{ display: this.props.match.params.page ? 'block' : 'none' }}
                        >
                            this is {this.props.match.params.page}
                        </h2>
                        <div>
                            {this.state.picListData.map((i, index) => {
                                return (
                                    <img key={index} className="pic" src={i['url']} alt={i['type']} />
                                )
                            })}
                        </div>
                    </div>
                </Spin>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        sendingStatus: state.commonReducer.sendingStatus,  // loading 状态
        picListData: state.optionReducer.picListData
    };
}
export default connect(mapStateToProps)(Option);

