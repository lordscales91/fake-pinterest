const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

var apiRouter = require('./routes/api');

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/v1', apiRouter);


app.listen(PORT, () => console.log('Server listening on port ${PORT}!'));