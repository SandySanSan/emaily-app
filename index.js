const express = require('express');
require('./services/passport');
const app = express();

require('./routes/authRoutes')(app);
// dynamic Port binding for Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
