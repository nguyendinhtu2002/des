import React, { useEffect, useState } from "react";
import logo from "../../assets/img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutationHooks } from "../../hook/useMutationHook";
import { updateUser } from "../../features/userSlide/userSlide";
import * as UserService from "../../service/UserService";
import jwt_decode from "jwt-decode";
import Toast from "../../Component/LoadingError/Toast";
function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userLogin = useSelector((state) => state.user);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const { id } = userLogin;

  const toastId = React.useRef(null);
  const Toastobjects = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, error, isLoading, isError, isSuccess } = mutation;

  const submitHandler = async (e) => {
    e.preventDefault();

    mutation.mutate({
      username,
      password,
    });
  };
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    // console.log(res);
    dispatch(updateUser({ ...res?.user, access_token: token }));
  };
  useEffect(() => {
    console.log(mutation)
    if (error === null && isSuccess) {
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(data?.refresh_token)
      );
      if (data?.access_token) {
        const decoded = jwt_decode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success("Thành công", Toastobjects);
        }
      }

      // dispatch(updateUser({ data }))
    } else if (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          "Tài khoản hoặc mật khẩu sai",
          Toastobjects
        );
      }
    }

    if (id !== "") {
      history("/");
    }
  }, [isSuccess, history, id, error]);

  const handleTogglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <>
      <Toast />
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img class="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
          
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6">
            <div>
              <label
                for="username"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div class="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autocomplete="username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={submitHandler}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
