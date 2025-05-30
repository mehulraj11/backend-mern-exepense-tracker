const jwt = require("jsonwebtoken")
const User = require('../models/User.js')

// generate jwt token

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10h" })
}

// register user
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const user = await User.create({
            fullName,
            email: email.toLowerCase(),
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};


// login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "all fields are required" })
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({ message: "Error logging in user", error: error.message });
    }
}

// Get user
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error logging in user", error: error.message });
    }
}