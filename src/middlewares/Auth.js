// auth.js

const authorizeUser = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        const errorMessage = 'Unauthorized access. Only admins are allowed.';
        res.status(403).send({ error: errorMessage });
    }
};

module.exports = { authorizeUser };
