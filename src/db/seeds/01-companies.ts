import { Knex } from "knex"
import companies from "./01-companies.json"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("companies").del()

    // Inserts seed entries
    await knex.raw("TRUNCATE TABLE companies RESTART IDENTITY CASCADE").then(() => {
        return knex("companies").insert(companies)
    })
}