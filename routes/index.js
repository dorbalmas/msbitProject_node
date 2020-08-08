const express = require("express");
const axios = require("axios");
const router = express.Router();

let dataOnlyReleventStatus = [];
let tempMyData = [];
// http://localhost:3000/product
router.get("/", (req, res) => {
  let url =
    "https://msbit-exam-products-store.firebaseio.com/deliveryProducts/products.json";
  axios.get(url).then((resp) => {
    let myData = resp.data;
    myData.map((item) => {
      if (item.status) {
        if (item.status == 1) {
          if (item.type == 1) dataOnlyReleventStatus.push(item.fedex);
          else if (item.type == 2) {
            for (let i = 0; i < item.ups.length; i++) {
              dataOnlyReleventStatus.push(item.ups[i]);
              item.ups[i].status = 1;
              item.ups[i].type = 2;
            }
          } else if (item.type == 3) dataOnlyReleventStatus.push(item);
        }
      }
    });
    res.header("Access-Control-Allow-Origin", "*");
    res.json(dataOnlyReleventStatus);
    tempMyData = dataOnlyReleventStatus;
    console.log(dataOnlyReleventStatus);
    dataOnlyReleventStatus = [];
  });
});
// http://localhost:3000/product/search/?q=
router.get("/search/", (req, res) => {
  const mySearch = req.query.q;
  console.log(tempMyData);
  let dataSearch = tempMyData.filter(
    (item) =>
      item.name.includes(mySearch.toLocaleLowerCase()) ||
      item.description.includes(mySearch.toLocaleLowerCase())
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.json(dataSearch);
  console.log(dataSearch);
});

module.exports = router;
