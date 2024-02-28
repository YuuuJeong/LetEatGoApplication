const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./models');

const RedisStore = require('connect-redis').default;
const userRouter = require('./user/userRoute');
const preferRouter = require('./prefer/preferRoute');
const foodRouter = require('./food/foodRoute');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const { redisClientSingleton } = require('./utils/redisClient');

// const checkRouter = require('./routes/check');
// const recipeRouter = require('./routes/recipe');
// const searchRouter = require('./routes/search');
// const surveyRouter = require('./routes/survey');
// const recommendRouter = require('./routes/recommend');
// const mainRouter = require('./routes/main');
// const cartRouter = require('./routes/cart');
// const ingredientRouter = require('./routes/ingredient');
// const recommend = require('./controller/recommendController');
// const main = require('./controller/mainController');
// const startInterval = (seconds, callback) => {
//   callback();
//   return setInterval(callback, seconds * 1000);
// };
const app = express();
const redisClient = redisClientSingleton.getClient();

const redisStore = new RedisStore({
  client: redisClient,
  ttl: 60 * 60 * 1000,
});

// const updateHybrid = async () => {
//   try {
//     let options = {
//       scriptPath: ".",
//     };
//     PythonShell.run("./py/recommend.py", options, async function (err, data) {
//       if (err) throw err;
//       console.log(data);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };
app.set('port', process.env.SERVER_PORT);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then(() => {
  console.log('db connect success');
});

app.use(
  session({
    resave: false,
    saveUninitalized: true,
    secret: process.env.COOKIE_SECRET,
    store: redisStore,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
    },
  }),
);

const apiRouter = express.Router();
apiRouter.use('/users', userRouter);
apiRouter.use('/prefers', preferRouter);
apiRouter.use('/foods', foodRouter);
app.use('/api', apiRouter);
app.use(globalErrorHandler);

//보유식재료 => 가지고있는거 띄워주는거, 업데이트하는거, 삭제하는거
//prefer csv업데이트 ->
// startInterval(60 * 60 * 2, async function () {
//   await recommend.write();
//   updateHybrid();
// });

// app.use('/', mainRouter);
// app.use('/', recipeRouter);
// app.use('/users', userRouter);
// app.use("/check", checkRouter);
// app.use("/search", searchRouter);
// app.use("/survey", surveyRouter);
// app.use("/recommend", recommendRouter);
// app.use("/user/cart", cartRouter);
// app.use("/user/ingredient", ingredientRouter);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
