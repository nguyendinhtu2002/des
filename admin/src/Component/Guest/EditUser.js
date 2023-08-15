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
  const [giaKhachTshirt2DClone, setGiaKhachTshirt2DClone] = useState(0);
  const [giaNhanVienTshirtt2DClone, setGiaNhanVienTshirtt2DClone] = useState(0);
  const [giaKhachTshirt2DRedesign, setGiaKhachTshirt2DRedesign] = useState(0);
  const [giaNhanVienTshirt2DRedesign, setGiaNhanVienTshirt2DRedesign] = useState(0);

  const [giaKhachMug, setGiaKhachMug] = useState(0);
  const [giaNhanVienMug, setGiaNhanVienMug] = useState(0);

  const [giaKhachTumler, setGiaKhachTumler] = useState(0);
  const [giaNhanVienTumler, setGiaNhanVienTumler] = useState(0);
  const [giaKhachTshirt3D, setGiaKhachTshirt3D] = useState(0);
  const [giaNhanVienTshirt3D, setGiaNhanVienTshirt3D] = useState(0);
  const [giaKhachTshirt3DQuan, setGiaKhachTshirt3DQuan] = useState(0);
  const [giaNhanVienTshirt3DQuan, setGiaNhanVienTshirt3DQuan] = useState(0);
  const [giaKhachPosterKho, setGiaKhachPosterKho] = useState(0);
  const [giaNhanVienPosterKho, setGiaNhanVienPosterKho] = useState(0);
  const [giaKhachPosterDe, setGiaKhachPosterDe] = useState(0);
  const [giaNhanVienPosterDe, setGiaNhanVienPosterDe] = useState(0);
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
    setUpdateAdmin(res.user?.role);
    setEmail(res.user?.email);
    setSoDu(res.user?.money);
    setGiaNhanVienTshirtt2DClone(res.user?.typeGia?.Tshirt2DClone.user);
    setGiaKhachTshirt2DClone(res.user?.typeGia?.Tshirt2DClone.customer);
    setGiaNhanVienTshirt2DRedesign(res.user?.typeGia?.Tshirt2DRedesign.user);
    setGiaKhachTshirt2DRedesign(res.user?.typeGia?.Tshirt2DRedesign.customer);
    setGiaNhanVienMug(res.user?.typeGia?.Mug.user);
    setGiaKhachMug(res.user?.typeGia?.Mug.customer);
    setGiaNhanVienPosterDe(res.user?.typeGia?.PosterDe.user);
    setGiaKhachPosterDe(res.user?.typeGia?.PosterDe.customer);
    setGiaNhanVienPosterKho(res.user?.typeGia?.PosterKho.user);
    setGiaKhachPosterKho(res.user?.typeGia?.PosterKho.customer);
    setGiaNhanVienTumler(res.user?.typeGia?.Tumler.user);
    setGiaKhachTumler(res.user?.typeGia?.Tumler.customer);
    setGiaNhanVienTshirt3D(res.user?.typeGia?.PosterKho.user);
    setGiaKhachTshirt3D(res.user?.typeGia?.PosterKho.customer);
    setGiaNhanVienTshirt3DQuan(res.user?.typeGia?.Tshirt3DQuan.user);
    setGiaKhachTshirt3DQuan(res.user?.typeGia?.Tshirt3DQuan.customer);

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
        Tshirt2DClone: {
          customer: giaKhachTshirt2DClone,
          user: giaNhanVienTshirtt2DClone,
        },
        Tshirt2DRedesign: {
          customer: giaKhachTshirt2DRedesign,
          user: giaNhanVienTshirt2DRedesign,
        },
        Mug: {
          customer: giaKhachMug,
          user: giaNhanVienMug,
        },
        Tumler: {
          customer: giaKhachTumler,
          user: giaNhanVienTumler,
        },
        Tshirt3D: {
          customer: giaKhachTshirt3D,
          user: giaNhanVienTshirt3D,
        },
        PosterKho: {
          customer: giaKhachPosterKho,
          user: giaNhanVienPosterKho,
        },
        PosterDe: {
          customer: giaKhachPosterDe,
          user: giaNhanVienPosterDe,
        },
        Tshirt3DQuan: {
          customer: giaKhachTshirt3DQuan,
          user: giaNhanVienTshirt3DQuan,
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
                          Giá Tshirt 2D Clone
                        </label>
                        <div className="flex flex-row  gap-3">
                          <div className="w-[50%]">
                            <input
                              class="form-control"
                              type="number"
                              // id="exampleFormControlinput1"
                              // rows="3"
                              value={giaKhachTshirt2DClone}
                              onChange={(e) =>
                                setGiaKhachTshirt2DClone(e.target.value)
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
                              value={giaNhanVienTshirtt2DClone}

                              onChange={(e) =>
                                setGiaNhanVienTshirtt2DClone(e.target.value)
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
                          Giá Tshirt 2D Redesign
                        </label>
                        <div className="flex flex-row  gap-3">
                          <div className="w-[50%]">
                            <input
                              class="form-control"
                              type="number"
                              // id="exampleFormControlinput1"
                              // rows="3"
                              value={giaKhachTshirt2DRedesign}

                              onChange={(e) =>
                                setGiaKhachTshirt2DRedesign(e.target.value)
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
                              value={giaNhanVienTshirt2DRedesign}

                              onChange={(e) =>
                                setGiaNhanVienTshirt2DRedesign(e.target.value)
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
                          Giá Mug
                        </label>
                        <div className="flex flex-row  gap-3">
                          <div className="w-[50%]">
                            <input
                              class="form-control"
                              type="number"
                              // id="exampleFormControlinput1"
                              // rows="3"
                              value={giaKhachMug}

                              onChange={(e) =>
                                setGiaKhachMug(e.target.value)
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
                              value={giaNhanVienMug}
                              onChange={(e) =>
                                setGiaNhanVienMug(e.target.value)
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
                              // id="exampleFormControlinput1"
                              // rows="3"
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
                              // id="exampleFormControlinput1"
                              // rows="3"
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
                              // id="exampleFormControlinput1"
                              // rows="3"
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
                              // id="exampleFormControlinput1"
                              // rows="3"
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
                          Giá Tumler
                        </label>
                        <div className="flex flex-row  gap-3">
                          <div className="w-[50%]">
                            <input
                              class="form-control"
                              type="number"
                              // id="exampleFormControlinput1"
                              // rows="3"
                              value={giaKhachTumler}

                              onChange={(e) => setGiaKhachTumler(e.target.value)}
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
                              value={giaNhanVienTumler}

                              onChange={(e) => setGiaNhanVienTumler(e.target.value)}
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
                          Giá Tshirt 3D + Quần
                        </label>
                        <div className="flex flex-row  gap-3">
                          <div className="w-[50%]">
                            <input
                              class="form-control"
                              type="number"
                              // id="exampleFormControlinput1"
                              // rows="3"   
                              value={giaKhachTshirt3DQuan}

                              onChange={(e) =>
                                setGiaKhachTshirt3DQuan(e.target.value)
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
                              value={giaNhanVienTshirt3DQuan}

                              onChange={(e) =>
                                setGiaNhanVienTshirt3DQuan(e.target.value)
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
                          Giá Tshirt 3D
                        </label>
                        <div className="flex flex-row  gap-3">
                          <div className="w-[50%]">
                            <input
                              class="form-control"
                              type="number"
                              // id="exampleFormControlinput1"
                              // rows="3"
                              value={giaKhachTshirt3D}

                              onChange={(e) =>
                                setGiaKhachTshirt3D(e.target.value)
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
                              value={giaNhanVienTshirt3D}

                              onChange={(e) =>
                                setGiaNhanVienTshirt3D(e.target.value)
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
