import { Knex } from "knex"
import companyUrls from "./07-company-urls.json"

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("company_urls").del()

	// Inserts seed entries
	await knex
		.raw("TRUNCATE TABLE company_urls RESTART IDENTITY CASCADE")
		.then(() => {
			return knex("company_urls").insert(companyUrls)
		})
}
