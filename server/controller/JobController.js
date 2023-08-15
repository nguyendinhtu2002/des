const Joi = require("joi");
const Job = require("../models/Job");
const User = require("../models/User");
const getPriceAndAttributesBySku = (guest, sku) => {
  const priceMapping = {
    Tshirt2DClone: {
      customer: guest.typeGia.Tshirt2DClone.customer,
      user: guest.typeGia.Tshirt2DClone.user,
    },
    Tshirt2DRedesign: {
      customer: guest.typeGia.Tshirt2DRedesign.customer,
      user: guest.typeGia.Tshirt2DRedesign.user,
    },
    Mug: {
      customer: guest.typeGia.Mug.customer,
      user: guest.typeGia.Mug.user,
    },
    PosterDe: {
      customer: guest.typeGia.PosterDe.customer,
      user: guest.typeGia.PosterDe.user,
    },
    PosterKho: {
      customer: guest.typeGia.PosterKho.customer,
      user: guest.typeGia.PosterKho.user,
    },
    Tumler: {
      customer: guest.typeGia.Tumler.customer,
      user: guest.typeGia.Tumler.user,
    },
    TshirTumler: {
      customer: guest.typeGia.Tshirt3D.customer,
      user: guest.typeGia.Tshirt3D.user,
    },
    Tshirt3DQuan: {
      customer: guest.typeGia.Tshirt3DQuan.customer,
      user: guest.typeGia.Tshirt3DQuan.user,
    },
  };

  return priceMapping[sku] || null;
};
const createJob = async (req, res) => {
  try {
    const {
      designer_id,
      nameProduct,
      quantity,
      guest_id,
    } = req.body;
    const schema = Joi.object({
      designer_id: Joi.string().required(),
      nameProduct: Joi.string().required(),
      quantity: Joi.number().required().min(1),
      guest_id: Joi.string().required()
    });

    // Kiểm tra dữ liệu đầu vào với schema
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const guest = await User.findOne({ _id: guest_id });
    const customer = await User.findOne({ _id: designer_id });

    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }
    // Kiểm tra số tiền hiện có của người dùng
    const sku = nameProduct; // Lấy SKU từ product
    let price = 0;
    let priceNv = 0;
    let updatedAttributes = {};
    // Kiểm tra SKU và xác định giá tiền tương ứng
    if (sku == "Tshirt2DClone") {
      price = guest.typeGia.Tshirt2DClone.customer; // Giá tiền cho loại Tshirt2D và người dùng
      priceNv = guest.typeGia.Tshirt2DClone.user;
    } else if (sku == "Tshirt2DRedesign") {
      price = guest.typeGia.Tshirt2DRedesign.customer; // Giá tiền cho loại Tshirt2D và người dùng
      priceNv = guest.typeGia.Tshirt2DRedesign.user;

    } else if (sku == "Mug") {
      price = guest.typeGia.Mug.customer;
      priceNv = guest.typeGia.Mug.user;
      // Giá tiền cho loại Tshirt2D và người dùng
    } else if (sku == "PosterDe") {
      price = guest.typeGia.PosterDe.customer;
      priceNv = guest.typeGia.PosterDe.user;
      // Giá tiền cho loại Tshirt2D và người dùng
    } else if (sku == "PosterKho") {
      price = guest.typeGia.PosterKho.customer;
      priceNv = guest.typeGia.PosterKho.user;
      // Giá tiền cho loại Tshirt2D và người dùng
    } else if (sku == "Tumler") {
      price = guest.typeGia.Tumler.customer;
      priceNv = guest.typeGia.Tumler.user;
      // Giá tiền cho loại Poster và người dùng
    } else if (sku == "Tshirt3D") {
      price = guest.typeGia.Tshirt3D.customer;
      priceNv = guest.typeGia.Tshirt3D.user;
      // Giá tiền cho loại Poster và người 
    } else if (sku == "Tshirt3DQuan") {
      price = guest.typeGia.Tshirt3DQuan.customer;
      priceNv = guest.typeGia.Tshirt3DQuan.user;
      // Giá tiền cho loại Tshirt3DQuan và người dùng
    }
    console.log(price)

    if (guest.money < price * quantity || guest.money === 0) {
      return res.status(400).json({ message: "Insufficient funds" });
    }


    // Trừ tiền từ trường money của guest_create
    guest.money -= price * quantity;
    customer.money += priceNv * quantity;
    // Lưu thông tin guest_create đã được cập nhật
    await guest.save();
    await customer.save();

    // Tạo một đối tượng Job mới
    const job = new Job({
      designer_id,
      nameProduct,
      quantity,
      guest_id,
    });

    const savedJob = await job.save();
    if (savedJob) {
      return res.status(200).json(savedJob);
    } else {
      return res.status(400).json({ message: "Error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const getJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findOne({ id: jobId }).populate([
      {
        path: "designer_id",
        select: "name email _id",
      },
      {
        path: "guest_id",
        select: "name",
      },
    ]);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Lấy tên của người thiết kế

    return res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "designer_id",
          select: "name email _id",
        },
        {
          path: "guest_id",
          select: "name",
        },
      ]);



    return res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Hàm gộp các công việc dựa trên nameProduct giống nhau
