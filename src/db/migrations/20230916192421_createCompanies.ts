import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("companies", (table) => {
        table.bigInteger("company_id").primary()
        table.bigInteger("user_id")
        table.bigInteger("font_id")
        table.string("company_name")
        table.string("img_URL")
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("companies")
}