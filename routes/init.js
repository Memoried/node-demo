
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const staticRoot = path.resolve(__dirname, '../public');

app.use(express.static(staticRoot));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/student', require('./api/student'));

app.use(require('./errorMiddleware'));

app.listen(port, () => {
  console.log(`listen ${port}`);
});
