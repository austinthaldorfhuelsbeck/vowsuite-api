import { Knex } from "knex"
import fonts from "./04-fonts.json"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("fonts").del()

    // Inserts seed entries
    await knex.raw("TRUNCATE TABLE fonts RESTART IDENTITY CASCADE").then(() => {
        return knex("fonts").insert(fonts)
    })
}