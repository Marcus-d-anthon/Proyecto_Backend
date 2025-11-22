const express = require('express');
const router = express.Router();
const {
    createUser,
    getUsers,
    getUserByEmail,
    updateUser,
    deleteUser,
    loginUser
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/auth/login', loginUser);
router.post('/usuarios', createUser);
router.get('/usuarios', protect, getUsers);
router.get('/usuarios/:email', protect, getUserByEmail);
router.put('/usuarios/:id', protect, updateUser);
router.delete('/usuarios/:id', protect, deleteUser);

module.exports = router;