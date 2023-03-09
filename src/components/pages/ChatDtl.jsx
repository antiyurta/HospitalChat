import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Divider, List, Input } from "antd";
import {
  ArrowLeftOutlined,
  AppstoreAddOutlined,
  SmileOutlined,
  SendOutlined,
} from "@ant-design/icons";
import MainContext from "../../context/MainContext";
import EmojiPicker from "emoji-picker-react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function ChatDtl() {
  const mainContext = useContext(MainContext);
  const navigate = useNavigate();
  const [chatText, setChatText] = useState("");

  useEffect(() => {
    console.log("selectedUser", mainContext.selectedUser);
    return () => {
      mainContext.setSelectedUser(null);
    };
  }, []);
  const handleKeyDown = (e) => {
    setChatText(e.target.value);
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };

  return (
    <div>
      <div className="chatHeader">
        <ArrowLeftOutlined onClick={() => navigate(-1)} />
        <Avatar
          style={{
            backgroundColor: "#1890ff",
            color: "#fff",
            marginLeft: 5,
            marginRight: 5,
          }}
          draggable={false}
          size={25}
        >
          <div style={{ fontSize: 12 }}>
            {mainContext.selectedUser?.firstName?.substr(0, 1) ?? ""}
          </div>
        </Avatar>

        <div>
          {mainContext.selectedUser?.lastName +
            " " +
            mainContext.selectedUser?.firstName}
        </div>
      </div>
      <div className="chatBody"></div>
      <div className="chatFooter">
        <AppstoreAddOutlined style={{ fontSize: 20, cursor: "pointer" }} />
        <textarea
          style={{ width: "75%", resize: "none", maxHeight: 80, padding: 5 }}
          onChange={handleKeyDown}
          value={chatText}
        />
        <>
          <Popup
            trigger={
              <SmileOutlined
                id="app-title"
                style={{ fontSize: 20, cursor: "pointer" }}
              />
            }
            contentStyle={{ backgroundColor: "red", width: "100%", left: 0 }}
            position="top"
            arrow={false}
            className="emoji-popup"
          >
            <div>
              <EmojiPicker
                onEmojiClick={(e) => {
                  console.log("E", e);
                }}
                width="100%"
              />
            </div>
          </Popup>
        </>

        <SendOutlined style={{ fontSize: 30, cursor: "pointer" }} />
      </div>
    </div>
  );
}

export default ChatDtl;
