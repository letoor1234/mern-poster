const express = require('express');
const passport=require('passport');
const path = require('path');
const cookieParser=require('cookie-parser');
const session= require('express-session');
//Statics here

//Statics here

const app = express();
require('./passport/localAuth');
//Settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(express.json());
var corsOptions={
    credentials: true 
}
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
app.use('/api/posts', require('./routes/posts.routes'));
app.use('/api/friends', require('./routes/friends.routes'));

//Statics
app.use(express.static(path.join(__dirname, 'public')));

app.get('*'|| '*/*', (req, res) => {                       
    res.sendFile(path.resolve(__dirname, './public/index.html'));                               
  });
//Start server
app.listen(app.get('port'), ()=>{
    console.log("Server on port: ", app.get('port'));
});