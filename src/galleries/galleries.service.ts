/**
 * Data Model Interfaces
 */
import { IBaseGallery, IGallery, IVideo } from "../interfaces/objects.interface"

/**
 * Knex object for database connection
 */
import knex from "../db/connection"

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
    id: number
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

export const listVideosByGalleryID = async (id: number): Promise<Array<IVideo>> => {
    return knex("galleries as g")
        .join("videos as v", "g.gallery_id", "v.gallery_id")
        .distinct("v.*")
        .where({ "v.gallery_id": id })
}