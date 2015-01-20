
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
  records = require('./routes/records'),
  player = require('./routes/player'),
  game = require('./routes/game'),
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
app.get('/team/list_team_by_league/:league_id', team.list_team_by_league);
app.get('/team/out_league/:team_id/:league_id', team.out_league);

app.get('/league/list_league', league.list_league);
app.get('/league/show_league/:league_id', league.show_league);

app.post('/player/add_player', player.add_player);
app.get('/player/list_player/:team_id', player.list_player);

app.post('/records/add_stat/:player_id/:game_id', records.add_stat);
app.get('/records/show_stat/:player_id/:game_id', records.show_stat);
app.post('/records/add_stat2/:player_id/:game_id', records.add_stat2);
app.get('/records/show_stat2/:player_id/:game_id', records.show_stat2);
app.get('/records/remove_stat/:player_id/:game_id', records.remove_stat);
app.get('/records/remove_stat2/:player_id/:game_id', records.remove_stat2);

app.post('/game/add_game', game.add_game);
app.get('/game/list_game', game.list_game);
app.get('/game/list_game_by_league/:league_id', game.list_game_by_league);
app.get('/game/show_game/:game_id', game.show_game);

app.post('/api/add_city', api.add_city);
app.get('/city/list_city', api.list_city);

app.post('/api/add_school', api.add_school);
app.get('/school/list_school', api.list_school);

app.post('/api/add_field', api.add_field);
app.get('/field/list_field', api.list_field);

app.post('/api/add_ban', api.add_ban);
app.get('/ban/list_ban', api.list_ban);

app.post('/api/add_umpire', api.add_umpire);
app.get('/umpire/list_umpire', api.list_umpire);

app.get('/broadcast/list_broadcast', api.list_broadcast);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
