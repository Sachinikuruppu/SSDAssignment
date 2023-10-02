const sendMailPaymentSuccess = require("../config/sendMailPaymentSuccess");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const CustomErrorHandler = require("../services/CustomErrorHandler");

const orderController = {
  async newOrder(req, res, next) {
    try {
      const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      // Validate input data
      // Add your validation logic here
      // Ensure all required fields are present and in the correct format

      const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
      });

      res.status(201).json({
        success: true,
        order,
      });
    } catch (error) {
      return next(error);
    }
  },

  // Rest of the methods...

  // ... (other methods)

  async sendMailUserPaymentSuccess(req, res, next) {
    try {
      // Assuming you have the email address in the request body
      const userEmail = req.body.email;
      if (!userEmail) {
        return next(CustomErrorHandler.badRequest("Email not provided."));
      }

      // Send payment success email
      sendMailPaymentSuccess(userEmail, "Payment successful.");

      res.status(200).json("Sent message on successful payment.");
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = orderController;
