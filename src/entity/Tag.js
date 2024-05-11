const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name: "Tag",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true 
        },
        name:{
            type: "varchar",
            length: 255
        },
    },
})