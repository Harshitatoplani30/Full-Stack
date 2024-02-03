const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
 require("dotenv").config();
const Stripe  = require('stripe');

const app = express();
app.use(cors());
// app.use(express.static('public'));
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;
// MONGODB CONNECTION

console.log(process.env.MONGODB_URL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

// schema
const userschema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  image: String,
});

const userModel = mongoose.model("user", userschema);

// API
app.get("/", (req, res) => {
  res.send("Server is working");
});

// signup
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email: email }).exec();
    if (user) {
      res.send({ message: "user already exists", alert: false });
      console.log("User already exists");
      return res.status(400).send("User already exists");
    }
    const result = await userModel.create(req.body);
    const save = result.save();
    res.send({ message: "successfully sign up", alert: true });
    console.log("User does not exist");
    // Continue with the signup process if the user doesn't exist
    // ...
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

// login
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email }).exec();
    if (!user) {
      res.send({ message: "Email is not registered", alert: false });
      return;
    }
    // Add password comparison logic here
    if (user.password !== password) {
      res.send({ message: "Incorrect password", alert: false });
      return;
    }

    const dataSend = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      image: user.image,
      lastName: user.lastName,
    };

    console.log(dataSend);
    res.send({ message: "Login successfully", alert: true, data: dataSend });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

// product api
// const productController=require('./controller/product');
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: Number,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);

// save product in database
// api
app.post("/uploadProduct", async (req, res) => {
  console.log(req.body);
  const data = await productModel(req.body);
  const datasave = await data.save();
  res.send({ message: "upload successfully" });
});
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

// payment gateway
console.log(process.env.STRIPE_SECRET_KEY)


const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session",async(req,res)=>{

     try{
      const params = {
          submit_type : 'pay',
          mode : "payment",
          payment_method_types : ['card'],
          billing_address_collection : "auto",
          shipping_options : [{shipping_rate : "shr_1OehF3SF2k57Nc5XtCzgkS9t"}],

          line_items : req.body.map((item)=>{
            return{
              price_data : {
                currency : "inr",
                product_data : {
                  name : item.name,
                  // images : [item.image]
                },
                unit_amount : item.price * 100,
              },
              adjustable_quantity : {
                enabled : true,
                minimum : 1,
              },
              quantity : item.qty
            }
          }),

          success_url : `${process.env.FRONTEND_URL}/success`,
          cancel_url : `${process.env.FRONTEND_URL}/cancel`,

      }
      const session = await stripe.checkout.sessions.create(params)
      console.log(session)
      res.status(200).json(session.id)
      res.send({message:"payment is processing" ,success:true})
     }
     catch (err){
        res.status(err.statusCode || 500).json(err.message)
     }

})

// server running
app.listen(PORT, () => console.log("server is working on port:" + PORT));
