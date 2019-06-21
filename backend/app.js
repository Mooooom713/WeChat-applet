const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const selfStudyRouter = require('./routes/selfStudy');
const getUpRouter = require('./routes/getUp');
const storyRouter = require('./routes/story');

app.use('/login', loginRouter);
app.use('/newUser', registerRouter);
app.use('/selfStudy', selfStudyRouter);
app.use('/getUp', getUpRouter);
app.use('/story', storyRouter);

app.listen(3000, () => {
    console.log("server start on localhost:3000");
});