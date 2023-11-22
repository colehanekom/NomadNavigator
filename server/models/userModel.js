import mongoose, { Schema } from "mongoose";

//Schema
const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String, 
            required: [true, "Username is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password length should be more than 6 characters"],
            select: true,
        },
    },
    {timestamps: true}
);

const Users = mongoose.model("Users", userSchema);

export default Users;