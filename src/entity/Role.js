const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name: "Role",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true 
        },
        name:{
            type: "varchar",
            unique: true,
            length: 255
        },
    },
})