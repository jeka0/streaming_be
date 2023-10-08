const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name: "User",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true 
        },
        login: {
            type: "text",
        },
        password: {
            type: "text",
        },
        image:{
            type: "text",
            nullable: true
        }
    },
})