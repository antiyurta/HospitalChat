import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Dropdown, List, Input } from "antd";
import {
  ArrowLeftOutlined,
  AppstoreAddOutlined,
  SmileOutlined,
  SendOutlined,
  ClockCircleOutlined,
  DownOutlined,
  EllipsisOutlined,
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
    e.target.style.height = `${e.target.scrollHeight - 20}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };
  const items = [
    {
      label: "menu1",
      key: "0",
    },
    {
      label: "menu2",
      key: "1",
    },
    {
      label: "menu3",
      key: "3",
    },
  ];
  const chatEx = [
    { type: 0, text: "You can read files from ending by chunks while search" },
    {
      type: 1,
      text: "After little thinking, I guess it will be better to separate",
    },
    { type: 1, text: "OK" },
    { type: 0, text: "TTL on cache expire" },
    { type: 1, text: "Thanks for the example." },
    { type: 0, text: "If you don't care that much about RAM," },
    { type: 1, text: "So your file will be" },
    { type: 0, text: "OK" },
    {
      type: 0,
      text: "I gather from some of the discussion that your 'json text file' will be stored using File API, so there is a definite limit on filesize as opposed to some server where you could assume almost 'infinite' storage. So, you will eventually have to limit the number of messages and contacts.",
    },
    {
      type: 1,
      text: "So, you are stuck with storing {userid:XXX, message:'YYY'} in a fixed order.",
    },
  ];

  return (
    <div className="chatDtl-container">
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
      <div className="chatBody scrollBar">
        <div className="messages-chat">
          {chatEx.map((el, index) => {
            return (
              <>
                {el.type == 0 ? (
                  <div className="message-in">
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
                        {mainContext.selectedUser?.firstName?.substr(0, 1) ??
                          ""}
                      </div>
                    </Avatar>
                    <div className="text-container-in">
                      <div className="text-with-dot">
                        <span className="text">{el.text}</span>
                        <Dropdown
                          menu={{
                            items,
                          }}
                          trigger={["click"]}
                        >
                          <a
                            onClick={(e) => e.preventDefault()}
                            className="more-menu"
                          >
                            <EllipsisOutlined />
                          </a>
                        </Dropdown>
                      </div>
                      <div className="time">
                        <ClockCircleOutlined style={{ marginRight: 5 }} />
                        14h58
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="message-out">
                    <div className="text-container-out">
                      <div className="text-with-dot">
                        <span className="text">{el.text}</span>
                        <Dropdown
                          menu={{
                            items,
                          }}
                          trigger={["click"]}
                        >
                          <a
                            onClick={(e) => e.preventDefault()}
                            className="more-menu"
                          >
                            <EllipsisOutlined style={{ color: "#fff" }} />
                          </a>
                        </Dropdown>
                      </div>
                      <div className="time">
                        <ClockCircleOutlined style={{ marginRight: 5 }} />
                        15h04
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
      <div className="chatFooter">
        <AppstoreAddOutlined style={{ fontSize: 20, cursor: "pointer" }} />
        <textarea
          onChange={handleKeyDown}
          value={chatText}
          className="chat-textarea"
        />
        <>
          <Popup
            trigger={
              <SmileOutlined
                id="app-title"
                style={{ fontSize: 20, cursor: "pointer" }}
              />
            }
            contentStyle={{ width: "100%", left: 0 }}
            position="top"
            arrow={false}
            className="emoji-popup"
          >
            <div>
              <EmojiPicker
                onEmojiClick={(e) => {
                  console.log("E", e);
                  setChatText(chatText + e.emoji);
                }}
                width="100%"
                previewConfig={{ showPreview: false }}
                emojiVersion="1.0"
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
