const api=require('./api');

const path=require('path');

const express = require('express');

const app = express();

app.use(api);

app.use('/blogs', express.static('blogs'));

app.listen(8088);
