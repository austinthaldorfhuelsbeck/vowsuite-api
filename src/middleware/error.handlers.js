"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.methodNotAllowed = exports.errorHandler = void 0;
function isAnErrorStatus(object) {
    return "status" in object;
}
const errorHandler = (err, res) => {
    if (isAnErrorStatus(err)) {
        res.status(err.status).json({
            error: {
                message: err.message,
                status: err.status
            }
        });
    }
    else if (err instanceof Error) {
        res.status(500).json({ error: err });
    }
    else if (err) {
        res.status(500).json({ error: { message: String(err) } });
    }
    else {
        res.status(500).json({ error: { message: "Something went wrong!" } });
    }
};
exports.errorHandler = errorHandler;
const methodNotAllowed = (req, res) => {
    res.status(405).json({ message: `${req.method} not allowed for ${req.originalUrl}.` });
};
exports.methodNotAllowed = methodNotAllowed;
const notFound = (req, res) => {
    res.status(404).json({ message: `Not found: ${req.originalUrl}.` });
};
exports.notFound = notFound;
