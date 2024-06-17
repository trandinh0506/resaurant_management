const jwt = require("jsonwebtoken");
const User = require("../Models/user.Model");
class authentication {
    async login(username, password) {
        const user = await User.findOne({ username, password });
        if (!user) {
            return { status: 404, message: "Invalid username or password" };
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
            userId: userId,
            role: isAdmin ? "admin" : "user",
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "3h",
        });

        return token;
    }
    validate(token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            return { isSuccess: true, decoded };
        } catch (err) {
            return { isSuccess: false, decoded: err };
        }
    }
}

module.exports = new authentication();
