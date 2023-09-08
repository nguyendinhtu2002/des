const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);


const jobSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
    default: 0,
  },
  designer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  nameProduct: {
    type: String,
    require: true,
  },
  quantity:{
    type:Number,
    require:true,
    default:1,
  },
  guest_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  // moneyProcessed: {
  //   type: Boolean,
  //   default: false,
  // },
  createdAt: { type: Date},
});

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
