const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name: "Message",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true 
        },
        message:{
            type: "varchar",
            length: 255
        },
        datetime: {
            type: "timestamp"
        },
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            onDelete: 'SET NULL'
        },
        chat: {
            target: "Chat",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            onDelete: "cascade",
        }
    },
})