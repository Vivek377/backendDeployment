const jwt = require("jsonwebtoken");

const authenicate = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const decoded = jwt.verify(token, "secret");
        if (decoded) {
                req.body.userID = decoded.userID;
                next();
            } else {
                res.status(400).send({ err: "Please login first" });
            }
    } else {
        res.status(400).send({ err: "Please login first" });
    }
}

module.exports = authenicate;
