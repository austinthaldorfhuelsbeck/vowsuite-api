import { Knex } from "knex"
import galleryColors from "./05-gallery-colors.json"

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("gallery_colors").del()

	// Inserts seed entries
	await knex
		.raw("TRUNCATE TABLE gallery_colors RESTART IDENTITY CASCADE")
		.then(() => {
			return knex("gallery_colors").insert(galleryColors)
		})
}
