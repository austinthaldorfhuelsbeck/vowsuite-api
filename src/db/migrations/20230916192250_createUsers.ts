import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table) => {
        table.bigInteger("user_id").primary()
        table.string("user_name")
        table.string("email")
        table.string("img_URL")
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users")
}