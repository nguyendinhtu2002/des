const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const designSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const jobSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
      default: 0,
    },
    payment_type: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "Waiting Admin",
        "Waiting",
        "Doing",
        "Review",
        "Fix",
        "Confirm",
        "Done",
      ],
      default: "Waiting Admin",
    },
    local_code: {
      type: String,
      required: true,
    },
    guest_create: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    designer: {
      designer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    product: {
      name: {
        type: String,
        required: true,
      },
      image_url: {
        type: String,
        required: true,
      },
      multiple_design: {
        type: Boolean,
        default: false,
      },
      double_sided: {
        type: Boolean,
        default: false,
      },
      Deadline: {
        type: Date,
        required: true,
      },
      sku: {
        type: String,
        require: true,
      },
      size: [String],
    },
    designs: [designSchema],
    attributes: {
      outsource_price: {
        type: Number,
        default: 0,
      },
      team_outsource: {
        type: String,
      },
      outsource_note: {
        type: String,
        default: "",
      },
      monetary_fine: {
        type: Number,
        default: 0,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.pre("save", async function (next) {
  if (this.isNew) {
    const highestIdOrder = await Job.findOne().sort("-id").exec();
    if (highestIdOrder) {
      this.id = highestIdOrder.id + 1;
    } else {
      this.id = 1; // Nếu chưa có bản ghi nào, id sẽ bắt đầu từ 1
    }
  }
  next();
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
