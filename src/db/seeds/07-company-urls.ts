import { Knex } from "knex"
import companyColors from "./08-company-urls.json"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("company-urls").del()

    // Inserts seed entries
    await knex.raw("TRUNCATE TABLE company-urls RESTART IDENTITY CASCADE").then(() => {
        return knex("company-urls").insert(companyColors)
    })
}