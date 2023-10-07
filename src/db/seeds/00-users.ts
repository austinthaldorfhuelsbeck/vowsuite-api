import { Knex } from "knex"
import users from "./00-users.json"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del()

    // Inserts seed entries
    await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE").then(() => {
        return knex("users").insert(users)
    })
}