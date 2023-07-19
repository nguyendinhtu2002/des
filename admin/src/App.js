import PrivateRoutes from "./PrivateRouter";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "./responsive.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from "./page/User/UserPage";
import HomeScreen from "./page/Home/HomeScreen";
import ProductScreen from "./page/Product/Product";
import EditProduct from "./page/Product/Edit";
import Login from "./page/Login/Login";
import * as UserService from "../src/service/UserService";
import { useDispatch } from "react-redux";
import { isJsonString } from "./utils";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { updateUser } from "./features/userSlide/userSlide";
import EditUserPage from "./page/User/EditPage";
import NewUser from "./page/User/NewUser";
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
        <Route element={<PrivateRoutes />}></Route>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/products" element={<ProductScreen />} />
        <Route path="/detail/:id" element={<EditProduct />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/user/detail/:id" element={<EditUserPage />} />
        <Route path="/addUser" element={<NewUser />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
