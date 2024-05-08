const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name: "Type",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true 
        },
        code:{
            type: "varchar",
            length: 255
        },
    },
})