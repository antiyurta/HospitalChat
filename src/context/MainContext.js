import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const MainContext = React.createContext();

export const MainStore = (props) => {
  const [cookies, setCookie] = useCookies();
  const current_token = cookies.current_token;
  const current_userId = cookies.curent_userId;
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <MainContext.Provider
      value={{
        current_token,
        current_userId,
        selectedUser,
        setSelectedUser,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContext;
