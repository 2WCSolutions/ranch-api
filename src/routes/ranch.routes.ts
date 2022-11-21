import express, { Request, Response } from 'express'
import DeckController from '../controllers/deck.controller';
import TruckController from '../controllers/truck.controller';
import UserController from '../controllers/user.controller';
import WheelController from '../controllers/wheel.controller';
import { User } from '../models/user.model';

var cors = require('cors');

const router = express.Router();

// set controllers
const userController = new UserController();
const deckController = new DeckController;
const truckController = new TruckController;
const wheelController = new WheelController;

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


// set routes
router.get('/api/user', userController.getAllUsers, cors(corsOptions));
router.post('/api/user', userController.createUser, cors(corsOptions));

router.get('/api/deck', deckController.getAllDecks, cors(corsOptions));
router.post('/api/deck', deckController.createDeck, cors(corsOptions));

router.get('/api/truck', truckController.getAllTrucks, cors(corsOptions));
router.post('/api/truck', truckController.createTruck, cors(corsOptions));

router.get('/api/wheel', wheelController.getAllWheels, cors(corsOptions));
router.post('/api/wheel', wheelController.createWheel, cors(corsOptions));

export { router as userRouter }
