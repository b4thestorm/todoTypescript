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
exports.default = TodoCard;
const react_1 = __importStar(require("react"));
const Card_1 = __importDefault(require("@mui/material/Card"));
const CardContent_1 = __importDefault(require("@mui/material/CardContent"));
const CardMedia_1 = __importDefault(require("@mui/material/CardMedia"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Switch_1 = __importDefault(require("@mui/material/Switch"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const CardActionArea_1 = __importDefault(require("@mui/material/CardActionArea"));
const Chip_1 = __importDefault(require("@mui/joy/Chip"));
const Box_1 = __importDefault(require("@mui/material/Box"));
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function TodoCard({ todo }) {
    // eslint-disable-next-line   @typescript-eslint/no-unused-vars
    const [editable, setEditable] = (0, react_1.useState)(false);
    const [todoState, setTodoState] = (0, react_1.useState)({
        id: todo.id || crypto.randomUUID(),
        message: todo.message || '',
        status: todo.status || false
    });
    const statusChange = () => {
        setTodoState((prevState) => (Object.assign(Object.assign({}, prevState), { status: !prevState.status })));
    };
    return (<form>
        <Card_1.default sx={{ width: 400, maxWidth: 400 }}>
            <CardActionArea_1.default>
              <CardContent_1.default>
                <CardMedia_1.default>
                {!editable ? (<Typography_1.default gutterBottom variant="h5" component="div">
                      {todoState.message}
                    </Typography_1.default>) : (<TextField_1.default id="outlined-multiline-static" label="What do you want to do with your time" multiline rows={3} sx={{
                width: '360px',
                height: '60px'
            }}/>)}
                </CardMedia_1.default>       
                <Box_1.default sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '50px',
        }}>
                  <Chip_1.default>{todoState.status}</Chip_1.default>
                  <Switch_1.default disabled={!editable} onChange={statusChange} name="status"/>
                  {editable ? (<Button_1.default variant="contained">Confirm</Button_1.default>) : (<Button_1.default variant="contained" onClick={() => setEditable(true)}>Edit</Button_1.default>)}
                </Box_1.default>
              </CardContent_1.default>
            </CardActionArea_1.default>
        </Card_1.default>
      </form>);
}
