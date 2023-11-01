import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("colors", (table) => {
        table.bigInteger("color_id").primary()
        table.string("value")
        table.timestamps(true, true)
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("colors")
}

