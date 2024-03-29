import Users from "../models/userModel.js";
import { compareString, createJWT, hashString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
    const {userName, email, password} = req.body;

    //validate fields
    if(!(userName || email || password)) {
        next("Provide required fields!");
        return;
    }

    try{
        const usernameExist = await Users.findOne({userName});

            if(usernameExist) {
                next("Username already exists");
                return;
            }

        const userExist = await Users.findOne({email});

            if(userExist) {
                next("Email address already exists");
                return;
            }

            const hashedPassword = await hashString(password);

            const user = await Users.create({
                userName,
                email,
                password: hashedPassword,
            });

        //send email verification to user
        sendVerificationEmail(user, res);
        } catch (error) {
            console.log(error);
            res.status(404).json({message: error.message});
        }
};

export const login = async (req, res, next) => {
    const {email, password} = req.body;

    try{
        //validation
        if(!email || !password){
            next("Please Provide User Credentials");
            return;
        }

        //find user by email
        const user = await Users.findOne({email}).select("+password").populate({
            path: "friends",
            select: "userName location profileUrl -password",
        });

        if(!user){
            next("Invalid email or password");
            return;
        }

        if(!user?.verified){
            next("User email is not verified. Please check your email acount and verify your email");
            return;
        }

        //compare password
        const isMatch = await compareString(password, user?.password);

        if(!isMatch){
            next("Invalid email or password");
            return;
        }

            user.password = undefined;

            const token = createJWT(user?._id);

        res.status(201).json({
            success: true,
            message: "Login successfully",
            user,
            token,
        });

    }catch(error){
        console.log(error);
        res.status(404).json({message: error.message});
    }
};