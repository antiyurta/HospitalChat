import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Get } from "../../comman";
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../../features/authReducer";
import { Avatar, Divider, Input, List } from "antd";
const URL = process.env.REACT_APP_DEV_URL;
function Sidebar() {
    const token = useSelector(selectCurrentToken);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState({
        page: 1,
        limit: 2
    });
    const loadMoreData = async (page) => {
        const conf = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                page: page,
                limit: 14,
            }
        };
        if (loading) {
            return;
        }
        setLoading(true);
        await axios.get(URL + 'users/online-users', conf)
            .then((res) => {
                console.log(res);
                setData([...data, ...res.data?.response]);
                // setData(res.data.response)
                setPage(res.data?.page);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    };
    useEffect(() => {
        loadMoreData(1)
    }, [])
    return (
        <>
            <div className="p-3">
                <Input className="rounded-full" placeholder="Хайх"/>
            </div>
            <div
                id="scrollableDiv"
                style={{
                    height: '100%',
                    overflow: 'auto',
                }}
            >
                <InfiniteScroll
                    dataLength={data.length}
                    next={() => loadMoreData(Number(page.page) + 1)}
                    hasMore={data.length}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.id} className="hover:cursor-pointer hover:bg-red-50">
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picture?.large} />}
                                    title={<p className="whitespace-nowrap">{item.lastName + " " + item.firstName}</p>}
                                    description={item.email}
                                />
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </>
    )
}
export default Sidebar;