const categoryAccess = require("../repositories/categoryAccess");
async function createCategory(data){
    const category = await categoryAccess.createCategory(data)

    if(!category){
        throw new Error("Error creating Category");
    }

    return category;
}

async function getCategoryById(id){
    const category = await categoryAccess.getCategoryById(id);

    if(!category){
        throw new Error("Category not found");
    }

    return category;
}

async function getCategoryByName(name){
    let category = await categoryAccess.getCategoryByName(name);

    if(!category){
        throw new Error("Category not found");
    }

    return category;
}

async function getAllCategorys()
{
    return await categoryAccess.getAllCategorys()
}

async function getAllCategorysByName(name){
    return await categoryAccess.getAllCategorysByName(name);
}

async function updateCategory(id, data){
    const updatedCategory = await categoryAccess.updateCategory(id, data);

    if(!updatedCategory){
        throw new Error("Error updating Category");
    }

    return updatedCategory;
}

async function deleteCategory(id){
    const category = await categoryAccess.getCategoryById(id);
    
    if(!category){
      throw new Error("Category is not found");
    }

    return await categoryAccess.deleteCategory(id);
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