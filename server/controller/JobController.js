const Joi = require("joi");
const Job = require("../models/Job");
const User = require("../models/User");
const getPriceAndAttributesBySku = (guest, sku) => {
  const priceMapping = {
    Tshirt2D: {
      customer: guest.typeGia.Tshirt2D.customer,
      user: guest.typeGia.Tshirt2D.user,
    },
    Tshirt2DKho: {
      customer: guest.typeGia.Tshirt2DKho.customer,
      user: guest.typeGia.Tshirt2DKho.user,
    },
    Tshirt2DX15: {
      customer: guest.typeGia.Tshirt2DX15.customer,
      user: guest.typeGia.Tshirt2DX15.user,
    },
    Tshirt2DX2: {
      customer: guest.typeGia.Tshirt2DX2.customer,
      user: guest.typeGia.Tshirt2DX2.user,
    },
    Tshirt2DX3: {
      customer: guest.typeGia.Tshirt2DX3.customer,
      user: guest.typeGia.Tshirt2DX3.user,
    },
    PosterKho: {
      customer: guest.typeGia.PosterKho.customer,
      user: guest.typeGia.PosterKho.user,
    },
    PosterDe: {
      customer: guest.typeGia.PosterDe.customer,
      user: guest.typeGia.PosterDe.user,
    },
    T3D: {
      customer: guest.typeGia.T3D.customer,
      user: guest.typeGia.T3D.user,
    },
    Quan3D: {
      customer: guest.typeGia.Quan3D.customer,
      user: guest.typeGia.Quan3D.user,
    },
  };

  return priceMapping[sku] || null;
};
const createJob = async (req, res) => {
  try {
    const {
      payment_type,
      status,
      local_code,
      guest_create,
      designer,
      product,
      designs,
      attributes,
    } = req.body;
    // Định nghĩa schema Joi cho dữ liệu đầu vào
    const schema = Joi.object({
      payment_type: Joi.string(),
      status: Joi.string(),
      local_code: Joi.string(),
      guest_create: Joi.string(),
      designer: Joi.object({
        designer_id: Joi.string(),
      }),
      product: Joi.object({
        name: Joi.string().required(),
        image_url: Joi.string().required(),
        multiple_design: Joi.boolean().default(false),
        double_sided: Joi.boolean().default(false),
        Deadline: Joi.date().required(),
        sku: Joi.string().required(),
        size: Joi.array().items(Joi.string()),
      }).required(),
      designs: Joi.array().items(
        Joi.object({
          url: Joi.string(),
        })
      ),
      attributes: Joi.object({
        outsource_price: Joi.number().default(0),
        team_outsource: Joi.string(),
        outsource_note: Joi.string(),
        outsource_order: Joi.string(),
      }),
    });

    // Kiểm tra dữ liệu đầu vào với schema
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const guest = await User.findOne({ _id: guest_create });

    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }
    // Kiểm tra số tiền hiện có của người dùng
    const sku = product.sku; // Lấy SKU từ product
    let price = 0;
    let updatedAttributes = {};
    // Kiểm tra SKU và xác định giá tiền tương ứng
    if (sku == "Tshirt2D") {
      price = guest.typeGia.Tshirt2D.customer; // Giá tiền cho loại Tshirt2D và người dùng
      attributes.outsource_price = guest.typeGia.Tshirt2D.user;
    } else if (sku == "Tshirt2DKho") {
      price = guest.typeGia.Tshirt2DKho.customer; // Giá tiền cho loại Tshirt2D và người dùng
      attributes.outsource_price = guest.typeGia.Tshirt2DKho.user;
    } else if (sku == "Tshirt2DX15") {
      price = guest.typeGia.Tshirt2DX15.customer; // Giá tiền cho loại Tshirt2D và người dùng
      attributes.outsource_price = guest.typeGia.Tshirt2DX15.user;
    } else if (sku == "Tshirt2DX2") {
      price = guest.typeGia.Tshirt2DX2.customer; // Giá tiền cho loại Tshirt2D và người dùng
      attributes.outsource_price = guest.typeGia.Tshirt2DX2.user;
    } else if (sku == "Tshirt2DX3") {
      price = guest.typeGia.Tshirt2DX3.customer; // Giá tiền cho loại Tshirt2D và người dùng
      attributes.outsource_price = guest.typeGia.Tshirt2DX3.user;
    } else if (sku == "PosterKho") {
      price = guest.typeGia.PosterKho.customer; // Giá tiền cho loại Poster và người dùng
      attributes.outsource_price = guest.typeGia.PosterKho.user;
    } else if (sku == "PosterDe") {
      price = guest.typeGia.PosterDe.customer; // Giá tiền cho loại Poster và người dùng
      attributes.outsource_price = guest.typeGia.PosterDe.user;
    } else if (sku == "T3D") {
      price = guest.typeGia.T3D.customer; // Giá tiền cho loại T3D và người dùng
      attributes.outsource_price = guest.typeGia.T3D.user;
    } else if (sku == "Quan3D") {
      price = guest.typeGia.Quan3D.customer; // Giá tiền cho loại Quan3D và người dùng
      attributes.outsource_price = guest.typeGia.Quan3D.user;
    }

    if (guest.money < price) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    // Trừ tiền từ trường money của guest_create
    guest.money -= price;

    // Lưu thông tin guest_create đã được cập nhật
    await guest.save();

    // Tạo một đối tượng Job mới
    const job = new Job({
      payment_type,
      status,
      local_code,
      guest_create,
      designer,
      product,
      designs,
      attributes,
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
        path: "designer.designer_id",
        select: "name email _id",
      },
      {
        path: "guest_create",
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
    const { designerId } = req.body;
    const job = await Job.findOne({ id: id });

    if (job.designer && job.designer.designer_id) {
      return res
        .status(400)
        .json({ message: "Designer already assigned to the job" });
    }
    // Cập nhật trường designer_id và status cho công việc
    const updatedJob = await Job.findOneAndUpdate(
      { id: id },
      { "designer.designer_id": designerId, status: "Doing" },
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
      "designer.designer_id": designerId,
      isDeleted: false,
    }).populate([
      {
        path: "designer.designer_id",
        select: "name email _id",
      },
      {
        path: "guest_create",
        select: "name",
      },
    ]);

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching job data." });
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
      const { sku } = job.product;
      const { designer_id } = job.designer;

      const user = await User.findOne({ _id: designer_id });

      if (user) {
        const customerPrice = user.typeGia[sku]?.user || 0;
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
      { $unwind: '$designer' },
      // Group the documents by 'designer.designer_id' (designer ID) and 'status' and calculate the count for each group
      {
        $group: {
          _id: {
            designerId: '$designer.designer_id',
            status: '$status',
          },
          count: { $sum: 1 },
        },
      },
      // Group again by designer to accumulate the status counts for each designer
      {
        $group: {
          _id: '$_id.designerId',
          statusCounts: {
            $push: {
              status: '$_id.status',
              count: '$count',
            },
          },
        },
      },
      // Lookup 'User' collection to get the designer's name
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'designerDetails',
        },
      },
      // Project the desired fields for the final result
      {
        $project: {
          _id: 1,
          name: { $arrayElemAt: ['$designerDetails.name', 0] },
          statusCounts: {
            $arrayToObject: {
              $map: {
                input: possibleStatuses,
                as: 'status',
                in: {
                  k: '$$status',
                  v: {
                    $ifNull: [
                      {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: '$statusCounts',
                              cond: { $eq: ['$$this.status', '$$status'] },
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
    res.status(500).json({ message: 'Error occurred while fetching data' });
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
