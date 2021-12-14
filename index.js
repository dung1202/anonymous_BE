const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const UserRouter = require("./controller/userController");
const AccRouter = require("./routes/accRouter");
const ProductRouter = require("./controller/productController");

const NewsRouter = require('./routes/newsRouter');
const CartRouter = require('./routes/cartRouter');
const InvoiceRouter = require('./routes/invoiceRouter');
const SliderRouter = require("./controller/sliderController");

var mongoDB_atlas = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD}@anonymous.wq4br.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(
  mongoDB_atlas,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (err) throw err;
    console.log("Successfully connected");
  }
);

// Force mongoose to use global promise
mongoose.Promise = global.Promise;

var db = mongoose.connection;
app.use("/", AccRouter);
app.use("/user", UserRouter);
app.use("/product", ProductRouter);
app.use('/news', NewsRouter);
app.use('/cart', CartRouter);
app.use('/invoice', InvoiceRouter);
app.use("/slider", SliderRouter);


db.on("error", console.error.bind(console, "MongoDB connection error: "));

app.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
});

module.exports = app;
