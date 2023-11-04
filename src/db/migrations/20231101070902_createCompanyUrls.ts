import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("company_urls", (table) => {
        table.bigInteger("company_url_id").primary()
        table.bigInteger("company_id")
        table.string("label")
        table.string("target")
        table.timestamps(true, true)
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("company_urls")
}
