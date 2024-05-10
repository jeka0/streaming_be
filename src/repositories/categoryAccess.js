const dbAccess = require("./DataSource")
const categoryRep = dbAccess.AppDataSource.getRepository("Category");

async function createCategory(category){
   return await categoryRep.save(category)
}

async function getAllCategorys(){
    return await categoryRep.find();
}

async function getAllCategorysByName(name){
    return await categoryRep.find({
        where:{
            name
        },
   });
}

async function getCategoryById(id){
    return await categoryRep.findOne({
        where:{
            id 
        },
    });
}

async function getCategoryByName(name){
    return await categoryRep.findOne({
        where:{
            name
        },
    });
}

async function deleteCategory(id){
    return await categoryRep.delete({
        id
    });
}

async function updateCategory(id, data){
    return await categoryRep.update({ id }, data)
}

module.exports = {
    createCategory,
    getAllCategorys,
    getAllCategorysByName,
    getCategoryById,
    getCategoryByName,
    deleteCategory,
    updateCategory
};