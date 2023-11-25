const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name: "Settings",
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
        category:{
            type: "varchar",
            length: 255
        },
    },
    relations: {
        user: {
            target: "User",
            type: "one-to-one",
            joinTable: true,
            cascade: true,
            inverseSide: 'Settings',
            onDelete: "cascade",
            joinColumn: {
                name: 'user_id',
                referencedColumnName: 'id',
            }
        }
    },
})