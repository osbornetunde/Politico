import express from 'express';
import router from './routes/index';
import bodyParser from 'body-parser';


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);



app.listen( process.env.PORT || 5000 , () => {
    console.log(`server running on port ${PORT}`)
});

module.exports = app