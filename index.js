const express = require("express");
// const products = require("./data");
// const { status } = require("express/lib/response");

const app = express();
const port = 3000;
const products = require("./data");

app.get("/", (req, res) => {
  res.send("hello world");
});



app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const singleProducts = products.find((product) => product.id === Number(id));
if(!singleProducts) {
  return res.status(200).json({status: "Sucess", data: [] });
}
  res.send(singleProducts);
});

app.get("/api/products", (req, res) =>{
  const newProducts = products.map((product) =>{
    const {name, detail, price} = product;
    return {name, detail, price}
  })
  res.send(newProducts)
});
app.get("/api/query", (req , res) => {
  console.log(req.query)
  const {search, limit} = req.query;
  let  = queryProducts = [...products];
  
  if(search) {
    queryProducts.filter((product) => {
  return  product.name.startsWith(search);

    })
  }

  if(limit) {
    queryProducts = queryProducts.slice(0, Number(limit));
  }
  res.send(queryProducts)
})
// app.get("/", (req, res) => {
//   res.json({
//     status: "success",
//     products,
//   });
// });

// app.get("/api/products", (req, res) => {
//   let productArr = [];
//   products.map((product) => {
//     let productObj = {
//       id: product.id,
//       name: product.name,
//       image: product.image,
//     };
//     productArr.push(productObj);
//   });

//   res.json(productArr);
// });

// app.get("/api/products/:productID", (req, res) =>{
//     console.log(req.params);
//     const {productID} = req.params;
//     const singleProducts = products.find((product) => product.id === Number(productID))
//     res.json(singleProducts);
// });

// app.all("*", (req, res) => {
//   res.send({
//     status: 404,
//     products: [],
//     err: "No such direction",
//   });
// });

app.listen(port, () => {
  console.log(`Server is Listening to port ${port}`);
});
