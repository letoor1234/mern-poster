const express = require('express');
const cors = require('cors');
const passport=require('passport');
const path = require('path');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const session= require('express-session');
//Statics here

//Statics here

const app = express();
require('./passport/localAuth');
//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
var corsOptions={
    origin:'http://localhost:3000',
    credentials: true 
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser('dontSpyIt'));

app.use(session({
    secret: 'dontSpyIt',//no vulnerable,
	resave: false,
	saveUninitialized: false,
    cookie: { sameSite: 'strict' },
}));
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/tasks', require('./routes/task.routes'));

//Statics
app.use(express.static(path.join(__dirname, 'public')));

//Start server
app.listen(app.get('port'), ()=>{
    console.log("Server on port: ", app.get('port'));
});