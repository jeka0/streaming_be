const dbAccess = require("./DataSource.js");
const userRep = dbAccess.AppDataSource.getRepository("User");

async function createUser(user){
   return await userRep.save(user)
}

async function getAllUsers(){
    return await userRep.find();
}

async function paginationUsers(skip, take, data){
    const config = {
        where: data,
        skip,
        take
    }

    const [result, total] = await userRep.findAndCount(config);

    return {
        data: result,
        total
    }
}

async function searchUser(text){
    const notBan = qb => {
        const subQuery = qb.subQuery()
            .select('penalty.id')
            .from('Penalty', 'penalty')
            .leftJoinAndSelect('penalty.status', 'status')
            .where('penalty.user_id = user.id')
            .andWhere('status.code = :activeStatus')
            .getQuery();
        return `NOT EXISTS (${subQuery})`;
    };

    const query =  await userRep.createQueryBuilder("user")
    .leftJoinAndSelect("user.tags", "tags")
    .where("user.login ILIKE :text", { text: `%${text}%` })
    .andWhere(notBan)
    .orWhere("tags.name ILIKE :text", { text: `%${text}%` })
    .andWhere(notBan)
    .setParameter('activeStatus', 'active')
    
    return query.getMany();
}

async function getUserByID(id){
    const notBan = qb => {
        const subQuery = qb.subQuery()
            .select('penalty.id')
            .from('Penalty', 'penalty')
            .leftJoinAndSelect('penalty.status', 'status')
            .where('penalty.user_id = subscription.id')
            .andWhere('status.code = :activeStatus')
            .getQuery();
        return `NOT EXISTS (${subQuery})`;
    };

    const query = userRep.createQueryBuilder("user")
        .leftJoinAndSelect("user.chat", "chat")
        .leftJoinAndSelect("user.subscription", "subscription")
        .leftJoinAndSelect("user.tags", "tags")
        .leftJoinAndSelect("user.role", "role")
        .where("user.id = :id", { id })
        .andWhere(notBan)
        .setParameter("activeStatus", "active");

    return await query.getOne();
}

async function getUserByStreamKey(streamKey){
    return await userRep.findOne({ 
        where:{
            streamKey 
        }, 
        relations:['chat', 'subscription', 'tags', 'role'] 
     })
}

async function getUserByLogin(login){
    return await userRep.findOne({ 
        where:{
            login 
        }, 
        relations:['chat', 'subscription', 'tags', 'role'] 
     })
}

async function deleteUser(id){
    return await userRep.delete({ id });
}

async function updateUser(id, data){
    return await userRep.update({ id }, data)
}

module.exports = {
    createUser,
    searchUser,
    getAllUsers,
    getUserByID,
    getUserByLogin,
    deleteUser,
    updateUser,
    getUserByStreamKey,
    paginationUsers
};