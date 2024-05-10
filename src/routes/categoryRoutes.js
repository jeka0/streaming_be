const router = require('express').Router();
const {celebrate} = require('celebrate');
const categorySchems = require("../validation/categorySchems")

const {
    createCategory,
    getCategoryById,
    getCategoryByName,
    getAllCategorys,
    getAllCategorysByName,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryControllert');

router.get('/all', getAllCategorys);
router.get('/all/name', celebrate(categorySchems.name), getAllCategorysByName);
router.get('/name', celebrate(categorySchems.name), getCategoryByName);
router.get('/:id', celebrate(categorySchems.id), getCategoryById);
router.post('/create', celebrate(categorySchems.name), createCategory);
router.put('/:id', celebrate(categorySchems.id), celebrate(categorySchems.name), updateCategory);
router.delete('/:id',  celebrate(categorySchems.id), deleteCategory);

module.exports = router;