const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

/**Routes Import */
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const turbanRoute = require("./routes/turban");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

/** Routes */
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/turban", turbanRoute);

app.get("/", (req, res) => {
  res.send("Server Running");
});

const mongoUrl = process.env.MongoUrl;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is Running at Port: ${PORT}`))
  )
  .catch((error) => console.log("Error connecting to the database: ", error));
