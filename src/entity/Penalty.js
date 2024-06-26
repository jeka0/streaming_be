const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name: "Penalty",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true 
        },
        datetime: {
            type: "timestamp"
        },
        end_time: {
            type: "timestamp",
            nullable: true
        },
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinColumn: {
                name: 'user_id',
                referencedColumnName: 'id'
            },
            joinTable: true,
            cascade: true,
            onDelete: 'cascade',
            inverseSide: 'penalties'
        },
        owner: {
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
        },
        type: {
            target: "Type",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
        },
        status: {
            target: "Status",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
        }
    },
})