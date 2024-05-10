const categoryService = require("../services/categoryService");

async function createCategory(req, res){
    const { name } = req.body;

    categoryService.createCategory({name})
    .then((category)=>{res.send(category)})
    .catch((err)=>res.status(400).send(err.message));
}

async function getCategoryById(req, res){
    const { id } = req.params;

    categoryService.getCategoryById(id)
    .then((category)=>res.send(category))
    .catch((err)=>res.status(400).send(err.message));
}

async function getCategoryByName(req, res){
    const { name } = req.body;

    categoryService.getCategoryByName(name)
    .then((category)=>res.send(category))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllCategorys(req, res){
    categoryService.getAllCategorys()
    .then((categorys)=>res.send(categorys))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllCategorysByName(req, res){
    const { name } = req.body;

    categoryService.getAllCategorysByName(name)
    .then((categorys)=>res.send(categorys))
    .catch((err)=>res.status(400).send(err.message));
}

async function updateCategory(req, res){
    const { id } = req.params;
    const { name } = req.body;

    categoryService.updateCategory(id, { name })
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function deleteCategory(req, res){
    const { id } = req.params;

    categoryService.deleteCategory(id)
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

module.exports = {
    createCategory,
    getCategoryById,
    getCategoryByName,
    getAllCategorys,
    getAllCategorysByName,
    updateCategory,
    deleteCategory
};