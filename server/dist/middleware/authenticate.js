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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../models/users");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwtoken;
        const verifytoken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        // validate token
        const rootUser = yield users_1.User.findOne({ _id: verifytoken });
        if (!rootUser) {
            throw new Error('User not found');
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    }
    catch (err) {
        res.status(401).send('Unauthorized: No token provided');
        console.log(err);
    }
});
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map