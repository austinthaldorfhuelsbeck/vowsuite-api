/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response, NextFunction } from "express"
import * as UsersService from "./users.service"
import { IBaseUser, IUser } from "../interfaces/objects.interface"
import { errorHandler } from "../middleware/error.handlers"

/**
 * Middleware Definitions
 */

export const isValidUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get user from create/update req
    const user: IBaseUser = req.body
    // Build error message
    let message: string = ""
    if (!user.user_name) message += "User name required. "
    if (!user.email) message += "Email required."
    // Return err or pass thru locals
    if (message !== "") {
        errorHandler({ status: 400, message }, res)
    } else {
        res.locals.validUser = user
        return next()
    }
}

export const userExists = async (
    req: Request,
    res: Response,
    next: NextFunction,
    id: string = ""
) => {
    // Get ID from param or req body if it
    // didn't come in from query/params
    if (req.params.user_id) {
        id = req.params.user_id
    } else if (req.body.data.user_id) {
        id = req.body.data.user_id
    } else {
        errorHandler({ status: 400, message: "User ID required." }, res)
    };
    // Read the user
    const user: IUser = await UsersService.read(parseInt(id))
    // Return if found
    if (user) {
        res.locals.foundUser = user
        return next()
    };
    errorHandler({ status: 404, message: `User ${id} cannot be found.` }, res)
};

export const appendData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get user from locals
    const user: IUser = res.locals.validUser
    // Append created date if none provided
    if (!user.created_at) {
        user.created_at = new Date()
    }
    // Append updated date
    user.updated_at = new Date()
    // Pass thru completed object
    res.locals.validUser = user
    return next()
}