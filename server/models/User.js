const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    money: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer", "guest"],
      default: "customer",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    typeGia: {
      Tshirt2DClone: {
        customer: {
          type: Number,
          default: 0,
        },
        user: {
          type: Number,
          default: 0,
        },
      },
      Tshirt2DRedesign: {
        customer: {
          type: Number,
          default: 0,
        },
        user: {
          type: Number,
          default: 0,
        },
      },
      Mug: {
        customer: {
          type: Number,
          default: 0,
        },
        user: {
          type: Number,
          default: 0,
        },
      },
      PosterDe: {
        customer: {
          type: Number,
          default: 0,
        },
        user: {
          type: Number,
          default: 0,
        },
      },
      PosterKho: {
        customer: {
          type: Number,
          default: 0,
        },
        user: {
          type: Number,
          default: 0,
        },
      },
      Tumler: {
        customer: {
          type: Number,
          default: 0,
        },
        user: {
          type: Number,
          default: 0,
        },
      },
      Tshirt3D: {
        customer: {
          type: Number,
          default: 0,
        },
        user: {
          type: Number,
          default: 0,
        },
      },
      Tshirt3DQuan: {
        customer: {
          type: Number,
          default: 0,
        },
        user: {
          type: Number,
          default: 0,
        },
      }
    },
  },
  {
    timestamps: true,
  }
);

// Login
userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Register and Update Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
