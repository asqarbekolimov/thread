const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const { MONGO_URL } = require("./keys");

require("./models/user");
require("./models/Post");

const cors = require("cors");
const corsOption = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
