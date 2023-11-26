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
            type: "varchar",
            unique: true,
            length: 255
        },
        password: {
            type: "varchar",
            length: 255
        },
        streamKey:{
            type: "varchar",
            length: 255
        },
        image:{
            type: "text",
            nullable: true
        },
        status:{
            type: "boolean",
            default: false
        }
    },
    relations:{
        chat: {
            target: "Chat",
            type: "one-to-one",
            joinTable: true,
            mappedBy: 'stream',
            joinColumn: {
                name: 'chat_id',
                referencedColumnName: 'id',
            }
        },
        subscription: {
            target: "User",
            type: "many-to-many",
            joinTable: true,
            cascade: true,
        }
    }
})