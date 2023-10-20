const User = require("../../models/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");


// POST -> USER REGISTER
const userRegisterCtrl = async (req, res) => {
    const {email, password} = req.body;
    try {
        // check email is exist
        const isUserFound = await User.findOne({ email });
        if(isUserFound) {
            return res.json({
                msg: "this email ID has been already registered."
            })
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const user = await User.create({email, password: hashedPassword});
        res.json({
            status: 200,
            msg: "user is successfully registered.",
            data: user,
        })
    } catch (error) {
        res.json({
            status: 400,
            error: error,
        })
    }
}

// POST -> USER LOGIN
const userLoginCtrl = async(req, res) => {
    const {email, password} = req.body;
    try {
        const isUserFound = await User.findOne({ email });
        const isPasswordMatch = await bcrypt.compare(password, isUserFound.password);
        if(!isUserFound || !isPasswordMatch) {
            return res.json({
                msg: "Invalid Login Credentials",
            })
        }
        res.json({
            status: 200,
            msg: "user is successfully login.",
            data: {
                data: isUserFound,
                token: generateToken(isUserFound._id),
            }
        })
    } catch (error) {
        res.json({
            status: 400,
            error: error,
        })
    }
}

// GET -> All USERs
const usersCtrl = async(req, res) => {
    try {
        res.json({
            status: 200,
            data: "all user success"
        })
    } catch (error) {
        res.json({
            status: 400,
            error: error,
        })
    }
}

// GET -> USER PROFILE
const userProfileCtrl = async(req, res) => {
    try {
        const user = await User.findById(req.userAuth);
        res.json({
            status: 200,
            msg: "User profile",
            data: user
        })
    } catch (error) {
        res.json({
            status: 400,
            error: error,
        })
    }
}

// DELETE -> USER DELETED
const userDeleteCtrl = async(req, res) => {
    try {
        res.json({
            status: 200,
            data: "delete success"
        })
    } catch (error) {
        res.json({
            status: 400,
            error: error,
        })
    }
}

// PUT -> USER UPDATE
const userUpdateCtrl = async(req, res) => {
    try {
        res.json({
            status: 200,
            data: "update success"
        })
    } catch (error) {
        res.json({
            status: 400,
            error: error,
        })
    }
}

module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
    usersCtrl,
    userProfileCtrl,
    userDeleteCtrl,
    userUpdateCtrl
}