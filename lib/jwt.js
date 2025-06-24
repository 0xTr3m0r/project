import jwt from 'jsonwebtoken';

export const generateToken = (user, res) => {
    const payload = {
        userId: user._id,
        email: user.email
    };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1h',
    };
    const token = jwt.sign(payload, secret, options);
    res.cookie("jwt", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });
    return token;
};

export const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    return jwt.verify(token, secret);
};