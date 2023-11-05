// Data Models
import { IBaseFont, IFont } from "../interfaces/objects.interface"

// Config
import knex from "../db/connection"

// Functions
export const create = async (newFont: IFont): Promise<IFont> => {
	return knex("fonts")
		.insert(newFont)
		.returning("*")
		.then((createdFonts) => createdFonts[0])
}

export const read = async (id: number): Promise<IFont> => {
	return knex("fonts")
		.select("*")
		.where({ font_id: id })
		.then((foundFonts) => foundFonts[0])
}

export const update = async (
	updatedFont: IBaseFont,
	id: number,
): Promise<IFont> => {
	return knex("fonts")
		.select("*")
		.where({ font_id: id })
		.update(updatedFont, "*")
		.then((updatedFonts) => updatedFonts[0])
}

export const destroy = async (id: number): Promise<void> => {
	return knex("fonts").where({ font_id: id }).del()
}

export const list = async (): Promise<IFont[]> => {
	return knex("fonts").select("*")
}