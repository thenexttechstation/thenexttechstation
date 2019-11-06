const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const bookhouseuserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    password_hashed: {
      type: String,
      required: true
    },
    userinfo: {
      type: String,
      trim: true
    },
    salt: String,
    userrole: {
      type: Number,
      default: 0
    },
    audit: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

//virtual fields
bookhouseuserSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.password_hashed = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

bookhouseuserSchema.methods = {
  authenticate: function(password) {
    console.log("password" + password);
    return this.encryptPassword(password) === this.password_hashed;
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
  }
};

module.exports = mongoose.model("BookHouseUser", bookhouseuserSchema);
