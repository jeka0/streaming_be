const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name: "Stream",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true 
        },
        stream_title: {
            type: "text",
            nullable: true
        },
        category:{
            type: "text"
        },
        start_time:{
            type: "timestamp"
        },
        end_time:{
            type: "timestamp",
            nullable: true
        },
        viewer_count:{
            type: "int",
            default: 0
        }
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
        },
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
    },
})