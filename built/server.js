const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
// *************** Imports ***************
const express_1 = __importDefault(require('express'));
const express_async_handler_1 = __importDefault(require('express-async-handler'));
const mongoose_1 = __importDefault(require('mongoose'));
const cors_1 = __importDefault(require('cors'));
const WilderModel = require('./models/WilderModel');
const WilderController = require('./controllers/WilderController');
// *************** Variables ***************
const app = express_1.default();
const uri = 'mongodb://127.0.0.1:27017/wilderdb';
const port = 5000;
const versionApi = '/api/wilder';
// *************** Database ***************
mongoose_1.default
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err));
// *************** Middleware ***************
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors_1.default());
// *************** Routes ***************
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.post(versionApi, express_async_handler_1.default(WilderController.create));
app.get(versionApi, express_async_handler_1.default(WilderController.read));
app.put(versionApi, express_async_handler_1.default(WilderController.update));
app.delete(versionApi, express_async_handler_1.default(WilderController.delete));
app.get('*', (req, res) => {
  res.status(404);
  res.send({ success: false, message: 'Wrong adress' });
});
app.use((error, req, res, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    res.status(400);
    res.json({ success: false, message: 'The name is already used' });
  }
});
// *************** Start server ***************
app.listen(port, () => console.log(`Server started on ${port}`));
// # sourceMappingURL=server.js.map
