import { Button, Card, Input, Typography, Layout, Checkbox, Form } from "antd";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from '../features/authReducer';
import { openNofi } from "./comman";
const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const PRIMARY_URL = process.env.REACT_APP_PRIMARY_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
function Login() {
    const [form] = Form.useForm();
    const [loginLoading, setLoginLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        setLoginLoading(true);
        const conf = {
            headers: {
                "x-api-key": API_KEY
            }
        };
        await axios.post(PRIMARY_URL + 'authentication/login', values, conf)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(login(response.data.response.accessToken));
                    navigate('/home');
                }
            })
            .catch((error) => {
                if (error.code === 'ERR_NETWORK') {
                    openNofi('error', 'Алдаа', 'Сервертэй холбогдоход алдаа гарлаа');
                }
                else if (error.response.status == 400) {
                    openNofi('warning', 'Нэвтрэх', 'Нэвтрэх нэр эсвэл нууц үг буруу');
                }
            })
            .finally(() => {
                setLoginLoading(false);
            })
    };
    const onFinishFailed = (e) => {
        console.log(e);
    };
    const clearStorage = () => {
        dispatch(logout());
    };
    useEffect(() => {
        clearStorage();
    }, []);
    return (
        <div className="layout-default ant-layout layout-sign-up">
            <Header>
                <div className="header-col header-brand">
                    <h5>GurenSoft LLC</h5>
                </div>
                <div className="header-col header-nav">

                </div>
            </Header>
            <Content className="p-0">
                <div className="chat-login-header">
                    <div className="content">
                        <Title>iChat</Title>
                        <p className="text-lg">
                            iHospital systemin CHAT
                        </p>
                    </div>
                </div>

                <Card
                    className="card-login header-solid h-full ant-card pt-0"
                    title={<h5>Нэвтрэх хэсэг</h5>}
                    bordered="false"
                >
                    <Form
                        onFinish={onFinish}
                        form={form}
                        layout="vertical">
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: "Имэйл оруулна уу" },
                            ]}
                        >
                            <Input placeholder="Имэйл" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "Нууц үг оруулна уу" },
                            ]}
                        >
                            <Input.Password placeholder="Нууц үг" />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                loading={loginLoading}
                                style={{ width: "100%" }}
                                type="primary"
                                htmlType="submit"
                            >
                                Нэвтрэх
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Content>
        </div>
    )
}
export default Login;