let jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "longer-secret-is-better");
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
    }
};