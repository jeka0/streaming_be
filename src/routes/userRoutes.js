const router = require('express').Router();
const {celebrate} = require('celebrate');
const userSchem = require("../validation/userSchems");
const { upload } = require('../middlewares/image')

const {getAllUsers, getCurrentUser, getUser, updateUser, deleteUser, searchUser, getUserByLogin, followToUser, unfollowFromUser, generateNewStreamKey} = require('../controllers/userController.js');

router.post('/login', celebrate(userSchem.userLogin), getUserByLogin);
router.get('/all', getAllUsers);
router.get('/key', generateNewStreamKey);
router.post('/search', celebrate(userSchem.getByName), searchUser);
router.get('/:id', celebrate(userSchem.userId), getUser);
router.get('/follow/:id', followToUser);
router.get('/unfollow/:id', unfollowFromUser);
router.get('/',  getCurrentUser);
router.put('/',  upload.single("image"), celebrate(userSchem.update), updateUser);
router.delete('/',  deleteUser);


module.exports = router;