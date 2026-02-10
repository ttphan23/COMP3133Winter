const mongoose = require("mongoose");

const cityRegex = /^[A-Za-z ]+$/;            // alphabets+ spaces only
const zipRegex = /^\d{5}-\d{4}$/;            // 12345-1234
const phoneRegex = /^\d-\d{3}-\d{3}-\d{4}$/; // 1-123-123-1234
const urlRegex = /^https?:\/\/.+/i;          // start with http:// or https://
const emailRegex = /^\S+@\S+\.\S+$/;

const geoSchema = new mongoose.Schema(
  {
    lat: { type: String, required: [true, "address.geo.lat is required"] },
    lng: { type: String, required: [true, "address.geo.lng is required"] },
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: [true, "address.street is required"] },
    suite: { type: String, required: [true, "address.suite is required"] },
    city: {
      type: String,
      required: [true, "address.city is required"],
      trim: true,
      match: [cityRegex, "address.city must contain only alphabets and spaces"],
    },
    zipcode: {
      type: String,
      required: [true, "address.zipcode is required"],
      match: [zipRegex, "address.zipcode must match format 12345-1234"],
    },
    geo: { type: geoSchema, required: [true, "address.geo is required"] },
  },
  { _id: false }
);

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "company.name is required"] },
    catchPhrase: {
      type: String,
      required: [true, "company.catchPhrase is required"],
    },
    bs: { type: String, required: [true, "company.bs is required"] },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"], trim: true },

    username: {
      type: String,
      required: [true, "username is required"],
      minlength: [4, "username must be at least 4 characters"],
      maxlength: [100, "username must be at most 100 characters"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [emailRegex, "email must be a valid email address"],
    },

    address: { type: addressSchema, required: [true, "address is required"] },

    phone: {
      type: String,
      required: [true, "phone is required"],
      match: [phoneRegex, "phone must match format 1-123-123-1234"],
    },

    website: {
      type: String,
      required: [true, "website is required"],
      trim: true,
      match: [urlRegex, "website must be a valid URL starting with http or https"],
    },

    company: { type: companySchema, required: [true, "company is required"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
