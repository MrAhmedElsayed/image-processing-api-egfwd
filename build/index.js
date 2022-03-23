"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var home_1 = __importDefault(require("./routes/home"));
var resizeRoute_1 = __importDefault(require("./routes/resizeRoute"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use((0, morgan_1.default)('dev'));
//add the router
app.use('/', home_1.default);
app.use('/resize', resizeRoute_1.default);
// handle 404 responses
app.use(function (req, res) {
    res.status(404).sendFile(path_1.default.resolve('src', './views/notfound.html'));
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.listen(process.env.port || 3000);
console.log('Server started at http://localhost: 3000');
exports.default = app;
