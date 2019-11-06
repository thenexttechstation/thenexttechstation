const {
  BookHouseOrder,
  BookHouseCartItem
} = require("../models/bookhouseordermodel");

exports.createOrder = (req, res) => {
  // console.log("CREATE ORDER: ", req.body);
  req.body.order.user = req.profile;
  const order = new BookHouseOrder(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error)
      });
    }
    res.json(data);
  });
};
