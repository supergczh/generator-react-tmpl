import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import './index.css';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class LayoutBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    onCollapse = (collapsed) => {
        this.setState({
            collapsed: collapsed
        });
    }

    render() {
        return (
            <Layout style={{ height: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo">logo</div>
                    <Menu
                        mode="inline"
                    >
                        <SubMenu
                            title={<span><Icon type="user" /> <span>subnav1</span></span>}
                        >
                            <Menu.Item>
                                <Link to={`/option1/option1`}>option1</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to={`/option1`}>option2</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header><h1>header</h1></Header>
                    <Content>
                        <div style={{ padding: '32px' }}>
                            {renderRoutes(this.props.route.routes)}
                        </div>
                    </Content>
                    <Footer>
                        <p style={{ textAlign: 'center' }}>footer</p>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {};
}
export default connect(mapStateToProps)(LayoutBox);

