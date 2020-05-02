const express = require( "express" );
const exphbs = require( "express-handlebars" );
const session = require( "express-session" );
const db = require( "./models" );

const app = express();
const Port = process.env.PORT || 3000;


app.use( session( { secret: "secret", resave: false, saveUninitialized: false } ) );
require( "./config/passport.js" )( app );

app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );
app.use( express.static( "public" ) );
app.engine( "handlebars", exphbs( { defaultLayout: "main" } ) );
app.set( "view engine", "handlebars" );

const authRouter = require( "./src/routes/authRoutes.js" );
const serverRouter = require( "./src/routes/serverRoutes.js" );

app.use( "/auth", authRouter() );
app.use( "/game", serverRouter() );

db.sequelize.sync().then( () => {
  // eslint-disable-next-line no-console
  app.listen( Port, () => console.log( `Example app listening at http://localhost:${Port}` ) );
} );
