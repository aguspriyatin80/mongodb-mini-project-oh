const { Student } = require("../models/student");

const { decryptPassword } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jwt");

exports.Register = async (req, res, next) => {
  try {
    let data = await Student.create(req.body);

    res.status(201).json({
      success: true,
      message: "Successfully create a student!",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let student = await Student.findOne({ username: username });

    if (!student)
      return next({
        message: `Student with username:${username} is not found!`,
      });

    if (decryptPassword(password, student.password)) {
      const token = tokenGenerator(student);

      res.status(200).json({
        success: true,
        message: "Successfully logged in!",
        token: token,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.GetAll = async (req, res, next) => {
  try {
    let students = await Student.find().select("-password").populate({
      path: "profile",
      populate: "student",
    });

    res.status(200).json({
      success: true,
      message: "Successfully retrieve the data!",
      data: students,
    });
  } catch (err) {
    next(err);
  }
};

exports.Edit = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next({ message: "Missing ID Params" });

    const updatedData = await Student.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully update a student!",
      data: updatedData,
    });
  } catch (err) {
    next(err);
  }
};

exports.Delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next({ message: "Missing ID Params" });

    await Student.findByIdAndRemove(id, (error, doc, result) => {
      if (error) throw "Failed to delete";
      if (!doc)
        return res.status(400).json({ success: false, err: "Data not found!" });

      res.status(200).json({
        success: true,
        message: "Successfully delete data!",
        data: doc,
      });
    });
  } catch (err) {
    next(err);
  }
};
