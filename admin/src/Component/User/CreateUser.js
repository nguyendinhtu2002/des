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

const CreateUser = () => {
  const [updateAdmin, setUpdateAdmin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [soDu, setSoDu] = useState(0);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
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

  const mutation = useMutationHooks(async (data) => {
    const { access_token, ...rests } = data;
    const res = await UserService.createUser(rests, access_token);
    return res;
  });
  const handleUpdate = (e) => {
    e.preventDefault();
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    console.log(
      email + "  " + updateAdmin + " " + username + " " + password + " " + soDu
    );
    if (
      email != "" &&
      updateAdmin != "" &&
      username != "" &&
      password != "" &&
      name != ""
    ) {
      const updateData = {
        role: updateAdmin,
        email: email,
        money: Number(soDu),
        name,
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
        username,
        password,
        access_token,
      };
      mutation.mutate(updateData);
    } else {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          "Vui lòng nhập đủ thông tin",
          Toastobjects
        );
      }
    }
  };
  const { error, isSuccess } = mutation;

  useEffect(() => {
    if (!error && isSuccess) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Thành công!", Toastobjects);
      }
    } else if (error) {
      console.log(error);
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          error.response.data.message,
          Toastobjects
        );
      }
    }
  }, [error, isSuccess]);

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleUpdate}>
          <div className="content-header">
            <Link to="/users" className="btn btn-danger text-white">
              Go to users
            </Link>
            <h2 className="content-title">Create User</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Public now
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
                          onChange={(e) => setEmail(e.target.value)}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Tên người dùng
                        </label>
                        <input
                          class="form-control"
                          // id="exampleFormControlinput1"
                          // rows="3"
                          onChange={(e) => setName(e.target.value)}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Tên đăng nhập
                        </label>
                        <input
                          class="form-control"
                          // id="exampleFormControlinput1"
                          // rows="3"
                          onChange={(e) => setUsername(e.target.value)}
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
                              // id="exampleFormControlinput1"
                              // rows="3"
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
                              // id="exampleFormControlinput1"
                              // rows="3"
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
                              // id="exampleFormControlinput1"
                              // rows="3"
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
                              // id="exampleFormControlinput1"
                              // rows="3"
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
                              // id="exampleFormControlinput1"
                              // rows="3"
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
                              // id="exampleFormControlinput1"
                              // rows="3"
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
                              // id="exampleFormControlinput1"
                              // rows="3"
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
                              // id="exampleFormControlinput1"
                              // rows="3"
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
                              // id="exampleFormControlinput1"
                              // rows="3"
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
                              // id="exampleFormControlinput1"
                              // rows="3"
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

export default CreateUser;
