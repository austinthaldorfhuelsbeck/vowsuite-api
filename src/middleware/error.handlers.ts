import { Request, Response } from "express"
import { ErrorStatus } from "../interfaces/error.status.interface"

function isAnErrorStatus(object: any): object is ErrorStatus {
    return "status" in object
}

export const errorHandler = (err: unknown, res: Response) => {
    if (isAnErrorStatus(err)) {
        res.status(err.status).json(
            {
                error: {
                    message: err.message,
                    status: err.status
                }
            }
        )
    } else if (err instanceof Error) {
        res.status(500).json({ error: err })
    } else if (err) {
        res.status(500).json({ error: { message: String(err) } })
    } else {
        res.status(500).json({ error: { message: "Something went wrong!" } })
    }
}

export const methodNotAllowed = (req: Request, res: Response) => {
    res.status(405).json({ message: `${req.method} not allowed for ${req.originalUrl}.` })
}

export const notFound = (req: Request, res: Response) => {
    res.status(404).json({ message: `Not found: ${req.originalUrl}.` })
}