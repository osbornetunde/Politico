import express from 'express';
import 'babel-polyfill';
import router from './routes/index';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Auth from './middleware/auth';
import Users from './controllers/usersDB';
import Offices from './controllers/officesDB';
import Vote from './controllers/voteDB';
import Candidates from './controllers/candidateDB';
import Petition from './controllers/petitionDB';


dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(router, Auth);

const port = process.env.PORT || 5000;

app.use('/api/v1/auth/signup', Users.createAccount);
app.use('/api/v1/auth/login', Users.login);

//offices route
//create an office
app.use('/api/v1/office/:id/register', Offices.createOffice);

//get result for a particular office
app.use('/api/v1/office/:id/result', Offices.getResult);

//Vote route
app.use('/api/v1/votes/', Vote.createVote);

//register as a candidate
app.use('/:id/users', Candidates.expressInterest);

//raise a petition
app.use(`/petitions/`, Petition.createPetition);


app.use(express.json())

app.listen(port, () => {
    console.log(`server running on port ${port}`)
});

module.exports = app


// //get all office
// router.get('/api/v1/offices', Offices.getAllOffices);

// //get a office
// router.get('/api/v1/offices/:id', Offices.getOffice);