const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use(express.json(), express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

require('./config/mongoose.config');
require('./routes/book.routes')(app);

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));