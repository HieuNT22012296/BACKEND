const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
// const cookieSession = require('cookie-session')
const session = require("express-session");
const passportSetup = require('./passport')

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

// app.use(
//     cookieSession({
//         name: "session",
//         keys: ["webphone"],
//         maxAge: 24 * 60 * 60 * 100000
//     })
// )

app.use(
    session({
      secret: "webphone", 
      resave: false,
      saveUninitialized: true,
    })
  );
app.use(passport.initialize())
app.use(passport.session())

app.use(
	cors({
		// origin: "http://localhost:3000",
        origin: "https://webphone-kappa.vercel.app",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json())
app.use(cookieParser())

routes(app);

mongoose.connect(`${process.env.MONGO_DB}`)
.then(() => {
    console.log('Connect Db success!')
})
.catch((err) => {
    console.log(err)
})
app.listen(port, () => {
    console.log('Server is running in port:', + port)
})