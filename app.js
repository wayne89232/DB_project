
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  // methodOverride = require('method-override'),
  // errorHandler = require('error-handler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  league = require('./routes/league'),
  team = require('./routes/team'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  // app.use(express.errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

//functions
app.post('/api/add_league', api.add_league);

app.post('/team/add_team', team.add_team);
app.get('/team/list_team', team.list_team);
app.get('/team/show_team/:team_id', team.show_team);
app.get('/team/team_league/:team_id', team.team_league);
app.post('/team/add_to_league/:team_id/:league_id', team.add_to_league);

app.get('/league/list_league', league.list_league);
app.get('/league/show_league/:league_id', league.show_league);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
