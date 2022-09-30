require('dotenv').config();
require('./src/config/dbConn')
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const baseRouter = require('./src/routes/router')
const testRoute = require('./src/routes/test')



const port = process.env.PORT || 8000;
const app = express();

app.use(cors({
    credentials: true,
    methods: ['GET', 'POST']
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', baseRouter);
app.use('/test', testRoute);



app.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'amar.html'))
});

app.listen(port, () => {
    console.log(`server is running at port no. ${port}`);
});