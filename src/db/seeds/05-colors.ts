import { Knex } from "knex"
import colors from "./05-colors.json"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("colors").del()

    // Inserts seed entries
    await knex.raw("TRUNCATE TABLE colors RESTART IDENTITY CASCADE").then(() => {
        return knex("colors").insert(colors)
    })
}