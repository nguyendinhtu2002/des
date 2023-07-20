const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const UserRouter = require("./routers/User.js");
const JobRouter = require("./routers/Job.js");

const connectDatabase = require("./config/MongoDb.js");

const app = express();
dotenv.config();
connectDatabase();

app.use(express.json());

const allowedOrigins = ["https://mundesign.net", "https://adm.mundesign.net","https://guest.mundesign.net","http://localhost:7000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/job", JobRouter);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
