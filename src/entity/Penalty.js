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
            joinTable: true,
            cascade: true,
            onDelete: 'cascade'
        },
        owner: {
            target: "User",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            onDelete: 'cascade'
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