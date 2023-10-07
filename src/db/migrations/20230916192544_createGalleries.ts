import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("galleries", (table) => {
        table.bigInteger("gallery_id").primary()
        table.bigInteger("user_id")
        table.string("gallery_name")
        table.string("img_URL")
        table.string("font").defaultTo("Georgia")
        table.string("hex1").defaultTo("000000")
        table.string("hex2").defaultTo("000000")
        table.string("hex3").defaultTo("000000")
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("galleries")
}