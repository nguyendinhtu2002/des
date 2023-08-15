import React, { useState, useEffect } from "react";
import Toast from "../LoadingError/Toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as JobService from "../../service/JobService";
import { useQuery } from "react-query";
import axios from "axios";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../service/UserService";
import { updateStatus } from "../../features/products/productSlide";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  
  const [product,setProduct] = useState('')
  const [quantity, setquantity] = useState(0);
  const [idnv,setIdNv] = useState('')
  const [idkhach,setIdKhach] =  useState('')
  const [status, setStatus] = useState("");
  const toggleChecked = () => setShow((value) => !value);
  const clickMobi = () => setOpen((value) => !value);
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
  const history = useNavigate();
  const dispatch = useDispatch();
  const handleGetDetailJob = async (id) => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));

    const res = await JobService.getDetail(id, access_token);
    // dispatch(createHistory(res));
    return res;
  };
  const mutationAddProduct = useMutationHooks(async (data) => {
    const { id, access_token, ...rests } = data;
    const res = await JobService.updateByGuest(id, rests, access_token);
    return res;
  });
  const { isLoading, data } = useQuery(["productDetail"], () =>
    handleGetDetailJob(id)
  );
  const { error, isSuccess } = mutationAddProduct;

  useEffect(() => {
    if (data) {
      console.log(data)
      setquantity(data.quantity)
      setProduct(data.nameProduct)
      setIdNv(data.designer_id._id)
      setIdKhach(data.guest_id._id)

    }
  }, [data]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    mutationAddProduct.mutate({
      id,
      quantity:Number(quantity),
      guest_id:idkhach,
      designer_id:idnv,
      nameProduct:product,
      access_token,
    });
  };
  
  const fetchUser = async () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));

    const res = await UserService.getAll();
    return res;
  };
  const { data:data1 } = useQuery(["user"], fetchUser);
  useEffect(() => {
    // hangldeGetAll();
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
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
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
                  {/* {productSingleStatus && <Loading />} */}

                  {/* productSingleStatus Loading */}
                  <>

                    <div className="mb-4">
                      <label htmlFor="product_title" className="form-label">
                        Số lượng
                      </label>
                      <input
                        class="form-control"
                        type="number"
                        value={quantity}
                        onChange={(e) => setquantity(e.target.value)}

                      ></input>
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

                      {data1?.map((item) =>
                        item.role === "customer" ? (
                          <option value={item._id} selected={item._id===idnv}>{item.name}</option>
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
                      onChange={(e) => setIdKhach(e.target.value)}
                    >
                      <option selected>Choose Khách</option>
                      {data1?.map((item) =>
                        item.role === "guest" ? (
                          <option value={item._id} selected={item._id===idkhach}>{item.name}</option>
                        ) : (
                          ""
                        )
                      )}
                    </select>
                  </div>
                    <div className="mb-4">
                      <label htmlFor="product_price" className="form-label">
                        Product
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setProduct(e.target.value)}
                      >
                        <option selected>Choose Product</option>
                        <option value="Tshirt3D" selected={product==="Tshirt3D"}>Tshirt 3D</option>
                        <option value="Tshirt2DClone" selected={product==="Tshirt2DClone"}>Tshirt 2D Clone</option>
                        <option value="Tshirt2DRedesign" selected={product==="Tshirt2DRedesign"}>Tshirt 2D Redesign</option>
                        <option value="Mug" selected={product==="Mug"}>Mug</option>
                        <option value="PosterDe" selected={product==="PosterDe"}>Poster Dễ</option>
                        <option value="PosterKho" selected={product==="PosterKho"}>Poster Khó</option>
                        <option value="Tumler" selected={product==="Tumler"}>Tumler</option>
                        <option value="Tshirt3DQuan" selected={product==="Tshirt3DQuan"}>Tshirt 3D Quan</option>

                      </select>
                    </div>

                  </>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
