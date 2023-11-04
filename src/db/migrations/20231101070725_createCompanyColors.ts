import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("company_colors", (table) => {
        table.bigInteger("company_color_id").primary()
        table.bigInteger("company_id")
        table.string("value")
        table.timestamps(true, true)
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("gallery_colors")
}
