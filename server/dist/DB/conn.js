"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connn = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config.env' });
function connn() {
    const DB = process.env.DATABASE;
    mongoose_1.default.connect(DB).then(() => {
        console.log(`connection successfull`);
    }).catch((err) => console.log(`no connection`));
}
exports.connn = connn;
//# sourceMappingURL=conn.js.map