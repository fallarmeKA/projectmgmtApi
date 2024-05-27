import JWT from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new Error('Authorization header missing or invalid'));
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId }; // Attach user info to the request object
    next();
  } catch (error) {
    return next(new Error('Invalid or expired token'));
  }
};

export default userAuth;
