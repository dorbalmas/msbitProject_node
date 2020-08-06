const express = require("express");
const axios = require("axios");
const router = express.Router();

// http://localhost:3000/product
router.get("/", (req, res) => {
  let url =
    "https://msbit-exam-products-store.firebaseio.com/deliveryProducts/products.json";
  axios.get(url).then((resp) => {
    let myData = resp.data;
    let dataOnlyReleventStatus = myData.filter((item) => {
      if (item.status) {
        if (item.status == 1) {
          return item;
        }
      }
    });
    res.header("Access-Control-Allow-Origin", "*");
    res.json(dataOnlyReleventStatus);
  });
});

module.exports = router;
