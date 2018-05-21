const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

var apiRouter = require('./routes/api');
var siteRouter = require('./routes/site')

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/v1', apiRouter);
app.use('/', siteRouter);

/* Area for testing and playing around 
const db = require('./db/models');  */
/*
var Promise = require('bluebird');

var getRambo = db.User.findById(3, {
	attributes: ['id', 'username', 'created_at']
});

var getJohn = db.User.findById(1, {
	attributes: ['id', 'username', 'created_at']
});

Promise.join(getRambo, getJohn, function(rambo, john) {
	rambo.addFollowing(john);
	console.log('Done');
});
*/
/*
db.User.findById(2, {
	attributes: ['username', 'created_at'],
	include: ['Followers', 'Following']
}).then(user => { 
	console.log(JSON.stringify(user.get({plain: true}), null, 2));
});


var queryUtil = db.sequelize.getQueryInterface();

db.User.findOne({
	attributes: ['id', 'username', 
		// [db.sequelize.fn('count', db.sequelize.col('boards.id')), 'boards_count'],
		[db.sequelize.literal('count(DISTINCT '+queryUtil.quoteIdentifiers('boards.id')+')'), 'boards_count'],
		// [db.sequelize.fn('count', db.sequelize.col('boards->pins.id')), 'pins_count']
		[db.sequelize.literal('count(DISTINCT '+queryUtil.quoteIdentifiers('boards->pins.id')+')'), 'pins_count'],
		[db.sequelize.literal('count(DISTINCT '+queryUtil.quoteIdentifiers('Following->FollowRelation.id')+')'), 'following_count'],
		[db.sequelize.literal('count(DISTINCT '+queryUtil.quoteIdentifiers('Followers->FollowRelation.id')+')'), 'follower_count']
	],
	includeIgnoreAttributes: false,
	include: [{association: 'boards', attributes: [], include:[{model: db.Pin, as:'pins', attributes:[]}]},
		{association: 'Following', through: {attributes: []}, attributes:[]},
		{association: 'Followers', through: {attributes: []}, attributes:[]}
	],
	where: {id: 1},
	group: ['User.id', 'User.username']
}).then(data => {
	console.log(JSON.stringify(data, null, 2));
});
*/

// db.User.findById(1).then(user => user.addInterest(1).then(() => console.log('Done')));

// db.User.findById(1).then(user => user.addFollowing(db.User.build({id: 2})).then(() => console.log('Done')));

// db.FollowRelation.count({where: {follower_id: 1, target_type:'user'}}).then(num => console.log('Num following: '+num));

app.listen(PORT, () => console.log('Server listening on port '+PORT+'!'));