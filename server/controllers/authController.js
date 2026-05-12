const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    res.status(201).json({
        success: true,
        token: generateToken(user._id),
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        }
    })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    res.status(200).json({
        success: true,
        token: generateToken(user._id),
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        }
    })
}

const getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
}

module.exports = { registerUser, loginUser, getMe }