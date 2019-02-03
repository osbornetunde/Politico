import express from 'express';
import router from './routes/index';
import bodyParser from 'body-parser';


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

const port = process.env.PORT || 5000;

// set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./UI'));
app.listen(port, () => {
    console.log(`server running on port ${port}`)
});

module.exports = app