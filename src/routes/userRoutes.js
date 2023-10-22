const router = require('express').Router();
const {celebrate} = require('celebrate');
const userSchem = require("../validation/userSchems");
const { upload } = require('../middlewares/image')

const {getAllUsers, getCurrentUser, getUser, updateUser, deleteUser, searchUser} = require('../controllers/userController.js');

router.get('/all', getAllUsers);
router.post('/search', celebrate(userSchem.getByName), searchUser);
router.get('/:id', celebrate(userSchem.userId), getUser);
router.get('/',  getCurrentUser);
router.put('/',  upload.single("image"), celebrate(userSchem.update), updateUser);
router.delete('/',  deleteUser);


module.exports = router;