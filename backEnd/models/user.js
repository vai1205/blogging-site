const mongoose = require("mongoose");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      require: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true
    },
    name: {
      type: String,
      trim: true,
      require: true,
      max: 32
    },
    email: {
      type: String,
      trim: true,
      require: true,
      unique: true,
      lowercase: true
    },
    profile: {
      type: String,
      require: true
    },
    hashed_password: {
      type: String,
      required: true
    },
    salt: String,
    about: {
      type: String
    },
    role: {
      type: Number,
      default: 0 // 0 user role for normal users and 1 for admin
    },
    photo: {
      type: Buffer,
      contentType: String
    },
    resetPasswordLink: {
      data: String,
      default: ""
    }
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function(password) {
    //create a temporary variable: _password
    this._password = password;
    //generate salt
    this.salt = this.makeSalt();
    //encrypt password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function(password) {
    return this._password;
  });

userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  }
};

module.exports = mongoose.model("User", userSchema);
