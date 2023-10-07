import { Knex } from "knex"
import galleries from "./02-galleries.json"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("galleries").del()

    // Inserts seed entries
    await knex.raw("TRUNCATE TABLE galleries RESTART IDENTITY CASCADE").then(() => {
        return knex("galleries").insert(galleries)
    })
}