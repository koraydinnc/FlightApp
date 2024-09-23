const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const database = require('./config/database.js');
const apiRouter = require('./routers/index.js'); 

dotenv.config();

const app = express(); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', apiRouter); 

const PORT = process.env.PORT || 8080

database();

const listenPort = (PORT) => {
   console.log(PORT,'RUN')
}

app.listen(PORT, listenPort(PORT))


