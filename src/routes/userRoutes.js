const router = require('express').Router();
const {celebrate} = require('celebrate');
const userSchem = require("../validation/userSchems");
const { upload } = require('../middlewares/image')

const {
    getAllUsers, 
    getCurrentUser, 
    getUser, 
    updateUser, 
    deleteUser, 
    searchUser, 
    getUserByLogin, 
    followToUser, 
    unfollowFromUser, 
    generateNewStreamKey,
    addTag,
    removeTag
} = require('../controllers/userController.js');

router.post('/login', celebrate(userSchem.userLogin), getUserByLogin);
router.post('/tag', celebrate(userSchem.getByName), addTag);
router.get('/all', getAllUsers);
router.get('/key', generateNewStreamKey);
router.post('/search', celebrate(userSchem.getByName), searchUser);
router.get('/:id', celebrate(userSchem.userId), getUser);
router.get('/follow/:id', celebrate(userSchem.userId), followToUser);
router.get('/unfollow/:id', celebrate(userSchem.userId), unfollowFromUser);
router.get('/',  getCurrentUser);
router.put('/',  upload.single("image"), celebrate(userSchem.update), updateUser);
router.delete('/',  deleteUser);
router.delete('/tag/:id', celebrate(userSchem.userId), removeTag);


module.exports = router;