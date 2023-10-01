import express from 'express';
import * as authControllers from '../controllers/authControllers.js'

const router = express.Router();

router.post('/refreshToken', authControllers.refreshToken);

router.post('/login', authControllers.login);

router.post('/register', authControllers.register)

router.post('/logout', authControllers.logout);

export default router;