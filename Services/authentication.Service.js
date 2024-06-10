const jwt = require("jsonwebtoken");
const User = require("../Models/user.Model");
class authentication {
    async login(username, password) {
        const user = await User.findOne({ username, password });
        if (!user) {
            return { status: 404, message: "User not found" };
        } else {
            return {
                status: 200,
                message: this.createToken(user._id, user.role === "admin"),
            };
        }
    }
    async register(username, password) {
        const isExistUser = await User.find({ username });
        if (!isExistUser || isExistUser.length === 0) {
            const newUser = new User({
                username,
                password,
                balance: 0,
                role: "user",
            });
            await newUser.save();

            return { status: 201, message: "Successfully registered" };
        } else {
            return { status: 409, message: "username already exists" };
        }
    }
    createToken(userId, isAdmin) {
        const payload = {
            sub: userId,
            role: isAdmin ? "admin" : "user",
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "3h",
        });

        return token;
    }
    validate(token, next, reject) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error("Token verification failed:", err);
                reject();
            } else {
                console.log("Decoded token:", decoded);
                next();
            }
        });
    }
}

module.exports = new authentication();
