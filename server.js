const express = require('express');
const exphbs = require('express-handlebars');
const db = require('./models');


const app = express();

const Port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

require('./routes/server-routes')(app);

db.sequelize.sync().then(() => {
  // eslint-disable-next-line no-console
  app.listen(Port, () => console.log(`Example app listening at http://localhost:${Port}`));
});
