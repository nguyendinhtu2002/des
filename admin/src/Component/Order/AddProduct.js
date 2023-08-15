import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import axios from "axios";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { Radio } from "@material-tailwind/react";
import * as JobService from "../../service/JobService";
import * as UserService from "../../service/UserService";
import { useQuery } from "react-query";

// import * as CategoryService from "../../Services/CategoryService";

// import { fetchAsyncProducts } from "../../features/productSlide/productSlice";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const [productname, setName] = useState("");
  const [idNv, setIdNv] = useState("");
  const [idGuest, setIdGuest] = useState("");
  const [quantity, setQuantity] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
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

  const mutationAddProduct = useMutationHooks(async (data) => {
    const { access_token, ...rests } = data;
    const res = await JobService.createJob(rests, access_token);
    return res;
  });
  const fetchUser = async () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));

    const res = await UserService.getAll();
    return res;
  };
  const { data } = useQuery(["user"], fetchUser);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (productname === "" || idNv === "" || idGuest === "" || quantity === 0) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Không được để trống!", Toastobjects);
      }
    } else {
      try {
        const access_token = JSON.parse(localStorage.getItem("access_token"));

        const result = mutationAddProduct.mutate({
          designer_id: idNv,
          guest_id: idGuest,
          quantity,
          nameProduct: productname,
          access_token,
        });

        console.log(result);
      } catch (error) {
        toast.error("Không đủ tiền!", ToastObjects);
      }
    }
  };
  const { error, isLoading, isSuccess, isError } = mutationAddProduct;
  useEffect(() => {
    if (!error && isSuccess) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Thành công!", Toastobjects);
      }
    } else if (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          "Số dư không đủ vui lòng liên hệ admin nạp thêm",
          Toastobjects
        );
      }
    }
  }, [error, isSuccess]);
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to order
            </Link>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {/* {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />} */}
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Product
                    </label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setName(e.target.value)}
                    >
                      <option selected>Choose Product</option>
                      <option value="Tshirt2DClone">Tshirt 2D Clone</option>
                      <option value="Tshirt2DRedesign">
                        Tshirt 2D Redesign
                      </option>
                      <option value="Mug">Mug</option>
                      <option value="PosterDe">Poster Dễ</option>
                      <option value="PosterKho">Poster Khó</option>
                      <option value="Tumler">Tumler</option>
                      <option value="Tshirt3D">Tshirt 3D</option>
                      <option value="Tshirt 3D Quan">Tshirt 3D Quan</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Nhân viên
                    </label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setIdNv(e.target.value)}
                    >
                      <option selected>Choose Nhân viên</option>

                      {data?.map((item) =>
                        item.role === "customer" ? (
                          <option value={item._id}>{item.name}</option>
                        ) : (
                          ""
                        )
                      )}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Khách
                    </label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setIdGuest(e.target.value)}
                    >
                      <option selected>Choose Khách</option>
                      {data?.map((item) =>
                        item.role === "guest" ? (
                          <option value={item._id}>{item.name}</option>
                        ) : (
                          ""
                        )
                      )}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Số lượng
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
