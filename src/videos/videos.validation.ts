/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response, NextFunction } from "express"
import * as VideosService from "./videos.service"
import { IBaseVideo, IVideo } from "../interfaces/objects.interface"
import { errorHandler } from "../middleware/error.handlers"

/**
 * Middleware Definitions
 */

export const isValidVideo = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get video from create/update req
    const video: IBaseVideo = req.body
    // Build error message
    let message: string = ""
    if (!video.gallery_id) message += "Gallery ID required. "
    if (!video.video_URL) message += "Video URL required. "
    if (!video.video_name) message += "Video name required."
    // Return err or pass thru locals
    if (message !== "") {
        errorHandler({ status: 400, message }, res)
    } else {
        res.locals.validVideo = video
        return next()
    }
}

export const videoExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get ID from param or req body
    let id: string = ""
    if (req.params.video_id) {
        id = req.params.video_id
    } else if (req.body.data.video_id) {
        id = req.body.data.video_id
    } else {
        errorHandler({ status: 400, message: "Video ID required." }, res)
    }
    // Read the video
    const video: IVideo = await VideosService.read(parseInt(id))
    // Return if found
    if (video) {
        res.locals.foundVideo = video
        return next()
    }
    errorHandler({ status: 404, message: `Video ${id} cannot be found.` }, res)
}

export const appendData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get video from locals
    const video: IVideo = res.locals.validVideo
    // Append placeholder img URL if none provided
    if (!video.img_URL) {
        video.img_URL = "https://i.stack.imgur.com/HQwHI.jpg"
    }
    // Append created date if none provided
    if (!video.created_at) {
        video.created_at = new Date()
    }
    // Append updated date
    video.updated_at = new Date()
    // Pass thru completed object
    res.locals.validVideo = video
    return next()
}