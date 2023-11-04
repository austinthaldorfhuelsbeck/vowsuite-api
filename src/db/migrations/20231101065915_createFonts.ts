import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("fonts", (table) => {
        table.bigInteger("font_id").primary()
        table.string("font_name")
        table.timestamps(true, true)
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("fonts")
}

