import { Knex } from "knex"
import videos from "./03-videos.json"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("videos").del()

    // Inserts seed entries
    await knex.raw("TRUNCATE TABLE videos RESTART IDENTITY CASCADE").then(() => {
        return knex("videos").insert(videos)
    })
}