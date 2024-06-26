const router = require('express').Router();
const {celebrate} = require('celebrate');
const tagSchems = require("../validation/tagSchems")
const { checkAdminRole } = require("../middlewares/checkAuth");

const {
    createTag,
    getTagById,
    getTagByName,
    getAllTags,
    getAllTagsByName,
    updateTag,
    deleteTag,
    searchTag
} = require('../controllers/tagControllert');

router.get('/all', getAllTags);
router.get('/all/name', celebrate(tagSchems.name), getAllTagsByName);
router.post('/search', celebrate(tagSchems.name), searchTag);
router.get('/name', celebrate(tagSchems.name), getTagByName);
router.get('/:id', celebrate(tagSchems.id), getTagById);
router.post('/create', checkAdminRole, celebrate(tagSchems.name), createTag);
router.put('/:id', checkAdminRole, celebrate(tagSchems.id), celebrate(tagSchems.name), updateTag);
router.delete('/:id', checkAdminRole, celebrate(tagSchems.id), deleteTag);

module.exports = router;