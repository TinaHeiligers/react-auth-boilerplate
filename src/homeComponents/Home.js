// TODO: change style to use material-ui
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import HomeRouter from './HomeRouter';
import './Home.css';

const { Content, Footer } = Layout;
const { logout } = authAction;

export class Home extends Component {
  render() {
    const { url } = this.props.match;
    const { pathname } = this.props.location;
    return (
      <LocaleProvider locale={enUS}>
        <Layout style={{ height: '100vh' }}>
      {/*<Topbar url={url} pathname={pathname} />*/} will be navigation
          <Layout className="ant-layout-outer">
            <Layout className="ant-layout-inner">
              <Content
                style={{
                  padding: '70px 0 0',
                  flexShrink: '0',
                  background: '#ffffff',
                }}>
                <HomeRouter url={url} />
              </Content>
              <Footer
                style={{
                  background: '#ffffff',
                  textAlign: 'center',
                  borderTop: '1px solid #ededed',
                }}>
                React Auth Boilerplate developed by Tallwave.
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </LocaleProvider>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth,
  }),
  { logout, toggleAll },
)(Home);
