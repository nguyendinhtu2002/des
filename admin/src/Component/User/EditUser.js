import React, { useState, useEffect } from "react";
import Toast from "../LoadingError/Toast";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import * as UserService from "../../service/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditOrderMain = () => {
  const { id } = useParams();

  const [updateAdmin, setUpdateAdmin] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [soDu, setSoDu] = useState(0);
  const [giaKhachTshirt, setGiaKhachTshirt] = useState(0);
  const [giaNhanVienTshirt, setGiaNhanVienTshirt] = useState(0);
  const [giaKhachPoster, setGiaKhachPoster] = useState(0);
  const [giaNhanVienPoster, setGiaNhanVienPoster] = useState(0);
  const [giaKhach3D, setGiaKhach3D] = useState(0);
  const [giaNhanVien3D, setGiaNhanVien3D] = useState(0);
  const [giaKhach3DQuan, setGiaKhach3DQuan] = useState(0);
  const [giaNhanVien3DQuan, setGiaNhanVien3DQuan] = useState(0);
  const dispatch = useDispatch();
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
  const handleGetDetailsUser = async (id) => {
    const res = await UserService.getDetailsUser(id);
    // console.log(res.user)
    setUpdateAdmin(res.user?.role);
    setEmail(res.user?.email);
    setSoDu(res.user?.money);
    setGiaNhanVienTshirt(res.user.typeGia?.Tshirt2D.customer);
    setGiaKhachTshirt(res.user.typeGia?.Tshirt2D.user);
    setGiaNhanVienPoster(res.user.typeGia?.Poster.customer);
    setGiaKhachPoster(res.user.typeGia?.Poster.user);
    setGiaNhanVien3D(res.user.typeGia?.T3D.customer);
    setGiaKhach3D(res.user.typeGia?.T3D.user);
    setGiaNhanVien3DQuan(res.user.typeGia?.Quan3D.customer);
    setGiaKhach3DQuan(res.user.typeGia?.Quan3D.user);
    // dispatch(updateProductSingle({ res }));
  };
  const mutation = useMutationHooks(async (data) => {
    const { id, access_token, ...rests } = data;
    const res = await UserService.updateUser(id, rests, access_token);
    return res;
  });
  const handleUpdate = (e) => {
    e.preventDefault();
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    const updateData = {
      id: id,
      role: updateAdmin?updateAdmin:"admin",
      email: email,
      money: soDu,
      typeGia: {
        Tshirt2D: {
          customer: giaKhachTshirt,
          user: giaNhanVienTshirt,
        },
        Poster: {
          customer: giaKhachPoster,
          user: giaNhanVienPoster,
        },
        T3D: {
          customer: giaKhach3D,
          user: giaNhanVien3D,
        },
        Quan3D: {
          customer: giaKhach3DQuan,
          user: giaNhanVien3DQuan,
        },
      },
      access_token,
    };
    if (password !== "") {
      updateData.password = password;
    }
    mutation.mutate(updateData);
  };
  const { error, isSuccess } = mutation;

  useEffect(() => {
    handleGetDetailsUser(id);
    if (!error && isSuccess) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Thành công!", Toastobjects);
      }
    } else if (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Co loi", Toastobjects);
      }
    }
  }, [id, error, isSuccess]);

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleUpdate}>
          <div className="content-header">
            <Link to="/users" className="btn btn-danger text-white">
              Go to users
            </Link>
            <h2 className="content-title">Update User</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Edit now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {/* Error Loading */}
                  {false && <Message variant="alert-danger">error</Message>}
                  {/* Update Loading */}

                  {/* {productSingleStatus && <Loading />} */}

                  {/* productSingleStatus Loading */}
                  {false ? (
                    <Loading />
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Quyền
                        </label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          value={updateAdmin}
                          onChange={(e) => setUpdateAdmin(e.target.value)}
                        >
                          {/* <option selected>Open this select menu</option> */}
                          <option value="admin">Admin</option>
                          <option value="guest">Khách hàng</option>
                          <option value="customer">Nhân viên</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Email
                        </label>
                        <input
                          class="form-control"
                          // id="exampleFormControlinput1"
                          // rows="3"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Password
                        </label>
                        <input
                          class="form-control"
                          type="password"
                          // id="exampleFormControlinput1"
                          // rows="3"
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Số dư
                        </label>
                        <input
                          class="form-control"
                          type="number"
                          // id="exampleFormControlinput1"
                          // rows="3"
                          value={soDu}
                          onChange={(e) => setSoDu(e.target.value)}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Giá Tshirt 2D
                        </label>
                        <div className="flex flex-row  gap-3">
                          <div className="w-[50%]">
                            <input
                              class="form-control"
                              type="number"
                              // id="exampleFormControlinput1"
                              // rows="3"
                              value={giaKhachTshirt}
                              onChange={(e) =>
                                setGiaKhachTshirt(e.target.value)
                              }
                            />
                            <p
                              id="helper-text-explanation"
                              class="mt-1 text-sm text-black dark:text-gray-400"
                            >
                              Giá khách
                            </p>
                          </div>

                          <div className="w-[50%]">
                            <input
                              class="form-control "
                              type="number"
                              // id="exampleFormControlinput1"
                              // rows="3"
                              value={giaNhanVienTshirt}
                              onChange={(e) =>
                                setGiaNhanVienTshirt(e.target.value)
                              }
                            />
                            <p
                              id="helper-text-explanation"
                              class="mt-1 text-sm text-black dark:text-gray-400"
                            >
                              Giá nhân viên
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Giá Poster
                        </label>
                        <div className="flex flex-row  gap-3">
                          <div className="w-[50%]">
                            <input
                              class="form-control"
                              type="number"
                              // id="exampleFormControlinput1"
                              // rows="3"
                              value={giaKhachPoster}
                              onChange={(e) =>
                                setGiaKhachPoster(e.target.value)
                              }
                            />
                            <p
                              id="helper-text-explanation"
                              class="mt-1 text-sm text-black dark:text-gray-400"
                            >
                              Giá khách
                            </p>
                          </div>

                          <div className="w-[50%]">
                            <input
                              class="form-control "
                              type="number"
                              // id="exampleFormControlinput1"
                              // rows="3"
                              value={giaNhanVienPoster}
                              onChange={(e) =>
                                setGiaNhanVienPoster(e.target.value)
                              }
                            />
                            <p
                              id="helper-text-explanation"
                              class="mt-1 text-sm text-black dark:text-gray-400"
                            >
                              Giá nhân viên
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Giá 3D
                        </label>
                        <div className="flex flex-row  gap-3">
                          <div className="w-[50%]">
                            <input
                              class="form-control"
                              type="number"
                              // id="exampleFormControlinput1"
                              // rows="3"
                              value={giaKhach3D}
                              onChange={(e) => setGiaKhach3D(e.target.value)}
                            />
                            <p
                              id="helper-text-explanation"
                              class="mt-1 text-sm text-black dark:text-gray-400"
                            >
                              Giá khách
                            </p>
                          </div>

                          <div className="w-[50%]">
                            <input
                              class="form-control "
                              type="number"
                              // id="exampleFormControlinput1"
                              // rows="3"
                              value={giaNhanVien3D}
                              onChange={(e) => setGiaNhanVien3D(e.target.value)}
                            />
                            <p
                              id="helper-text-explanation"
                              class="mt-1 text-sm text-black dark:text-gray-400"
                            >
                              Giá nhân viên
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Giá 3D + Quần
                        </label>
                        <div className="flex flex-row  gap-3">
                          <div className="w-[50%]">
                            <input
                              class="form-control"
                              type="number"
                              // id="exampleFormControlinput1"
                              // rows="3"
                              value={giaKhach3DQuan}
                              onChange={(e) =>
                                setGiaKhach3DQuan(e.target.value)
                              }
                            />
                            <p
                              id="helper-text-explanation"
                              class="mt-1 text-sm text-black dark:text-gray-400"
                            >
                              Giá khách
                            </p>
                          </div>

                          <div className="w-[50%]">
                            <input
                              class="form-control "
                              type="number"
                              // id="exampleFormControlinput1"
                              // rows="3"
                              value={giaNhanVien3DQuan}
                              onChange={(e) =>
                                setGiaNhanVien3DQuan(e.target.value)
                              }
                            />
                            <p
                              id="helper-text-explanation"
                              class="mt-1 text-sm text-black dark:text-gray-400"
                            >
                              Giá nhân viên
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditOrderMain;
