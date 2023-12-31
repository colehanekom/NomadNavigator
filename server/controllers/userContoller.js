import mongoose from "mongoose";
import Verification from "../models/emailVerification.js";
import { compareString, createJWT, hashString } from "../utils/index.js";
import Users from "../models/userModel.js";
import PasswordReset from "../models/PasswordReset.js";
import { resetPasswordLink } from "../utils/sendEmail.js";

export const verifyEmail = async (req, res) => {
    const{userId, token} = req.params;

    try{
        const result = await Verification.findOne({userId});

        if(result) {
            const{ expiresAt, token: hashedToken } = result;

            //check if token expired
            if(expiresAt < Date.now()) {
                Verification.findOneAndDelete({userId})
                .then(() => {
                    Users.findOneAndDelete({ _id: userId})
                    .then(() => {
                        const message = "Verification token has expired.";
                        res.redirect(`/users/verified?status=error&message=${message}`);
                    })
                    .catch((err) => {
                        res.redirect(`/users/verified?message=`);
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.redirect(`/users/verified?message=`);
                });
            } else{
                //token valid
                compareString(token, hashedToken)
                .then((isMatch) => {
                    if(isMatch){
                        Users.findOneAndUpdate({ _id: userId}, {verified: true})
                        .then(() => {
                            Verification.findOneAndDelete({userId}).then(() => {
                                const message = "Email verified successfully";
                                res.redirect(`/users/verified?status=success&message=${message}`);
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            const message = "Verification failed or link is invalid";
                            res.redirect(`/users/verified?status=error&messages=${message}`);
                        });
                    }else{
                        //invalid token
                        const message = "Verification failed or link is invalid";
                        res.redirect(`/users/verified?status=error&messages=${message}`);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect(`/users/verified?message=`)
                });
            }
        }else{
            const message = "Invalid verification link. Try again later.";
            res.redirect(`/users/verified?status=error&messages=${message}`);
        }
    }catch(error) {
        console.log(err);
        res.redirect(`/users/verified?message=`);
    }
};

export const requestPasswordReset = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await Users.findOne({email});

        if(!user){
            return res.status(404).json({
                status: "FAILED",
                message: "Email address not found.",
            });
        }

        const existingRequest = await PasswordReset.findOne({email});
        if(existingRequest) {
            if(existingRequest.expiresAt > Date.now()) {
                return res.status(201).json({
                    status: "PENDING",
                    message: "Reset password link has been sent to your email.",
                });
            }
            await PasswordReset.findOneAndDelete({email});
        }
        await resetPasswordLink(user, res);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const {userId, token} = req.params;

    try {
        //Find record
        const user = await Users.findById(userId);

        if(!user){
            const message = "Invalid password reset link. Try again.";
            res.redirect(`/users/resetpassword?status=error&message=${message}`);
        }

        const resetPassword = await PasswordReset.findOne({userId});

        if(!resetPassword){
            const message = "Invalid password reset link. Try again.";
            res.redirect(`/users/resetpassword?status=error&message=${message}`);
        }

        const {expiresAt, token: resetToken} = resetPassword;

        if(expiresAt < Date.now()) {
            const message = "Reset Password link has expired. Please try again.";
            res.redirect(`/users/resetpassword?status=error&message=${message}`);
        }else{
            const isMatch = await compareString(token, resetToken);

            if(!isMatch){
                const message = "Invalid reset password link. Please try again.";
                res.redirect(`/users/resetpassword?status=error&message=${message}`);
            }else{
                res.redirect(`/users/resetpassword?type=reset&id=${userId}`);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const changePassword = async (req, res, next) => {
    try {
        const {userId, password} = req.body;

        const hashedpassword = await hashString(password);

        const user = await Users.findByIdAndUpdate(
            {_id: userId},
            {password: hashedpassword}
            );

            if(user){
                await PasswordReset.findOneAndDelete({userId});

                res.status(200).json({ok:true});
            }
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message});
    }
};

export const getUser = async (req, res, next) => {
    try {
       const {userId} = req.body.user;
       const{id} = req.params;

       const user = await Users.findById(id ?? userId).populate({
        path: "userName",
        select: "-password",
       });

       if(!user){
        return res.status(200).send({
            message: "User not found",
            success: false,
        });
       }

       user.password = undefined;

       res.status(200).json({
        success: true, 
        user: user,
       });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "auth error", 
            success: false,
            error: error.message,
        });
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const {userName} = req.body;

        if(!(userName)){
            next("Please provide all required fields");
            return;
        }

        const {userId} = req.body.user;

        const updateUser = {
            userName,
            _id: userId,
        };

        const user = await Users.findByIdAndUpdate(userId, updateUser, {
            new: true,
        });

        await user.populate({path: "userName",select: "-password"});
        const token = createJWT(user?._id);

        user.password = undefined;

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message});
    }
};