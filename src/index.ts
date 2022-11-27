import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { userRouter } from './routes/ranch.routes'

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8081;

app.use(
    cors({
      // origin: [
      //   '::1', 'http://localhost', 'http://localhost/:1', 'http://127.0.0.1', 
      //   'http://localhost:4/', 'http://localhost:3000', 'http://127.0.0.1:3000/'
      // ],
      methods: ["GET", "POST"],
      credentials: false
    })
  );


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb'}));

// app.use(json());
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};

// set routes
app.use(userRouter);
// app.use(require('sanitize').middleware);
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: parseInt(process.env.POOL_SIZE!),
};

mongoose.connect('mongodb+srv://skate:scosco1!@theranchdb.7umzm.mongodb.net/?retryWrites=true&w=majority', {}, (err: any) => 
    {  
        console.log("Mongo is connected...");
        
        if (err) console.log(err);
     }
);

app.listen(port, () => {
    console.log(`Listening for posts on ${port}...`)
});
