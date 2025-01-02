"use strict";
'use client';
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
exports.default = Home;
const react_1 = __importStar(require("react"));
const page_module_css_1 = __importDefault(require("./page.module.css"));
const card_1 = __importDefault(require("./components/card"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Add_1 = __importDefault(require("@mui/icons-material/Add"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Stack_1 = __importDefault(require("@mui/material/Stack"));
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function Home() {
    const [todo, setTodo] = (0, react_1.useState)([]);
    const [preview, setPreview] = (0, react_1.useState)(false);
    const [rerender, setRerender] = (0, react_1.useState)(0);
    function getData() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "http://localhost:3001/list";
            try {
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = yield response.json();
                setTodo(json);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    //INITIAL RENDER
    (0, react_1.useEffect)(() => {
        getData();
    }, []);
    // RE-RENDER
    (0, react_1.useEffect)(() => {
        getData();
    }, [rerender]);
    return (<div className={page_module_css_1.default.page}>
      <main className={page_module_css_1.default.main}>
      <>
      <Box_1.default sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '50px' }}>
        <h1>Todo App</h1>
        <IconButton_1.default sx={{
            position: 'relative',
            top: 0,
            right: 0,
        }} color="success" onClick={() => setPreview(true)}>
          <Add_1.default />
        </IconButton_1.default>
      </Box_1.default>
      <Stack_1.default spacing={2}>
          {preview && (<Box_1.default>
              <card_1.default todo={{ id: crypto.randomUUID(), message: '', status: false }}/>
            </Box_1.default>)}

          {todo.map((task) => (<Box_1.default key={crypto.randomUUID()}>
              <card_1.default todo={task} setRerender={setRerender}/>
            </Box_1.default>))}
      </Stack_1.default>
      </>
      </main>
    </div>);
}
