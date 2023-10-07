/**
 * Data Model Interfaces
 */

import { IBaseVideo, IVideo } from "../interfaces/objects.interface"

/**
 * Knex object for database connection
 */

import knex from "../db/connection"

export const create = async (newVideo: IVideo): Promise<IVideo> => {
    return knex("videos")
        .insert(newVideo)
        .returning("*")
        .then((createdVideos) => createdVideos[0])
}

export const read = async (id: number): Promise<IVideo> => {
    return knex("videos")
        .select("*")
        .where({ video_id: id })
        .then((foundVideos) => foundVideos[0])
}

export const update = async (
    updatedVideo: IBaseVideo,
    id: number
): Promise<IVideo> => {
    return knex("videos")
        .select("*")
        .where({ video_id: id })
        .update(updatedVideo, "*")
        .then((updatedVideos) => updatedVideos[0])
}

export const destroy = async (id: number): Promise<void> => {
    return knex("videos").where({ video_id: id }).del()
}