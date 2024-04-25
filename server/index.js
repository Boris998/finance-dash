import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";

/* config */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* routes */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

console.log("holla cabronees");

/* mongoose setup */
// const moon = new mongoose.Mongoose();
const PORT = process.env.PORT || 9000;
// mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log(`server port: ${PORT}`));

    /* ADD DATA ONE TIME ONLY OR AS NEEDED*/
    //drop the db info, so we dont have duplicate data
/*     await mongoose.connection.db.dropDatabase();
    KPI.insertMany(kpis); 
    Product.insertMany(products); 
    Transaction.insertMany(transactions);   */
  })
  .catch((err) => console.log(`${err}`));
