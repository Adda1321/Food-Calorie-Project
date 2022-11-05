const mongoose = require("mongoose");
const moment = require("moment");
const Foods = mongoose.model("Food");
const Users = mongoose.model("Users");

const addNewEntity = async (req, res) => {
  const user_id = req.body.id;
  const token = req.body.token;
  const food = req.body.food;
  const calorie = req.body.calorie;

  try {
    const data = await Foods.create({
      UserID: user_id,
      Token: token,
      Food: food,
      Calorie: calorie,
    });

    return  res.send({
      status: 200,
      message: "success",
      data,
    });
  } catch (e) {
    console.log("CREATE Food entity", e);
  }
};

const adminAddEntity = async (req, res) => {
  const user_id = req.body.id;
  const token = req.body.token;
  const food = req.body.food;
  const calorie = req.body.calorie;

  try {
    const data = await Foods.create({
      UserID: user_id,
      Token: token,
      Food: food,
      Calorie: calorie,
    });

    res.send({
      status: 200,
      message: "success",
      data,
    });
  } catch (e) {
    console.log("CREATE Food entity", e);
  }
};
const adminEditEntity = async (req, res) => {
  const id = req.body.id;
  const user_id = req.body.uid;
  const token = req.body.token;
  const food = req.body.food;
  const calorie = req.body.calorie;

  try {
    const data = await Foods.findByIdAndUpdate(
      id,
      {
        Food: food,
        Calorie: calorie,
      },
      { new: true }
    );

    return res.send({
      status: 200,
      message: "success",
      data,
    });
  } catch (e) {
    console.log("Edit Food entity", e);
  }
};
const adminDeleteEntity = async (req, res) => {
  const id = req.body.id;

  try {
    await Foods.findByIdAndDelete(id);

    return res.send({
      status: 200,
      message: "success",
    });
  } catch (e) {
    console.log("Edit Food entity", e);
  }
};

const getAllFood = async (req, res) => {
  const food = await Foods.find();

  const updatedUser = {};
  const users = await Users.find();
  users.map((user, index) => Object.assign(updatedUser, { [user._id]: user }));
  const updatedFood = { ...food };

  return res.send({
    status: 200,
    updatedFood,
    updatedUser,
  });
};

const getFilteredFood = async (req, res) => {
  const food = await Foods.find({
    UserID: req.query.id,
  });

  const updatedUser = {};
  const users = await Users.find({_id:req.query.id});
  users.map((user, index) => Object.assign(updatedUser, { [user._id]: user }));
  const updatedFood = { ...food };

  return res.send({
    status: 200,
    updatedFood,
    updatedUser,
    //  food
  });
};

const getEntryReport = async (req, res) => {
  const food = await Foods.find();
  const users = await Users.find();
  const today = new Date();
  const updatedUser = {};

  users.map((user, index) => Object.assign(updatedUser, { [user._id]: user }));

  const filteredSevenFood = food.filter(
    (foodItem) =>
      moment(foodItem.createdAt).format("L") <= moment(today).format("l") &&
      moment(foodItem.createdAt).format("L") >
        moment(today).subtract(7, "days").calendar()
  );

  const filteredWeekFood = food.filter(
    (foodItem) =>
      moment(foodItem.createdAt).format("L") <=
        moment(today).subtract(7, "days").calendar() &&
      moment(foodItem.createdAt).format("L") >
        moment(today).subtract(14, "days").calendar()
  );

 return res.send({
    status: 200,
    users: updatedUser,
    filteredFood: {
      filteredSevenFood,
      filteredWeekFood,
    },
  });
};

const getAverageCalorie = async (req, res) => {
  const usersWithCalories = await Foods.aggregate([
    {
      $group: {
        _id: "$UserID",
        totalCalories: { $avg: "$Calorie" },
      },
    },
  ]);

  const users = await Users.populate(usersWithCalories, {
    path: "_id",
    select: "Username",
  });

 return res.send({
    status: 200,
    users,
  });
};
module.exports = {
  addNewEntity,
  adminEditEntity,
  adminAddEntity,
  adminDeleteEntity,
  getAllFood,
  getFilteredFood,
  getEntryReport,
  getAverageCalorie,
};
