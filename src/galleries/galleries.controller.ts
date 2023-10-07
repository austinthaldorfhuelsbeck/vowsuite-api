/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express"
import { IBaseGallery, IGallery, IVideo } from "../interfaces/objects.interface"
import * as GalleriesValidation from "./galleries.validation"
import * as GalleriesService from "./galleries.service"
import { errorHandler } from "../middleware/error.handlers"

/**
 * Controller Definitions
 */
const create = async (req: Request, res: Response) => {
    try {
        const gallery: IGallery = res.locals.validGallery
        gallery.gallery_id = new Date().valueOf() // add gallery ID
        const newGallery: IGallery = await GalleriesService.create(gallery)
        res.status(201).json(newGallery)
    } catch (err) {
        errorHandler(err, res)
    }
}

const read = async (req: Request, res: Response) => {
    try {
        const gallery: IGallery = res.locals.foundGallery
        const id: number = gallery.gallery_id
        gallery.videos = await GalleriesService.listVideosByGalleryID(id)
        res.json(gallery)
    } catch (err) {
        errorHandler(err, res)
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const updatedGallery: IBaseGallery = res.locals.validGallery
        const id: number = parseInt(res.locals.foundGallery.gallery_id)
        const responseGallery: IGallery = await GalleriesService.update(updatedGallery, id)
        res.json(responseGallery)
    } catch (err) {
        errorHandler(err, res)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(res.locals.foundGallery.gallery_id)
        const response: void = await GalleriesService.destroy(id)
        res.json(response)
    } catch (err) {
        errorHandler(err, res)
    }
}

const listVideosByGalleryID = async (req: Request, res: Response) => {
    try {
        const id: number = res.locals.foundGallery.gallery_id
        const responseVideos: Array<IVideo> = await GalleriesService.listVideosByGalleryID(id)
        res.json(responseVideos)
    } catch (err) {
        errorHandler(err, res)
    }
}

/**
 * Exports
 */
export const GalleriesController = {
    create: [
        GalleriesValidation.isValidGallery,
        GalleriesValidation.appendData,
        create
    ],
    read: [GalleriesValidation.galleryExists, read],
    update: [GalleriesValidation.galleryExists,
        GalleriesValidation.isValidGallery,
        update
    ],
    delete: [GalleriesValidation.galleryExists, destroy],
    listVideosByGalleryID: [GalleriesValidation.galleryExists, listVideosByGalleryID],
}