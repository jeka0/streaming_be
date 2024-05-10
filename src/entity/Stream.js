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
            type: "varchar",
            nullable: true,
            length: 255
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
        },
        recording_file:{
            type: "varchar",
            length: 255
        }
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            onDelete: "cascade",
        },
        category: {
            target: "Category",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
        },
    },
})