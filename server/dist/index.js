"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const conn_1 = require("./DB/conn");
dotenv_1.default.config({ path: './config.env' });
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send(`Hello World from the server`);
    (0, conn_1.connn)();
});
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}/`);
});
console.log('Hello, World!');
//# sourceMappingURL=index.js.map