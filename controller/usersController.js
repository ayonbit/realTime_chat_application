//External Dependencies
const bcrypt = require("bcrypt");

//get Users Page
const getUsers = (req, res, next) => {
  res.render("users");
};

//Add User handler
const addUsers = async (req, res, next) => {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10); //password hashed
  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  //save user or sen error
  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User Added Successfully",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown Error Occured!",
        },
      },
    });
  }
};

//module exports
module.exports = {
  getUsers,
  addUsers,
};
