const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

// hashing password
const { encryptPassword } = require("../helpers/bcrypt");

const studentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 4,
      trim: true,
      uniqueCaseInsensitive: true,
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password minimum eight characters, at least one letter and one number",
      ],
    },
    profile: { type: Schema.Types.ObjectId, ref: "Profile", default: null },
  },
  { timestamps: true, versionKey: false }
);

// pre, post hooks
studentSchema.pre("save", async function (next) {
  let student = this;

  if (student.password && student.isModified("password")) {
    student.password = await encryptPassword(student.password);
  }
  next();
});

// unique validator
studentSchema.plugin(uniqueValidator);

const student = mongoose.model("Student", studentSchema);

exports.Student = student;



