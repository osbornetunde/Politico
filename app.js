import express from 'express';
import 'babel-polyfill';
import router from './routes/index';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Auth from './middleware/auth';
import Users from './controllers/usersDB';


dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(router, Auth);

const port = process.env.PORT || 5000;

app.use('/api/v1/auth/signup', Users.createAccount);
app.use('/api/v1/auth/login', Users.login);


app.use(express.json())

app.listen(port, () => {
    console.log(`server running on port ${port}`)
});

module.exports = app