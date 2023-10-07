/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express"
import { IBaseVideo, IVideo } from "../interfaces/objects.interface"
import * as VideosValidation from "./videos.validation"
import * as VideosService from "./videos.service"
import { errorHandler } from "../middleware/error.handlers"

/**
 * Controller Definitions
 */

const create = async (req: Request, res: Response) => {
    try {
        const video: IVideo = res.locals.validVideo
        video.video_id = new Date().valueOf() // add video ID
        const newVideo: IVideo = await VideosService.create(video)
        res.status(201).json(newVideo)
    } catch (err) {
        errorHandler(err, res)
    }
}

const read = async (req: Request, res: Response) => {
    try {
        res.json(res.locals.foundVideo)
    } catch (err) {
        errorHandler(err, res)
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const updatedVideo: IBaseVideo = res.locals.validVideo
        const id: number = parseInt(res.locals.foundVideo.video_id)
        const responseVideo: IVideo = await VideosService.update(updatedVideo, id)
        res.json(responseVideo)
    } catch (err) {
        errorHandler(err, res)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(res.locals.foundVideo.video_id)
        const response: void = await VideosService.destroy(id)
        res.json(response)
    } catch (err) {
        errorHandler(err, res)
    }
}

/**
 * Exports
 */

export const VideosController = {
    create: [
        VideosValidation.isValidVideo,
        VideosValidation.appendData,
        create
    ],
    read: [VideosValidation.videoExists, read],
    update: [VideosValidation.videoExists,
        VideosValidation.isValidVideo,
        update
    ],
    delete: [VideosValidation.videoExists, destroy]
}