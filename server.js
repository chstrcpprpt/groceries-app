const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");

// location of api routes
const groceries = require("./routes/api/groceries");
// location of signin api routes
const users = require("./routes/api/users");
// location of auth(login) api routes
const auth = require("./routes/api/auth");

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DB config
const db = config.get("mongoURI");

// Connect to mongoDB (the object avoids warnings)
mongoose.connect(db, 
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// Use routes - api/groceries/* will go to this file
app.use("/api/groceries", groceries);
// Use routes - api/users/* will go to this file
app.use("/api/users", users);
// Use routes - api/auth/* will go to this file
app.use("/api/auth", auth);

// Serve static assets if in production
if(process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// START SERVER
// Define port localhost:3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));