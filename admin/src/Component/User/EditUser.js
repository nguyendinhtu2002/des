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
  const [giaKhachTshirtKho, setGiaKhachTshirtKho] = useState(0);
  const [giaNhanVienTshirtKho, setGiaNhanVienTshirtKho] = useState(0);
  const [giaKhachTshirtX15, setGiaKhachTshirtX15] = useState(0);
  const [giaNhanVienTshirtX15, setGiaNhanVienTshirtX15] = useState(0);
  const [giaKhachTshirtX2, setGiaKhachTshirtX2] = useState(0);
  const [giaNhanVienTshirtX2, setGiaNhanVienTshirtX2] = useState(0);
  const [giaKhachTshirtX3, setGiaKhachTshirtX3] = useState(0);
  const [giaNhanVienTshirtX3, setGiaNhanVienTshirtX3] = useState(0);

  const [giaKhachPosterKho, setGiaKhachPosterKho] = useState(0);
  const [giaNhanVienPosterKho, setGiaNhanVienPosterKho] = useState(0);
  const [giaKhachPosterDe, setGiaKhachPosterDe] = useState(0);
  const [giaNhanVienPosterDe, setGiaNhanVienPosterDe] = useState(0);
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
    setGiaNhanVienTshirt(res.user.typeGia?.Tshirt2D.user);
    setGiaKhachTshirt(res.user.typeGia?.Tshirt2D.customer);
    setGiaNhanVienTshirtKho(res.user.typeGia?.Tshirt2DKho.user);
    setGiaKhachTshirtKho(res.user.typeGia?.Tshirt2DKho.customer);
    setGiaNhanVienTshirtX15(res.user.typeGia?.Tshirt2DX15.user);
    setGiaKhachTshirtX15(res.user.typeGia?.Tshirt2DX15.customer);
    setGiaNhanVienTshirtX2(res.user.typeGia?.Tshirt2DX2.user);
    setGiaKhachTshirtX2(res.user.typeGia?.Tshirt2DX2.customer);
    setGiaNhanVienTshirtX3(res.user.typeGia?.Tshirt2DX3.user);
    setGiaKhachTshirtX3(res.user.typeGia?.Tshirt2DX3.customer);
    setGiaNhanVienPosterDe(res.user.typeGia?.PosterDe.user);
    setGiaKhachPosterDe(res.user.typeGia?.PosterDe.customer);
    setGiaNhanVienPosterKho(res.user.typeGia?.PosterKho.user);
    setGiaKhachPosterKho(res.user.typeGia?.PosterKho.customer);
    setGiaNhanVien3D(res.user.typeGia?.T3D.user);
    setGiaKhach3D(res.user.typeGia?.T3D.customer);
    setGiaNhanVien3DQuan(res.user.typeGia?.Quan3D.user);
    setGiaKhach3DQuan(res.user.typeGia?.Quan3D.customer);
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
      role: updateAdmin ? updateAdmin : "admin",
      email: email,
      money: soDu,
      typeGia: {
        Tshirt2D: {
          customer: giaKhachTshirt,
          user: giaNhanVienTshirt,
        },
        Tshirt2DX15: {
          customer: giaKhachTshirtX15,
          user: giaNhanVienTshirtX15,
        },
        Tshirt2DX2: {
          customer: giaKhachTshirtX2,
          user: giaNhanVienTshirtX2,
        },
        Tshirt2DX3: {
          customer: giaKhachTshirtX3,
          user: giaNhanVienTshirtX3,
        },
        Tshirt2DKho: {
          customer: giaKhachTshirtKho,
          user: giaNhanVienTshirtKho,
        },
        PosterKho: {
          customer: giaKhachPosterKho,
          user: giaNhanVienPosterKho,
        },
        PosterDe: {
          customer: giaKhachPosterDe,
          user: giaNhanVienPosterDe,
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
                          Giá Tshirt 2D Khó
                        </label>
                        <div className="flex flex-row  gap-3">
                          <div className="w-[50%]">
                            <input
                              class="form-control"
                              type="number"
                              value={giaKhachTshirtKho}
                              onChange={(e) =>
                                setGiaKhachTshirtKho(e.target.value)
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
                              value={giaNhanVienPosterKho}

                              onChange={(e) =>
                                setGiaNhanVienTshirtKho(e.target.value)
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
                          Giá Tshirt 2D X1.5
                        </label>
                        <div className="flex flex-row  gap-3">
                          <div className="w-[50%]">
                            <input
                              class="form-control"
                              type="number"
                              value={giaKhachTshirtX15}

                              onChange={(e) =>
                                setGiaKhachTshirtX15(e.target.value)
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
                              value={giaNhanVienTshirtX15}

                              onChange={(e) =>
                                setGiaNhanVienTshirtX15(e.target.value)
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
                          Giá Tshirt 2D X2
                        </label>
                        <div className="flex flex-row  gap-3">
                          <div className="w-[50%]">
                            <input
                              class="form-control"
                              type="number"
                              value={giaKhachTshirtX2}

                              onChange={(e) =>
                                setGiaKhachTshirtX2(e.target.value)
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
                              value={giaNhanVienTshirtX2}

                              onChange={(e) =>
                                setGiaNhanVienTshirtX2(e.target.value)
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
                          Giá Tshirt 2D X3
                        </label>
                        <div className="flex flex-row  gap-3">
                          <div className="w-[50%]">
                            <input
                              class="form-control"
                              type="number"
                              value={giaKhachTshirtX3}

                              onChange={(e) =>
                                setGiaKhachTshirtX3(e.target.value)
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
                              value={giaNhanVienTshirtX3}

                              onChange={(e) =>
                                setGiaNhanVienTshirtX3(e.target.value)
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
                          Giá Poster Khó
                        </label>
                        <div className="flex flex-row  gap-3">
                          <div className="w-[50%]">
                            <input
                              class="form-control"
                              type="number"
                              value={giaKhachPosterKho}

                              onChange={(e) =>
                                setGiaKhachPosterKho(e.target.value)
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
                              value={giaNhanVienPosterKho}

                              onChange={(e) =>
                                setGiaNhanVienPosterKho(e.target.value)
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
                          Giá Poster Dễ
                        </label>
                        <div className="flex flex-row  gap-3">
                          <div className="w-[50%]">
                            <input
                              class="form-control"
                              type="number"
                              value={giaKhachPosterDe}

                              onChange={(e) =>
                                setGiaKhachPosterDe(e.target.value)
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
                              value={giaNhanVienPosterDe}

                              onChange={(e) =>
                                setGiaNhanVienPosterDe(e.target.value)
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
