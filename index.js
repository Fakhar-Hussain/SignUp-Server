require('./DB')
require('./Schema/user')
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const Token = require('./middleware/token')
const routes = require('./Router/routes')

// const morgan = require('morgan');
// app.use(morgan('dev'));

app.use(bodyParser.json());
app.use('/User', routes);
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
})


require('dotenv').config();
const PORT = process.env.PORT;

app.get('/',Token, (req, res) => {
    res.send({email: req.user.email})
})
    
app.listen(PORT, () => {
    console.log('Port is Listining on ' + PORT)
})


