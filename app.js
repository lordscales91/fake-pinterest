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

/* Area for testing and playing around
const db = require('./db/models');

db.User.findById(1, {
	attributes: ['username', 'created_at'],
	include: [{
		model:db.Image,
		attributes: ['width', 'height', 'source']
	}]
}).then(user => { 
	console.log(JSON.stringify(user.get({plain: true}), null, 2));
});
*/

app.listen(PORT, () => console.log('Server listening on port '+PORT+'!'));