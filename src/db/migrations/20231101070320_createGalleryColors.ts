import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("gallery_colors", (table) => {
        table.bigInteger("gallery_color_id").primary()
        table.bigInteger("gallery_id")
        table.bigInteger("color_id")
        table.timestamps(true, true)
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("gallery_colors")
}

