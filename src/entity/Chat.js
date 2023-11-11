const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name: "Chat",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true 
        },
        name: {
            type: "text",
            unique: true
        },
        type: {
            type: "text",
            default: "public"
        }
    },
    relations: {
        users: {
            target: "User",
            type: "many-to-many",
            joinTable: true,
            cascade: true,
        },
        streamer: {
            target: "User",
            type: "one-to-one",
            joinTable: true,
            cascade: true,
            inverseSide: 'chat',
            onDelete: "cascade",
            joinColumn: {
                name: 'user_id',
                referencedColumnName: 'id',
            }
        }
    },
})