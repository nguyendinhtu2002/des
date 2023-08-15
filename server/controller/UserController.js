const User = require("../models/User");
const Joi = require("joi");
const { generateToken, refreshToken } = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(8).required().messages({
      "string.base": "Username must be a string",
      "string.min": "Username must have at least 8 characters",
      "any.required": "Username is required",
    }),
    password: Joi.string().min(8).required().messages({
      "string.base": "Password must be a string",
      "string.min": "Password must have at least 8 characters",
      "any.required": "Password is required",
    }),
    email: Joi.string(),
    money: Joi.number(),
    name: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
    role: Joi.string().valid("admin", "customer", "guest"),
    typeGia: Joi.object({
      Tshirt2DClone: Joi.object({
        customer: Joi.number(),
        user: Joi.number(),
      }),
      Tshirt2DRedesign: Joi.object({
        customer: Joi.number(),
        user: Joi.number(),
      }),
      Mug: Joi.object({
        customer: Joi.number(),
        user: Joi.number(),
      }),
      PosterDe: Joi.object({
        customer: Joi.number(),
        user: Joi.number(),
      }),
      PosterKho: Joi.object({
        customer: Joi.number(),
        user: Joi.number(),
      }),
      Tumler: Joi.object({
        customer: Joi.number(),
        user: Joi.number(),
      }),
      Tshirt3D: Joi.object({
        customer: Joi.number(),
        user: Joi.number(),
      }),
      Tshirt3DQuan: Joi.object({
        customer: Joi.number(),
        user: Joi.number(),
      })
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) {
      return res.status(400).json({ message: "User name already exists" });
    }
    const user = await User.create(req.body);

    if (user) {
      return res.status(201).json({
        message: "Success!",
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user)
    if (user && (await user.matchPassword(password)) && !user.isDeleted) {
      if (user.role != "customer") {
        return res.status(401).json({ error: "Account not User" });
      }
      const access_token = await generateToken({
        id: user._id,
      });

      const refresh_token = await refreshToken({
        id: user._id,
      });
      return res.json({
        status: "OK",
        message: "SUCESS",
        access_token,
        refresh_token,
      });
    } else {
      return res.status(401).json({ error: "Invalid Usermame or Password" });
    }
  } catch (error) {
    next(error);
  }
};
const loginGuest = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password)) && !user.isDeleted) {
      if (user.role != "guest") {
        return res.status(401).json({ error: "Account not Guest" });
      }
      const access_token = await generateToken({
        id: user._id,
      });

      const refresh_token = await refreshToken({
        id: user._id,
      });
      return res.json({
        status: "OK",
        message: "SUCESS",
        access_token,
        refresh_token,
      });
    } else {
      return res.status(401).json({ error: "Invalid Usermame or Password" });
    }
  } catch (error) {
    next(error);
  }
};
const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password)) && !user.isDeleted) {
      if (user.role != "admin") {
        return res.status(401).json({ error: "Account not Admin" });
      }
      const access_token = await generateToken({
        id: user._id,
      });

      const refresh_token = await refreshToken({
        id: user._id,
      });
      return res.json({
        status: "OK",
        message: "SUCESS",
        access_token,
        refresh_token,
      });
    } else {
      return res.status(401).json({ error: "Invalid Usermame or Password" });
    }
  } catch (error) {
    next(error);
  }
};
const refreshTokenService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) {
          console.log("err", err);
          resolve({
            status: "ERR",
            message: "The authemtication",
          });
        }
        const access_token = await generateToken({
          id: user.id,
        });
        resolve({
          status: "OK",
          message: "SUCESS",
          access_token,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};
const RefreshTokenController = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await refreshTokenService(token);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params._id).select("-password");
    if (user) {
      res.json({
        status: "OK",
        message: "SUCESS",
        user,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};
const getAll = async (req, res) => {
  try {
    const user = await User.find({ isDeleted: false }).select("-password");

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};
const updateAccount = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  const userSchema = Joi.object({
    name: Joi.string(),
    password: Joi.string().allow(""),
    role: Joi.string().valid("admin", "customer", "guest"),
    money: Joi.number(),
    email: Joi.string(),
    typeGia: Joi.object({
      Tshirt2DClone: Joi.object({
        customer: Joi.number(),
        user: Joi.number(),
      }),
      Tshirt2DRedesign: Joi.object({
        customer: Joi.number(),
        user: Joi.number(),
      }),
      Mug: Joi.object({
        customer: Joi.number(),
        user: Joi.number(),
      }),
      PosterDe: Joi.object({
        customer: Joi.number(),
        user: Joi.number(),
      }),
      PosterKho: Joi.object({
        customer: Joi.number(),
        user: Joi.number(),
      }),
      Tumler: Joi.object({
        customer: Joi.number(),
        user: Joi.number(),
      }),
      Tshirt3D: Joi.object({
        customer: Joi.number(),
        user: Joi.number(),
      }),
      Tshirt3DQuan: Joi.object({
        customer: Joi.number(),
        user: Joi.number(),
      })
    }),
  });
  const { error, value } = userSchema.validate(updateData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updateData.password, salt);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res.json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const detelteAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const updatedJob = await User.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Delete success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const userisCustomer = async (req, res, next) => {
  try {
    const user = await User.find({ isDeleted: false, role: "customer" }).select(
      "-password"
    );

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};
const toltalMoneyUser = async(req,res,next)=>{
  try {
    const users = await User.find({ isDeleted: false,role:"customer" });

    let totalMoney = 0;

    for (const user of users) {
      totalMoney += user.money;
    }

    return res.status(200).json({ totalMoney });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
module.exports = {
  register,
  loginUser,
  loginGuest,
  loginAdmin,
  getUserById,
  RefreshTokenController,
  getAll,
  updateAccount,
  detelteAccount,
  userisCustomer,
  toltalMoneyUser
};
