const bcrypt = require('bcrypt');
const { User } = require('../models');
const { userSchema, loginSchema } = require('../utils/validation');
const jwt = require('jsonwebtoken');
/**
 * Controller to create a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate the incoming request body
    const { error } = userSchema.validate({ username, email, password });
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Hash the user's password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    const user = await User.create({ username, email, password: hashedPassword });

    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
    // Respond with the created user record
    res.status(201).json({ user});

  } catch (err) {
    // console.log("error >",err)
    // res.status(500).json({ message: 'Server error' });
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = loginSchema.validate({ email, password });
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser, loginUser };

