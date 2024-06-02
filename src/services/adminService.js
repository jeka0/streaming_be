const { createGlobalPenalty, checkGlobalPenlaty, update, paginationPenalty } = require("./penaltyService");
const { updateCurrentUser, getUserByID, paginationUsers } = require("./userService");
const { getRoleByName } = require("./roleService");
const { terminateSession } = require("../additionalServers/media_server");

async function globallyBanUser(adminId, userId){
    const ban = await createGlobalPenalty(userId, adminId);
    const user = await getUserByID(userId);
    terminateSession(user.login);
    return ban;
}

async function globallyUnBanUser(userId){
    const penalty  = await checkGlobalPenlaty(userId, "GlobalBan");

    if(!penalty){
        throw new Error("Penalty not found");
    }

    return await update(penalty.id, { status: "inactive" });
}

async function addAdmin(userId){
    const user = await getUserByID(userId);

    if(user.role.name === "Admin"){
        throw new Error("The user is already an administrator");
    }

    const role = await getRoleByName("Admin");
    return await updateCurrentUser(userId, { role })
}

async function removeAdmin(userId, ownerId){
    const user = await getUserByID(userId);

    if(user.role.name !== "Admin"){
        throw new Error("The user is not an administrator");
    }

    if(userId === ownerId){
        throw new Error("You cannot remove the administrator role from yourself");
    }

    const role = await getRoleByName("User");
    return await updateCurrentUser(userId, { role })
}

async function getAllAdmins(page, limit){
    const skip= (page-1) * limit;
    return await paginationUsers(skip, limit, {
        role: {
            name: "Admin"
        }
    });
}

async function getAllBans(page, limit, status){
    const skip= (page-1) * limit;
    const config = {
        type: {
            code: "GlobalBan"
        }
    }

    if(status){
        config.status = {
            code: status
        };
    }

    return await paginationPenalty(skip, limit, config);
}

module.exports = {
    globallyBanUser,
    globallyUnBanUser,
    addAdmin,
    removeAdmin,
    getAllAdmins,
    getAllBans
}