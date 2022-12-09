import express, { Request, Response } from 'express'
import DeckController from '../controllers/deck.controller';
import ImageController from '../controllers/image.controller';
import TruckController from '../controllers/truck.controller';
import UserController from '../controllers/user.controller';
import WheelController from '../controllers/wheel.controller';

var cors = require('cors');

const router = express.Router();

// set controllers
const userController = new UserController();
const deckController = new DeckController;
const wheelController = new WheelController;
const truckController = new TruckController;
const imageController = new ImageController;

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

// decks
router.get('/api/deck', deckController.getAllDecks, cors(corsOptions));
router.get('/api/deck/:id', deckController.getDeck, cors(corsOptions));
router.post('/api/deck', deckController.createDeck, cors(corsOptions));
router.post('/api/deck/:id', deckController.createDeck, cors(corsOptions));
router.put('/api/deck/:id', deckController.updateDeck, cors(corsOptions));
router.delete('/api/deck/:id', deckController.deleteDeck, cors(corsOptions));

// wheels
router.get('/api/wheel', wheelController.getAllWheels, cors(corsOptions));
router.get('/api/wheel/:id', wheelController.getWheel, cors(corsOptions));
router.post('/api/wheel', wheelController.createWheel, cors(corsOptions));
router.post('/api/wheel/:id', wheelController.createWheel, cors(corsOptions));
router.put('/api/wheel/:id', wheelController.updateWheel, cors(corsOptions));
router.delete('/api/wheel/:id', wheelController.deleteWheel, cors(corsOptions));

// trucks
router.get('/api/truck', truckController.getAllTrucks, cors(corsOptions));
router.get('/api/truck/:id', truckController.getTruck, cors(corsOptions));
router.post('/api/truck', truckController.createTruck, cors(corsOptions));
router.post('/api/truck/:id', truckController.createTruck, cors(corsOptions));
router.put('/api/truck/:id', truckController.updateTruck, cors(corsOptions));
router.delete('/api/truck/:id', truckController.deleteTruck, cors(corsOptions));

router.get('/api/image', imageController.getAllImages, cors(corsOptions));
router.post('/api/image', imageController.createImage, cors(corsOptions));

export { router as userRouter }
