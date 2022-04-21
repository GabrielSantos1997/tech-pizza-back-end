require('./app/database');
require('dotenv').config();

const routes = require('./routes');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT);
