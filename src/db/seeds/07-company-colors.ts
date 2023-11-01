import { Knex } from "knex"
import companyColors from "./07-company-colors.json"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("company-colors").del()

    // Inserts seed entries
    await knex.raw("TRUNCATE TABLE company-colors RESTART IDENTITY CASCADE").then(() => {
        return knex("company-colors").insert(companyColors)
    })
}