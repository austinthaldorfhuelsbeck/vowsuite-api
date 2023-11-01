import { Knex } from "knex"
import galleryColors from "./06-gallery-colors.json"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("gallery-colors").del()

    // Inserts seed entries
    await knex.raw("TRUNCATE TABLE gallery-colors RESTART IDENTITY CASCADE").then(() => {
        return knex("gallery-colors").insert(galleryColors)
    })
}