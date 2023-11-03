// Data Models
import { IBaseColor, IColor } from "../interfaces/objects.interface"

// Config
import knex from "../db/connection"

// Functions
export const create = async (newColor: IColor): Promise<IColor> => {
	return knex("colors")
		.insert(newColor)
		.returning("*")
		.then((createdColors) => createdColors[0])
}

export const read = async (id: number): Promise<IColor> => {
	return knex("colors")
		.select("*")
		.where({ color_id: id })
		.then((foundColors) => foundColors[0])
}

export const update = async (
	updatedColor: IBaseColor,
	id: number,
): Promise<IColor> => {
	return knex("colors")
		.select("*")
		.where({ color_id: id })
		.update(updatedColor, "*")
		.then((updatedColors) => updatedColors[0])
}

export const destroy = async (id: number): Promise<void> => {
	return knex("colors").where({ color_id: id }).del()
}
