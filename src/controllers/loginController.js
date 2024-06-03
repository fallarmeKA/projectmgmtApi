import Login from '../models/loginModel.js';
import logger from '../utils/logger'; // Ensure you have a logger utility

// Create Login
export const createLoginController = async (req, res) => {
  const { userID } = req.body;
  if (!userID) {
    logger.error('UserID is missing in the request body');
    return res.status(400).json({ message: 'UserID is required' });
  }
  try {
    const login = new Login({ userID });
    await login.save();
    logger.info(`Login created for userID: ${userID}`);
    res.status(201).json(login);
  } catch (error) {
    logger.error(`Error creating login: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Logins
export const getLoginsController = async (req, res) => {
  try {
    const logins = await Login.find().populate('userID');
    logger.info('Fetched all logins');
    res.status(200).json(logins);
  } catch (error) {
    logger.error(`Error fetching logins: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};
