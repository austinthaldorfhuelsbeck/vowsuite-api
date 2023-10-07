import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("companies", (table) => {
        table.bigInteger("company_id").primary()
        table.bigInteger("user_id")
        table.string("company_name")
        table.string("img_URL")
        table.string("website_URL").defaultTo("")
        table.string("youtube_URL").defaultTo("")
        table.string("instagram_URL").defaultTo("")
        table.string("facebook_URL").defaultTo("")
        table.string("vimeo_URL").defaultTo("")
        table.string("tiktok_URL").defaultTo("")
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("companies")
}