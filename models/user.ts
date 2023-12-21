import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailVerifyStatus: {
    type: String,
    required: true,
  },
  license: {
    tennis: {
      key: {
        type: String,
        required: false,
      },
      expiration: {
        type: Date,
        required: false,
      },
    },
    football: {
      key: {
        type: String,
        required: false,
      },
      expiration: {
        type: Date,
        required: false,
      },
    },
    volleyball: {
      key: {
        type: String,
        required: false,
      },
      expiration: {
        type: Date,
        required: false,
      },
    },
    basketball: {
      key: {
        type: String,
        required: false,
      },
      expiration: {
        type: Date,
        required: false,
      },
    },
  },
});

const User = mongoose.model("user", UserSchema);

export default User;
