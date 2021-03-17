const mongoose = require ('mongoose');

<<<<<<< HEAD
const URI = process.env.MLAB_URI;
=======
const URI = 'mongodb://localhost/tasker';
>>>>>>> release/second

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db =>{
        console.log('DB Connected');
    })
    .catch(err =>{
        console.log(err);
    })

module.exports = mongoose;