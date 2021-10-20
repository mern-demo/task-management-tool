"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const Users_1 = require("../models/Users");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authenticate_1 = require("../middleware/authenticate");
const bcrypt_1 = __importDefault(require("bcrypt"));
const conn_1 = require("../DB/conn");
(0, conn_1.connn)();
exports.router = express_1.default.Router();
exports.router.use((0, cookie_parser_1.default)());
exports.router.get('/', (req, res) => {
    res.send(`Hello from server auth.js`);
});
exports.router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, cpassword } = req.body;
    if (!name || !email || !password || !cpassword) {
        console.log(req);
        return res.status(422).json({ error: "Plz fill all the fields" });
    }
    // check for repeated email
    try {
        const userExist = yield Users_1.User.findOne({ email });
        if (userExist) {
            return res.status(422).json({ error: "Email already Registered" });
        }
        if (password !== cpassword) {
            return res.status(422).json({ error: "Password and Confirm Password should be same" });
        }
        const user = new Users_1.User({ name, email, password });
        const userRegister = yield user.save();
        if (userRegister) {
            res.status(201).json({ message: "User Registered Successfully" });
        }
        else {
            res.status(500).json({ error: "Failed To Register" });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
exports.router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill complete data" });
    }
    try {
        const userLogin = yield Users_1.User.findOne({ email });
        if (userLogin) {
            const isMatch = yield bcrypt_1.default.compare(password, userLogin.password);
            token = yield userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }
            else {
                res.json({ message: "User Logged In Successfully" });
            }
        }
        else {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
exports.router.get("/about", authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(req.rootUser);
}));
// get data
exports.router.get("/getData", authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(req.rootUser);
}));
exports.router.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("logged out successfully !");
    res.clearCookie('jwtoken');
    return res.status(200).redirect('/login');
}));
//# sourceMappingURL=auth.js.map