import '../../../style/Layout.css';
import { Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import male from '../../../assets/image/maleAvatar.svg';
import Sidebar from './Sidebar';
const items =
    [
        {
            key: '1',
            icon: (
                <img width={50} src={male} />
            ),
            label: 'nav 1',
        },
        {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
        },
        {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
        },
    ];
const Main = () => {
    return (
        <Layout>
            <Header className="bg-transparent mx-5 p-0 h-20">header</Header>
            <Layout className="ant-layout">
                <Sider
                    theme="light"
                    width={300}
                >
                    <Sidebar />
                </Sider>
                <Content className="bg-slate-50">
                    <div className='body'>
                        <div className="tabled">
                            {<Outlet />}
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}
export default Main;