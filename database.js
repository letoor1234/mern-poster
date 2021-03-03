const mongoose = require ('mongoose');

const URI = 'mongodb+srv://letoor1234:1475369@mern-poster-db.getjp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db =>{
        console.log('DB Connected');
    })
    .catch(err =>{
        console.log(err);
    })

module.exports = mongoose;