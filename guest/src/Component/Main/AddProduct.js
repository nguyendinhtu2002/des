import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import Loading from "../LoadingError/Loading";
import axios from "axios";
import { useMutationHooks } from "../../hook/useMutationHook";
import { Radio } from "@material-tailwind/react";
import * as JobService from "../../service/JobService";
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
  const [multipleDes, setMultipleDes] = useState(false);
  const [doubleSided, setDoubleSided] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [sku, setSku] = useState("");
  const [size, setSize] = useState("");
  const [local, setLocal] = useState("");
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const toastId = React.useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };
  const Toastobjects = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const handleFileInputChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
  };
  const mutationAddProduct = useMutationHooks(async (data) => {
    const { access_token, ...rests } = data;
    const res = await JobService.createJob(rests, access_token);
    return res;
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(deadline);
    if (productname === "" || deadline === "" || sku === "" || size === "") {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Không được để trống!", Toastobjects);
      }
    } else {
      const uploadedImageUrls = "";
      const sizes = size.includes(",") ? size.split(",") : [size];
      try {
        for (const image of images) {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "Project1");

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/dgeeyhyzq/image/upload`,
            formData
          );

          try {
            const access_token = JSON.parse(
              localStorage.getItem("access_token")
            );

            const result = mutationAddProduct.mutate({
              product: {
                name: productname,
                multiple_design: multipleDes === "on" ? true : false,
                double_sided: doubleSided === "on" ? true : false,
                Deadline: deadline,
                sku: sku,
                size: sizes,
                image_url: res.data.secure_url,
              },
              guest_create: userLogin.id,
              access_token,
            });

            console.log(result);
          } catch (error) {
            toast.error("Không đủ tiền!", ToastObjects);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const { error, isLoading, isSuccess, isError } = mutationAddProduct;
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
            <Link to="/" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
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
                    <label htmlFor="product_title" className="form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      // value={productname}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div class="mb-3">
                    <label for="formFileMultiple" class="form-label">
                      Dead line
                    </label>
                    <input
                      type="datetime-local"
                      class="form-control"
                      id="date"
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Loại sản phẩm
                    </label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setSku(e.target.value)}
                    >
                      <option selected>Choose Loại sản phẩm</option>
                      <option value="Tshirt2DX15">Tshirt 2D X1.5</option>
                      <option value="Tshirt2DX2">Tshirt 2D X2</option>
                      <option value="Tshirt2DX3">Tshirt 2D X3</option>
                      <option value="Tshirt2D">Tshirt 2D</option>
                      <option value="Tshirt2DKho">Tshirt 2D khó</option>
                      <option value="PosterKho">Poster Khó</option>
                      <option value="PosterDe">Poster Dễ</option>
                      <option value="T3D">3D</option>
                      <option value="Quan3D">3D + Quần</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Size
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      onChange={(e) => setSize(e.target.value)}
                    />
                    <div id="emailHelp" class="form-text">
                      Mỗi size cách nhau bởi dấu phẩy(",").
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="formFileMultiple" class="form-label">
                      Images
                    </label>
                    <input
                      class="form-control"
                      type="file"
                      id="formFileMultiple"
                      onChange={handleFileInputChange}
                      multiple
                    />
                    {/* <p>File đã chọn: {fileName}</p> */}
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
