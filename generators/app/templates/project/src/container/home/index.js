import React, { Component } from 'react';
import { connect } from 'react-redux';
import wolcomePic from '../../images/home.jpeg';
import './index.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    render() {
        return (
            <div className="home">
                <div className="box-shadow home_content">
                    <div className="title">
                        <h1>欢迎使用 react demo</h1>
                    </div>
                    <img src={wolcomePic} alt="welcome" className="home_pic" />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}
export default connect(mapStateToProps)(Home);

