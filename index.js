const express = require("express");
require("./sevices/passport");

const app = express();

require("./routes/authRoutes")(app);

//Check environment variables to see the port number which is dynamically configured by Heroku in env variables
const PORT = process.env.PORT || 5000;
app.listen(PORT);
