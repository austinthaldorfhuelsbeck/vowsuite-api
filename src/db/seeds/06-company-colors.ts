import { Knex } from "knex"
import companyColors from "./06-company-colors.json"

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("company_colors").del()

	// Inserts seed entries
	await knex
		.raw("TRUNCATE TABLE company_colors RESTART IDENTITY CASCADE")
		.then(() => {
			return knex("company_colors").insert(companyColors)
		})
}
