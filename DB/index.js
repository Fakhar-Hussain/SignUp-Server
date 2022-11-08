const mongoose = require('mongoose');
const DB = "mongodb://localhost:27017/SignUp-DB"

mongoose.connect(DB, {
    useNewUrlParser: true,
    useunifiedTopology: true,
}).then( () => {
    console.log('Connection successfully in MongoDB')
}).catch( (err) => console.log('Sorry no Connection') )