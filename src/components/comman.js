import { notification } from "antd";
import axios from "axios";
const DEV_URL = process.env.REACT_APP_DEV_URL;
const PRIMARY_URL = process.env.REACT_APP_PRIMARY_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
export async function Get(url, token, config) {
  config.headers["Authorization"] = `Bearer ${token}`;
  config.headers["x-api-key"] = API_KEY;
  return new Promise((resolve, reject) => {
    axios
      .get(DEV_URL + url, config)
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          resolve(response.data.response);
        } else if (response.status === 401) {
          console.log("NEWTER COMMAN JS");
        }
      })
      .catch((error) => {
        console.log("========>", error);
        if (error.response.status === 401) {
          resolve({ data: [], meta: {}, status: 401 });
        } else if (error.response.status === 400) {
          openNofi("error", "Муу хүсэлт", "Та Админтай холбогдоно уу");
        } else {
          openNofi("error", "Алдаа", "Сервертэй холбогдоход алдаа гарлаа");
          reject({ data: [], meta: {} });
        }
      });
  });
}
export async function Fetch(url, token, config) {
  config.headers["Authorization"] = `Bearer ${token}`;
  config.headers["x-api-key"] = API_KEY;
  return new Promise((resolve, reject) => {
    axios
      .get(DEV_URL + url, config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          resolve(response.data.response);
        } else if (response.status === 401) {
          console.log("NEWTER COMMAN JS");
        }
      })
      .catch((error) => {
        console.log("========>", error);
        if (error.response.status === 401) {
          resolve({ data: [], meta: {}, status: 401 });
        } else if (error.response.status === 400) {
          openNofi("error", "Муу хүсэлт", "Та Админтай холбогдоно уу");
        } else {
          openNofi("error", "Алдаа", "Сервертэй холбогдоход алдаа гарлаа");
          reject({ data: [], meta: {} });
        }
      });
  });
}
export const openNofi = (type, message, description) => {
  notification[type]({
    message: `${message}`,
    description: `${description}`,
  });
};
