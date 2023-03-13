import { useContext, useEffect, useState } from "react";
import MainContext from "../../context/MainContext";
import { Avatar, Divider, List, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import UserList from "./UserList";
import GroupChat from "./GroupChat";

function Home() {
  useEffect(() => {}, []);
  const items = [
    {
      key: "1",
      label: `Ажилтан`,
      children: <UserList />,
    },
    {
      key: "2",
      label: `Чат`,
      children: <GroupChat />,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} centered />
    </>
  );
}
export default Home;
