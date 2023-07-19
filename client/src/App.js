import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import ListDonHang from "./page/ListDonHang";
import Order from "./page/Order";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as UserService from "../src/service/UserService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isJsonString } from "./utils";
import jwt_decode from "jwt-decode";
import { updateUser } from "./features/userSlide/userSlide";
import Login from "./page/Login/login";
import UpdateOrder from "./page/UpdateOrder/UpdateOrder";
import PrivateRoutes from "./ProtectRouter";
import Error404 from "./Component/404/404";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
    //  dispatch(updateUser({data}))
  }, []);
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let token_refresh = localStorage.getItem("refresh_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      token_refresh = JSON.parse(token_refresh);
      decoded = jwt_decode(storageData);
    }
    return { decoded, storageData, token_refresh };
  };
  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      const currentTime = new Date();
      const { decoded, token_refresh } = handleDecoded();

      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken(token_refresh);
        // console.log(data)

        config.headers["Authorization"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.user, access_token: token }));
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/order" element={<Order />} />
          <Route path="/detail/:id" element={<UpdateOrder />} />
          <Route path="/" element={<ListDonHang />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
