import express, { Request, Response } from 'express'
import UserController from '../controllers/user.controller';
import { User } from '../models/user.model';

var cors = require('cors');

const router = express.Router();
const userController = new UserController();

const handleCors = () => {
    console.log("CORS is running");
}
    
const whitelist = [
    '::1', 'http://localhost', 'http://localhost/:1', 'http://127.0.0.1', 
    'http://localhost:3000/', 'http://localhost:3000', 'http://127.0.0.1:3000/'
  ]
  
const corsOptions = {
    origin: function (origin: any) {
        if (whitelist.indexOf(origin) !== -1) {
            handleCors(); 
        } else {
            handleCors();
        }
    }
}

router.get('/api/user', userController.getAllUsers, cors(corsOptions));
router.post('/api/user', userController.createUser, cors(corsOptions));

export { router as userRouter }
