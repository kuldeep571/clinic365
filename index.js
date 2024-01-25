const express = require("express");
const dbConnect = require("./Config/dbConnect");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv").config();

const PORT = process.env.PORT;

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/admin/doctor", require("./Router/AdminRouter/CreateDoctorRouter"));


app.listen(PORT, () => {
  console.log(`Barbershop Server is running  at PORT ${PORT}`);
});