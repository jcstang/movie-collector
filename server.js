const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: true,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This is a built in middleware function that can take all of the contents of a folder and server as
// static assets, useful for front-end specific files like images, style sheets, and JS files.
app.use(express.static(path.join(__dirname, 'public')));

// ** Routes **
// root(/), /dashboard, /api
// =============================================================
app.use(routes);


// ** Authenticate to DB **
// =============================================================
sequelize.authenticate()
    .then(() => {
        sequelize.sync({ force: false })
            .then(() => {
                app.listen(PORT, () => console.log('Now Listening'));
            });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error.message);
        console.log(`... this error is MOST likely because the local mySql server is not running `);
    });



// turn on connection to db and server
// sequelize.sync({ force: false })
//     .then(() => {
//         app.listen(PORT, () => console.log('Now Listening'));
//     })
//     .catch((error) => {
//         console.log(`\n-------------- error message: catch on sequelize.sync() ------------------------`);
//         console.log(error.message);
//         console.log(`... this error is MOST likely because the local mySql server is not running `);
//         console.log(`--------------- end error message ----------------------------------------------\n`);
//     });