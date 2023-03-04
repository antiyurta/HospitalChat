import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const MainContext = React.createContext();

export const MainStore = (props) => {
  const [cookies, setCookie] = useCookies(["current_token"]);
  const myCookie = cookies.current_token;

  return (
    <MainContext.Provider value={{ myCookie }}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContext;