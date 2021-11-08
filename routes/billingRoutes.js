const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const customer = await stripe.customers.create({
      email: req.body.email,
      source: req.body.id,
    });

    const charge = await stripe.paymentIntents.create({
      amount: 500,
      currency: "usd",
      customer: customer.id,
      receipt_email: req.body.email,
      description: "$5 for 5 credits",
      shipping: {
        name: req.body.card.name,
        address: {
          country: "India",
        },
      },
    });
    console.log(req);
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
