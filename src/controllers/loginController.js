import Login from '../models/loginModel.js';

// Create Login
export const createLoginController = async (req, res) => {
  const { userID } = req.body;
  try {
    const login = new Login({ userID });
    await login.save();
    res.status(201).json(login);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Logins
export const getLoginsController = async (req, res) => {
  try {
    const logins = await Login.find().populate('userID');
    res.status(200).json(logins);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
