const mongoose = require("mongoose");
const Users = mongoose.model("Users"); 

const inviteUser = async (req, res) => {
  const token = req.body.token;
  const username = req.body.username;
  const email = req.body.email;
  try {
    const currentUser = await Users.create({
      Token: token,
      Username: username,
      Email:email
    });

   return res.send({
      status: 200,
      message: "success",
      currentUser,
    });
  } catch (e) {
    console.log("CREATE iss", e);
  }
};

const getSpecificUser = async (req, res) => {
  let data = await Users.find({
    Token: req.query.token,
  });

  return res.send({
    status: 200,
    data,
  });
};

module.exports = {
  inviteUser,
  getSpecificUser,
};
