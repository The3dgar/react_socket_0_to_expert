const Server = require('./models/server'); 
require('dotenv').config();
new Server().listen();
