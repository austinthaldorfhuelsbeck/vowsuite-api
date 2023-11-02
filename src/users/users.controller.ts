// External Modules
import { NextFunction, Request, Response } from "express"
import { IBaseUser, IUser, IGallery } from "../interfaces/objects.interface"

import { errorHandler } from "../middleware/error.handlers"
import { appendChildren, appendData, isValidUser, userExists } from "./users.validation"
import * as UsersService from "./users.service"

// Controllers
const create = async (req: Request, res: Response) => {
    try {
        const user: IUser = res.locals.validUser
        user.user_id = new Date().valueOf() // add user ID
        const newUser: IUser = await UsersService.create(user)
        res.json(newUser)
    } catch (err) {
        errorHandler(err, res)
    }
}

const read = async (req: Request, res: Response) => {
    try {
        const response: IUser = res.locals.foundUser
        res.json(response)
    } catch (err) {
        errorHandler(err, res)
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const updatedUser: IBaseUser = res.locals.validUser
        const id: number = parseInt(res.locals.foundUser.user_id)
        const response: IUser = await UsersService.update(updatedUser, id)
        res.json(response)
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

const readByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email: string = String(req.query.email)
        const response: IUser = await UsersService.readByEmail(email)
        req.params.user_id = String(response.user_id)
        return next()
    } catch (err) {
        errorHandler(err, res)
    }
}

const listGalleries = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(res.locals.foundUser.user_id)
        const response: IGallery[] = await UsersService.listGalleries(id)
        res.json(response)
    } catch (err) {
        errorHandler(err, res)
    }
}


// Exports

export const UsersController = {
    create: [
        isValidUser,
        appendData,
        create
    ],
    read: [
        userExists,
        appendChildren,
        read
    ],
    update: [userExists,
        isValidUser,
        update
    ],
    delete: [userExists, destroy],
    readByEmail: [
        readByEmail,
        userExists,
        appendChildren,
        read
    ],
    listGalleries: [userExists, listGalleries]
}