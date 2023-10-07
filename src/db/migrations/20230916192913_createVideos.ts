import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("videos", (table) => {
        table.bigInteger("video_id").primary()
        table.bigInteger("gallery_id")
        table.string("video_URL")
        table.string("video_name")
        table.string("img_URL")
        table.integer("views").defaultTo(0)
        table.integer("downloads").defaultTo(0)
        table.boolean("is_displayed").defaultTo(true)
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("videos")
}