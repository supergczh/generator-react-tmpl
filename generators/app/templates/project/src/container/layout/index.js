import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';

class LayoutBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    render() {
        return (
            <div>
                {renderRoutes(this.props.route.routes)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}
export default connect(mapStateToProps)(LayoutBox);

