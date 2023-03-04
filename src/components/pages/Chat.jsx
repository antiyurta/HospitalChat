import { useContext, useEffect, useState } from "react";
import MainContext from "../../context/MainContext";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { Avatar, Divider, List, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Chat() {
  const mainContext = useContext(MainContext);
  let navigate = useNavigate();

  const URL = process.env.REACT_APP_DEV_URL;
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    page: 1,
    limit: 2,
  });
  const [activeChatBox, setActiveChatBox] = useState([]);

  const loadMoreData = async (page) => {
    if (page === 1) {
      setData([]);
    }
    const conf = {
      headers: {
        Authorization: `Bearer ${mainContext.myCookie}`,
      },
      params: {
        page: page,
        limit: 15,
      },
    };
    if (loading) {
      return;
    }
    setLoading(true);
    await axios
      .get(URL + "users/online-users", conf)
      .then((res) => {
        console.log(res);
        setData([...data, ...res.data?.response]);
        // setData(res.data.response)
        setPage(res.data?.page);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadMoreData(1);
  }, []);

  useEffect(() => {
    setFilteredData(filterByValue(data, searchValue));
  }, [searchValue]);

  const filterByValue = (arrayOfObject, term) => {
    //Бичсэн утгаар Array of Objects -с хайх
    var ans = {};
    ans = arrayOfObject.filter(function (v, i) {
      if (
        v.lastName?.toLowerCase().indexOf(term.toLowerCase()) >= 0 ||
        v.firstName?.toLowerCase().indexOf(term.toLowerCase()) >= 0 ||
        v.email?.toLowerCase().indexOf(term.toLowerCase()) >= 0
      ) {
        return true;
      } else return false;
    });

    return ans;
  };

  return (
    <>
      <div style={{ marginBottom: 5 }}>
        <Input
          placeholder="Ажилтан хайх"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchValue(e.target.value)}
          allowClear
          style={{ width: "90%" }}
        />
      </div>
      <div className="scrollableContent">
        <InfiniteScroll
          dataLength={searchValue == "" ? data.length : filteredData.length}
          next={() => loadMoreData(Number(page.page) + 1)}
          hasMore={searchValue == "" ? data.length : filteredData.length}
          endMessage={<Divider plain>Үр дүн олдсонгүй</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={searchValue == "" ? data : filteredData}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                className="hover:cursor-pointer hover:bg-red-50"
                onClick={() => navigate(`/chatDtl`)}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "#1890ff",
                        color: "#fff",
                      }}
                      draggable={false}
                      size={50}
                    >
                      <div>{item.firstName?.substr(0, 1) ?? ""}</div>
                    </Avatar>
                  }
                  title={<span>{item.lastName + " " + item.firstName}</span>}
                  description={item.email}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
}
export default Chat;
