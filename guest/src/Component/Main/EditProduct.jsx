import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as JobService from "../../service/JobService";
import { useQuery } from "react-query";
import axios from "axios";
import { useMutationHooks } from "../../hook/useMutationHook";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { id } = useParams();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [orderNote,setOrderNote] = useState("")
  const [design, setDesign] = useState([]);
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
      setMessage(data.attributes.outsource_note);
      setStatus(data.status);
      setDesign(data.designs);
      setOrderNote(data.attributes.outsource_order);
    }
  }, [data]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    mutationAddProduct.mutate({
      id,
      status: status,
      outsource_note: message,
      outsource_order:orderNote,
      access_token,
    });
  };
  useEffect(() => {
    // hangldeGetAll();
    if (!error && isSuccess) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Thành công!", Toastobjects);
      }
    } else if (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Có lỗi vui lòng thử lại", Toastobjects);
      }
    }
  }, [error, isSuccess]);
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/" className="btn btn-danger text-white">
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
                        Message
                      </label>
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="product_title" className="form-label">
                        Order note
                      </label>
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="product_price" className="form-label">
                        Status
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option selected>Choose Status</option>
                        <option value="Fix">Fix</option>
                        <option value="Done">Done</option>
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
