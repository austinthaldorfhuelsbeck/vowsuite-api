/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response, response } from "express"
import { IBaseUser, IUser, ICompany, IGallery } from "../interfaces/objects.interface"
import * as UsersValidation from "./users.validation"
import * as UsersService from "./users.service"
import * as GalleriesService from "../galleries/galleries.service"
import { errorHandler } from "../middleware/error.handlers"

/**
 * Controller Definitions
 */

const create = async (req: Request, res: Response) => {
    try {
        const user: IUser = res.locals.validUser
        user.user_id = new Date().valueOf() // add user ID
        const newUser: IUser = await UsersService.create(user)
        res.status(201).json(newUser)
    } catch (err) {
        errorHandler(err, res)
    }
}

const read = async (req: Request, res: Response) => {
    try {
        const responseUser: IUser = res.locals.foundUser
        const id: number = responseUser.user_id
        responseUser.company = await UsersService.readCompanyByUserID(id)
        responseUser.galleries = await UsersService.listGalleriesByUserID(id)
        for (let i = 0; i < responseUser.galleries.length; i++) {
            responseUser.galleries[i].videos =
                await GalleriesService.listVideosByGalleryID(responseUser.galleries[i].gallery_id)
        }
        res.json(responseUser)
    } catch (err) {
        errorHandler(err, res)
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const updatedUser: IBaseUser = res.locals.validUser
        const id: number = parseInt(res.locals.foundUser.user_id)
        const responseUser: IUser = await UsersService.update(updatedUser, id)
        res.json(responseUser)
    } catch (err) {
        errorHandler(err, res)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(res.locals.foundUser.user_id)
        const response: void = await UsersService.destroy(id)
        res.json(response)
    } catch (err) {
        errorHandler(err, res)
    }
}

const readUserByEmail = async (req: Request, res: Response) => {
    try {
        const user_email: string = String(req.query.email);
        const responseUser: IUser = await UsersService.readUserByEmail(user_email)
        const id: number = responseUser.user_id
        responseUser.company = await UsersService.readCompanyByUserID(id)
        responseUser.galleries = await UsersService.listGalleriesByUserID(id)
        for (let i = 0; i < responseUser.galleries.length; i++) {
            responseUser.galleries[i].videos =
                await GalleriesService.listVideosByGalleryID(responseUser.galleries[i].gallery_id)
        }
        res.json(responseUser)
    } catch (err) {
        errorHandler(err, res)
    }
}

const readCompanyByUserID = async (req: Request, res: Response) => {
    try {
        const id: number = res.locals.foundUser.user_id
        const responseCompany: ICompany = await UsersService.readCompanyByUserID(id)
        res.json(responseCompany)
    } catch (err) {
        errorHandler(err, res)
    }
}

const listGalleriesByUserID = async (req: Request, res: Response) => {
    try {
        const id: number = res.locals.foundUser.user_id
        const responseGalleries: IGallery[] = await UsersService.listGalleriesByUserID(id)
        for (let i = 0; i < responseGalleries.length; i++) {
            responseGalleries[i].videos =
                await GalleriesService.listVideosByGalleryID(responseGalleries[i].gallery_id)
        }
        res.json(responseGalleries)
    } catch (err) {
        errorHandler(err, res)
    }
}

/**
 * Exports
 */

export const UsersController = {
    create: [
        UsersValidation.isValidUser,
        UsersValidation.appendData,
        create
    ],
    read: [UsersValidation.userExists, read],
    update: [UsersValidation.userExists,
        UsersValidation.isValidUser,
        update
    ],
    delete: [UsersValidation.userExists, destroy],
    readUserByEmail: [readUserByEmail],
    readCompanyByUserID: [UsersValidation.userExists, readCompanyByUserID],
    listGalleriesByUserID: [UsersValidation.userExists, listGalleriesByUserID]
}