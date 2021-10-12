const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    fullName: {
      type: String,
      lowercase: true,
      trim: true,
      default: "Anonymous",
    },
    profilePhoto: {
      type: String,
      default:
        "https://res.cloudinary.com/di02ey9t7/image/upload/v1602432289/FAVPNG_samsung-galaxy-a8-a8-user-login-telephone-avatar_peutPpGD_l18hzf.png",
    },
    mobileNumber: {
      type: String,
      match: [
        /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/,
        "Please input in mobile number format, example:  (+44)(0)20-12341234 or 02012341234 or +44 (0) 1234-1234 ",
      ],
    },
    student: [{ type: Schema.Types.ObjectId, ref: "Student", default: null }],
  },
  { timestamps: true, versionKey: false }
);

const profile = mongoose.model("Profile", profileSchema);

exports.Profile = profile;
