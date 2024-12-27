"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ActionAreaCard;
const React = __importStar(require("react"));
const Card_1 = __importDefault(require("@mui/material/Card"));
const CardContent_1 = __importDefault(require("@mui/material/CardContent"));
const CardMedia_1 = __importDefault(require("@mui/material/CardMedia"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const TextareaAutosize_1 = require("@mui/base/TextareaAutosize");
const CardActionArea_1 = __importDefault(require("@mui/material/CardActionArea"));
const Chip_1 = __importDefault(require("@mui/joy/Chip"));
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function ActionAreaCard({ todo }) {
    return (<Card_1.default sx={{ maxWidth: 200 }}>
            <CardActionArea_1.default>
              <CardMedia_1.default>
                <TextareaAutosize_1.TextareaAutosize></TextareaAutosize_1.TextareaAutosize>
              </CardMedia_1.default>
              <CardContent_1.default>
                <Typography_1.default gutterBottom variant="h5" component="div">
                  {todo.message}
                </Typography_1.default>
                <Chip_1.default>{todo.status}</Chip_1.default>
              </CardContent_1.default>
            </CardActionArea_1.default>
          </Card_1.default>);
}
