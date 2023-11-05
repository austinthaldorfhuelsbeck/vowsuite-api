// Data Models
import {
	IBaseGallery,
	IGalleryColor,
	IGallery,
	IVideo,
	IBaseGalleryColor,
} from "../interfaces/objects.interface"

// Config
import knex from "../db/connection"

// Methods
export const create = async (newGallery: IGallery): Promise<IGallery> => {
	return knex("galleries")
		.insert(newGallery)
		.returning("*")
		.then((createdGalleries) => createdGalleries[0])
}

export const read = async (id: number): Promise<IGallery> => {
	return knex("galleries")
		.select("*")
		.where({ gallery_id: id })
		.then((foundGalleries) => foundGalleries[0])
}

export const update = async (
	updatedGallery: IBaseGallery,
	id: number,
): Promise<IGallery> => {
	return knex("galleries")
		.select("*")
		.where({ gallery_id: id })
		.update(updatedGallery, "*")
		.then((updatedGalleries) => updatedGalleries[0])
}

export const destroy = async (id: number): Promise<void> => {
	return knex("galleries").where({ gallery_id: id }).del()
}

export const listVideos = async (id: number): Promise<Array<IVideo>> => {
	return knex("galleries as g")
		.join("videos as v", "g.gallery_id", "v.gallery_id")
		.distinct("v.*")
		.where({ "v.gallery_id": id })
}

export const createColor = async (
	newGalleryColor: IBaseGalleryColor,
): Promise<IGalleryColor> => {
	return knex("gallery_colors")
		.insert(newGalleryColor)
		.returning("*")
		.then((createdGalleryColors) => createdGalleryColors[0])
}

export const readColor = async (id: number): Promise<IGalleryColor> => {
	return knex("gallery_colors")
		.select("*")
		.where({ gallery_color_id: id })
		.then((foundGalleryColors) => foundGalleryColors[0])
}

export const updateColor = async (
	updatedGalleryColor: IBaseGalleryColor,
	id: number,
): Promise<IGalleryColor> => {
	return knex("gallery_colors")
		.select("*")
		.where({ gallery_color_id: id })
		.update(updatedGalleryColor, "*")
		.then((updatedGalleryColors) => updatedGalleryColors[0])
}

export const listColors = async (id: number): Promise<IGalleryColor[]> => {
	return knex("gallery_colors").select("*").where({ gallery_id: id })
}

// export const listColors = async (id: number): Promise<IColor[]> => {
// 	return knex("colors as co")
// 		.join("gallery_colors as gc", "co.color_id", "gc.color_id")
// 		.join("galleries as g", "g.gallery_id", "gc.gallery_id")
// 		.distinct("co.*")
// 		.where({ "g.gallery_id": id })
// }
