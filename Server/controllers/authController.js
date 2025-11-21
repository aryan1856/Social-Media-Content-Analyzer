import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generate_token.js';

export const registerUser = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;

        if (!username || !password || !confirmPassword) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        }

        if(password !== confirmPassword)
            return res.status(400).json({success : false, message : "Passwords must be same"});

        if(password.length < 6)
            return res.status(400).json({success : false, message : "Minimum length for password : 6"});

        const existingUser = await User.findOne({ username });
        if (existingUser)
            return res.status(409).json({ success: false, message: "Username already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({
            username,
            password: hashedPassword
        });

        if (createdUser) {
            const token = generateToken(res, createdUser._id);
            res.status(201).json({
                success: true,
                message: "User created successfully",
                token,
                data: {
                    username: createdUser.username,
                    userId: createdUser._id
                }
            })
        }

    } catch (error) {
        console.log(`Error registering user ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password)
            return res.status(400).json({ success: false, message: "Missing fileds" });

        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({ success: false, message: "User not found" });

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched)
            return res.status(401).json({ success: false, message: "Invalid password" });

        const token = generateToken(res, user._id);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            data: {
                username: user.username,
                userId: user._id
            }
        });

    } catch (error) {
        console.log(`Error user login ${error}`);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getUserDetails = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById({ _id: id });
        if (user) {
            res.status(200).json({
                success: true,
                message: "User details fetched successfully",
                data: {
                    username: user.username,
                    userId: user._id
                }
            })
        }
    } catch (error) {
        console.log(`Error getting user details ${error}`);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Logout successful."
        });
    } catch (error) {
        console.log(`Error logout ${error}`);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