const mergeJobsByName = (jobs) => {
  const mergedJobsMap = new Map();

  for (const job of jobs) {
    const { nameProduct } = job;
    if (mergedJobsMap.has(nameProduct)) {
      mergedJobsMap.get(nameProduct).quantity += job.quantity;
    } else {
      mergedJobsMap.set(nameProduct, { ...job });
    }
  }

  const mergedJobs = Array.from(mergedJobsMap.values());
  return mergedJobs;
};
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Cập nhật trạng thái của job với id tương ứng
    const updatedJob = await Job.findOneAndUpdate(
      { id: id },
      { status: status },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ message: "Update success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const getJobByStatus = async (req, res) => {
  try {
    const jobs = await Job.find({
      status: "Waiting",
      isDeleted: "false",
    })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "designer.designer_id",
          select: "name email _id",
        },
        {
          path: "guest_create",
          select: "name",
        },
      ]);

    return res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findOne({ id: id }).populate("guest_create");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const guest = await User.findOne({ _id: job.guest_create });

    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }
    const priceAndAttributes = getPriceAndAttributesBySku(
      guest,
      job.product.sku
    );
    const { customer } = priceAndAttributes;

    if (guest) {
      guest.money += customer;
      await guest.save();
    }

    // Đánh dấu công việc là đã xóa
    const updatedJob = await Job.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true }
    );

    return res.status(200).json({ message: "Delete success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { nameProduct, quantity } = req.body;
    const job = await Job.findOne({ id: id });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    else {
      const guest = await User.findOne({ _id: job.guest_id });
      const customer = await User.findOne({ _id: job.designer_id });
      if (quantity > job.quantity) {
        const quantityReal = quantity - job.quantity;
    
        if (guest) {
          const tempt = quantityReal * guest.typeGia[nameProduct].customer
          if (tempt > guest.money) {
            return res.status(400).json({ message: "Insufficient funds" });
          }
          else{
            guest.money -=tempt;
            customer.money +=(quantityReal * guest.typeGia[nameProduct].user);
            guest.save()
            customer.save()
          }
        }
      }
      else{
        const quantityReal = job.quantity -quantity;
        if (guest) {
          const tempt = quantityReal * guest.typeGia[nameProduct].customer
          if (tempt > guest.money) {
            return res.status(400).json({ message: "Insufficient funds" });
          }
          else{
            guest.money +=tempt;
            customer.money -=(quantityReal * guest.typeGia[nameProduct].user);
            guest.save()
            customer.save()
          }
        }
      }
    }
    // Cập nhật trường designer_id và status cho công việc
    const updatedJob = await Job.findOneAndUpdate(
      { id: id },
      { nameProduct: nameProduct, quantity: quantity },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const getJobByUser = async (req, res) => {
  try {
    const { designerId } = req.params;

    const jobs = await Job.find({
      "designer_id": designerId,
      isDeleted: false,
    })
    .populate([
      {
        path: "designer_id",
        select: "name email _id",
      },
      {
        path: "guest_id",
        select: "typeGia",
      },
    ]);

    let totalMoney = 0;
    const transformedData = [];

    for (const job of jobs) {
      const designer_id = {
        _id: job.designer_id._id,
        name: job.designer_id.name,
        email: job.designer_id.email,
      };
      const product = { nameProduct: job.nameProduct, quantity: job.quantity };

      const guestTypeGia = job.guest_id ? job.guest_id.typeGia[job.nameProduct] : null;
      const money = guestTypeGia ? guestTypeGia.user * product.quantity : 0;
      
      totalMoney += money;

      const existingDesignerEntry = transformedData.find(entry => entry.designer_id._id.toString() === designer_id._id.toString());
      
      if (existingDesignerEntry) {
        const existingProduct = existingDesignerEntry.product.find(p => p.nameProduct === product.nameProduct);
        if (existingProduct) {
          existingProduct.quantity += product.quantity;
          existingProduct.money += money;
        } else {
          existingDesignerEntry.product.push({ ...product, money });
        }
      } else {
        transformedData.push({
          designer_id: designer_id,
          product: [{ ...product, money }]
        });
      }
    }

    res.status(200).json({ transformedData, totalMoney });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching job data." });
  }
};


const cancelJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findOne({ id: id });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (!job.designer || !job.designer.designer_id) {
      return res
        .status(400)
        .json({ message: "Job does not have a designer assigned" });
    }

    // Remove the designer_id and update the status to "Waiting"
    job.designer.designer_id = undefined;
    job.status = "Waiting";

    // Save the updated job
    const updatedJob = await job.save();

    return res.status(200).json({ message: "Cancel Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const deleteImg = async (req, res) => {
  try {
    const { id } = req.params;
    const { designId } = req.body;
    console.log(designId);
    // Tìm công việc với jobId
    const job = await Job.findOne({ id: id });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Lọc và xóa design từ công việc
    const designIndex = job.designs.findIndex(
      (design) => design._id == designId
    );

    if (designIndex === -1) {
      return res.status(404).json({ message: "Design not found" });
    }

    job.designs.splice(designIndex, 1);

    await job.save();

    return res.status(200).json({ job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, outsource_note, designs } = req.body;

    const updatedJob = await Job.findOneAndUpdate(
      { id: id },
      {
        status,
        "attributes.outsource_note": outsource_note,
        $push: { designs: { $each: designs } },
      },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const getByGuest = async (req, res) => {
  try {
    const { guestId } = req.params;

    const jobs = await Job.find({ guest_create: guestId, isDeleted: "false" })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "designer.designer_id",
          select: "name email _id",
        },
        {
          path: "guest_create",
          select: "name",
        },
      ]);

    return res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const updateGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, outsource_note, outsource_order } = req.body;

    const updatedJob = await Job.findOneAndUpdate(
      { id: id },
      {
        status,
        "attributes.outsource_note": outsource_note,
        "attributes.outsource_order": outsource_order,
      },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (status === "Done" && !updatedJob.moneyProcessed) {
      const id = updatedJob.designer.designer_id;
      if (id) {
        const user = await User.findOne({
          _id: updatedJob.designer.designer_id,
        });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        user.money +=
          updatedJob.attributes.outsource_price -
          updatedJob.attributes.monetary_fine;

        updatedJob.moneyProcessed = true;
        await updatedJob.save();
        await user.save();
      } else {
        return res.status(404).json({ message: "Chưa có ai nhận" });
      }
    }
    return res.status(200).json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const updateByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, outsource_note, monetary_fine, designer_id } = req.body;
    const updateFields = {
      status,
      "attributes.outsource_note": outsource_note,
      "attributes.monetary_fine": monetary_fine,
    };

    if (designer_id) {
      updateFields["designer.designer_id"] = designer_id;
    } else {
      updateFields["$unset"] = { "designer.designer_id": 1 };
    }
    const updatedJob = await Job.findOneAndUpdate(
      { id: id },

      updateFields,

      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (status === "Done" && !updatedJob.moneyProcessed) {
      const id = updatedJob.designer.designer_id;
      if (id) {
        const user = await User.findOne({
          _id: updatedJob.designer.designer_id,
        });

        if (!user) {
          return res.status(404).json({ message: "Chưa tồn tại nhân viên" });
        }

        user.money +=
          updatedJob.attributes.outsource_price -
          updatedJob.attributes.monetary_fine;

        updatedJob.moneyProcessed = true;
        await updatedJob.save();
        await user.save();
      } else {
        return res.status(404).json({ message: "Chưa có ai nhận" });
      }
    }
    return res.status(200).json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const getTotalPrice = async (req, res) => {
  try {
    const jobs = await Job.find();
    let totalPrice = 0;

    for (const job of jobs) {

      const user = await User.findOne({ _id: job.designer_id });

      if (user) {
        const customerPrice = user.typeGia[job.nameProduct]?.user || 0;
        totalPrice += customerPrice;
      }
    }

    return res.status(200).json({ totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const getStatusCountByDesigner = async (req, res) => {
  try {
    const possibleStatuses = [
      "Waiting Admin",
      "Waiting",
      "Doing",
      "Review",
      "Fix",
      "Confirm",
      "Done",
    ];

    const pipeline = [
      // Match the documents with the specified criteria (optional)
      {
        $match: {
          isDeleted: false,
        },
      },
      // Unwind the 'designer' field to create a separate document for each designer
      { $unwind: "$designer" },
      // Group the documents by 'designer.designer_id' (designer ID) and 'status' and calculate the count for each group
      {
        $group: {
          _id: {
            designerId: "$designer.designer_id",
            status: "$status",
          },
          count: { $sum: 1 },
        },
      },
      // Group again by designer to accumulate the status counts for each designer
      {
        $group: {
          _id: "$_id.designerId",
          statusCounts: {
            $push: {
              status: "$_id.status",
              count: "$count",
            },
          },
        },
      },
      // Lookup 'User' collection to get the designer's name
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "designerDetails",
        },
      },
      // Project the desired fields for the final result
      {
        $project: {
          _id: 1,
          name: { $arrayElemAt: ["$designerDetails.name", 0] },
          statusCounts: {
            $arrayToObject: {
              $map: {
                input: possibleStatuses,
                as: "status",
                in: {
                  k: "$$status",
                  v: {
                    $ifNull: [
                      {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$statusCounts",
                              cond: { $eq: ["$$this.status", "$$status"] },
                            },
                          },
                          0,
                        ],
                      },
                      0,
                    ],
                  },
                },
              },
            },
          },
        },
      },
    ];

    const result = await Job.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error occurred while fetching data" });
  }
};

module.exports = {
  createJob,
  getJob,
  getAllJobs,
  updateStatus,
  getJobByStatus,
  deleteJob,
  updateJob,
  getJobByUser,
  cancelJob,
  deleteImg,
  updateOrder,
  getByGuest,
  updateGuest,
  updateByAdmin,
  getTotalPrice,
  getStatusCountByDesigner,
};
