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
            type: "varchar",
            unique: true,
            length: 255
        },
        type: {
            type: "varchar",
            default: "public",
            length: 255
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