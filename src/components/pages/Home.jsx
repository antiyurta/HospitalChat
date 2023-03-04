import { useContext, useEffect, useState } from "react";
import MainContext from "../../context/MainContext";
import { Avatar, Divider, List, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Chat from "./Chat";
import GroupChat from "./GroupChat";

function Home() {
  useEffect(() => {}, []);
  const items = [
    {
      key: "1",
      label: `Чат`,
      children: <Chat />,
    },
    {
      key: "2",
      label: `Грүпп чат`,
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
