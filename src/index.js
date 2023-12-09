const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cookieSession = require('cookie-session')
const passportSetup = require('./passport')
const authRoute = require('./routes/auth')

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(
    cookieSession({
        name: "session",
        keys: ["webphone"],
        maxAge: 24 * 60 * 60 * 100
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth', authRoute)

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