import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    license: [{
        tennis: {
            type: String,
            required: false,
        },
        football: {
            type: String,
            required: false,
        },
        volleyball: {
            type: String,
            required: false,
        },
        basketball: {
            type: String,
            required: false,
        },
    }]
});

const User = mongoose.model("user", UserSchema);

export default User;