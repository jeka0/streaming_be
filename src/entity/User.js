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
        streamKey:{
            type: "text",
        },
        image:{
            type: "text",
            nullable: true
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
        }
    }
})